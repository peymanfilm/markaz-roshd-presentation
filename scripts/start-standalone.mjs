/**
 * اجرای نسخهٔ تولیدشدهٔ standalone روی 127.0.0.1:3210
 * (بدون CMD و بدون وابستگی به bun/tee — کاملاً cross-platform).
 */
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const server = path.join(ROOT, ".next", "standalone", "server.js");
const port = process.env.PORT || "3210";

const child = spawn(process.execPath, [server], {
  cwd: path.join(ROOT, ".next", "standalone"),
  env: { ...process.env, NODE_ENV: "production", PORT: port, HOSTNAME: "127.0.0.1" },
  stdio: "inherit",
});

child.on("exit", (code) => process.exit(code ?? 0));
process.on("SIGINT", () => child.kill());
process.on("SIGTERM", () => child.kill());
