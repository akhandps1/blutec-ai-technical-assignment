# Mouse Interaction & Pointer Tracking Reference Audit

## 1. Overview
A core hallmark of the TeddyPups reference experience (`https://puppy.instabizweb.com/`) is its lively, physics-based mascot motion engine. Teddy the mascot actively tracks the user's cursor across every section, reacts to hover interactions, and performs whimsical tricks when clicked.

This document details the reverse-engineered kinematics, mathematical formulation, event handling, and test-verified reproduction in our codebase.

---

## 2. Reverse-Engineered Kinematic Model

### A. Anatomical Anchor Points (Normalized to 300 × 240 SVG ViewBox)
- Body Center: `(196, 206)`
- Head Center: `(212, 100)`
- Front Near Leg Shoulder: `(186, 194)`
- Front Far Leg Shoulder: `(168, 192)`
- Back Near Leg Hip: `(110, 194)`
- Back Far Leg Hip: `(94, 192)`
- Tail Base: `(84, 150)`
- Left Ear Hinge: `(174, 82)`
- Right Ear Hinge: `(250, 82)`

### B. Pointer Tracking & Gaze Target Math
On `pointermove`, the global pointer coordinates `(mx, my)` are captured. In `lookAt(pointer)`, the vector from the mascot's eye center `(cx, cy)` to `(mx, my)` is computed:

$$\Delta x = mx - cx$$
$$\Delta y = my - cy$$
$$\text{dist} = \sqrt{\Delta x^2 + \Delta y^2}$$
$$\text{norm} = \min\left(1, \frac{\text{dist}}{160}\right)$$
$$\text{gazeX} = \frac{\Delta x}{\text{dist}} \cdot \text{norm} \cdot \text{facingTarget}$$
$$\text{gazeY} = \frac{\Delta y}{\text{dist}} \cdot \text{norm}$$

In `tick(dt, now)`, exponential spring damping smooths the gaze and head tilt:
```typescript
m.gazeX += (this.gazeTarget.x - m.gazeX) * lerp(dt, 0.07);
m.gazeY += (this.gazeTarget.y - m.gazeY) * lerp(dt, 0.07);
this.tilt += (this.tiltTarget + 3 * m.gazeX - this.tilt) * lerp(dt, 0.18);
```

### C. Facing Direction Flipping
When the cursor moves past the horizontal center boundary of the mascot:
- `if (mx < cx - 15)`: `facingTarget = -1`, `data-facing="left"` -> mirrors root group `scale(-1, 1)`
- `if (mx > cx + 15)`: `facingTarget = 1`, `data-facing="right"` -> normal root group `scale(1, 1)`

### D. Hover Petting Mode (`pointerenter` / `pointerleave`)
- On `pointerenter`: `petting(true)` sets `petTarget = 1` and `wagTarget = 1.0`. The tail accelerates to high frequency, and eyes enter a contented squinch (`happy: 1`).
- On `pointerleave`: `petting(false)` restores `petTarget = 0` and calms tail wagging to `wagTarget = 0.6`.

### E. Click Interaction & Trick Queue
When the mascot is clicked, a random trick is selected from the repertoire, accompanied by a cartoon speech bubble (`.pup-bubble`) and floating heart particles:

1. **"woof"**: Double bark sequence, ears jolt upward, bubble displays `"woof!"` then `"woof woof!"`.
2. **"beg"**: Shifts to begging pose (`pose: "beg"`), wagging tail vigorously, bubble displays `"treat, please?"`.
3. **"bow"**: Shifts to playful play-bow (`pose: "bow"`), soft hop, bubble displays `"play with me!"`.
4. **"hop"**: Performs springy double hop (`bounceV = -230`), bubble displays `"boing!"`.
5. **"love"**: Emits 5 floating red heart particles (`♥`), bubble displays `"I like you!"`.
6. **"tilt"**: Inquisitive head cock (`cock(-14deg)` then `12deg`), bubble displays `"hm?"`.
7. **"sneeze"**: Rapid head shake and body jolt, bubble displays `"achoo!"`.
8. **"zoomies"** (Activated on 4+ rapid clicks): Runs back and forth frantically across container (`dash(70)` -> `dash(-70)`), bubble displays `"zoomies!"`.

---

## 3. Custom Paw Cursors Implementation

Two authentic SVG paw cursors were downloaded from the reference origin:
- Default pointer: `/cursor/paw.svg` (`width: 32`, `height: 32`, hotspot: `9 6`)
- Pressed / interactive pointer: `/cursor/paw-press.svg` (`width: 32`, `height: 32`, hotspot: `9 6`)

Applied in `src/styles/globals.css`:
```css
html, body {
  cursor: url("/cursor/paw.svg") 9 6, auto;
}

a, button, [role="button"], input[type="submit"], .tp-door, .tp-polaroid, .pup-buddy {
  cursor: url("/cursor/paw-press.svg") 9 6, pointer;
}
```

---

## 4. Playwright Test Verification

| Test Assertion | Observed Result | Status |
|---|---|---|
| `body` computed cursor | `url("http://localhost:3030/cursor/paw.svg") 9 6, auto` | **PASS** |
| `button.btn` computed cursor | `url("http://localhost:3030/cursor/paw-press.svg") 9 6, pointer` | **PASS** |
| Move pointer left (`x=100`) | Mascot sets `data-facing="left"` | **PASS** |
| Move pointer right (`x=1200`) | Mascot sets `data-facing="right"` | **PASS** |
| Hover over mascot (`pointerenter`) | Rapid tail wag (`wag: 1.0`), ear bounce | **PASS** |
| Click mascot | Speech bubble appears with `"boing!"` / `"woof!"` | **PASS** |
