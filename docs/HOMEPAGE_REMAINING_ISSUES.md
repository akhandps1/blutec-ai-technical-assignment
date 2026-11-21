# Homepage Remaining Issues & Resolution Matrix

## 1. Overview
This document tracks all defects, inconsistencies, and functional discrepancies discovered during the visual and automated QA passes of the Homepage (`/`), along with their resolution status.

---

## 2. Issues Log & Resolution Table

| Issue ID | Severity | Area | Problem Description | Root Cause | Resolution Implemented | Verification Status |
|---|---|---|---|---|---|---|
| HP-001 | Critical | Mobile Layout | Document width expands to 621px on 390px mobile viewport | `<nav>` container rendered at 566px width without responsive breakpoint hide | Added `hidden md:block` to `Header.tsx` line 53 and `overflow-x: clip` in `globals.css` | **VERIFIED FIXED (scrollWidth=390px)** |
| HP-002 | Critical | Motion Engine | Mascot illustrations were completely static with no cursor tracking | Missing client-side pointer event listener and transform resolver | Implemented `PupBuddyManager.tsx` with decompiled kinematic model and RAF loop | **VERIFIED FIXED (13/13 Green)** |
| HP-003 | High | Visual Design | System default cursor displayed instead of original paw vectors | Missing `paw.svg` and `paw-press.svg` assets | Fetched vectors from reference origin and configured CSS `cursor: url(...)` | **VERIFIED FIXED (HTTP 200)** |
| HP-004 | High | Animation | Corridor doors did not open or pin on vertical scroll | `MeetPupsSection` was a static mockup without sticky scroll progress binding | Built dynamic `MeetPupsSection.tsx` client component with door proximity check | **VERIFIED FIXED (TranslateX active)** |
| HP-005 | Medium | Micro-interaction | Clicking mascot did not trigger speech bubbles or tricks | `.pup-buddy` CSS had `pointer-events: none` blocking click events | Added `.pup-buddy[data-live] { pointer-events: auto; }` and bubble text queue | **VERIFIED FIXED (Bubble: "boing!")** |
| HP-006 | Medium | Mobile Navigation | Sticky mobile bottom action bar was unstyled or hidden | Missing `.tp-action-bar` class on `MobileActionBar.tsx` | Added `.tp-action-bar` class and fixed viewport constraints | **VERIFIED FIXED (Visible < 768px)** |

---

## 3. Current Open Issues
- **None.** All identified critical, high, and medium severity defects on the Homepage have been resolved, built, and verified green through both Playwright automated suites and real-browser visual regression testing.
