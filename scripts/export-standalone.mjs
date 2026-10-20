/**
 * ساخت نسخهٔ آفلاینِ ارائه — یک فایل HTML مستقل
 * ---------------------------------------------------------------
 * همهٔ اسلایدها را از روی سرور (توسعه یا تولید) رندر می‌گیرد و در یک
 * فایل HTML می‌گذارد که:
 *   • هیچ درخواستی به اینترنت نمی‌فرستد (CSS، فونت و لوگو درون‌خطی شده‌اند)
 *   • با دوبار کلیک (file://) در هر مرورگری باز می‌شود
 *   • ناوبری با کیبورد، دکمه، لمسی و پخش خودکار را حفظ می‌کند
 *
 * اجرا:
 *   node scripts/export-standalone.mjs --url http://localhost:3000 \
 *        --out dist/presentation.html
 *
 * پیش‌نیاز: یک سرور در حال اجرا (dev یا start) و Chrome/Edge برای رندر.
 */

import { spawn } from "node:child_process";
import { mkdir, readFile, writeFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import os from "node:os";

/* ───────────────────────── آرگومان‌ها ───────────────────────── */

const argv = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : fallback;
};

const APP_URL = arg("url", "http://localhost:3000").replace(/\/$/, "");
const OUT_FILE = path.resolve(arg("out", "dist/presentation.html"));
const CDP_PORT = Number(arg("cdp-port", "9333"));
const WIDTH = Number(arg("width", "1600"));
const HEIGHT = Number(arg("height", "900"));

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);

const findChrome = () => CHROME_CANDIDATES.find((p) => existsSync(p));

/* ───────────────────────── ابزارها ───────────────────────── */

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const toDataUri = (buf, mime) => `data:${mime};base64,${buf.toString("base64")}`;

async function fetchOrNull(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return Buffer.from(await res.arrayBuffer());
  } catch {
    return null;
  }
}

const mimeOf = (p) => {
  const ext = path.extname(p).toLowerCase();
  return (
    {
      ".woff2": "font/woff2",
      ".woff": "font/woff",
      ".ttf": "font/ttf",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".svg": "image/svg+xml",
      ".gif": "image/gif",
      ".webp": "image/webp",
      ".ico": "image/x-icon",
    }[ext] || "application/octet-stream"
  );
};

/* ───────────────────────── درخت CDP ───────────────────────── */

class Cdp {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    ws.onmessage = (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(JSON.stringify(msg.error)));
        else resolve(msg.result);
      }
    };
  }

  static async connect(url) {
    const ws = new WebSocket(url);
    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = () => reject(new Error("اتصال CDP برقرار نشد"));
    });
    return new Cdp(ws);
  }

  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async evaluate(expression, awaitPromise = false) {
    const res = await this.send("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise,
    });
    if (res.exceptionDetails) {
      throw new Error(res.exceptionDetails.exception?.description || "خطای اجرای اسکریپت");
    }
    return res.result.value;
  }
}

/* ───────────────────────── اجرای مرورگر ───────────────────────── */

async function launchChrome() {
  const chrome = findChrome();
  if (!chrome) {
    throw new Error(
      "Chrome/Edge پیدا نشد. مسیر مرورگر را با --chrome <path> بدهید یا متغیر CHROME_PATH را تنظیم کنید.",
    );
  }
  const profile = path.join(os.tmpdir(), "kilo-export-chrome-" + CDP_PORT);
  await rm(profile, { recursive: true, force: true });
  const child = spawn(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--no-first-run",
      "--no-default-browser-check",
      `--remote-debugging-port=${CDP_PORT}`,
      `--user-data-dir=${profile}`,
      `--window-size=${WIDTH},${HEIGHT}`,
      "about:blank",
    ],
    { stdio: "ignore" },
  );
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${CDP_PORT}/json/version`);
      if (res.ok) return { child, profile };
    } catch {
      /* در حال بالا آمدن */
    }
    await sleep(250);
  }
  child.kill();
  throw new Error("مرورگر در زمان مقرر بالا نیامد");
}

async function newPage(cdp, url) {
  const res = await fetch(`http://127.0.0.1:${CDP_PORT}/json/new?${encodeURIComponent(url)}`, {
    method: "PUT",
  });
  const target = await res.json();
  return target.webSocketDebuggerUrl;
}

