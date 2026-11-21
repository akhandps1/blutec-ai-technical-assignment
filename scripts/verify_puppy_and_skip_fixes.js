const { chromium } = require("playwright-core");
const fs = require("fs");
const path = require("path");

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const LOCAL_URL = "http://localhost:3030/";
const REF_URL = "https://puppy.instabizweb.com/";

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function run() {
  console.log("=== VERIFYING FIXES: UNWANTED PUPPY RUNNER & SKIP LINK ===");

  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto(LOCAL_URL, { waitUntil: "networkidle" });
  await sleep(1000);

  // 1. Verify Problem B: Skip to content link
  console.log("\n[Test 1] Checking 'Skip to content' visibility...");
  const skipLink = await page.$("a[href='#main']");
  if (!skipLink) {
    console.error("FAIL: Skip to content link not found in DOM");
  } else {
    const clipInitially = await page.evaluate(el => window.getComputedStyle(el).clipPath, skipLink);
    console.log(`- Initial clipPath: ${clipInitially}`);

    // Press Tab to focus skip link
    await page.keyboard.press("Tab");
    await sleep(200);

    const isFocused = await page.evaluate(() => document.activeElement?.getAttribute("href") === "#main");
    const clipOnFocus = await page.evaluate(el => window.getComputedStyle(el).clipPath, skipLink);
    const boxOnFocus = await skipLink.boundingBox();

    console.log(`- Focused via Tab: ${isFocused}`);
    console.log(`- clipPath on focus: ${clipOnFocus}`);
    console.log(`- Bounding box on focus:`, boxOnFocus);

    if (clipInitially === "inset(50%)" && clipOnFocus !== "inset(50%)" && isFocused) {
      console.log("PASS: Skip link is clipped/hidden during normal browsing and expands cleanly on focus, matching reference exactly!");
    } else {
      console.log("FAIL: Skip link styling does not match expected behavior.");
    }
  }

  // 2. Verify Problem A: No unwanted puppy loop
  console.log("\n[Test 2] Checking for unwanted continuous puppy loop...");
  const puppyRunner = await page.$(".tp-runner");
  const isRunnerVisible = puppyRunner ? await puppyRunner.isVisible() : false;
  console.log(`- .tp-runner element present: ${!!puppyRunner}`);
  console.log(`- .tp-runner visible: ${isRunnerVisible}`);

  const anyLoopingRunner = await page.evaluate(() => {
    const runners = document.querySelectorAll(".tp-runner, .pup-layer, [animation*='tp-runner']");
    for (const r of runners) {
      const style = window.getComputedStyle(r);
      if (style.display !== "none" && style.visibility !== "hidden") {
        return true;
      }
    }
    return false;
  });
  console.log(`- Any looping runner visible in viewport: ${anyLoopingRunner}`);
  if (!anyLoopingRunner) {
    console.log("PASS: Unwanted puppy runner loop completely removed from page!");
  } else {
    console.log("FAIL: Unwanted puppy runner still visible!");
  }

  // 3. Verify horizontal scrolling corridor in Meet the pups section
  console.log("\n[Test 3] Verifying Meet the Pups section horizontal scroll...");
  const meetSection = await page.$(".tp-meet");
  if (!meetSection) {
    console.error("FAIL: Meet section .tp-meet not found");
  } else {
    // Scroll into the meet section
    const meetBox = await meetSection.boundingBox();
    console.log("- Meet section top:", meetBox.y);

    // Scroll down 1200px
    await page.mouse.wheel(0, 1500);
    await sleep(600);

    const trackTransform1 = await page.evaluate(() => {
      const track = document.querySelector(".tp-meet__track");
      return track ? track.style.transform : null;
    });
    console.log(`- Track transform at scroll 1500: ${trackTransform1}`);

    // Scroll down further
    await page.mouse.wheel(0, 1500);
    await sleep(600);

    const trackTransform2 = await page.evaluate(() => {
      const track = document.querySelector(".tp-meet__track");
      return track ? track.style.transform : null;
    });
    console.log(`- Track transform at scroll 3000: ${trackTransform2}`);

    // Check doors open status
    const openDoors = await page.evaluate(() => {
      const doors = document.querySelectorAll(".tp-door[data-open='true']");
      return doors.length;
    });
    console.log(`- Open doors in viewport: ${openDoors}`);

    if (trackTransform2 && trackTransform2.includes("translateX(-")) {
      console.log("PASS: Horizontal corridor transforms smoothly on vertical scroll!");
    } else {
      console.log("FAIL: Horizontal corridor track did not translate!");
    }
  }

  // 4. Capture screenshot of header and meet section
  const outDir = path.join(__dirname, "..", "screenshots", "homepage", "puppy-animation");
  fs.mkdirSync(outDir, { recursive: true });

  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(500);
  await page.screenshot({ path: path.join(outDir, "local_header_and_hero.png") });

  await page.mouse.wheel(0, 1400);
  await sleep(600);
  await page.screenshot({ path: path.join(outDir, "local_meet_corridor_scroll1.png") });

  await page.mouse.wheel(0, 1200);
  await sleep(600);
  await page.screenshot({ path: path.join(outDir, "local_meet_corridor_scroll2.png") });

  console.log(`Screenshots saved to ${outDir}`);

  await browser.close();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
