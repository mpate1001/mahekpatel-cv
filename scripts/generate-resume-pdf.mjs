/**
 * Generate public/resume.pdf by rendering /resume from a local Next server
 * to a print-formatted PDF via headless Chromium.
 *
 * Usage: npm run resume:pdf
 *   - Spawns `next start` on a free port (assumes `next build` ran first)
 *   - Waits for /resume to respond
 *   - Renders via Puppeteer using @page CSS sizing
 *   - Writes to public/resume.pdf and cleans up the server
 */
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUTPUT = resolve(ROOT, "public/resume.pdf");
const PORT = Number(process.env.RESUME_PDF_PORT || 3456);
const ORIGIN = `http://127.0.0.1:${PORT}`;
const URL = `${ORIGIN}/resume`;
const READY_TIMEOUT_MS = 90_000;

async function waitFor(url, timeoutMs) {
  const start = Date.now();
  let lastErr;
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
      lastErr = new Error(`HTTP ${res.status}`);
    } catch (err) {
      lastErr = err;
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error(`Timed out waiting for ${url}: ${lastErr?.message ?? "unknown"}`);
}

async function main() {
  console.log(`[resume-pdf] starting next on port ${PORT}`);
  const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    cwd: ROOT,
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, NODE_ENV: "production" },
  });
  let buf = "";
  const collect = (d) => {
    buf += d.toString();
  };
  server.stdout.on("data", collect);
  server.stderr.on("data", collect);

  let exitCode = 0;
  try {
    await waitFor(URL, READY_TIMEOUT_MS);
    console.log("[resume-pdf] server ready, launching browser");

    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    try {
      const page = await browser.newPage();
      await page.emulateMediaType("print");
      await page.goto(URL, { waitUntil: "networkidle0", timeout: 60_000 });
      await page.evaluateHandle("document.fonts.ready");
      await mkdir(dirname(OUTPUT), { recursive: true });
      await page.pdf({
        path: OUTPUT,
        format: "Letter",
        printBackground: true,
        preferCSSPageSize: true,
      });
      console.log(`[resume-pdf] wrote ${OUTPUT}`);
    } finally {
      await browser.close();
    }
  } catch (err) {
    console.error("[resume-pdf] failed:", err.message);
    console.error("[resume-pdf] server log tail:\n" + buf.slice(-2000));
    exitCode = 1;
  } finally {
    server.kill("SIGTERM");
    await new Promise((r) => setTimeout(r, 500));
    if (!server.killed) server.kill("SIGKILL");
  }
  process.exit(exitCode);
}

main();
