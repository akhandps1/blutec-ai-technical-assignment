const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3030/', { waitUntil: 'networkidle' });

  console.log('Testing JourneySection...');
  // Check Step 0
  const step0Show = await page.evaluate(() => {
    const s0 = document.querySelector('.tp-msg-group[data-step="0"]');
    return s0 ? s0.getAttribute('data-show') : null;
  });
  console.log('Step 0 data-show:', step0Show);

  // Click Step 2 (Photos & details)
  await page.click('.tp-chat__step:nth-child(2)');
  await page.waitForTimeout(900); // Wait for typing animation

  const step1State = await page.evaluate(() => {
    const s1 = document.querySelector('.tp-msg-group[data-step="1"]');
    const imgs = s1 ? Array.from(s1.querySelectorAll('img')).map(i => ({ src: i.src, loaded: i.naturalWidth > 0 })) : [];
    const video = s1 ? s1.querySelector('video') : null;
    return {
      s1Show: s1 ? s1.getAttribute('data-show') : null,
      imgsCount: imgs.length,
      imgsLoaded: imgs.filter(i => i.loaded).length,
      hasVideo: !!video
    };
  });
  console.log('Step 1 state after click:', step1State);

  // Test video play button
  const videoPlayBtn = await page.$('.tp-clip__play');
  if (videoPlayBtn) {
    await videoPlayBtn.click();
    await page.waitForTimeout(300);
    const isPlaying = await page.evaluate(() => {
      const v = document.querySelector('.tp-clip video');
      const btn = document.querySelector('.tp-clip__play');
      return { paused: v ? v.paused : null, ariaPressed: btn ? btn.getAttribute('aria-pressed') : null };
    });
    console.log('Video play test:', isPlaying);
  }

  // Click Step 3 (Secure & safe delivery)
  await page.click('.tp-chat__step:nth-child(3)');
  await page.waitForTimeout(900);
  const step2Show = await page.evaluate(() => {
    const s2 = document.querySelector('.tp-msg-group[data-step="2"]');
    return s2 ? s2.getAttribute('data-show') : null;
  });
  console.log('Step 2 data-show:', step2Show);

  console.log('\nTesting DuskSection Lightbox...');
  const polaroidBtn = await page.$('.tp-photowall__print');
  if (polaroidBtn) {
    await polaroidBtn.click();
    await page.waitForTimeout(400);
    const lightboxState = await page.evaluate(() => {
      const dialog = document.querySelector('dialog[aria-label="Photo viewer"]');
      const counter = dialog ? dialog.querySelector('p')?.innerText : null;
      const img = dialog ? dialog.querySelector('img') : null;
      return {
        isOpen: !!dialog,
        counter,
        hasImg: !!img,
        imgSrc: img ? img.src : null
      };
    });
    console.log('Lightbox state after click:', lightboxState);

    // Test next button
    const nextBtn = await page.$('dialog[aria-label="Photo viewer"] button:has-text("Next")');
    if (nextBtn) {
      await nextBtn.click();
      await page.waitForTimeout(300);
      const nextCounter = await page.evaluate(() => {
        return document.querySelector('dialog[aria-label="Photo viewer"] p')?.innerText;
      });
      console.log('Lightbox counter after Next:', nextCounter);
    }

    // Close lightbox with Escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    const isClosed = await page.evaluate(() => {
      return !document.querySelector('dialog[aria-label="Photo viewer"]');
    });
    console.log('Lightbox closed cleanly:', isClosed);
  }

  console.log('\nTesting Total Broken Images on Localhost...');
  for (let y = 0; y <= 12000; y += 600) {
    await page.evaluate((pos) => window.scrollTo(0, pos), y);
    await page.waitForTimeout(40);
  }
  await page.waitForTimeout(1000);

  const imagesStatus = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return {
      total: imgs.length,
      loaded: imgs.filter(i => i.naturalWidth > 0).length,
      broken: imgs.filter(i => i.naturalWidth === 0).map(i => ({
        src: i.src,
        alt: i.alt,
        section: i.closest('section') ? i.closest('section').className : 'none'
      }))
    };
  });
  console.log('Images after full scroll: Total:', imagesStatus.total, 'Loaded:', imagesStatus.loaded, 'Broken:', imagesStatus.broken.length);
  if (imagesStatus.broken.length > 0) {
    console.log('Broken images:', imagesStatus.broken);
  }

  await browser.close();
})();
