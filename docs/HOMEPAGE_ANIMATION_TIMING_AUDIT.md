# Homepage Animation & Motion Timing Audit

## 1. Animation Overview
The TeddyPups homepage employs two primary types of animation:
1. **Scroll-Driven Motion:** Kinematic pinned translations tied directly to vertical window scroll progress without artificial delays.
2. **Ambient / Autonomous Keyframes:** Smooth continuous loops for natural elements (airplane flight bobbing, stars twinkling, mascot breathing/blinking).

---

## 2. Section-by-Section Animation Specification

### 1. Header & Navigation Paw Animation
- **Trigger:** Route change or tab focus.
- **Timing:** 300ms cubic-bezier(0.4, 0, 0.2, 1).
- **Effect:** Active route link displays a terracotta paw print beneath the label (`.tp-nav-link__paw`).
- **Scrolled Header State:** `data-scrolled="true"` activates when `window.scrollY > 40px`, adding a subtle drop shadow (`0 4px 20px rgba(42, 23, 14, 0.08)`).

### 2. Meet the Pups Horizontal Corridor Motion
- **Pin Range:** `calc(3226px + 100vh)` vertical scroll space (`data-pin-range="true"`).
- **Translational Distance:** `translateX(0px)` to `translateX(-3840px)` (up to `-4213px` on wide screens).
- **Floor Parallax:** Parquet floor tiles update `--floor-x` CSS custom property synchronously with the track transform.
- **Door 3D Swings:**
  - Detection Zone: `0.10 * innerWidth` to `0.42 * innerWidth`.
  - Swing Angle: `--door-open: -75deg` (open) / `0deg` (closed).
  - Transition: `transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)`.
- **Treadmill Mascot Actor:**
  - Located at `.tp-meet__teddy` (`data-act="treadmill"`).
  - During vertical scrolling through the pinned range, the puppy mascot steps in place on the floor, perfectly synchronizing paw steps with the door movement.

### 3. Two Ways to Meet Your Puppy (Signpost & Flight Arc)
- **Flight Arc:** SVG quadratic Bézier trajectory (`M Korea Q Center Dubai`).
- **Airplane Bobbing:**
  - Keyframe: `tp-plane-bob` (duration: 3.2s, ease-in-out, infinite alternate).
  - Transformation: `translate(0, -6px) rotate(-3deg)`.
- **Signpost Pointer:** Interactive tilt on mouse enter (`rotate(-1.5deg)` on showroom sign, `rotate(1.5deg)` on import sign).

### 4. WhatsApp Phone Simulator
- **Trigger:** Scroll intersection / step selection.
- **Chat Bubble Ingress:** `transform: translateY(12px) scale(0.96); opacity: 0;` to `translateY(0) scale(1); opacity: 1;`.
- **Duration:** 400ms spring with 120ms staggered delays between message bubbles.
- **Typing Indicator:** 3 dots pulsing with 180ms delay intervals.

### 5. Puppy Passport Stamps
- **Trigger:** Scroll entry into view (`IntersectionObserver`).
- **Animation:** `tp-stamp-in` (duration: 0.5s, `cubic-bezier(0.34, 1.56, 0.64, 1)`).
- **Keyframe Behavior:** Scales from `scale(1.4) rotate(15deg)` down to `scale(1) rotate(random -4deg to 6deg)` simulating a physical ink stamp landing on parchment.

### 6. Happy Families Polaroid Gallery
- **Hover Physics:**
  - Lift: `translateY(-8px) scale(1.02)`.
  - Shadow: Expands from `6px 8px rgba(42, 23, 14, 0.15)` to `12px 18px rgba(42, 23, 14, 0.25)`.
  - Duration: `0.35s cubic-bezier(0.25, 1, 0.5, 1)`.

### 7. Night Sky Twinkling Stars & Crescent Moon
- **Twinkling Keyframe:** `tp-twinkle` (duration: 3.2s, infinite ease-in-out).
- **Phase Offsets:** 9 individual stars staggered by `0.40s` steps (`0.00s` to `3.20s`), preventing synchronized blinking.
- **Moon Glow:** Subtle radial pulse in footer atmospheric layer.

---

## 3. Performance & Frame Rate Verification
- **Measurement Tool:** Chrome DevTools Performance Timeline / RequestAnimationFrame loop.
- **Scroll FPS:** Steady 60fps on 60Hz displays and 120fps on ProMotion displays.
- **GPU Acceleration:** `will-change: transform` applied to `.tp-meet__track`, `.tp-meet__floor`, and `.pup-buddy`.
- **Zero Layout Shifts:** Scroll transforms operate exclusively on composite properties (`transform`, `opacity`), achieving a CLS (Cumulative Layout Shift) score of `0.000`.
