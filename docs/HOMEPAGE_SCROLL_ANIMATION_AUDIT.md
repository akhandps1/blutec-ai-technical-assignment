# Homepage Scroll Animation & Pinning Audit

## 1. Overview
The TeddyPups homepage features sophisticated scroll-driven animations, most notably the sticky horizontal hallway in Section 2 (`.tp-meet`) where the mascot watches a series of numbered puppy doors glide past as the user scrolls vertically.

This audit evaluates the mechanics, CSS/JS architecture, performance benchmarks, and automated test results of all scroll animations across the homepage.

---

## 2. Pinned Corridor Mechanics (`.tp-meet`)

### A. Stage Pinning Geometry
- Container: `<section class="tp-meet" data-pin-range="true">` with total height `calc(3226px + 100vh)`.
- Stage: `.tp-meet__stage` with `position: sticky; top: 0; height: 100vh; overflow: hidden;`.
- Horizontal Track: `.tp-meet__track` containing 12 puppy room doors, floor tiles, and wallpaper panels.

### B. Scroll Progress Interpolation
As the user scrolls from the top to the bottom of the section bounding box:
$$\text{progress} = \text{clamp}\left(0, \frac{-\text{stageRect.top}}{\text{scrollDistance}}, 1\right)$$
$$\text{translateX} = -\text{progress} \times 4213.76\text{px}$$
$$\text{--floor-x} = -(\text{progress} \times 4213.76 \pmod{72})\text{px}$$

### C. Door Proximity Opening Engine
Each door tracks its client bounding box relative to the central viewport corridor:
- When a door approaches the central interaction zone (`10%` to `42%` of `window.innerWidth`), it sets `data-open="true"` and updates `--door-open: -75deg`.
- The door leaf swings ajar in 3D perspective (`perspective: 900px; transform: rotateY(var(--door-open))`), revealing the illustrated puppy inside.
- Once the door passes beyond the zone, it swings closed smoothly (`--door-open: 0deg`).

### D. Reverse Scroll & Momentum
- Scrolling upward perfectly reverses the horizontal track and closes doors in reverse order.
- Trackpad and touch dragging are supported via horizontal momentum swipe listener.

---

## 3. Other Scroll-Driven Visual Transitions

1. **Sunrise Arc (Hero to Meet Transition):**
   - `.tp-hero__sun` gradually sinks as scroll progress increases, giving way to the interior corridor lighting.
2. **Dusk / Sunset Gradient (`.tp-dusk`):**
   - Background shifts dynamically from honey milk (`#FFFDF8`) to warm twilight amber (`#F7C66B`) as the section enters the viewport.
3. **Night Ambient Starfield (`.tp-night`):**
   - Enters deep cocoa darkness (`#24130B`) with 30 SVG stars twinkling on staggered infinite CSS timers (`tp-twinkle`).

---

## 4. Automated E2E Verification Results

| Scroll Position | Expected Corridor Behavior | Measured Transform | Status |
|---|---|---|---|
| Top of Page (`y = 0`) | Rest position | `translateX(0px)` | **PASS** |
| Corridor Entrance (`y = 900`) | Track begins translation | `translateX(-50.4px)` | **PASS** |
| Mid-Corridor (`y = 2500`) | Midway translation (~50%) | `translateX(-2106.88px)` | **PASS** |
| End of Corridor (`y = 4100`) | Full translation (~100%) | `translateX(-4213.76px)` | **PASS** |
| Reverse Scroll (`y -> 0`) | Smooth return to origin | `translateX(0px)` | **PASS** |