/* ───────────────────────── رندر اسلایدها ───────────────────────── */

const EXTRACT = `(() => {
  const root = document.querySelector('.deck-root');
  const frame = document.querySelector('[data-slide-frame]');
  const bar = document.querySelector('[role="progressbar"]');
  return JSON.stringify({
    root: root ? root.outerHTML : null,
    frame: frame ? frame.outerHTML : null,
    frameNo: frame ? frame.getAttribute('data-slide-frame') : null,
    total: bar ? Number(bar.getAttribute('aria-valuemax')) : 0,
    cssHrefs: [...document.querySelectorAll('link[rel="stylesheet"]')].map((l) => l.href),
    bodyClass: document.body.className,
    htmlLang: document.documentElement.lang,
    htmlDir: document.documentElement.dir,
    title: document.title
  });
})()`;

async function collectSlides(cdp, total) {
  const slides = [];
  for (let i = 1; i <= total; i++) {
    await cdp.evaluate(`(() => { location.hash = '#${i}'; return true; })()`);
    for (let attempt = 0; attempt < 60; attempt++) {
      const no = await cdp.evaluate(
        `(() => { const f = document.querySelector('[data-slide-frame]'); return f ? f.getAttribute('data-slide-frame') : ''; })()`,
      );
      if (Number(no) === i) break;
      await sleep(50);
    }
    await sleep(220); // فرصت برای پایدار شدن رندر
    const html = await cdp.evaluate(
      `(() => { const f = document.querySelector('[data-slide-frame]'); return f ? f.outerHTML : ''; })()`,
    );
    slides.push(html);
    process.stdout.write(`\r  اسلاید ${i}/${total} رندر شد`);
  }
  process.stdout.write("\n");
  return slides;
}

/* ───────────────────────── درون‌خطی‌سازی دارایی‌ها ───────────────────────── */

