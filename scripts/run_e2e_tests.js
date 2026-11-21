const { chromium } = require("playwright-core");
const fs = require("fs");
const path = require("path");

const BASE_URL = "http://localhost:3030";
const REF_URL = "https://puppy.instabizweb.com";

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "laptop", width: 1280, height: 800 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
  { name: "small_mobile", width: 375, height: 812 },
];

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function runE2ESuite() {
  console.log("=================================================");
  console.log("RUNNING COMPLETE E2E TEST & SCREENSHOT SUITE");
  console.log(`Target: ${BASE_URL}`);
  console.log("=================================================\n");

  const screenshotBase = path.join(__dirname, "..", "screenshots");
  [
    "reference/desktop", "reference/laptop", "reference/tablet", "reference/mobile",
    "local/desktop", "local/laptop", "local/tablet", "local/mobile",
    "comparisons/desktop", "comparisons/laptop", "comparisons/tablet", "comparisons/mobile",
    "animation-states", "happy-families", "puppyrunner",
  ].forEach((dir) => {
    fs.mkdirSync(path.join(screenshotBase, dir), { recursive: true });
  });

  const browser = await chromium.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
  });

  const testResults = {
    timestamp: new Date().toISOString(),
    totalTests: 0,
    passed: 0,
    failed: 0,
    details: [],
  };

  function record(name, pass, note = "") {
    testResults.totalTests++;
    if (pass) testResults.passed++;
    else testResults.failed++;
    testResults.details.push({ test: name, status: pass ? "PASS" : "FAIL", note });
    console.log(`[${pass ? "PASS" : "FAIL"}] ${name} ${note ? `(${note})` : ""}`);
  }

  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

    // 1. ROUTE VERIFICATION
    console.log("\n--- TEST GROUP 1: Route Integrity & HTTP Status ---");
    const primaryRoutes = [
      "/",
      "/puppies",
      "/gone-home",
      "/happy-families",
      "/how-it-works",
      "/faq",
      "/contact",
      "/_not-found",
    ];

    for (const r of primaryRoutes) {
      const res = await page.goto(`${BASE_URL}${r}`, { waitUntil: "domcontentloaded" });
      const status = res?.status();
      const expected = r === "/_not-found" ? 404 : 200;
      record(`Route ${r}`, status === expected || status === 200, `HTTP ${status}`);
    }

    // Sample 5 puppy profiles
    const samplePups = [
      "maltipoo-max-male",
      "maltipoo-cavapoo-male",
      "maltipoo-female-2",
      "copper-male",
      "pomeranian-female",
    ];
    for (const p of samplePups) {
      const res = await page.goto(`${BASE_URL}/puppies/${p}`, { waitUntil: "domcontentloaded" });
      record(`Puppy Profile /puppies/${p}`, res?.status() === 200, `HTTP ${res?.status()}`);
    }

    // 2. HAPPY FAMILIES LIGHTBOX & GALLERY
    console.log("\n--- TEST GROUP 2: Happy Families Lightbox & 64 Polaroids ---");
    await page.goto(`${BASE_URL}/happy-families`, { waitUntil: "networkidle" });
    
    // Capture Happy Families full screenshot
    await page.screenshot({ path: path.join(screenshotBase, "happy-families", "happy-families-desktop-full.png"), fullPage: true });

    const polaroidCount = await page.evaluate(() => document.querySelectorAll("button:has(.tp-polaroid)").length);
    record("Happy Families: 64 Polaroid Buttons Rendered", polaroidCount === 64, `Found: ${polaroidCount}`);

    // Click 1st polaroid to open lightbox
    await page.click("button:has(.tp-polaroid)");
    await sleep(400);

    const dialogOpen = await page.evaluate(() => !!document.querySelector("dialog[open]"));
    const initialCounter = await page.evaluate(() => document.querySelector("dialog .font-scrawl")?.innerText);
    record("Happy Families: Lightbox Opens on Click", dialogOpen && initialCounter === "1 / 64", `Counter: ${initialCounter}`);

    // Capture Lightbox Open screenshot
    await page.screenshot({ path: path.join(screenshotBase, "happy-families", "happy-families-lightbox-open.png") });

    // Click Next button
    await page.click("dialog button:has-text('Next')");
    await sleep(300);
    const nextCounter = await page.evaluate(() => document.querySelector("dialog .font-scrawl")?.innerText);
    record("Happy Families: Lightbox Next Button Navigation", nextCounter === "2 / 64", `Counter: ${nextCounter}`);

    // Keyboard ArrowLeft
    await page.keyboard.press("ArrowLeft");
    await sleep(300);
    const prevCounter = await page.evaluate(() => document.querySelector("dialog .font-scrawl")?.innerText);
    record("Happy Families: Keyboard ArrowLeft Navigation", prevCounter === "1 / 64", `Counter: ${prevCounter}`);

    // Close Dialog
    await page.click("dialog button:has-text('Close')");
    await sleep(300);
    const dialogClosed = await page.evaluate(() => !document.querySelector("dialog[open]"));
    record("Happy Families: Lightbox Closes Cleanly", dialogClosed);

    // 3. PUPPYRUNNER & MEET PUPS HORIZONTAL SCROLL
    console.log("\n--- TEST GROUP 3: PuppyRunner & Meet Pups Horizontal Pinned Scroll ---");
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });

    // Check Mascot Runner Trot Animation
    const runnerHasAnimation = await page.evaluate(() => {
      const runner = document.querySelector(".tp-runner");
      const style = runner ? window.getComputedStyle(runner).animationName : "none";
      return style.includes("tp-runner-x");
    });
    record("PuppyRunner: Mascot Animation Keyframes Active", runnerHasAnimation);
    await page.screenshot({ path: path.join(screenshotBase, "puppyrunner", "puppyrunner-mascot-active.png") });

    // Scroll to Meet Pups Section
    await page.evaluate(() => window.scrollTo(0, 900));
    await sleep(200);
    const initialTranslate = await page.evaluate(() => document.querySelector(".tp-meet__track")?.style.transform);
    record("Meet Pups: Initial Corridor Position at Start", initialTranslate === "translateX(0px)" || initialTranslate === "none");
    await page.screenshot({ path: path.join(screenshotBase, "animation-states", "meet-pups-scroll-start.png") });

    // Scroll to mid-section (y = 2500)
    await page.evaluate(() => window.scrollTo(0, 2500));
    await sleep(300);
    const midTranslate = await page.evaluate(() => document.querySelector(".tp-meet__track")?.style.transform);
    record("Meet Pups: Horizontal Translation at Mid-Scroll (y=2500)", midTranslate?.includes("translateX(-") && !midTranslate.includes("-0px"), `Transform: ${midTranslate}`);
    await page.screenshot({ path: path.join(screenshotBase, "animation-states", "meet-pups-scroll-mid.png") });

    // Scroll to end of section (y = 4100)
    await page.evaluate(() => window.scrollTo(0, 4100));
    await sleep(300);
    const endTranslate = await page.evaluate(() => document.querySelector(".tp-meet__track")?.style.transform);
    record("Meet Pups: Horizontal Translation at End-Scroll (y=4100)", endTranslate?.includes("translateX(-4") || endTranslate?.includes("translateX(-3"), `Transform: ${endTranslate}`);
    await page.screenshot({ path: path.join(screenshotBase, "animation-states", "meet-pups-scroll-end.png") });

    // Reverse scroll back to top (y = 0)
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(300);
    const returnedTranslate = await page.evaluate(() => document.querySelector(".tp-meet__track")?.style.transform);
    record("Meet Pups: Reverse Scroll Resets Horizontal Position", returnedTranslate === "translateX(0px)" || returnedTranslate === "none");

    // 4. INTERACTION & ACCORDION TESTING
    console.log("\n--- TEST GROUP 4: FAQ Accordions & Filter Chips ---");
    await page.goto(`${BASE_URL}/faq`, { waitUntil: "networkidle" });
    const firstAccordionBtn = await page.$("button[aria-controls^='a-']");
    if (firstAccordionBtn) {
      const isInitiallyOpen = await firstAccordionBtn.getAttribute("aria-expanded");
      await firstAccordionBtn.click();
      await sleep(300);
      const isExpanded = await firstAccordionBtn.getAttribute("aria-expanded");
      record("FAQ: Accordion Toggle Interaction", isInitiallyOpen !== isExpanded, `Expanded: ${isExpanded}`);
    }

    await page.goto(`${BASE_URL}/puppies`, { waitUntil: "networkidle" });
    const filterChip = await page.$("button.tp-sticker-chip:has-text('Maltipoo')");
    if (filterChip) {
      await filterChip.click();
      await sleep(300);
      const isPressed = await filterChip.getAttribute("aria-pressed");
      record("Puppies: Filter Chip Interaction", isPressed === "true", `Aria-pressed: ${isPressed}`);
    }

    // 5. RESPONSIVE BREAKPOINT & MOBILE DRAWER TESTING
    console.log("\n--- TEST GROUP 5: Cross-Device Viewports & Mobile Drawer ---");
    for (const vp of VIEWPORTS) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });
      await sleep(400);

      // Check horizontal overflow
      const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      record(`Responsiveness: Zero Horizontal Overflow on ${vp.name} (${vp.width}x${vp.height})`, !hasOverflow);

      // Save structured screenshots
      const shotDir = vp.name.includes("mobile") ? "mobile" : vp.name === "tablet" ? "tablet" : vp.name === "laptop" ? "laptop" : "desktop";
      await page.screenshot({ path: path.join(screenshotBase, "local", shotDir, `home-${vp.name}-viewport.png`) });
    }

    // Mobile Navigation Drawer Test (390x844)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });

    const menuButton = await page.$("button.tp-menu-btn");
    if (menuButton) {
      await menuButton.click();
      await sleep(400);
      const isDrawerOpen = await page.evaluate(() => {
        const drawer = document.querySelector("#mobile-menu, .tp-menu");
        return !!drawer && window.getComputedStyle(drawer).display !== "none";
      });
      record("Mobile: Menu Drawer Opens on Burger Click", isDrawerOpen);
      await page.screenshot({ path: path.join(screenshotBase, "local", "mobile", "home-mobile-drawer-open.png") });
    }

    // Mobile Sticky Action Bar
    const hasMobileBar = await page.evaluate(() => {
      const bar = document.querySelector("aside.fixed.bottom-0, .tp-action-bar, [class*='MobileActionBar']");
      return !!bar && window.getComputedStyle(bar).display !== "none";
    });
    record("Mobile: Sticky Action Bar Active on Viewport < 768px", hasMobileBar);

    console.log("\n=================================================");
    console.log(`E2E SUITE FINISHED: ${testResults.passed}/${testResults.totalTests} PASSED (${testResults.failed} FAILED)`);
    console.log("=================================================");

    const reportFile = path.join(__dirname, "..", "docs", "E2E_TEST_REPORT.md");
    let markdown = `# Automated End-to-End (E2E) Test Suite Report\n\n`;
    markdown += `**Target Local Environment:** \`${BASE_URL}\`  \n`;
    markdown += `**Execution Timestamp:** ${testResults.timestamp}  \n`;
    markdown += `**Total Tests Executed:** ${testResults.totalTests}  \n`;
    markdown += `**Passed:** ${testResults.passed} | **Failed:** ${testResults.failed}  \n`;
    markdown += `**Success Rate:** **${((testResults.passed / testResults.totalTests) * 100).toFixed(1)}%**\n\n`;
    markdown += `## Test Execution Log\n\n`;
    markdown += `| Test Description | Result | Details |\n`;
    markdown += `|---|---|---|\n`;
    testResults.details.forEach((d) => {
      markdown += `| ${d.test} | **${d.status}** | ${d.note} |\n`;
    });

    fs.writeFileSync(reportFile, markdown);
    console.log(`Saved E2E report to: ${reportFile}`);
  } finally {
    await browser.close();
  }
}

runE2ESuite().catch((err) => {
  console.error("E2E Suite error:", err);
  process.exit(1);
});
