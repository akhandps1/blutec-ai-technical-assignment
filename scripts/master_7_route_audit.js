const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const REF_BASE = "https://puppy.instabizweb.com";
const LOCAL_BASE = "http://localhost:3030";

const ROUTES = [
  { id: "homepage", route: "/", name: "Homepage" },
  { id: "puppy-detail", route: "/puppies/maltipoo-max-male", name: "Puppy Detail (Max)" },
  { id: "puppies", route: "/puppies", name: "Puppies Listing" },
  { id: "happy-families", route: "/happy-families", name: "Happy Families" },
  { id: "how-it-works", route: "/how-it-works", name: "How It Works" },
  { id: "faq", route: "/faq", name: "FAQ" },
  { id: "contact", route: "/contact", name: "Contact" },
];

const VIEWPORTS = [
  { name: "large-desktop", width: 1920, height: 1080 },
  { name: "desktop", width: 1440, height: 900 },
  { name: "laptop", width: 1366, height: 768 },
  { name: "small-laptop", width: 1280, height: 800 },
  { name: "tablet-landscape", width: 1024, height: 768 },
  { name: "tablet-portrait", width: 768, height: 1024 },
  { name: "mobile-large", width: 430, height: 932 },
  { name: "mobile-standard", width: 390, height: 844 },
  { name: "mobile-small", width: 375, height: 812 },
  { name: "mobile-compact", width: 360, height: 800 },
];

const BASE_DIR = path.join(__dirname, "..");
const SCREENSHOTS_DIR = path.join(BASE_DIR, "screenshots");

// Create full folder hierarchy
function setupDirs() {
  const dirs = [
    "reference",
    "local",
    "comparisons",
  ];
  const subdirs = ["full-page", "sections", "scroll-down", "scroll-up"];

  for (const root of dirs) {
    for (const r of ROUTES) {
      for (const sub of subdirs) {
        fs.mkdirSync(path.join(SCREENSHOTS_DIR, root, r.id, sub), { recursive: true });
      }
    }
  }
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function settlePage(page) {
  try {
    await page.waitForLoadState("networkidle", { timeout: 10000 });
  } catch (e) {
    // networkidle might timeout on long-lived connections, continue
  }
  // Scroll down and up to trigger lazy loading
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = 800;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        y += step;
        if (y >= document.documentElement.scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 60);
    });
  });
  await sleep(400);
}

async function inspectSections(page) {
  return await page.evaluate(() => {
    const candidates = Array.from(document.querySelectorAll("main > section, .tp-scene, section, header, footer"));
    return candidates.map((el, idx) => {
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      const h1 = el.querySelector("h1")?.innerText.trim() || "";
      const h2 = el.querySelector("h2")?.innerText.trim() || "";
      const h3 = el.querySelector("h3")?.innerText.trim() || "";
      const kicker = el.querySelector(".tp-kicker, [class*='kicker']")?.innerText.trim() || "";
      const heading = h1 || h2 || h3 || kicker;
      const imgs = el.querySelectorAll("img").length;
      const btns = Array.from(el.querySelectorAll("button, a[class*='btn'], a.tp-button")).map((b) => b.innerText.trim()).filter(Boolean);

      return {
        index: idx + 1,
        tagName: el.tagName.toLowerCase(),
        id: el.id || `section-${idx + 1}`,
        className: el.className || "",
        heading,
        top: Math.round(rect.top + window.scrollY),
        height: Math.round(rect.height),
        width: Math.round(rect.width),
        imagesCount: imgs,
        buttons: btns.slice(0, 5),
        backgroundColor: style.backgroundColor,
      };
    });
  });
}

async function inspectAssets(page) {
  return await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll("img")).map((img) => ({
      src: img.src,
      alt: img.alt || "",
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      displayWidth: img.clientWidth,
      displayHeight: img.clientHeight,
      isBroken: img.complete && img.naturalWidth === 0,
      loading: img.loading || "eager",
    }));

    const videos = Array.from(document.querySelectorAll("video")).map((v) => ({
      src: v.src || v.querySelector("source")?.src || "",
    }));

    const links = Array.from(document.querySelectorAll("a[href]")).map((a) => ({
      href: a.getAttribute("href"),
      text: a.innerText.trim(),
    }));

    return {
      imagesCount: images.length,
      brokenImages: images.filter((i) => i.isBroken).map((i) => i.src),
      videosCount: videos.length,
      linksCount: links.length,
      sampleImages: images.slice(0, 10),
    };
  });
}

