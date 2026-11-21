const { spawn } = require("child_process");
const { chromium } = require("playwright-core");
const fs = require("fs");
const path = require("path");

const PORT = 3005;
const BASE_URL = `http://localhost:${PORT}`;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(url, timeout = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const res = await fetch(url);
      if (res.status === 200) return true;
    } catch (e) {
      // ignore
    }
    await sleep(500);
  }
  throw new Error(`Server did not respond within ${timeout}ms`);
}

async function main() {
  console.log("Starting Next.js production server on port", PORT);
  const server = spawn("npm", ["run", "start", "--", "-p", String(PORT)], {
    stdio: "inherit",
    shell: true,
  });

  try {
    await waitForServer(BASE_URL);
    console.log("Server is ready at", BASE_URL);

    const browser = await chromium.launch({
      executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      headless: true,
    });

    const viewports = [
      { name: "desktop", width: 1440, height: 900 },
      { name: "laptop", width: 1280, height: 800 },
      { name: "tablet", width: 768, height: 1024 },
      { name: "mobile", width: 390, height: 844 },
    ];

    const pagesToTest = [
      { path: "/", name: "home" },
      { path: "/puppies", name: "puppies" },
      { path: "/gone-home", name: "gone_home" },
      { path: "/happy-families", name: "happy_families" },
      { path: "/how-it-works", name: "how_it_works" },
      { path: "/faq", name: "faq" },
      { path: "/contact", name: "contact" },
      { path: "/puppies/maltipoo-max-male", name: "puppy_detail_max" },
    ];

    const outDir = path.join(__dirname, "..", "tests", "visual");
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    for (const vp of viewports) {
      console.log(`\nTesting viewport: ${vp.name} (${vp.width}x${vp.height})`);
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 2,
      });
      const page = await context.newPage();

      // Listen for errors
      const failedRequests = [];
      page.on("requestfailed", (req) => {
        failedRequests.push(`${req.method()} ${req.url()} - ${req.failure()?.errorText}`);
      });

      for (const p of pagesToTest) {
        // Test all pages on desktop & mobile, home on all
        if (vp.name !== "desktop" && vp.name !== "mobile" && p.name !== "home") continue;

        console.log(`  Visiting ${p.path}...`);
        await page.goto(`${BASE_URL}${p.path}`, { waitUntil: "networkidle", timeout: 20000 });
        await sleep(600); // allow transitions to settle

        const screenshotPath = path.join(outDir, `${p.name}_${vp.name}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`  Saved screenshot: ${screenshotPath}`);
      }

      if (failedRequests.length > 0) {
        console.warn(`  Warnings/Failures in ${vp.name}:`, failedRequests.slice(0, 5));
      } else {
        console.log(`  All network requests succeeded for ${vp.name}!`);
      }

      await context.close();
    }

    await browser.close();
    console.log("\nVisual verification completed successfully!");
  } finally {
    console.log("Shutting down test server...");
    server.kill("SIGTERM");
  }
}

main().catch((err) => {
  console.error("Test verification error:", err);
  process.exit(1);
});
