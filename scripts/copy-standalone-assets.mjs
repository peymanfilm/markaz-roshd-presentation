/**
 * کپی فایل‌های استاتیک و public به داخل خروجی standalone.
 * جایگزین `cp -r` که روی ویندوز وجود ندارد.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const STANDALONE = path.join(ROOT, ".next", "standalone");

if (!fs.existsSync(path.join(STANDALONE, "server.js"))) {
  console.error("✗ .next/standalone وجود ندارد — ابتدا next build را اجرا کنید.");
  process.exit(1);
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

const staticDir = path.join(ROOT, ".next", "static");
if (fs.existsSync(staticDir)) {
  copyDir(staticDir, path.join(STANDALONE, ".next", "static"));
  console.log("✓ .next/standalone/.next/static");
}

const publicDir = path.join(ROOT, "public");
if (fs.existsSync(publicDir)) {
  copyDir(publicDir, path.join(STANDALONE, "public"));
  console.log("✓ .next/standalone/public");
}
