# 20 Technical Interview Questions & In-Depth Answers

This document provides 20 architectural and engineering interview questions and precise answers based on the actual codebase implemented for the **Blutec AI Technical Assignment** ([https://puppy.instabizweb.com/](https://puppy.instabizweb.com/)).

---

### Q1: Why did you choose Next.js 14 App Router over Vite or Create React App for this reproduction?
**Answer:** The reference website itself is built on Next.js 14 with App Router and Turbopack. Using Next.js 14 allowed us to achieve 1:1 structural parity:
1. Static Site Generation (SSG) with `generateStaticParams` pre-renders all 42 individual puppy pages at build time, giving sub-100ms TTFB and perfect SEO.
2. Route Handlers (`/media/[...slug]/route.ts`) seamlessly mirror original asset paths without changing markup.
3. Native metadata API (`generateMetadata`) provides automated JSON-LD and OpenGraph tags per puppy.

### Q2: How did you extract and reproduce the exact typography without access to the source code repository?
**Answer:** We inspected computed styles in Chrome DevTools and extracted 10 original variable `.woff2` font files into `public/assets/fonts/`. We identified three font families:
- **`Fraunces` (Display Serif):** Used via `.font-plush` with variable font axes `font-variation-settings: "SOFT" 100, "WONK" 1, "opsz" 144`, font weight 800, letter spacing -0.025em, and line-height 0.92.
- **`Shantell Sans` (Story Accent):** Used via `.font-scrawl` with axes `"INFM" 60, "BNCE" 30` for playful handwritten commentary.
- **`Figtree` (Body Sans):** Primary functional body and navigation font.
All fonts were configured via Next.js `next/font/google` and CSS custom properties (`--font-fraunces`, `--font-shantell`, `--font-figtree`) to eliminate layout shifts.

### Q3: How did you reverse engineer and manage the 46 CSS animations found on the reference website?
**Answer:** We extracted the reference stylesheet from `_next/static/chunks/` and parsed all 46 `@keyframes` into `src/styles/theme-custom.css`. Key animations include:
- `tp-runner`: Synchronized multi-bone SVG mascot animation controlling running front/back legs, tail wag, and body bobbing.
- `tp-twinkle`: Pulsing star animations with staggered animation delays (`animation-delay: 0.40s, 0.80s, etc.`).
- `tp-curtain-lift` & `tp-curtain-cover`: Smooth radial and linear page transition curtains.
- Hardware-accelerated properties (`transform`, `opacity`) were enforced, accompanied by `@media (prefers-reduced-motion: reduce)` fallbacks.

### Q4: How does the puppy catalog filtering system work on `/puppies`?
**Answer:** In `src/app/puppies/PuppiesCatalog.tsx`, we built a zero-layout-shift client filter:
1. 11 filter sticker chips (`Everywhere`, `Imported`, `Korean Teacup`, `Maltipoo`, `Pomeranian`, `Poodle`, `Cavapoo`, `Shih Tzu`, `Boys`, `Girls`, `With video`) listen for click events.
2. The active chip updates its `aria-pressed` state to `"true"`, while resetting others to `"false"`.
3. The component reads each `<li>` puppy card's `aria-label` (which contains breed, gender, age, and origin) and sets `card.style.display = 'none'` or `''` instantly.
4. On mount, it also inspects `window.location.search` (`?origin=imported` or `?breed=maltipoo`) to automatically pre-filter cards based on external links.

### Q5: How did you implement media switching between puppy photos and the vertical video player?
**Answer:** In `src/app/puppies/[slug]/PuppyDetailView.tsx`:
1. Each puppy profile provides a photo carousel and thumbnail selector.
2. We discovered that puppies with video badges use video thumbnail poster hashes matching our downloaded `.mp4` video files (e.g. `b942a5_409c00762732451a9c914fd605f6427bf000.jpg` maps directly to `b942a5_409c00762732451a9c914fd605f6427b.mp4`).
3. Clicking a video thumbnail dynamically swaps the image element with an HTML5 `<video controls autoplay playsinline loop class="size-full object-cover">` player.
4. Clicking an image thumbnail restores the high-resolution photo with counter synchronization (`1 / 2`).

### Q6: How do you serve 260 original assets without breaking Next.js image optimization or throwing 404s?
**Answer:** We established a three-tier asset architecture:
1. **Local Asset Store:** All 260 files reside in `public/assets/` (`images/`, `videos/`, `logos/`, `fonts/`, `svg/`).
2. **Static Symlinks:** `public/media -> public/assets/images` and `public/brand -> public/assets/logos` allow Next.js static file server to deliver assets directly with zero server overhead.
3. **Dynamic Route Handlers:** `src/app/media/[...slug]/route.ts` and `src/app/brand/[...slug]/route.ts` catch any multi-segment nested paths (`/media/[id]/[hash]/[file]`) and resolve the file by filename with permanent cache headers (`max-age=31536000, immutable`).

### Q7: How does the pinned scroll treadmill work on the homepage "Meet the pups" section?
**Answer:** The `.tp-meet` section uses scroll pinning:
1. Outer wrapper `<div data-pin-range="true" style="height: calc(3226px + 100vh);">` creates vertical scroll headroom.
2. The sticky stage (`.tp-meet__stage`) pins inside the viewport while the user scrolls.
3. The treadmill corridor (`.tp-meet__track`) translates horizontally along `--floor-x` to simulate a store hallway of puppy door cards (`.tp-door`) where each door features an arched top and tilted plate.

### Q8: How did you ensure accessibility (a11y) compliance?
**Answer:**
1. Included an offscreen skip link (`<a href="#main" class="sr-only-focusable">Skip to content</a>`) at the top of the DOM.
2. Semantic landmark HTML tags used throughout (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`).
3. Interactive accordions on `/faq` enforce `aria-expanded` and `aria-controls` with `inert` toggling on collapsed panels.
4. Filter chips on `/puppies` use `role="button"` and `aria-pressed`.
5. All images retain descriptive `alt` tags and ARIA labels.

### Q9: How did you prevent Cumulative Layout Shift (CLS) across the site?
**Answer:**
1. All hero and card media containers use CSS aspect-ratio constraints (`aspect-[4/5]`, `aspect-square`, `aspect-[16/9]`).
2. Font definitions in `next/font` include `display: "swap"` and automatic fallback metrics adjustment.
3. Inline SVG dimensions (`viewBox`, `width`, `height`) are explicitly declared.
4. The sticky navigation reserves `--header-h: 4.75rem` padding on `<main id="main">` so header mounting causes 0 layout shift.

### Q10: How did you handle form validation and spam defense on `/contact`?
**Answer:** In `src/app/contact/ContactForm.tsx`:
1. Required validation checks for non-empty `name` and valid UAE phone pattern (`+971 50 123 4567`).
2. A hidden honeypot field (`<input name="website" style="display:none" tabIndex={-1} />`) intercepts bot submissions. If populated, the form silently aborts.
3. On valid submission, the container transitions to `data-phase="sent"` displaying confirmation feedback.

### Q11: What was the purpose of AGENTS.md and how did it influence code quality?
**Answer:** `AGENTS.md` served as our central operating contract. It defined explicit operational boundaries:
- Mandatory adherence to `research/` documentation as the single source of truth.
- Zero tolerance for fabricated content, generic placeholders, or unsolicited redesigns.
- Strict TypeScript enforcement (zero `any`).
- Automated multi-viewport verification before committing milestones.

### Q12: How are the vintage storybook tickets implemented on `/gone-home`?
**Answer:** In `src/app/gone-home/page.tsx` and `src/styles/theme-custom.css`:
- Cards use `.tp-ticket`, styled as vintage storybook event tickets with dashed perforation borders (`border-left: 2px dashed #2a170e30`), circular punch-out notches, and an angled red "GONE HOME" rubber stamp (`.tp-stamp--gone`).
- Each ticket displays the puppy's name, adoption destination, and "TEDDYPUPS HOME ♥ admit one" story copy.

### Q13: How does the polaroid memory wall work on `/happy-families`?
**Answer:** The layout uses a responsive grid with `.tp-polaroid` components:
- Each polaroid has individual CSS custom properties: `--tilt` (e.g., `-1.2deg`, `1.5deg`) for authentic handmade asymmetry and `--tape` for varied washi tape color accents (honey, amber, terracotta).
- Photo aspect ratios and handwriting text classes (`.font-scrawl`) reproduce family scrapbook photo albums.

### Q14: How are accordion animations built on `/faq` without external UI libraries?
**Answer:** Modern CSS grid row transition technique:
```css
.tp-note__answer {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.35s var(--ease-pounce);
}
button[aria-expanded="true"] + .tp-note__answer {
  grid-template-rows: 1fr;
}
.tp-note__flap {
  overflow: hidden;
}
```
This animates dynamic height smoothly from 0 to auto without JavaScript height calculations or layout thrashing.

### Q15: How did you extract the full DOM for all 42 puppy profile pages?
**Answer:** We built a parallelized Playwright script leveraging the system Google Chrome binary. With 6 concurrent worker pages, the script navigated to each puppy URL, awaited the `<main article>` container hydration, and extracted the full outerHTML into `research/all_puppies_markup.json` in under 6 seconds.

### Q16: How do you handle deep route refreshes in Next.js SSG?
**Answer:** Because every puppy profile is registered in `generateStaticParams()`, Next.js exports every route (`/puppies/maltipoo-max-male`, `/puppies/toy-poodle-male-female`, etc.) as a pre-rendered static HTML file. On Vercel or any static host, direct refreshes load the pre-rendered HTML immediately with zero 404s.

### Q17: What is the purpose of the custom 404 page and how is it styled?
**Answer:** Located at `src/app/not-found.tsx`, it renders a storybook "Lost Dog" poster (`.tp-poster`) with simulated masking tape corners, an illustrated animated teddy sniffing the ground, and a "Take me home" CTA leading back to `/`.

### Q18: What is your bundle optimization strategy?
**Answer:**
1. All 52 routes share an 87.4 kB base JavaScript bundle.
2. Individual page chunks range from 155 bytes (static marketing pages) to 58 kB (interactive catalog).
3. Lucide and heavy icons were replaced with extracted native SVGs to avoid bundle bloat.
4. CSS custom utilities and keyframes are extracted into a single consolidated stylesheet.

### Q19: How did you test cross-device visual parity?
**Answer:** We wrote `scripts/verify-clone.js` using Playwright:
- Emulated exact viewport resolutions: Desktop (1440x900), Laptop (1280x800), Tablet (768x1024), Mobile (390x844), Compact (375x812).
- Set `deviceScaleFactor: 2` for Retina display fidelity.
- Validated network response codes (verified 100% 200 OK across >1,200 requests).
- Captured full-page screenshots into `tests/visual/` for pixel-level comparison against reference captures.

### Q20: What are the main limitations or known boundaries of this reproduction?
**Answer:**
1. **Backend Server Actions:** The reference site uses Next.js server actions for form submissions. We implemented client-side validation and simulated submission with WhatsApp consultation redirects.
2. **Restricted Admin Routes:** `/admin` and internal endpoints blocked by robots.txt were not scraped, in strict compliance with ethical scraping and website terms.