async function runAudit() {
  console.log("=================================================");
  console.log("MASTER 7-ROUTE AUDIT & SCREENSHOT SYSTEM");
  console.log(`Reference: ${REF_BASE}`);
  console.log(`Local:     ${LOCAL_BASE}`);
  console.log("=================================================\n");

  setupDirs();

  const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
  });

  const fullAuditReport = {
    timestamp: new Date().toISOString(),
    routes: {},
  };

  for (const routeObj of ROUTES) {
    const { id, route, name } = routeObj;
    console.log(`\n-------------------------------------------------`);
    console.log(`AUDITING ROUTE: ${name} (${route})`);
    console.log(`-------------------------------------------------`);

    fullAuditReport.routes[id] = {
      name,
      route,
      reference: {},
      local: {},
      comparison: {},
      responsive: {},
      scroll: { downward: [], reverse: [] },
    };

    const refContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const localContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });

    const refPage = await refContext.newPage();
    const localPage = await localContext.newPage();

    // 1. OPEN REFERENCE PAGE
    console.log(`  [1/6] Loading Reference: ${REF_BASE}${route}`);
    try {
      await refPage.goto(`${REF_BASE}${route}`, { waitUntil: "domcontentloaded", timeout: 30000 });
      await settlePage(refPage);
      console.log(`        Ref Title: "${await refPage.title()}"`);
    } catch (err) {
      console.warn(`        Failed to load Ref: ${err.message}`);
    }

    // 2. OPEN LOCAL PAGE
    console.log(`  [2/6] Loading Local: ${LOCAL_BASE}${route}`);
    try {
      await localPage.goto(`${LOCAL_BASE}${route}`, { waitUntil: "domcontentloaded", timeout: 30000 });
      await settlePage(localPage);
      console.log(`        Local Title: "${await localPage.title()}"`);
    } catch (err) {
      console.warn(`        Failed to load Local: ${err.message}`);
    }

    // A. FULL-PAGE SCREENSHOTS (DESKTOP)
    const refDesktopFull = path.join(SCREENSHOTS_DIR, "reference", id, "full-page", `${id}-desktop-full-page.png`);
    const localDesktopFull = path.join(SCREENSHOTS_DIR, "local", id, "full-page", `${id}-desktop-full-page.png`);
    await refPage.screenshot({ path: refDesktopFull, fullPage: true });
    await localPage.screenshot({ path: localDesktopFull, fullPage: true });
    console.log(`  [3/6] Full-page desktop screenshots saved`);

    // A. FULL-PAGE SCREENSHOTS (MOBILE)
    await refPage.setViewportSize({ width: 390, height: 844 });
    await localPage.setViewportSize({ width: 390, height: 844 });
    await sleep(300);
    const refMobileFull = path.join(SCREENSHOTS_DIR, "reference", id, "full-page", `${id}-mobile-full-page.png`);
    const localMobileFull = path.join(SCREENSHOTS_DIR, "local", id, "full-page", `${id}-mobile-full-page.png`);
    await refPage.screenshot({ path: refMobileFull, fullPage: true });
    await localPage.screenshot({ path: localMobileFull, fullPage: true });
    console.log(`        Full-page mobile screenshots saved`);

    // Reset back to Desktop for section & scroll audits
    await refPage.setViewportSize({ width: 1440, height: 900 });
    await localPage.setViewportSize({ width: 1440, height: 900 });
    await sleep(300);

    // B. SECTION INVENTORIES & SECTION SCREENSHOTS
    const refSections = await inspectSections(refPage);
    const localSections = await inspectSections(localPage);
    fullAuditReport.routes[id].reference.sections = refSections;
    fullAuditReport.routes[id].local.sections = localSections;
    console.log(`  [4/6] Sections Discovered: Ref = ${refSections.length}, Local = ${localSections.length}`);

    // Capture first 5 main section screenshots
    const maxSecs = Math.min(5, Math.max(refSections.length, localSections.length));
    for (let sIdx = 0; sIdx < maxSecs; sIdx++) {
      const refSec = refSections[sIdx];
      const localSec = localSections[sIdx];

      if (refSec) {
        await refPage.evaluate((top) => window.scrollTo(0, top), refSec.top);
        await sleep(150);
        await refPage.screenshot({
          path: path.join(SCREENSHOTS_DIR, "reference", id, "sections", `sec-${String(sIdx + 1).padStart(2, "0")}.png`),
        });
      }
      if (localSec) {
        await localPage.evaluate((top) => window.scrollTo(0, top), localSec.top);
        await sleep(150);
        await localPage.screenshot({
          path: path.join(SCREENSHOTS_DIR, "local", id, "sections", `sec-${String(sIdx + 1).padStart(2, "0")}.png`),
        });
      }
    }

    // C. DOWNWARD & REVERSE SCROLL AUDIT
    const refScrollHeight = await refPage.evaluate(() => document.documentElement.scrollHeight);
    const localScrollHeight = await localPage.evaluate(() => document.documentElement.scrollHeight);
    const maxScroll = Math.max(refScrollHeight, localScrollHeight);
    const stepSize = Math.max(500, Math.floor(maxScroll / 8));
    const scrollPositions = [];
    for (let pos = 0; pos <= maxScroll; pos += stepSize) {
      scrollPositions.push(pos);
    }
    if (scrollPositions[scrollPositions.length - 1] < maxScroll) {
      scrollPositions.push(maxScroll);
    }

    console.log(`  [5/6] Performing Bidirectional Scroll (${scrollPositions.length} steps)...`);
    
    // Downward scroll
    for (let idx = 0; idx < scrollPositions.length; idx++) {
      const y = scrollPositions[idx];
      await refPage.evaluate((top) => window.scrollTo(0, top), y);
      await localPage.evaluate((top) => window.scrollTo(0, top), y);
      await sleep(150);

      const refStepPng = path.join(SCREENSHOTS_DIR, "reference", id, "scroll-down", `step-${String(idx).padStart(2, "0")}-y${y}.png`);
      const localStepPng = path.join(SCREENSHOTS_DIR, "local", id, "scroll-down", `step-${String(idx).padStart(2, "0")}-y${y}.png`);
      await refPage.screenshot({ path: refStepPng });
      await localPage.screenshot({ path: localStepPng });

      fullAuditReport.routes[id].scroll.downward.push({
        step: idx,
        y,
        refScrollY: await refPage.evaluate(() => window.scrollY),
        localScrollY: await localPage.evaluate(() => window.scrollY),
      });
    }

    // Reverse scroll back up
    const reversePositions = [...scrollPositions].reverse();
    for (let idx = 0; idx < reversePositions.length; idx++) {
      const y = reversePositions[idx];
      await refPage.evaluate((top) => window.scrollTo(0, top), y);
      await localPage.evaluate((top) => window.scrollTo(0, top), y);
      await sleep(150);

      const refRevPng = path.join(SCREENSHOTS_DIR, "reference", id, "scroll-up", `rev-step-${String(idx).padStart(2, "0")}-y${y}.png`);
      const localRevPng = path.join(SCREENSHOTS_DIR, "local", id, "scroll-up", `rev-step-${String(idx).padStart(2, "0")}-y${y}.png`);
      await refPage.screenshot({ path: refRevPng });
      await localPage.screenshot({ path: localRevPng });

      fullAuditReport.routes[id].scroll.reverse.push({
        step: idx,
        y,
        refScrollY: await refPage.evaluate(() => window.scrollY),
        localScrollY: await localPage.evaluate(() => window.scrollY),
      });
    }

    // D. RESPONSIVE AUDIT ACROSS ALL 10 VIEWPORTS
    console.log(`  [6/6] Testing all 10 responsive viewports...`);
    for (const vp of VIEWPORTS) {
      await localPage.setViewportSize({ width: vp.width, height: vp.height });
      await sleep(150);

      const respCheck = await localPage.evaluate(() => {
        const docEl = document.documentElement;
        return {
          innerWidth: window.innerWidth,
          scrollWidth: docEl.scrollWidth,
          hasOverflow: docEl.scrollWidth > window.innerWidth + 1,
          navMode: window.innerWidth < 768 ? "mobile-drawer" : "desktop-header",
        };
      });

      fullAuditReport.routes[id].responsive[vp.name] = {
        viewport: `${vp.width}x${vp.height}`,
        ...respCheck,
        result: respCheck.hasOverflow ? "FAIL" : "PASS",
      };
    }

    // Assets audit
    fullAuditReport.routes[id].reference.assets = await inspectAssets(refPage);
    fullAuditReport.routes[id].local.assets = await inspectAssets(localPage);

    await refContext.close();
    await localContext.close();
  }

  await browser.close();

  // Save raw data
  const rawDataPath = path.join(BASE_DIR, "docs", "seven_route_audit_raw.json");
  fs.writeFileSync(rawDataPath, JSON.stringify(fullAuditReport, null, 2));
  console.log(`\n=================================================`);
  console.log(`AUDIT COMPLETE: Data saved to ${rawDataPath}`);
  console.log(`=================================================`);
}

runAudit().catch((err) => {
  console.error("Audit script failed:", err);
  process.exit(1);
});
