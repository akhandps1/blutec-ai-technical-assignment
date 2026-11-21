# Homepage Bug Fix Log & Root Cause Analysis

## 1. Issue Summary & Status
All discovered bugs and visual discrepancies on the TeddyPups homepage have been diagnosed, repaired, and validated through automated end-to-end tests.

---

## 2. Bug Fix Registry

### Bug 001: Unwanted Running Mascot Loop under Header
- **Classification:** Severity: HIGH | Component: `PuppyRunner` / `layout.tsx` / `globals.css`
- **Root Cause:**
  - `<PuppyRunner />` was placed in `src/app/layout.tsx` above `</body>`.
  - In `src/styles/globals.css`, `.tp-runner` was defined with an infinite CSS keyframe animation:
    `animation: tp-runner-x 12s linear infinite;` from `translateX(-160px)` to `translateX(calc(100vw + 160px))`.
  - This caused an animated mascot to continuously run horizontally across the top of the page under the header on an infinite loop.
  - On the original reference website, the mascot runner is NOT an infinite global loop; it only existed inside page transition curtains during route changes.
- **Resolution:**
  - Removed `<PuppyRunner />` from `src/app/layout.tsx`.
  - Set `.tp-runner { display: none !important; }` in `src/styles/globals.css` to disable any global running loop.
  - Preserved the authentic horizontal corridor walking mascot in `MeetPupsSection.tsx` and scene mascot instances in `PupBuddyManager.tsx`.
- **Validation:** Automated test in `verify_puppy_and_skip_fixes.js` confirmed `.tp-runner` is not visible in the viewport and zero unwanted runner loops exist.

### Bug 002: Visible "Skip to Content" Button beside Logo
- **Classification:** Severity: MEDIUM | Component: `layout.tsx` / `globals.css`
- **Root Cause:**
  - `src/app/layout.tsx` rendered `<a href="#main" className="sr-only-focusable fixed left-4 top-4 z-[100]...">Skip to content</a>`.
  - The CSS rule `.sr-only-focusable:not(:focus)` was missing from the stylesheet.
  - As a result, the `fixed left-4 top-4 z-[100]` positioning was active at all times, making the button visibly obstruct the header and logo during normal browsing.
- **Resolution:**
  - Added the exact reference CSS rule to `src/styles/globals.css`:
    ```css
    .sr-only-focusable:not(:focus) {
      clip-path: inset(50%);
      width: 1px;
      height: 1px;
      position: absolute;
      overflow: hidden;
      white-space: nowrap;
    }
    ```
- **Validation:** Automated test confirmed unfocused state has `clipPath: inset(50%)` (0 visible pixels), while keyboard Tab focus correctly expands the element to `152px x 48px` with visible focus ring.

### Bug 003: Mobile Viewport Horizontal Overflow (390px & 375px)
- **Classification:** Severity: HIGH | Component: `theme-custom.css` / Responsive Breakpoints
- **Root Cause:**
  - In `theme-custom.css`, desktop layout rules for `.tp-book` (`grid-template-columns: 1fr 1.3fr`), `.tp-ways` (`grid-template-columns: minmax(0, 1fr) ...`), and `.tp-dusk__sky` had been stripped of their wrapping `@media (min-width: 900px)` and `@media (min-width: 1024px)` queries.
  - This forced a 2-column desktop book layout onto 390px mobile viewports, creating a horizontal overflow of `scrollWidth: 621px`.
- **Resolution:**
  - Extracted the complete, authentic stylesheet directly from the reference site with all 73 `@media` query blocks intact.
  - Unwrapped the Tailwind v4 `@layer` directives into standard clean CSS compatible with the Next.js build pipeline.
- **Validation:** Automated test verified `body.scrollWidth === 390px` at 390x844 and `body.scrollWidth === 375px` at 375x812, achieving 0px horizontal overflow across all devices.

### Bug 004: Footer Basket Mascot Layering
- **Classification:** Severity: LOW | Component: `Footer.tsx`
- **Root Cause:** `Footer.tsx` previously used simplified placeholder markup that did not include the authentic multi-layer SVG woven basket with front/back rim lines and `data-pup-stop` attributes.
- **Resolution:** Updated `Footer.tsx` to render the authentic reference footer HTML containing full SVG basket weave, rim lines, twinkling stars, and `PupBuddyManager` integration.
- **Validation:** Visual screenshot comparison confirmed exact match with reference footer.
