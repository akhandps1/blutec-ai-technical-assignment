# Automated End-to-End (E2E) Test Suite Report

**Target Local Environment:** `http://localhost:3030`  
**Execution Timestamp:** 2026-11-21T13:24:16.527Z  
**Total Tests Executed:** 32  
**Passed:** 32 | **Failed:** 0  
**Success Rate:** **100.0%**

## Test Execution Log

| Test Description | Result | Details |
|---|---|---|
| Route / | **PASS** | HTTP 200 |
| Route /puppies | **PASS** | HTTP 200 |
| Route /gone-home | **PASS** | HTTP 200 |
| Route /happy-families | **PASS** | HTTP 200 |
| Route /how-it-works | **PASS** | HTTP 200 |
| Route /faq | **PASS** | HTTP 200 |
| Route /contact | **PASS** | HTTP 200 |
| Route /_not-found | **PASS** | HTTP 404 |
| Puppy Profile /puppies/maltipoo-max-male | **PASS** | HTTP 200 |
| Puppy Profile /puppies/maltipoo-cavapoo-male | **PASS** | HTTP 200 |
| Puppy Profile /puppies/maltipoo-female-2 | **PASS** | HTTP 200 |
| Puppy Profile /puppies/copper-male | **PASS** | HTTP 200 |
| Puppy Profile /puppies/pomeranian-female | **PASS** | HTTP 200 |
| Happy Families: 64 Polaroid Buttons Rendered | **PASS** | Found: 64 |
| Happy Families: Lightbox Opens on Click | **PASS** | Counter: 1 / 64 |
| Happy Families: Lightbox Next Button Navigation | **PASS** | Counter: 2 / 64 |
| Happy Families: Keyboard ArrowLeft Navigation | **PASS** | Counter: 1 / 64 |
| Happy Families: Lightbox Closes Cleanly | **PASS** |  |
| PuppyRunner: Unwanted Navbar Loop Removed | **PASS** |  |
| Meet Pups: Initial Corridor Position at Start | **PASS** |  |
| Meet Pups: Horizontal Translation at Mid-Scroll (y=2500) | **PASS** | Transform: translateX(-2106.88px) |
| Meet Pups: Horizontal Translation at End-Scroll (y=4100) | **PASS** | Transform: translateX(-4213.76px) |
| Meet Pups: Reverse Scroll Resets Horizontal Position | **PASS** |  |
| FAQ: Accordion Toggle Interaction | **PASS** | Expanded: true |
| Puppies: Filter Chip Interaction | **PASS** | Aria-pressed: true |
| Responsiveness: Zero Horizontal Overflow on desktop (1440x900) | **PASS** |  |
| Responsiveness: Zero Horizontal Overflow on laptop (1280x800) | **PASS** |  |
| Responsiveness: Zero Horizontal Overflow on tablet (768x1024) | **PASS** |  |
| Responsiveness: Zero Horizontal Overflow on mobile (390x844) | **PASS** |  |
| Responsiveness: Zero Horizontal Overflow on small_mobile (375x812) | **PASS** |  |
| Mobile: Menu Drawer Opens on Burger Click | **PASS** |  |
| Mobile: Sticky Action Bar Active on Viewport < 768px | **PASS** |  |


## Route-Specific Deep Audit & Interactive Verification Results

**Execution Timestamp:** 2026-11-21T14:00:30.000Z  
**Total Route & Interactive Checks:** 26  
**Passed:** 26 | **Failed:** 0  
**Success Rate:** **100.0%**

### 1. FAQ Page (`/faq`)
- **Initial Notes State:** 9 notes rendered matching the original reference word-for-word, counter displays `"9 notes on the board"`.
- **Accordion Unfolding:** Clicking a question note toggles `data-unfolded="true"`, `aria-expanded="true"`, and removes `inert` on the answer. Clicking again folds it cleanly.
- **Search Filtering:** Live search input filters notes in real-time. Matches are highlighted with `<mark>` tags via regular expression.
- **Auto-Unfold on Answer Match:** When search query matches answer text, the note automatically unfolds into full view.
- **Empty State (`.tp-note--empty`):** Searching for non-existent terms updates counter to `"0 notes found"` and displays an empty pin note with `"No note about “...” yet."` and direct WhatsApp support link.
- **Scroll Reveal Drop-in:** Notes dynamically arm and trigger `data-revealed="true"` on viewport entry with staggered drop-in bounce.

### 2. Puppy Detail Page — Maltipoo Max (`/puppies/maltipoo-max-male`)
- **Visual Assets & Loading:** All images load cleanly (`naturalWidth > 0`, 0 broken images).
- **Gallery & Carousel:** Thumbnails switch seamlessly, counter displays `${current} / ${total}`, active thumbnail tilts (`-rotate-3`) with `--color-toffee-deep` border.
- **Full-Screen Lightbox Dialog:** Clicking main photo opens full-screen `<dialog>` modal with header (`Max, photo X of Y`), stage showing high-res media, previous/next controls, keyboard arrow navigation, and escape/backdrop close.
- **Interactive Enquiry Form:** Client-side form validation ensures Name ($\ge 2$ characters) and Phone ($\ge 5$ characters). Submitting valid data replaces the form with the animated `.tp-sent` confirmation envelope card with WhatsApp redirect.

### 3. Puppies Catalog (`/puppies`)
- **Filter Chips:** Full support for `Where` (*Everywhere, In Dubai, Imported, Korean Teacup*), `Breed` (*Maltipoo, Pomeranian, Poodle, Cavapoo, Shih Tzu*), and `Boy or Girl` (*Boys, Girls*).
- **URL Synchronization:** Filter state syncs bidirectionally with URL search parameters (`?origin=imported`, `?breed=maltipoo`, etc.) via `window.history.replaceState`.
- **Match Counter:** Displays `"X puppies match"` when filters are active, and `"15 puppies looking for a home"` at default.
- **Clear Filters:** A dedicated "Clear filters" action appears dynamically when any filter is selected, instantly resetting all chips and restoring the full catalogue.
- **Empty Filter State:** Selecting mutually exclusive combinations renders the `.tp-sketchpad` empty state card featuring Teddy tilting his head, explanatory text, and a "Show all puppies" reset button.

### 4. Route Curtain Loader (`SiteLoader.tsx`)
- **Page Navigation Interception:** Intercepts internal link clicks, transitions curtain through `covering` (300ms) $\to$ `covered` $\to$ router navigation $\to$ `lifting` (460ms) $\to$ `idle`.
- **Accessibility & Motion:** Automatically bypasses animation when `prefers-reduced-motion: reduce` is set.
