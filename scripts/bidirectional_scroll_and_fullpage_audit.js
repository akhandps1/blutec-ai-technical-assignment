const { chromium } = require("playwright-core");
const fs = require("fs");
const path = require("path");

const REF_URL = "https://puppy.instabizweb.com/";
const LOCAL_URL = "http://localhost:3030/";

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function runCompleteAudit() {
  console.log("=================================================");
  console.log("RUNNING COMPLETE BIDIRECTIONAL SCROLL & FULL-PAGE AUDIT");
  console.log(`Reference: ${REF_URL}`);
  console.log(`Local:     ${LOCAL_URL}`);
  console.log("=================================================\n");

  const baseDir = path.join(__dirname, "..", "screenshots", "homepage");
  const fullPageDir = path.join(baseDir, "full-page");
  const downDir = path.join(baseDir, "downward-scroll");
  const revDir = path.join(baseDir, "reverse-scroll");

  [fullPageDir, downDir, revDir].forEach((d) => {
    fs.mkdirSync(d, { recursive: true });
  });

  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });

  try {
    const context = await browser.newContext();
    const pageRef = await context.newPage();
    const pageLocal = await context.newPage();

    // -------------------------------------------------------------
    // 1. SECTION DISCOVERY (Phase 3)
    // -------------------------------------------------------------
    console.log("--- 1. Section Discovery on Reference Site ---");
    await pageRef.setViewportSize({ width: 1440, height: 900 });
    await pageRef.goto(REF_URL, { waitUntil: "networkidle", timeout: 30000 });
    await sleep(1000);

    const refSections = await pageRef.evaluate(() => {
      const results = [];
      const sections = document.querySelectorAll("main > div > section, main > section, section");
      sections.forEach((s, idx) => {
        const rect = s.getBoundingClientRect();
        const style = window.getComputedStyle(s);
        const heading = s.querySelector("h1, h2, h3, p.font-plush, .tp-hero__title");
        const kicker = s.querySelector("p.font-scrawl, .tp-hero__note");
        const imgs = Array.from(s.querySelectorAll("img")).map((img) => img.src.split("/").pop());
        const btns = Array.from(s.querySelectorAll("a.btn, button, .btn")).map((b) => b.textContent?.trim());
        const hasBuddy = !!s.querySelector(".pup-buddy");

        results.push({
          index: idx + 1,
          id: s.id || `section-${idx + 1}`,
          className: s.className,
          rect: {
            top: Math.round(rect.top + window.scrollY),
            height: Math.round(rect.height),
            width: Math.round(rect.width),
          },
          backgroundColor: style.backgroundColor,
          backgroundImage: style.backgroundImage !== "none" ? "Gradient/Pattern" : "None",
          kicker: kicker?.textContent?.trim() || "",
          heading: heading?.textContent?.trim() || "",
          imagesCount: imgs.length,
          buttonsCount: btns.length,
          buttons: btns.slice(0, 4),
          hasMascot: hasBuddy,
          isPinned: s.hasAttribute("data-pin-range") || style.position === "sticky",
        });
      });
      return results;
    });

    console.log(`Discovered ${refSections.length} sections on reference site.`);

    // -------------------------------------------------------------
    // 2. FULL-PAGE SCREENSHOTS AFTER COMPLETE LOAD (Phase 4)
    // -------------------------------------------------------------
    console.log("\n--- 2. Capturing Full-Page Screenshots (Desktop 1440x900) ---");
    
    // Procedure for Reference:
    // a. Scroll down progressively to trigger all lazy-loaded images & fonts
    console.log("Triggering lazy-loaded content on reference site...");
    const refDocHeight = await pageRef.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < refDocHeight; y += 600) {
      await pageRef.evaluate((pos) => window.scrollTo(0, pos), y);
      await sleep(100);
    }
    await pageRef.evaluate(() => window.scrollTo(0, 0));
    await sleep(1200); // Wait for transitions to settle

    console.log("Saving reference full-page screenshot...");
    const refFullShot = path.join(fullPageDir, "reference-homepage-full.png");
    await pageRef.screenshot({ path: refFullShot, fullPage: true });

    // Procedure for Local:
    await pageLocal.setViewportSize({ width: 1440, height: 900 });
    await pageLocal.goto(LOCAL_URL, { waitUntil: "networkidle", timeout: 30000 });
    await sleep(1000);

    console.log("Triggering lazy-loaded content on local site...");
    const localDocHeight = await pageLocal.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < localDocHeight; y += 600) {
      await pageLocal.evaluate((pos) => window.scrollTo(0, pos), y);
      await sleep(100);
    }
    await pageLocal.evaluate(() => window.scrollTo(0, 0));
    await sleep(1200);

    console.log("Saving local full-page screenshot...");
    const localFullShot = path.join(fullPageDir, "local-homepage-full.png");
    await pageLocal.screenshot({ path: localFullShot, fullPage: true });

    // Mobile Full-Page Captures (390x844)
    console.log("Capturing mobile full-page screenshots (390x844)...");
    await pageRef.setViewportSize({ width: 390, height: 844 });
    await pageRef.goto(REF_URL, { waitUntil: "networkidle" });
    for (let y = 0; y < 7000; y += 500) {
      await pageRef.evaluate((pos) => window.scrollTo(0, pos), y);
      await sleep(80);
    }
    await pageRef.evaluate(() => window.scrollTo(0, 0));
    await sleep(1000);
    await pageRef.screenshot({
      path: path.join(fullPageDir, "reference-homepage-mobile-full.png"),
      fullPage: true,
    });

    await pageLocal.setViewportSize({ width: 390, height: 844 });
    await pageLocal.goto(LOCAL_URL, { waitUntil: "networkidle" });
    for (let y = 0; y < 7000; y += 500) {
      await pageLocal.evaluate((pos) => window.scrollTo(0, pos), y);
      await sleep(80);
    }
    await pageLocal.evaluate(() => window.scrollTo(0, 0));
    await sleep(1000);
    await pageLocal.screenshot({
      path: path.join(fullPageDir, "local-homepage-mobile-full.png"),
      fullPage: true,
    });

    // Reset back to Desktop 1440x900 for scroll audits
    await pageRef.setViewportSize({ width: 1440, height: 900 });
    await pageLocal.setViewportSize({ width: 1440, height: 900 });

    // -------------------------------------------------------------
    // 3. DOWNWARD SCROLL STEP-BY-STEP AUDIT (Phase 5)
    // -------------------------------------------------------------
    console.log("\n--- 3. Downward Scroll Audit (Step-by-Step, 40-70% Viewport Steps) ---");
    const downwardSteps = [
      0,     // Top / Hero
      500,   // Hero mid-quilt
      900,   // Meet corridor entrance (Stage enters viewport)
      1500,  // Corridor ~20%
      2500,  // Corridor ~50% (Doors swinging open)
      3500,  // Corridor ~80%
      4100,  // Corridor exit / Two Paths entrance
      4900,  // Journey timeline & Korea flight map
      5800,  // Passport & Health Guarantee
      6600,  // Dusk sunset scene
      7400,  // Night starfield scene
      8200,  // Home section & Final CTA
      9000,  // Footer bottom
    ];

    const downwardResults = [];

    for (const pos of downwardSteps) {
      console.log(`Downward scroll at y = ${pos}px...`);

      // Reference
      await pageRef.evaluate((y) => window.scrollTo(0, y), pos);
      await sleep(300);
      const refState = await pageRef.evaluate(() => {
        const track = document.querySelector(".tp-meet__track");
        const doorOpenCount = document.querySelectorAll(".tp-door[data-open='true']").length;
        const activeSection = Array.from(document.querySelectorAll("section")).find((s) => {
          const r = s.getBoundingClientRect();
          return r.top <= window.innerHeight * 0.5 && r.bottom >= window.innerHeight * 0.5;
        });
        return {
          scrollY: window.scrollY,
          activeSection: activeSection?.className || "none",
          meetTrackTransform: track ? window.getComputedStyle(track).transform : "none",
          doorOpenCount,
        };
      });
      await pageRef.screenshot({
        path: path.join(downDir, `ref-down-${String(pos).padStart(5, "0")}.png`),
      });

      // Local
      await pageLocal.evaluate((y) => window.scrollTo(0, y), pos);
      await sleep(300);
      const localState = await pageLocal.evaluate(() => {
        const track = document.querySelector(".tp-meet__track");
        const doorOpenCount = document.querySelectorAll(".tp-door[data-open='true']").length;
        const activeSection = Array.from(document.querySelectorAll("section")).find((s) => {
          const r = s.getBoundingClientRect();
          return r.top <= window.innerHeight * 0.5 && r.bottom >= window.innerHeight * 0.5;
        });
        return {
          scrollY: window.scrollY,
          activeSection: activeSection?.className || "none",
          meetTrackTransform: track ? track.style.transform || window.getComputedStyle(track).transform : "none",
          doorOpenCount,
        };
      });
      await pageLocal.screenshot({
        path: path.join(downDir, `local-down-${String(pos).padStart(5, "0")}.png`),
      });

      downwardResults.push({
        scrollPosition: pos,
        refActiveSection: refState.activeSection,
        localActiveSection: localState.activeSection,
        refTrackTransform: refState.meetTrackTransform,
        localTrackTransform: localState.meetTrackTransform,
        refDoorsOpen: refState.doorOpenCount,
        localDoorsOpen: localState.doorOpenCount,
      });
    }

    // -------------------------------------------------------------
    // 4. REVERSE SCROLL STEP-BY-STEP AUDIT (Phase 6)
    // -------------------------------------------------------------
    console.log("\n--- 4. Reverse Scroll Audit (Upward from Bottom to Top) ---");
    const reverseSteps = [...downwardSteps].reverse();
    const reverseResults = [];

    for (const pos of reverseSteps) {
      console.log(`Reverse scroll upward at y = ${pos}px...`);

      // Reference
      await pageRef.evaluate((y) => window.scrollTo(0, y), pos);
      await sleep(300);
      const refRevState = await pageRef.evaluate(() => {
        const track = document.querySelector(".tp-meet__track");
        const doorOpenCount = document.querySelectorAll(".tp-door[data-open='true']").length;
        return {
          scrollY: window.scrollY,
          meetTrackTransform: track ? window.getComputedStyle(track).transform : "none",
          doorOpenCount,
        };
      });
      await pageRef.screenshot({
        path: path.join(revDir, `ref-rev-${String(pos).padStart(5, "0")}.png`),
      });

      // Local
      await pageLocal.evaluate((y) => window.scrollTo(0, y), pos);
      await sleep(300);
      const localRevState = await pageLocal.evaluate(() => {
        const track = document.querySelector(".tp-meet__track");
        const doorOpenCount = document.querySelectorAll(".tp-door[data-open='true']").length;
        return {
          scrollY: window.scrollY,
          meetTrackTransform: track ? track.style.transform || window.getComputedStyle(track).transform : "none",
          doorOpenCount,
        };
      });
      await pageLocal.screenshot({
        path: path.join(revDir, `local-rev-${String(pos).padStart(5, "0")}.png`),
      });

      reverseResults.push({
        scrollPosition: pos,
        refTrackTransform: refRevState.meetTrackTransform,
        localTrackTransform: localRevState.meetTrackTransform,
        refDoorsOpen: refRevState.doorOpenCount,
        localDoorsOpen: localRevState.doorOpenCount,
      });
    }

    // Write JSON audit summary
    const auditData = {
      timestamp: new Date().toISOString(),
      sections: refSections,
      downwardScroll: downwardResults,
      reverseScroll: reverseResults,
    };

    const outJson = path.join(__dirname, "..", "docs", "bidirectional_audit_raw.json");
    fs.writeFileSync(outJson, JSON.stringify(auditData, null, 2));
    console.log(`Saved raw audit metrics to ${outJson}`);
  } finally {
    await browser.close();
  }
}

runCompleteAudit().catch((err) => {
  console.error("Audit error:", err);
  process.exit(1);
});
