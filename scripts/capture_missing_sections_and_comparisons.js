const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });

  const refPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const localPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating to reference & local...');
  try {
    await refPage.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle', timeout: 30000 });
  } catch (e) {
    console.log('Ref timeout, proceeding...', e.message);
  }
  await localPage.goto('http://localhost:3030/', { waitUntil: 'networkidle', timeout: 30000 });

  const sectionsToCapture = [
    { name: '01-hero', selector: '.tp-hero' },
    { name: '02-meet-pups', selector: '.tp-meet' },
    { name: '03-paths-signpost', selector: '.tp-paths' },
    { name: '04-chat-step1', selector: '.tp-chat' },
    { name: '05-passport-trust', selector: '.tp-passport' },
    { name: '06-dusk-wall', selector: '.tp-dusk' },
    { name: '07-night-questions', selector: '.tp-night' },
    { name: '08-home-cottage', selector: '.tp-home' },
    { name: '09-footer-basket', selector: '.tp-footer' }
  ];

  for (const s of sectionsToCapture) {
    console.log(`Capturing section ${s.name}...`);
    try {
      // Local
      const localEl = await localPage.$(s.selector);
      if (localEl) {
        await localEl.scrollIntoViewIfNeeded();
        await localPage.waitForTimeout(400);
        await localPage.screenshot({
          path: path.join(__dirname, `../../screenshots/local/missing-sections/${s.name}.png`)
        });
      }

      // Reference
      const refEl = await refPage.$(s.selector);
      if (refEl) {
        await refEl.scrollIntoViewIfNeeded();
        await refPage.waitForTimeout(400);
        await refPage.screenshot({
          path: path.join(__dirname, `../../screenshots/reference/missing-sections/${s.name}.png`)
        });
      }
    } catch (err) {
      console.log(`Error capturing ${s.name}:`, err.message);
    }
  }

  // Capture Chat Step 2 & Step 3 on local
  console.log('Capturing interactive chat steps...');
  try {
    await localPage.evaluate(() => window.scrollTo(0, 6200));
    await localPage.waitForTimeout(300);
    // Click step 2
    await localPage.click('.tp-chat__step:nth-child(2)');
    await localPage.waitForTimeout(800);
    await localPage.screenshot({
      path: path.join(__dirname, '../../screenshots/local/animation-states/chat-step2-photos.png')
    });

    // Click step 3
    await localPage.click('.tp-chat__step:nth-child(3)');
    await localPage.waitForTimeout(800);
    await localPage.screenshot({
      path: path.join(__dirname, '../../screenshots/local/animation-states/chat-step3-route.png')
    });

    // Click Dusk polaroid to open lightbox
    await localPage.evaluate(() => window.scrollTo(0, 9200));
    await localPage.waitForTimeout(300);
    await localPage.click('.tp-photowall__print');
    await localPage.waitForTimeout(500);
    await localPage.screenshot({
      path: path.join(__dirname, '../../screenshots/local/animation-states/dusk-lightbox-open.png')
    });
  } catch (e) {
    console.log('Error capturing interactive states:', e.message);
  }

  // Capture responsive viewports
  console.log('Capturing responsive viewports...');
  const viewports = [
    { name: 'desktop-1440x900', w: 1440, h: 900 },
    { name: 'laptop-1280x800', w: 1280, h: 800 },
    { name: 'tablet-768x1024', w: 768, h: 1024 },
    { name: 'mobile-390x844', w: 390, h: 844 },
    { name: 'small-mobile-375x812', w: 375, h: 812 }
  ];

  for (const vp of viewports) {
    await localPage.setViewportSize({ width: vp.w, height: vp.h });
    await localPage.evaluate(() => window.scrollTo(0, 0));
    await localPage.waitForTimeout(400);
    await localPage.screenshot({
      path: path.join(__dirname, `../../screenshots/local/responsive/${vp.name}.png`)
    });
  }

  console.log('All screenshots captured successfully.');
  await browser.close();
})();
