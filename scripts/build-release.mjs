/**
 * ساخت بستهٔ قابل‌حمل: پوشهٔ runtime/ شامل Node مستقل و نسخهٔ buildشدهٔ Next
 * تا کل پروژه بدون نصب، بدون CMD و بدون دسترسی ادمین اجرا شود.
 *
 *   node scripts/build-release.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const RUNTIME = path.join(ROOT, "runtime");
const SERVER = path.join(RUNTIME, "server");

const exists = (p) => fs.existsSync(p);
const rmrf = (p) => fs.existsSync(p) && fs.rmSync(p, { recursive: true, force: true });

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function sizeOf(p) {
  if (!exists(p)) return 0;
  if (fs.statSync(p).isFile()) return fs.statSync(p).size;
  let total = 0;
  for (const entry of fs.readdirSync(p, { withFileTypes: true })) {
    const s = path.join(p, entry.name);
    total += entry.isDirectory() ? sizeOf(s) : fs.statSync(s).size;
  }
  return total;
}

const mb = (b) => (b / 1024 / 1024).toFixed(1);

console.log("ساخت بستهٔ قابل‌حمل…\n");

/* ۱) Node مستقل (همان نسخه‌ای که این اسکریپت را اجرا می‌کند) */
const nodeExe = process.execPath;
if (!/node\.exe$/i.test(nodeExe)) {
  console.error("✗ این اسکریپت باید با Node روی ویندوز اجرا شود (process.execPath = " + nodeExe + ")");
  process.exit(1);
}
copyFile(nodeExe, path.join(RUNTIME, "node.exe"));
console.log(`✓ runtime/node.exe (${mb(fs.statSync(path.join(RUNTIME, "node.exe")).size)} MB)`);

/* ۲) نسخهٔ standalone build شدهٔ Next */
const standalone = path.join(ROOT, ".next", "standalone");
if (!exists(path.join(standalone, "server.js"))) {
  console.error("✗ پوشهٔ .next/standalone وجود ندارد. اول این را اجرا کنید:  npm run build");
  process.exit(1);
}
rmrf(SERVER);
copyDir(standalone, SERVER);
console.log(`✓ runtime/server (${mb(sizeOf(SERVER))} MB)`);

/* ۳) فایل‌های استاتیک و public که Next کنار standalone کپی نمی‌کند */
const staticDir = path.join(ROOT, ".next", "static");
if (exists(staticDir)) {
  copyDir(staticDir, path.join(SERVER, ".next", "static"));
  console.log(`✓ runtime/server/.next/static (${mb(sizeOf(staticDir))} MB)`);
}
const publicDir = path.join(ROOT, "public");
if (exists(publicDir)) {
  copyDir(publicDir, path.join(SERVER, "public"));
  console.log(`✓ runtime/server/public (${mb(sizeOf(publicDir))} MB)`);
}

/* ۴) نسخهٔ مستقل ارائه در ریشهٔ پروژه (دابل‌کلیک) */
const standaloneDeck = path.join(ROOT, "dist", "presentation.html");
if (!exists(standaloneDeck)) {
  console.error("✗ dist/presentation.html وجود ندارد. اول این را اجرا کنید:  npm run export:standalone");
  process.exit(1);
}
copyFile(standaloneDeck, path.join(ROOT, "START-DECK.html"));
console.log(`✓ START-DECK.html (${mb(sizeOf(standaloneDeck))} MB)`);

/* ۵) راه‌انداز سبک که تنظیمات محیطی را خودش انجام می‌دهد */
const launcher = `/* راه‌انداز مستقل بستهٔ قابل‌حمل */
process.env.NODE_ENV = "production";
process.env.PORT = process.env.PORT || "3210";
process.env.HOSTNAME = process.env.HOSTNAME || "127.0.0.1";
require("./server/server.js");
`;
fs.writeFileSync(path.join(RUNTIME, "start.js"), launcher, "utf8");
console.log("✓ runtime/start.js");

/* ۵) گزارش نهایی */
const total = sizeOf(RUNTIME);
console.log(`\nبستهٔ زمان اجرا: ${mb(total)} MB — بدون نیاز به نصب Node`);
console.log("اجرا:  دابل‌کلیک روی START.vbs (بی‌صدا) یا START.cmd");
console.log("نمایش مستقیم:  دابل‌کلیک روی START-DECK.html");
