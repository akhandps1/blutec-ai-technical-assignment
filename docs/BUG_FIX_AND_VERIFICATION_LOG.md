# Bug Fix & Verification Log

## Summary of All Resolved Issues

### Issue 1: Unwanted Continuous Runner Under Navbar
- **Status:** **RESOLVED**
- **Root Cause:** Extraneous PuppyRunner in src/app/layout.tsx and active CSS animation tp-runner-x.
- **Action Taken:** Removed component from layout; neutralized animation in src/styles/globals.css.
- **Verification:** E2E test passed; zero runner elements under navbar.

### Issue 2: Skip to Content Button Visually Obtrusive
- **Status:** **RESOLVED**
- **Root Cause:** Standard absolute button without screen-reader-only focus clip.
- **Action Taken:** Added .sr-only-focusable:not(:focus) with clip-path: inset(50%).
- **Verification:** Hidden in visual audits, revealed on keyboard Tab navigation.

### Issue 3: Missing Main Puppy Character Scroll Journey
- **Status:** **RESOLVED**
- **Root Cause:** Main character journey component (PupJourney) was placeholder only.
- **Action Taken:** Reconstructed src/components/animations/PupJourney.tsx with Bézier math, quintic smootherstep, paw print emission, waypoint docking, and interactive click tricks.
- **Verification:** Fully automated browser verification confirmed character travel from Hero to Footer wicker basket and bidirectional reverse scrolling.

### Issue 4: Tailwind v4 @layer Collision in Theme Styles
- **Status:** **RESOLVED**
- **Root Cause:** PostCSS Tailwind v4 complained about unbundled @layer base declarations.
- **Action Taken:** Unwrapped @layer blocks in src/styles/theme-custom.css into pure CSS rules while strictly preserving all 73 @media query breakpoints.
- **Verification:** Next.js npm run build compiles with zero warnings or errors.

### Issue 5: Mobile Viewport Horizontal Spillage
- **Status:** **RESOLVED**
- **Root Cause:** Passport book column styles lacked min-width: 900px breakpoint.
- **Action Taken:** Restored authentic breakpoint in src/styles/theme-custom.css.
- **Verification:** Playwright verified scrollWidth === clientWidth on 390px and 375px screens (0px overflow).