async function inlineCss(cssHrefs) {
  const cssParts = [];
  const seen = new Map();

  for (const href of cssHrefs) {
    const buf = await fetchOrNull(href);
    if (!buf) continue;
    let css = buf.toString("utf8");

    // هر url(...) را به دادهٔ درون‌خطی تبدیل کن
    const matches = [...css.matchAll(/url\((['"]?)([^'")]+)\1\)/g)];
    for (const m of matches) {
      const raw = m[2];
      const whole = m[0];
      if (raw.startsWith("data:")) continue;
      const abs = raw.startsWith("/") ? APP_URL + raw : new URL(raw, href).href;
      if (!seen.has(abs)) {
        const asset = await fetchOrNull(abs);
        if (!asset) continue;
        seen.set(abs, toDataUri(asset, mimeOf(abs)));
      }
      css = css.split(whole).join(`url("${seen.get(abs)}")`);
    }
    cssParts.push(css);
  }
  return cssParts.join("\n");
}

/**
 * تصاویر را درون‌خطی می‌کند اما بارِ داده را یک‌بار در فایل نگه می‌دارد:
 * هر تصویر یک کلید می‌گیرد و اسکریپت راه‌انداز src را از جدول ثابت می‌خواند.
 */
async function inlineImages(html) {
  const refs = [...new Set([...html.matchAll(/src="(\/[^"]+)"/g)].map((m) => m[1]))];
  const table = {};
  let html2 = html;

  for (const ref of refs) {
    if (ref.startsWith("//") || ref.startsWith("data:")) continue;
    const asset = await fetchOrNull(APP_URL + ref);
    if (!asset) continue;
    const uri = await optimizeImage(asset, ref);
    const key = path.basename(ref).replace(/\.[^.]+$/, "");
    table[key] = uri;
    html2 = html2.split(`src="${ref}"`).join(`src="" data-img="${key}"`);
  }
  return { html: html2, table };
}

/** فشرده‌سازی تصاویر (لوگو کوچک، عکس‌ها JPEG/WebP) */
async function optimizeImage(buf, ref) {
  const name = path.basename(ref);
  try {
    const sharp = (await import("sharp")).default;
    const img = sharp(buf);
    const meta = await img.metadata();
    const hasAlpha = Boolean(meta.hasAlpha);
    if (name === "logo.png") {
      const out = await img
        .resize(256, 256, { fit: "inside", withoutEnlargement: true })
        .png({ compressionLevel: 9, palette: true, quality: 90 })
        .toBuffer();
      return toDataUri(out, "image/png");
    }
    const out = await sharp(buf)
      .resize(1100, 1100, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 84, alphaQuality: 90 })
      .toBuffer();
    return toDataUri(out, hasAlpha ? "image/webp" : "image/webp");
  } catch {
    return toDataUri(buf, mimeOf(ref));
  }
}

/* ───────────────────────── سبک چاپ (نسخهٔ PDF پشتیبان) ───────────────────────── */

const PRINT_CSS = `
/* چاپ/خروجی PDF: همهٔ اسلایدها یکی‌به‌یکی در صفحه‌های ۱۶:۹ */
@media print {
  @page { size: 1600px 900px; margin: 0; }
  html, body { height: auto !important; overflow: visible !important; background: #04091a !important; }
  .deck-root { display: block !important; height: auto !important; }
  .deck-stage-area {
    display: block !important;
    height: auto !important;
    overflow: visible !important;
    padding: 0 !important;
    /* container-type: size ارتفاع را مستقل از محتوا حساب می‌کند و کل
       صفحه را صفر می‌کند — در چاپ باید به ارتفاع واقعی محتوا تکیه کند. */
    container-type: normal !important;
  }
  .deck-stage { display: block !important; width: 1600px !important; height: auto !important; aspect-ratio: auto !important; transform: none !important; }
  [data-slide-frame] {
    display: block !important;
    position: relative !important;
    inset: auto !important;
    width: 1600px !important;
    height: 900px !important;
    margin: 0 !important;
    border: 0 !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    animation: none !important;
    break-after: page;
    page-break-after: always;
  }
  footer, .deck-brandbar, .deck-rotate-hint { display: none !important; }
  .deck-fade { animation: none !important; opacity: 1 !important; transform: none !important; filter: none !important; }
}
`;

/* ───────────────────────── اسکریپت ناوبری ───────────────────────── */

const NAV_SCRIPT = `<script>
(function () {
  var IMAGES = __IMAGES__;
  var frames = Array.prototype.slice.call(document.querySelectorAll('[data-slide-frame]'));
  var total = frames.length;
  var counter = document.querySelector('[data-role="counter"]');
  var progress = document.querySelector('[data-role="progress"]');
  var bar = document.querySelector('[role="progressbar"]');
  var btnPrev = document.querySelector('[data-action="prev"]');
  var btnNext = document.querySelector('[data-action="next"]');
  var btnPlay = document.querySelector('[data-action="play"]');
  var btnFs = document.querySelector('[data-action="fullscreen"]');
  var iconPlay = document.querySelector('[data-role="icon-play"]');
  var iconPause = document.querySelector('[data-role="icon-pause"]');
  var FA = ['\\u06F0','\\u06F1','\\u06F2','\\u06F3','\\u06F4','\\u06F5','\\u06F6','\\u06F7','\\u06F8','\\u06F9'];
  var index = 0, dir = 1, timer = null;

  /* تصاویر درون‌خطی: بار داده یک‌بار در جدول بالا آمده و اینجا به‌شان
     داده می‌شود تا فایل خروجی کوچک بماند. */
  var imgs = document.querySelectorAll('img[data-img]');
  for (var i = 0; i < imgs.length; i++) {
    var key = imgs[i].getAttribute('data-img');
    if (IMAGES[key]) imgs[i].src = IMAGES[key];
  }

  function toFa(n) { return String(n).replace(/[0-9]/g, function (d) { return FA[Number(d)]; }); }

  function show(n, d) {
    n = Math.max(0, Math.min(total - 1, n));
    if (d) dir = d;
    for (var i = 0; i < frames.length; i++) {
      var active = i === n;
      frames[i].style.display = active ? '' : 'none';
      frames[i].style.setProperty('--deck-x', active ? (dir >= 0 ? '-80px' : '80px') : '-80px');
    }
    index = n;
    if (counter) counter.textContent = toFa(index + 1) + ' / ' + toFa(total);
    if (progress) progress.style.width = ((index + 1) / total * 100) + '%';
    if (bar) bar.setAttribute('aria-valuenow', String(index + 1));
    /* همگام‌سازی نشانی با شمارهٔ اسلاید (مثل نسخهٔ وب) */
    if (btnPrev) btnPrev.disabled = index === 0;
    if (btnNext) btnNext.disabled = index === total - 1;
    try { history.replaceState(null, '', '#' + (index + 1)); } catch (e) {}
  }

  function next() { show(index + 1, 1); }
  function prev() { show(index - 1, -1); }

  function toggleFs() {
    if (document.fullscreenElement) { document.exitFullscreen(); }
    else if (document.documentElement.requestFullscreen) { document.documentElement.requestFullscreen(); }
  }

  function setPlaying(on) {
    if (timer) { clearInterval(timer); timer = null; }
    if (on) { timer = setInterval(function () { if (index < total - 1) next(); else setPlaying(false); }, 9000); }
    if (iconPlay) iconPlay.className = on ? 'hidden' : 'block';
    if (iconPause) iconPause.className = on ? 'block' : 'hidden';
  }

  function togglePlay() { setPlaying(!timer); }

  document.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    switch (e.key) {
      case 'ArrowLeft': case 'ArrowDown': case 'PageDown': case ' ':
        e.preventDefault(); next(); break;
      case 'ArrowRight': case 'ArrowUp': case 'PageUp':
        e.preventDefault(); prev(); break;
      case 'Home': e.preventDefault(); show(0); break;
      case 'End': e.preventDefault(); show(total - 1); break;
      case 'f': case 'F': e.preventDefault(); toggleFs(); break;
      case 'p': case 'P': e.preventDefault(); togglePlay(); break;
    }
  });

  if (btnPrev) btnPrev.addEventListener('click', prev);
  if (btnNext) btnNext.addEventListener('click', next);
  if (btnPlay) btnPlay.addEventListener('click', togglePlay);
  if (btnFs) btnFs.addEventListener('click', toggleFs);

  var touchX = null;
  document.addEventListener('touchstart', function (e) { touchX = e.changedTouches[0].clientX; }, { passive: true });
  document.addEventListener('touchend', function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 60) { if (dx < 0) next(); else prev(); }
  }, { passive: true });

  var start = parseInt((location.hash || '').replace('#', ''), 10);
  show(isNaN(start) ? 0 : start - 1);

  /* پرش مستقیم با تغییر نشانی (مثل #12) */
  window.addEventListener('hashchange', function () {
    var h = parseInt((location.hash || '').replace('#', ''), 10);
    if (!isNaN(h) && h >= 1 && h <= total && h - 1 !== index) show(h - 1);
  });

  /* مرورگرهایی که container query را نمی‌شناسند چیدمان را می‌شکنند؛
     به‌جای نمایش ناقص، کاربر را راهنمایی می‌کنیم. */
  try {
    if (!(window.CSS && CSS.supports && CSS.supports('width', '1cqw'))) {
      window.deckNotice(
        'مرورگر این سیستم برای نمایش ارائه قدیمی است',
        'لطفاً این فایل را با Chrome یا Edge به‌روز باز کنید. اگر به‌روزرسانی ممکن نیست، از نسخهٔ PDF با نام presentation.pdf که کنار همین فایل است استفاده کنید.'
      );
    }
  } catch (e) {}
  window.__deckReady = true;
})();
<\/script>`;

/* ───────────────────────── اجرا ───────────────────────── */

async function main() {
  console.log(`سرور: ${APP_URL}`);
  const { child, profile } = await launchChrome();
  let cdp;

  try {
    const wsUrl = await newPage(cdp, `${APP_URL}/`);
    cdp = await Cdp.connect(wsUrl);
    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");
    await sleep(1200);

    // انتظار برای رندر اپ
    let info = null;
    for (let i = 0; i < 80; i++) {
      info = JSON.parse(await cdp.evaluate(EXTRACT));
      if (info && info.frame && info.total) break;
      await sleep(250);
    }
    if (!info || !info.frame) throw new Error("اسلایدی رندر نشد — سرور در حال اجراست؟");
    const total = info.total;
    console.log(`تعداد اسلاید: ${total}`);

    const slides = await collectSlides(cdp, total);

    // پوستهٔ صفحه (چیدمان، نوار کنترل، نوار برند) از اسلاید نخست
    let shell = info.root;
    const firstFrame = slides[0];
    const allFrames = slides
      .map((html, i) =>
        i === 0 ? html : html.replace('style="', 'style="display:none; '),
      )
      .join("\n");
    shell = shell.replace(firstFrame, allFrames);

    const { html: shellWithImages, table: imageTable } = await inlineImages(shell);
    const css = await inlineCss(info.cssHrefs);
    const script = NAV_SCRIPT.replace(
      "__IMAGES__",
      JSON.stringify(imageTable).replace(/<\/script/gi, "<\\/script"),
    );

    const html = `<!DOCTYPE html>
<html lang="${info.htmlLang || "fa"}" dir="${info.htmlDir || "rtl"}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="dark">
<title>${info.title || "ارائه"}</title>
<style>
${css}
${PRINT_CSS}
</style>
<script>
/* نگهبان خودتشخیص: اگر فایل ناقص کپی شده باشد یا مرورگر خیلی قدیمی باشد،
   به‌جای صفحهٔ سفید پیام روشن نمایش داده می‌شود. */
(function () {
  function notice(title, body) {
    if (document.getElementById('deck-notice')) return;
    function add() {
      var box = document.createElement('div');
      box.id = 'deck-notice';
      box.setAttribute('style', 'position:fixed;top:0;right:0;bottom:0;left:0;z-index:2147483647;background:#0a0f1e;color:#eef2ff;font-family:Tahoma,Arial,sans-serif;font-size:18px;line-height:2;padding:40px;text-align:center;direction:rtl');
      var h = document.createElement('div');
      h.setAttribute('style', 'font-size:26px;font-weight:bold;margin-bottom:18px');
      h.textContent = title;
      var p = document.createElement('div');
      p.textContent = body;
      box.appendChild(h); box.appendChild(p);
      document.body.appendChild(box);
    }
    if (document.body) add(); else document.addEventListener('DOMContentLoaded', add);
  }
  window.deckNotice = notice;
  setTimeout(function () {
    var frames = document.querySelectorAll('[data-slide-frame]');
    var visible = false;
    for (var i = 0; i < frames.length; i++) {
      if (frames[i].style.display !== 'none') { visible = true; break; }
    }
    /* اگر اسکریپت ناوبری اجرا نشده باشد، فایل ناقص کپی شده است. */
    if (!visible || !window.__deckReady) {
      notice('ارائه کامل بارگذاری نشد', 'این فایل به‌طور کامل کپی نشده است یا مرورگر شما خیلی قدیمی است. لطفاً فایل START-DECK.html را دوباره به‌طور کامل کپی کنید، یا از نسخهٔ PDF با نام dist\\presentation.pdf استفاده کنید.');
    }
  }, 7000);
})();
</script>
</head>
<body class="${info.bodyClass || ""}">
${shellWithImages}
${script}
</body>
</html>
`;

    await mkdir(path.dirname(OUT_FILE), { recursive: true });
    await writeFile(OUT_FILE, html, "utf8");
    const kb = (Buffer.byteLength(html) / 1024).toFixed(0);
    console.log(`\n✓ فایل ساخته شد: ${OUT_FILE} (${kb} KB)`);
  } finally {
    try {
      cdp?.ws.close();
    } catch {}
    child.kill();
    await sleep(500);
    await rm(profile, { recursive: true, force: true }).catch(() => {});
  }
}

main().catch((err) => {
  console.error("✗ خطا:", err.message);
  process.exit(1);
});
