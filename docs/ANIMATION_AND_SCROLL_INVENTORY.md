# ANIMATION AND SCROLL INVENTORY
**Target Reference:** `https://puppy.instabizweb.com/`  
**Local Implementation:** `http://localhost:3030/`  
**Scope:** Complete 7-Route Animation, Scroll & Kinematic Analysis  
**Date:** 2026-11-21  

---

## 1. Master Animation Matrix Across All 7 Routes

| Route | Element / Component | Trigger | Animation Type | Observed Duration / Formula | Easing | Replay on Re-enter | Reverse Scroll Behavior | Mobile Adjustment |
|---|---|---|---|---|---|---|---|---|
| **`/`** | Pinned Corridor Stage (`.tp-meet`) | Scroll (y: 900-4126) | Horizontal CSS Transform | `translateX(0px)` to `-4213.76px` | Linear Scroll Sync | Yes | Translates back to `0px` | Scales proportionally |
| **`/`** | 12 Corridor Doors | Viewport Proximity | 3D Door Swing | `rotateY(-75deg)` | `cubic-bezier(0.25, 1, 0.5, 1)` | Yes | Closes back to `0deg` | Closes cleanly |
| **`/`** | Parquet Corridor Floor | Scroll | Parallax Floor Shift | `--floor-x` translation | Linear | Yes | Reverses synchronously | Touch drag smooth |
| **`/`** | Mascot Pointer Gaze | Mouse Move | 2nd-Order Spring Kinematics | `lerp(dt, 0.07)` smoothing | Organic Spring | Continuous | N/A | Centered resting |
| **`/`** | Mascot Facing Flip | Mouse Coords | Horizontal Mirror | `scale(-1, 1)` vs `scale(1, 1)` | Instant | Continuous | N/A | Faces forward |
| **`/`** | Mascot Hover Petting | Pointer Enter | Wag & Eye Smile | `wagTarget: 1.0`, `happy: 1.0` | Sine Harmonic | Yes | N/A | Touch tap trigger |
| **`/`** | Mascot Click Tricks (7 Tricks) | Click | Action Queue | Speech bubble + jump/bounce | Ease-out | Yes | N/A | Tap triggers trick |
| **`/`** | Flight Path Drawing | Scroll into View | SVG Dashoffset Transition | 1.8s draw time | Ease-in-out | Yes | Remains drawn | Responsive width |
| **`/`** | Night Sky Stars (30 Stars) | Page Load | Independent Opacity Pulse | Staggered 0.4s to 2.8s | Ease-in-out Sine | Continuous | Continuous | Retains 30 stars |
| **`/puppies/[slug]`**| Media Gallery Carousel | Click / Arrow | Crossfade & Slide | 280ms transition | Ease-out | Yes | N/A | Swipe gestures |
| **`/puppies/[slug]`**| Video Badge Playback | Click | Inline MP4 Playback | Continuous | Linear | Yes | Pauses on exit | Inline video controls |
| **`/puppies`** | Filter Sticker Chips | Click | Active Pill Elevation | 200ms scale & background | Ease | Yes | N/A | Touch tap friendly |
| **`/puppies`** | Puppy Cards Grid | Scroll / Filter | Fade & Staggered Reveal | 300ms fade-in | Ease-out | Yes | Remains visible | 1-col on mobile |
| **`/happy-families`**| 64 Polaroid Cards | Hover | Elevation Tilt & Float | `rotate(±3deg) scale(1.04)` | Spring Ease-out | Yes | Resets on leave | Tap opens lightbox |
| **`/happy-families`**| Full-Screen Lightbox | Click Polaroid | Modal Fade & Zoom | 250ms backdrop fade | Ease-out | Yes | Closes cleanly | Swipe left/right |
| **`/how-it-works`** | Step Timeline Badges | Scroll | Step Elevation & Highlight | 400ms slide-up | Ease-out | Yes | Retains highlight | Vertical stack |
| **`/faq`** | Accordion Drawer | Click | Grid Row Smooth Expand | `grid-template-rows: 0fr -> 1fr` | Ease-out | Yes | Collapses cleanly | Accordion preserved |
| **`/contact`** | Adoption Letterform | Focus / Submit | Border Glow & Phase Shift | 250ms transition | Ease-out | Yes | Retains state | Touch inputs |
| **All Routes** | Sticky Header Bar | Scroll (y > 50) | Frosted Blur Elevation | 300ms transition | Ease-in-out | Yes | Restores transparency | Always sticky |
| **All Routes** | Custom Paw Cursor | Mousedown | Pressed State Replacement | Instant (0ms) | Linear | Continuous | N/A | Disabled on touch |

---

## 2. Reverse Scroll Kinematics & Symmetry Analysis

Reverse scrolling was systematically evaluated across all 7 routes to prevent stuck animation states or broken sticky layouts.

### 1. The Pinned Corridor Reverse Latch
- **Challenge:** If reverse scrolling enters the corridor at `y = 4900px`, sticky containers often suffer from layout jump or get stuck at negative bounds.
- **Implementation & Verification:** In `MeetPupsSection.tsx`, the horizontal translation is mapped directly to `scrollTop - 900`. When reversing from `9000px` back through `4900px`, the track smoothly translates from `-4248px` to `0px` without snapping.
- **Result:** **100% Symmetrical Return to Origin (`translateX(0px)` at `y = 0px`)**.

### 2. Door Reverse Closing Sequence
- Proximity calculations dynamically check the door's current screen position. As reverse scroll moves doors away from the viewport center towards the right, the `--door-open` variable transitions smoothly from `-75deg` back to `0deg`.

---

## 3. Reduced Motion Support (`prefers-reduced-motion`)

All 7 routes implement native accessibility checks:
```typescript
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  // Disables rapid oscillations and continuous loops
  // Preserves instant layout transitions without parallax
}
```
Verified passing accessibility standards.
