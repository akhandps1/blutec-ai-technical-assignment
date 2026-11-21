# WEBSITE-WIDE BUG FIX LOG
**Target Reference:** `https://puppy.instabizweb.com/`  
**Local Implementation:** `http://localhost:3030/`  
**Scope:** Complete 7-Route Audit & Bug Resolution  
**Status:** All Issues Resolved & Verified  
**Date:** 2026-11-21  

---

## 1. Bug Resolution Matrix

| Bug ID | Route / Scope | Category | Discrepancy Description | Root Cause | Code Fix Applied | Verification Status |
|---|---|---|---|---|---|---|
| **BUG-01** | Global | Assets / Cursor | Default browser arrow cursor was shown on the website instead of the custom puppy paw cursor. | Missing cursor SVG assets and missing custom cursor bindings in stylesheet. | Downloaded `/cursor/paw.svg` and `/cursor/paw-press.svg` with native hotspot `(9, 6)`; bound to `html, body` and interactive elements in `globals.css`. | **VERIFIED (HTTP 200 & DOM Checked)** |
| **BUG-02** | Homepage (`/`) | Mascot / Kinematics | Mascot did not follow mouse cursor, flip facing direction, or respond to hover/petting. | Mascot was rendered as static inline SVG without kinematic bone transform manager. | Reconstructed `PupBuddyManager.tsx` with decompiled 9-landmark kinematics, exponential spring smoothing, and gaze vector math. | **VERIFIED (Playwright Test PASS)** |
| **BUG-03** | Homepage (`/`) | Mascot / Interaction | Clicking mascot did not show speech bubbles or play trick routines. | Pointer events were blocked on `.pup-buddy` in CSS; click queue had deferred execution. | Added `.pup-buddy[data-live] { pointer-events: auto; }` and instant queue flushing in `handleClick()`. | **VERIFIED (Playwright Test PASS)** |
| **BUG-04** | Homepage (`/`) | Scroll Animation | Pinned corridor did not translate horizontally or open doors smoothly on downward scroll. | CSS track translation and 3D door swing angles were unlinked from vertical scroll. | Bound track transform to `translateX(-4213.76px)`, floor parallax to `--floor-x`, and door swing to `rotateY(-75deg)` in `MeetPupsSection.tsx`. | **VERIFIED (Playwright Test PASS)** |
| **BUG-05** | Homepage (`/`) | Scroll Animation | Reverse upward scroll failed to cleanly restore corridor and doors back to initial origin. | Scroll delta calculations lacked symmetrical reverse tracking. | Implemented symmetrical reverse delta mapping in `MeetPupsSection.tsx`, restoring track to `translateX(0px)` at `y = 0px`. | **VERIFIED (Playwright Test PASS)** |
| **BUG-06** | Global Header | Responsiveness | Mobile screens under 430px experienced horizontal overflow (`scrollWidth: 621px > 390px`). | Desktop navigation links (`.tp-header__nav`) remained rendered inline on small screens. | Added `hidden md:block` to `.tp-header__nav` and added `overflow-x: clip` to `html, body`. | **VERIFIED (0px Overflow across 10 Viewports)** |
| **BUG-07** | Happy Families | Gallery / Lightbox | Lightbox keyboard navigation (ArrowLeft / ArrowRight) was inactive. | Event listener did not bind keyboard events to modal state. | Added `keydown` listener in `HappyFamiliesView.tsx` supporting ArrowLeft, ArrowRight, and Escape key dismissal. | **VERIFIED (E2E Test PASS)** |
| **BUG-08** | Available Puppies | Filters | Filter sticker chips did not filter cards client-side. | Missing click event handlers on chip buttons. | Added client-side filter logic in `PuppiesCatalog.tsx` updating `aria-pressed` and toggling card visibility. | **VERIFIED (E2E Test PASS)** |
| **BUG-09** | Puppy Detail | Media Carousel | Video thumbnails in puppy detail view did not switch main media player to HTML5 video. | Thumbnail click handler assumed all items were raster images. | Updated `PuppyDetailView.tsx` to detect video thumbnails and mount `<video controls autoplay>` dynamically. | **VERIFIED (E2E Test PASS)** |
| **BUG-10** | Contact | Form Validation | Empty form submissions triggered silent failure without user feedback. | Form submission lacked client-side validation for required fields. | Implemented name and phone number validation alerts and anti-spam honeypot detection in `ContactForm.tsx`. | **VERIFIED (E2E Test PASS)** |

---

## 2. Regression Testing Sign-Off

Following the resolution of BUG-01 through BUG-10:
- Full E2E test suite was re-executed: **32/32 tests passed**.
- Full Playwright E2E suite was re-executed: **13/13 tests passed**.
- Visual regression suite was re-executed: **11/11 tests passed**.
- TypeScript typecheck was re-executed: **0 errors**.
- Next.js production build succeeded with **52/52 static pages**.
- **0 Open Defects Remaining.**
