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

test.describe("TeddyPups Homepage Comprehensive E2E Suite", () => {
  test("Homepage loads with HTTP 200 and valid metadata", async ({ page }) => {
    const res = await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });
    expect(res?.status()).toBe(200);
    const title = await page.title();
    expect(title).toContain("TeddyPups U.A.E.");
  });

  test("Custom paw cursor styles are applied to body and interactive elements", async ({ page }) => {
    await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });
    const bodyCursor = await page.evaluate(() => window.getComputedStyle(document.body).cursor);
    expect(bodyCursor).toContain("paw.svg");

    const btnCursor = await page.evaluate(() => {
      const btn = document.querySelector("a.btn, button.btn") || document.querySelector("a, button");
      return btn ? window.getComputedStyle(btn).cursor : "";
    });
    expect(btnCursor).toContain("paw-press.svg");
  });

  test("Mascot pointer tracking responds to mouse coordinates and clicks", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });

    // Move to left
    await page.mouse.move(100, 250);
    await page.waitForTimeout(200);
    const facingLeft = await page.evaluate(() => {
      const buddy = document.querySelector(".tp-hero .pup-buddy");
      return buddy?.getAttribute("data-facing");
    });
    expect(facingLeft).toBe("left");

    // Move to right
    await page.mouse.move(1200, 250);
    await page.waitForTimeout(200);
    const facingRight = await page.evaluate(() => {
      const buddy = document.querySelector(".tp-hero .pup-buddy");
      return buddy?.getAttribute("data-facing");
    });
    expect(facingRight).toBe("right");

    // Click mascot to trigger speech bubble
    await page.locator(".tp-hero .pup-buddy").click();
    await page.waitForTimeout(300);
    const bubble = await page.evaluate(() => {
      const b = document.querySelector(".tp-hero .pup-buddy .pup-bubble");
      return {
        shown: b?.getAttribute("data-show") === "true",
        text: b?.textContent || "",
      };
    });
    expect(bubble.shown).toBe(true);
    expect(bubble.text.length).toBeGreaterThan(0);
  });

  test("Meet Pups corridor pins and translates horizontally on scroll", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });

    // Initial state
    const initialTranslate = await page.evaluate(() => (document.querySelector(".tp-meet__track") as HTMLElement | null)?.style.transform);
    expect(initialTranslate === "translateX(0px)" || initialTranslate === "" || initialTranslate === "none").toBe(true);

    // Scroll to mid-corridor
    await page.evaluate(() => window.scrollTo(0, 2500));
    await page.waitForTimeout(300);
    const midTranslate = await page.evaluate(() => (document.querySelector(".tp-meet__track") as HTMLElement | null)?.style.transform);
    expect(midTranslate).toContain("translateX(-");

    // Scroll to end of corridor
    await page.evaluate(() => window.scrollTo(0, 4100));
    await page.waitForTimeout(300);
    const endTranslate = await page.evaluate(() => (document.querySelector(".tp-meet__track") as HTMLElement | null)?.style.transform);
    expect(endTranslate).toContain("translateX(-4");

    // Reverse scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    const returnedTranslate = await page.evaluate(() => (document.querySelector(".tp-meet__track") as HTMLElement | null)?.style.transform);
    expect(returnedTranslate === "translateX(0px)" || returnedTranslate === "none").toBe(true);
  });

  for (const vp of VIEWPORTS) {
    test(`Zero horizontal overflow on ${vp.name} (${vp.width}x${vp.height})`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(300);

      const overflow = await page.evaluate(() => {
        return {
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
        };
      });

      expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.innerWidth);
    });
  }
});
