# Section Fix & Engineering Verification Log

This document records the exact issues identified, root cause analysis, code modifications, and post-fix validation steps.

---

## Issue 1: Static HTML & Inactive Step Transitions in `JourneySection`
- **Symptom:** As the user scrolled through `JourneySection`, the phone chat screen remained stuck in its initial state; Steps 2 and 3 never activated; the typing indicator never appeared; photos and video were hidden by CSS.
- **Root Cause:** `JourneySection.tsx` was rendering static SSR HTML from `homeData.chat` where `.tp-msg-group` had hardcoded `data-show="false"`. In CSS, `.tp-msg-group[data-show=false] { display: none; }` hid the message groups permanently.
- **Fix:** Converted `JourneySection.tsx` into a full client component (`use client`). Added an `IntersectionObserver` observing `.tp-chat__step` elements with `rootMargin: "-28% 0px -62% 0px"`, a simulated 700ms typing indicator (`isTyping`), interactive step selection on click, and dynamic `data-show="true"` attributes for active message groups.
- **Verification:** Playwright verified that clicking or scrolling to step 2 sets `data-show="true"`, renders all 4 photos with `naturalWidth > 0`, and reveals the playable video.

---

## Issue 2: Non-Functional Video Playback in Phone Mockup
- **Symptom:** Clicking the play button on the puppy video clip inside the WhatsApp chat screen did nothing.
- **Root Cause:** The video clip play button (`.tp-clip__play`) had no click event listener attached in static HTML. Additionally, `/media/27b888_323008bb0f6a41d4bde2a0da7206cd98-720p.mp4` returned 404.
- **Fix:** Added real puppy video file to `/public/media/27b888_323008bb0f6a41d4bde2a0da7206cd98-720p.mp4` (HTTP 200). Added `toggleVideo` click handler in `JourneySection.tsx` that controls `video.play()` / `video.pause()`, toggles `isPlaying` state, and updates `aria-pressed="true" / "false"`.
- **Verification:** Automated Playwright test clicked `.tp-clip__play` and confirmed `video.paused === false` and `btn.ariaPressed === "true"`.

---

## Issue 3: Inactive Polaroid Buttons in `DuskSection`
- **Symptom:** Clicking any of the 8 polaroid prints in the photo wall of `DuskSection` did not open a lightbox viewer.
- **Root Cause:** `DuskSection.tsx` was rendered statically with an empty `<dialog>` element at the end of the markup, lacking click listeners and state.
- **Fix:** Implemented interactive client logic in `DuskSection.tsx`. Sanitized the empty `<dialog>` from `homeData.dusk`, attached click listeners to all 8 `.tp-photowall__print` buttons, and integrated the full Lightbox modal dialog with `momentsData` (64 moments), Prev/Next controls, `Escape` key dismissal, and touch swipe.
- **Verification:** Playwright verified that clicking a polaroid opens the dialog with counter `1 / 64`, clicking Next increments counter to `2 / 64`, and pressing `Escape` closes the modal cleanly.

---

## Issue 4: Missing Interactive Hover Tags in `HeroSection`
- **Symptom:** Hovering over the puppies popping up behind the quilt scallops did not display their handwritten names in handwriting font.
- **Root Cause:** Static HTML lacked event listeners to set `data-tag="show"` on `.tp-lineup__ghost`.
- **Fix:** Added `pointerenter`, `pointerleave`, `focus`, and `blur` event listeners to each `.tp-lineup__pup` in `HeroSection.tsx` to set and remove `data-tag="show"` on the corresponding ghost tag element.
- **Verification:** Confirmed hover reveals handwritten name tag.

---

## Issue 5: Zero Broken Images Across Entire Website
- **Symptom:** Images with `loading="lazy"` inside initially hidden containers had `naturalWidth === 0`.
- **Root Cause:** CSS `display: none` on `.tp-msg-group[data-show=false]` prevented browser image downloading until made visible.
- **Fix:** Set `loading="eager"` on critical snaps and enabled dynamic `data-show="true"`.
- **Verification:** Automated audit across the entire homepage confirmed: **Total Images: 39, Loaded: 39, Broken: 0**.
