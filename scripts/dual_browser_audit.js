const { chromium } = require("playwright-core");
const fs = require("fs");
const path = require("path");

const REF_BASE = "https://puppy.instabizweb.com";
const LOCAL_BASE = "http://localhost:3030";

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "laptop", width: 1280, height: 800 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
  { name: "small_mobile", width: 375, height: 812 },
];

const PAGES = [
  { route: "/", name: "home" },
  { route: "/puppies", name: "puppies" },
  { route: "/gone-home", name: "gone_home" },
  { route: "/happy-families", name: "happy_families" },
  { route: "/how-it-works", name: "how_it_works" },
  { route: "/faq", name: "faq" },
  { route: "/contact", name: "contact" },
  { route: "/puppies/maltipoo-max-male", name: "puppy_detail_max" },
];

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function auditPageMetrics(page) {
  // First scroll through the page to trigger lazy loading of images
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 800;
      const timer = setInterval(() => {
        const scrollHeight = document.documentElement.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0); // scroll back to top
          resolve();
        }
      }, 50);
    });
  });

  await sleep(600); // Allow lazy images to load

  return await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll("img"));
    // A truly broken image has either errored or completed loading with 0 natural dimensions
    const brokenImages = images.filter((img) => img.complete && img.naturalWidth === 0).map((img) => img.src);
    const links = Array.from(document.querySelectorAll("a")).map((a) => a.getAttribute("href")).filter(Boolean);
    const buttons = Array.from(document.querySelectorAll("button")).map((b) => b.innerText.trim()).filter(Boolean);
    const h1 = document.querySelector("h1")?.innerText.trim() || "";
    const h2s = Array.from(document.querySelectorAll("h2")).map((h) => h.innerText.trim());
    
    // Style samples
    const bodyStyle = window.getComputedStyle(document.body);
    const h1El = document.querySelector("h1");
    const h1Style = h1El ? window.getComputedStyle(h1El) : null;
    
    return {
      title: document.title,
      scrollHeight: document.documentElement.scrollHeight,
      imageCount: images.length,
      brokenImageCount: brokenImages.length,
      brokenImages: brokenImages.slice(0, 5),
      linkCount: links.length,
      buttonCount: buttons.length,
      h1,
      h2Count: h2s.length,
      h2Samples: h2s.slice(0, 5),
      bodyFont: bodyStyle.fontFamily,
      bodyBg: bodyStyle.backgroundColor,
      bodyColor: bodyStyle.color,
      h1Font: h1Style?.fontFamily || null,
      h1Size: h1Style?.fontSize || null,
    };
  });
}

async function runDualAudit() {
  console.log("=================================================");
  console.log("STARTING DUAL-BROWSER AUDIT & COMPARISON");
  console.log(`Browser A (Reference): ${REF_BASE}`);
  console.log(`Browser B (Local):     ${LOCAL_BASE}`);
  console.log("=================================================\n");

  const outDir = path.join(__dirname, "..", "tests", "visual", "side_by_side");
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
  });

  const auditResults = {
    timestamp: new Date().toISOString(),
    viewportsTested: VIEWPORTS.map((v) => `${v.name} (${v.width}x${v.height})`),
    pagesTested: PAGES.map((p) => p.route),
    comparisons: [],
    errors: [],
  };

  try {
    for (const vp of VIEWPORTS) {
      console.log(`\n>>> Testing Viewport: ${vp.name.toUpperCase()} (${vp.width}x${vp.height}) <<<`);
      
      const contextA = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 2,
      });
      const contextB = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 2,
      });

      const pageA = await contextA.newPage();
      const pageB = await contextB.newPage();

      const consoleErrorsA = [];
      const consoleErrorsB = [];
      pageA.on("console", (msg) => { if (msg.type() === "error") consoleErrorsA.push(msg.text()); });
      pageB.on("console", (msg) => { if (msg.type() === "error") consoleErrorsB.push(msg.text()); });

      const failedReqsA = [];
      const failedReqsB = [];
      pageA.on("requestfailed", (req) => failedReqsA.push(`${req.method()} ${req.url()}`));
      pageB.on("requestfailed", (req) => failedReqsB.push(`${req.method()} ${req.url()}`));

      for (const p of PAGES) {
        console.log(`  Evaluating Route: ${p.route} (${p.name})...`);

        const urlA = `${REF_BASE}${p.route}`;
        const urlB = `${LOCAL_BASE}${p.route}`;

        try {
          // Open both pages simultaneously
          await Promise.allSettled([
            pageA.goto(urlA, { waitUntil: "domcontentloaded", timeout: 25000 }),
            pageB.goto(urlB, { waitUntil: "domcontentloaded", timeout: 25000 }),
          ]);

          await sleep(1000); // Wait for fonts and scripts to stabilize

          // Audit DOM Metrics
          const metricsA = await auditPageMetrics(pageA).catch(() => ({ error: "Failed to audit A" }));
          const metricsB = await auditPageMetrics(pageB).catch(() => ({ error: "Failed to audit B" }));

          // Save Screenshots
          const fileA = path.join(outDir, `${p.name}_${vp.name}_ref.png`);
          const fileB = path.join(outDir, `${p.name}_${vp.name}_local.png`);

          await Promise.all([
            pageA.screenshot({ path: fileA, fullPage: false }),
            pageB.screenshot({ path: fileB, fullPage: false }),
          ]);

          // Compare key metrics
          const comparison = {
            viewport: vp.name,
            dimensions: `${vp.width}x${vp.height}`,
            route: p.route,
            pageName: p.name,
            referenceMetrics: metricsA,
            localMetrics: metricsB,
            screenshots: {
              reference: path.relative(path.join(__dirname, ".."), fileA),
              local: path.relative(path.join(__dirname, ".."), fileB),
            },
            consoleErrorsRef: consoleErrorsA.slice(-5),
            consoleErrorsLocal: consoleErrorsB.slice(-5),
            failedRequestsRef: failedReqsA.slice(-5),
            failedRequestsLocal: failedReqsB.slice(-5),
            matchScore: calculateMatchScore(metricsA, metricsB),
          };

          auditResults.comparisons.push(comparison);
          console.log(`    ✓ Done ${p.name} on ${vp.name} — Match: ${comparison.matchScore}%`);
        } catch (pageErr) {
          console.error(`    ✗ Error testing ${p.route}:`, pageErr.message);
          auditResults.errors.push({ viewport: vp.name, route: p.route, error: pageErr.message });
        }
      }

      await contextA.close();
      await contextB.close();
    }

    const reportFile = path.join(__dirname, "..", "tests", "visual", "audit_results.json");
    fs.writeFileSync(reportFile, JSON.stringify(auditResults, null, 2), "utf8");
    console.log(`\n=================================================`);
    console.log(`Audit finished! Results written to: ${reportFile}`);
    console.log(`Total comparisons: ${auditResults.comparisons.length}`);
    console.log(`=================================================`);
  } finally {
    await browser.close();
  }
}

function calculateMatchScore(a, b) {
  if (!a || !b || a.error || b.error) return 50;
  let score = 100;
  if (a.title !== b.title) score -= 10;
  if (a.h1 !== b.h1) score -= 15;
  if (Math.abs(a.imageCount - b.imageCount) > 2) score -= 10;
  if (b.brokenImageCount > 0) score -= 15;
  if (Math.abs(a.h2Count - b.h2Count) > 2) score -= 10;
  return Math.max(0, score);
}

runDualAudit().catch((err) => {
  console.error("Audit script failed:", err);
  process.exit(1);
});
