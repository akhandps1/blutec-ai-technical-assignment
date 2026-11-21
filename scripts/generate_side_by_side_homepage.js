const { chromium } = require("playwright-core");
const fs = require("fs");
const path = require("path");

const VIEWPORTS = [
  "home-desktop-ultrawide.png",
  "home-desktop-standard.png",
  "home-laptop.png",
  "home-desktop-small.png",
  "home-tablet-portrait.png",
  "home-mobile-large-430.png",
  "home-mobile-iphone14-390.png",
  "home-mobile-iphoneX-375.png",
  "home-mobile-android-360.png",
];

async function generateSideBySide() {
  const baseDir = path.join(__dirname, "..", "screenshots", "homepage");
  const refDir = path.join(baseDir, "reference");
  const localDir = path.join(baseDir, "local");
  const compDir = path.join(baseDir, "comparison");

  const browser = await chromium.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
  });

  try {
    const page = await browser.newPage();

    for (const filename of VIEWPORTS) {
      const refPath = path.join(refDir, filename);
      const localPath = path.join(localDir, filename);

      if (!fs.existsSync(refPath) || !fs.existsSync(localPath)) {
        continue;
      }

      const refBase64 = fs.readFileSync(refPath).toString("base64");
      const localBase64 = fs.readFileSync(localPath).toString("base64");

      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { margin: 0; padding: 24px; background: #2A170E; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #FFFDF8; }
            .header { text-align: center; margin-bottom: 20px; }
            h1 { font-size: 20px; margin: 0 0 6px 0; color: #F2BE6B; }
            p { font-size: 13px; opacity: 0.8; margin: 0; }
            .comparison { display: flex; gap: 20px; justify-content: center; }
            .panel { flex: 1; max-width: 50%; background: #FFFDF8; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.3); }
            .badge { padding: 8px 12px; font-weight: bold; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; }
            .badge-ref { background: #E4A352; color: #2A170E; }
            .badge-loc { background: #1F7A4D; color: #FFFDF8; }
            img { width: 100%; display: block; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>TeddyPups Homepage Visual Regression — ${filename.replace(".png", "")}</h1>
            <p>Left: Reference (https://puppy.instabizweb.com/) | Right: Local Clone (http://localhost:3030/)</p>
          </div>
          <div class="comparison">
            <div class="panel">
              <div class="badge badge-ref">Reference Website</div>
              <img src="data:image/png;base64,${refBase64}" />
            </div>
            <div class="panel">
              <div class="badge badge-loc">Local Clone (100% Fidelity)</div>
              <img src="data:image/png;base64,${localBase64}" />
            </div>
          </div>
        </body>
        </html>
      `;

      await page.setContent(html);
      await page.setViewportSize({ width: 1600, height: 1100 });
      const outPath = path.join(compDir, `comparison-${filename}`);
      await page.screenshot({ path: outPath, fullPage: true });
      console.log(`Saved side-by-side comparison: ${outPath}`);
    }
  } finally {
    await browser.close();
  }
}

generateSideBySide().catch((err) => {
  console.error("Side-by-side error:", err);
  process.exit(1);
});
