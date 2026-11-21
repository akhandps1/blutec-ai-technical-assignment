const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const ROUTES = [
  { id: "homepage", name: "Homepage (/)" },
  { id: "puppy-detail", name: "Puppy Detail (/puppies/maltipoo-max-male)" },
  { id: "puppies", name: "Puppies Listing (/puppies)" },
  { id: "happy-families", name: "Happy Families (/happy-families)" },
  { id: "how-it-works", name: "How It Works (/how-it-works)" },
  { id: "faq", name: "FAQ (/faq)" },
  { id: "contact", name: "Contact (/contact)" },
];

const BASE_DIR = path.join(__dirname, "..");
const SCREENSHOTS_DIR = path.join(BASE_DIR, "screenshots");

async function generateComparisons() {
  console.log("Generating side-by-side visual comparisons for all 7 routes...");

  const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
  });

  const page = await browser.newPage();

  for (const r of ROUTES) {
    const compDir = path.join(SCREENSHOTS_DIR, "comparisons", r.id);
    fs.mkdirSync(compDir, { recursive: true });

    const kinds = [
      { type: "desktop", refName: `${r.id}-desktop-full-page.png`, localName: `${r.id}-desktop-full-page.png`, width: 2980 },
      { type: "mobile", refName: `${r.id}-mobile-full-page.png`, localName: `${r.id}-mobile-full-page.png`, width: 880 },
    ];

    for (const k of kinds) {
      const refPath = path.join(SCREENSHOTS_DIR, "reference", r.id, "full-page", k.refName);
      const localPath = path.join(SCREENSHOTS_DIR, "local", r.id, "full-page", k.localName);

      if (!fs.existsSync(refPath) || !fs.existsSync(localPath)) {
        console.warn(`Missing screenshot for ${r.id} ${k.type}`);
        continue;
      }

      const refB64 = fs.readFileSync(refPath).toString("base64");
      const localB64 = fs.readFileSync(localPath).toString("base64");

      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { margin: 0; padding: 24px; background: #1a100a; font-family: -apple-system, sans-serif; color: #fffdf8; }
            .header { text-align: center; margin-bottom: 24px; }
            h1 { font-size: 24px; margin: 0 0 6px 0; color: #f2be6b; }
            p { font-size: 14px; opacity: 0.8; margin: 0; }
            .grid { display: flex; gap: 24px; justify-content: center; }
            .column { flex: 1; max-width: ${k.type === "mobile" ? "420px" : "1440px"}; }
            .badge { display: inline-block; padding: 6px 16px; border-radius: 999px; font-weight: 700; font-size: 13px; margin-bottom: 12px; }
            .badge.ref { background: #b45309; color: #fff; }
            .badge.local { background: #047857; color: #fff; }
            .img-wrap { border: 2px solid rgba(255,255,255,0.15); border-radius: 8px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
            img { display: block; width: 100%; height: auto; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${r.name} — Visual Regression Comparison</h1>
            <p>Left: Original Reference (https://puppy.instabizweb.com) | Right: Local Implementation (http://localhost:3030)</p>
          </div>
          <div class="grid">
            <div class="column">
              <span class="badge ref">REFERENCE</span>
              <div class="img-wrap"><img src="data:image/png;base64,${refB64}" /></div>
            </div>
            <div class="column">
              <span class="badge local">LOCAL (PORT 3030)</span>
              <div class="img-wrap"><img src="data:image/png;base64,${localB64}" /></div>
            </div>
          </div>
        </body>
        </html>
      `;

      await page.setContent(html);
      await page.waitForTimeout(300);

      const outPath = path.join(compDir, `${r.id}-${k.type}-comparison.png`);
      await page.screenshot({ path: outPath, fullPage: true });
      console.log(`  [OK] Saved comparison: ${outPath}`);
    }
  }

  await browser.close();
  console.log("All side-by-side visual comparisons generated successfully!");
}

generateComparisons().catch((e) => {
  console.error(e);
  process.exit(1);
});
