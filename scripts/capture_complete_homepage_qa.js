const { chromium } = require("playwright-core");
const fs = require("fs");
const path = require("path");

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const REF_URL = "https://puppy.instabizweb.com/";
const LOCAL_URL = "http://localhost:3030/";

const VIEWPORTS = [
  { name: "1920x1080", width: 1920, height: 1080 },
  { name: "1440x900", width: 1440, height: 900 },
  { name: "1280x800", width: 1280, height: 800 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "390x844", width: 390, height: 844 },
  { name: "375x812", width: 375, height: 812 },
];

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function preparePage(page, url) {
  await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
  await sleep(1000);
}

async function run() {
  console.log("=== STARTING COMPLETE HOMEPAGE VISUAL QA & CAPTURE ===");

  const baseDir = path.join(__dirname, "..");
  const refDir = path.join(baseDir, "screenshots", "reference");
  const localDir = path.join(baseDir, "screenshots", "local");
  const compDir = path.join(baseDir, "screenshots", "comparisons");

  [refDir, localDir, compDir].forEach((d) => fs.mkdirSync(d, { recursive: true }));

  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });

  const metrics = {
    viewports: {},
    sections: [],
    overflow: {},
  };

  try {
    // 1. Capture Full-Page across viewports
    console.log("\n--- Phase 1: Capturing Full-Page across viewports ---");
    for (const vp of VIEWPORTS) {
      console.log(`Testing viewport: ${vp.name} (${vp.width}x${vp.height})`);

      // Reference
      const pageRef = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      try {
        await preparePage(pageRef, REF_URL);
        const refFull = path.join(refDir, `homepage_full_${vp.name}.png`);
        await pageRef.screenshot({ path: refFull, fullPage: true });
        console.log(`  Saved ref: ${refFull}`);
      } catch (e) {
        console.warn(`  Ref error at ${vp.name}:`, e.message);
      } finally {
        await pageRef.close();
      }

      // Local
      const pageLocal = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      try {
        await preparePage(pageLocal, LOCAL_URL);
        const localFull = path.join(localDir, `homepage_full_${vp.name}.png`);
        await pageLocal.screenshot({ path: localFull, fullPage: true });
        console.log(`  Saved local: ${localFull}`);

        // Check horizontal overflow
        const overflow = await pageLocal.evaluate(() => {
          const body = document.body;
          const doc = document.documentElement;
          const maxScrollW = Math.max(body.scrollWidth, doc.scrollWidth);
          const clientW = doc.clientWidth;
          return {
            scrollWidth: maxScrollW,
            clientWidth: clientW,
            hasOverflow: maxScrollW > clientW,
          };
        });
        metrics.overflow[vp.name] = overflow;
        console.log(`  Overflow check (${vp.name}):`, overflow.hasOverflow ? "FAIL" : "PASS (0px overflow)");
      } catch (e) {
        console.warn(`  Local error at ${vp.name}:`, e.message);
      } finally {
        await pageLocal.close();
      }
    }

    // 2. Capture Section-by-Section at 1440x900
    console.log("\n--- Phase 2: Capturing Section-by-Section at 1440x900 ---");
    const pageLocal = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await preparePage(pageLocal, LOCAL_URL);

    const sectionTargets = [
      { name: "01_header_and_hero", scrollY: 0 },
      { name: "02_meet_pups_corridor_start", scrollY: 1000 },
      { name: "03_meet_pups_corridor_mid", scrollY: 2200 },
      { name: "04_meet_pups_corridor_end", scrollY: 3400 },
      { name: "05_two_ways_paths", scrollY: 4600 },
      { name: "06_puppy_journey_chat", scrollY: 5600 },
      { name: "07_puppy_passport", scrollY: 6700 },
      { name: "08_happy_families_dusk", scrollY: 7800 },
      { name: "09_questions_answered_night", scrollY: 8900 },
      { name: "10_ready_hearth_home", scrollY: 9800 },
      { name: "11_home_at_last_footer", scrollY: 10600 },
    ];

    for (const sec of sectionTargets) {
      await pageLocal.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), sec.scrollY);
      await sleep(600);
      const outPath = path.join(localDir, `section_${sec.name}.png`);
      await pageLocal.screenshot({ path: outPath });
      console.log(`  Saved section: ${sec.name} (scrollY: ${sec.scrollY})`);
    }

    await pageLocal.close();

    console.log("\n=== ALL SCREENSHOTS CAPTURED SUCCESSFULLY ===");
  } catch (err) {
    console.error("QA Capture error:", err);
  } finally {
    await browser.close();
  }
}

run();
