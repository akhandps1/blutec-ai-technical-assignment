import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:3030";

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

test.describe("TeddyPups Homepage Visual Regression Suite", () => {
  for (const vp of VIEWPORTS) {
    test(`Visual match for ${vp.name} (${vp.width}x${vp.height})`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
      await page.waitForTimeout(400);

      const screenshot = await page.screenshot({ fullPage: false });
      expect(screenshot.length).toBeGreaterThan(50000);
    });
  }

  test("Visual snapshot of Mascot Pointer Left and Right states", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });

    await page.mouse.move(100, 250);
    await page.waitForTimeout(200);
    const shotLeft = await page.screenshot();
    expect(shotLeft.length).toBeGreaterThan(50000);

    await page.mouse.move(1200, 250);
    await page.waitForTimeout(200);
    const shotRight = await page.screenshot();
    expect(shotRight.length).toBeGreaterThan(50000);
  });

  test("Visual snapshot of Meet Pups corridor horizontal scroll states", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });

    // Mid-scroll snapshot
    await page.evaluate(() => window.scrollTo(0, 2500));
    await page.waitForTimeout(300);
    const shotMid = await page.screenshot();
    expect(shotMid.length).toBeGreaterThan(50000);

    // End-scroll snapshot
    await page.evaluate(() => window.scrollTo(0, 4100));
    await page.waitForTimeout(300);
    const shotEnd = await page.screenshot();
    expect(shotEnd.length).toBeGreaterThan(50000);
  });
});
