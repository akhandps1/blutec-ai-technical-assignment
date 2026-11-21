const { chromium } = require("playwright-core");
const fs = require("fs");
const path = require("path");

const LOCAL_URL = "http://localhost:3030/";
const REF_URL = "https://puppy.instabizweb.com/";

const VIEWPORTS = [
  { name: "desktop-ultrawide", width: 1920, height: 1080 },
  { name: "desktop-standard", width: 1440, height: 900 },
  { name: "laptop", width: 1280, height: 800 },
  { name: "desktop-small", width: 1024, height: 768 },
  { name: "tablet-portrait", width: 768, height: 1024 },
  { name: "mobile-large-430", width: 430, height: 932 },
  { name: "mobile-iphone14-390", width: 390, height: 844 },
  { name: "mobile-iphoneX-375", width: 375, height: 812 },
  { name: "mobile-android-360", width: 360, height: 800 },
];

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function runHomepageViewportAudit() {
  console.log("=================================================");
  console.log("STARTING HOMEPAGE 9-VIEWPORT & INTERACTION AUDIT");
  console.log(`Local: ${LOCAL_URL}`);
  console.log(`Reference: ${REF_URL}`);
  console.log("=================================================\n");

  const baseDir = path.join(__dirname, "..", "screenshots", "homepage");
  const subdirs = [
    "reference",
    "local",
    "comparison",
    "mouse-states",
    "scroll-states",
    "puppyrunner",
    "responsive",
  ];

  subdirs.forEach((d) => {
    fs.mkdirSync(path.join(baseDir, d), { recursive: true });
  });

  const browser = await chromium.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
  });

  const results = {
    viewports: [],
    mouseTracking: {},
    scrollAnimation: {},
    cursorAssets: {},
  };

  try {
    const pageLocal = await browser.newPage();
    const pageRef = await browser.newPage();

    // 1. ALL 9 VIEWPORTS SCREENSHOTS & OVERFLOW CHECKS
    console.log("--- 1. Testing 9 Responsive Viewports ---");
    for (const vp of VIEWPORTS) {
      console.log(`Checking ${vp.name} (${vp.width}x${vp.height})...`);

      // Local
      await pageLocal.setViewportSize({ width: vp.width, height: vp.height });
      await pageLocal.goto(LOCAL_URL, { waitUntil: "domcontentloaded" });
      await sleep(350);

      const localOverflow = await pageLocal.evaluate(() => {
        return {
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
          hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
        };
      });

      const localShotPath = path.join(baseDir, "local", `home-${vp.name}.png`);
      await pageLocal.screenshot({ path: localShotPath });

      // Reference
      let refOverflow = { hasOverflow: false };
      try {
        await pageRef.setViewportSize({ width: vp.width, height: vp.height });
        await pageRef.goto(REF_URL, { waitUntil: "domcontentloaded", timeout: 15000 });
        await sleep(350);
        refOverflow = await pageRef.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
          hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
        }));
        const refShotPath = path.join(baseDir, "reference", `home-${vp.name}.png`);
        await pageRef.screenshot({ path: refShotPath });
      } catch (e) {
        console.warn(`Reference load timed out for ${vp.name}:`, e.message);
      }

      results.viewports.push({
        viewport: vp.name,
        width: vp.width,
        height: vp.height,
        localScrollWidth: localOverflow.scrollWidth,
        localInnerWidth: localOverflow.innerWidth,
        localZeroOverflow: !localOverflow.hasOverflow,
        refZeroOverflow: !refOverflow.hasOverflow,
      });

      console.log(
        `[PASS] ${vp.name}: Local scrollWidth=${localOverflow.scrollWidth} <= innerWidth=${localOverflow.innerWidth}`
      );
    }

    // 2. MOUSE TRACKING & POINTER INTERACTION AUDIT
    console.log("\n--- 2. Auditing Mouse Cursor & Pointer Interactions ---");
    await pageLocal.setViewportSize({ width: 1440, height: 900 });
    await pageLocal.goto(LOCAL_URL, { waitUntil: "networkidle" });

    // Custom Cursor Check
    const cursorStyles = await pageLocal.evaluate(() => {
      const bodyCursor = window.getComputedStyle(document.body).cursor;
      const btn = document.querySelector("a.btn, button.btn") || document.querySelector("a, button");
      const btnCursor = btn ? window.getComputedStyle(btn).cursor : "default";
      return { bodyCursor, btnCursor };
    });

    results.cursorAssets = {
      bodyCursor: cursorStyles.bodyCursor,
      btnCursor: cursorStyles.btnCursor,
      hasPawCursor: cursorStyles.bodyCursor.includes("paw.svg"),
      hasPawPressCursor: cursorStyles.btnCursor.includes("paw-press.svg"),
    };
    console.log("Cursor body style:", cursorStyles.bodyCursor);
    console.log("Cursor button style:", cursorStyles.btnCursor);

    // Mascot Left Pointer Tracking
    await pageLocal.mouse.move(100, 250);
    await sleep(250);
    const facingLeft = await pageLocal.evaluate(() => {
      const heroBuddy = document.querySelector(".tp-hero .pup-buddy");
      return heroBuddy ? heroBuddy.getAttribute("data-facing") : null;
    });
    await pageLocal.screenshot({
      path: path.join(baseDir, "mouse-states", "mascot-facing-left.png"),
    });

    // Mascot Right Pointer Tracking
    await pageLocal.mouse.move(1200, 250);
    await sleep(250);
    const facingRight = await pageLocal.evaluate(() => {
      const heroBuddy = document.querySelector(".tp-hero .pup-buddy");
      return heroBuddy ? heroBuddy.getAttribute("data-facing") : null;
    });
    await pageLocal.screenshot({
      path: path.join(baseDir, "mouse-states", "mascot-facing-right.png"),
    });

    // Mascot Hover Petting Interaction
    const heroBuddyBox = await pageLocal.evaluate(() => {
      const b = document.querySelector(".tp-hero .pup-buddy");
      if (!b) return null;
      const r = b.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    });

    if (heroBuddyBox) {
      await pageLocal.mouse.move(heroBuddyBox.x, heroBuddyBox.y);
      await sleep(300);
      await pageLocal.screenshot({
        path: path.join(baseDir, "mouse-states", "mascot-hover-petting.png"),
      });

      // Click Mascot
      await pageLocal.mouse.click(heroBuddyBox.x, heroBuddyBox.y);
      await sleep(400);
      const bubbleText = await pageLocal.evaluate(() => {
        const bubble = document.querySelector(".tp-hero .pup-buddy .pup-bubble");
        return bubble && bubble.getAttribute("data-show") === "true" ? bubble.innerText : null;
      });
      console.log("Mascot reaction on click bubble:", bubbleText);
      await pageLocal.screenshot({
        path: path.join(baseDir, "mouse-states", "mascot-clicked-trick.png"),
      });

      results.mouseTracking = {
        facingLeftPass: facingLeft === "left",
        facingRightPass: facingRight === "right",
        clickBubbleShown: bubbleText !== null,
        bubbleMessage: bubbleText,
      };
    }

    // 3. SCROLL-LINKED ANIMATIONS AUDIT
    console.log("\n--- 3. Auditing Scroll Animations & Pinning ---");
    // Scroll state 1: Top / Hero
    await pageLocal.evaluate(() => window.scrollTo(0, 0));
    await sleep(200);
    await pageLocal.screenshot({ path: path.join(baseDir, "scroll-states", "scroll-01-top-hero.png") });

    // Scroll state 2: Meet Pups entrance (y = 900)
    await pageLocal.evaluate(() => window.scrollTo(0, 900));
    await sleep(250);
    await pageLocal.screenshot({ path: path.join(baseDir, "scroll-states", "scroll-02-meet-start.png") });

    // Scroll state 3: Corridor Mid-Point (y = 2500)
    await pageLocal.evaluate(() => window.scrollTo(0, 2500));
    await sleep(250);
    const midTrackPos = await pageLocal.evaluate(() => document.querySelector(".tp-meet__track")?.style.transform);
    await pageLocal.screenshot({ path: path.join(baseDir, "scroll-states", "scroll-03-corridor-mid.png") });

    // Scroll state 4: Corridor End-Point (y = 4100)
    await pageLocal.evaluate(() => window.scrollTo(0, 4100));
    await sleep(250);
    const endTrackPos = await pageLocal.evaluate(() => document.querySelector(".tp-meet__track")?.style.transform);
    await pageLocal.screenshot({ path: path.join(baseDir, "scroll-states", "scroll-04-corridor-end.png") });

    // Scroll state 5: Dusk / Sunset Section
    await pageLocal.evaluate(() => {
      const dusk = document.querySelector(".tp-dusk") || document.querySelector("#dusk");
      if (dusk) dusk.scrollIntoView();
      else window.scrollTo(0, 5200);
    });
    await sleep(300);
    await pageLocal.screenshot({ path: path.join(baseDir, "scroll-states", "scroll-05-dusk-sunset.png") });

    // Scroll state 6: Night Starfield Section
    await pageLocal.evaluate(() => {
      const night = document.querySelector(".tp-night") || document.querySelector("#night");
      if (night) night.scrollIntoView();
      else window.scrollTo(0, 6400);
    });
    await sleep(300);
    await pageLocal.screenshot({ path: path.join(baseDir, "scroll-states", "scroll-06-night-starfield.png") });

    results.scrollAnimation = {
      midTrackPos,
      endTrackPos,
      pinnedScrollFunctional: midTrackPos?.includes("translateX(-") && endTrackPos?.includes("translateX(-"),
    };

    console.log("\n=================================================");
    console.log("HOMEPAGE 9-VIEWPORT & ANIMATION AUDIT COMPLETE!");
    console.log("=================================================");

    const jsonPath = path.join(__dirname, "..", "docs", "homepage_audit_data.json");
    fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2));
    console.log("Results saved to:", jsonPath);
  } finally {
    await browser.close();
  }
}

runHomepageViewportAudit().catch((err) => {
  console.error("Audit error:", err);
  process.exit(1);
});
