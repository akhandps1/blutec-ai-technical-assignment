# COMPLETE HOMEPAGE ANIMATION INVENTORY
**Target Reference:** `https://puppy.instabizweb.com/`  
**Local Implementation:** `http://localhost:3030/`  
**Total Animations Cataloged:** 46 Distinct Animation Effects & Keyframe Timelines  
**Status:** 100% Implemented & Verified  

---

## 1. Mascot Kinematic Animations (`PupBuddyManager.tsx`)

| # | Animation Identifier | Type | Trigger | Key Parameters / Values | Description |
|---|---|---|---|---|---|
| 1 | `pup-gaze-tracking` | Dynamic Spring | Pointer Move | `lerp(dt, 0.07)`, clamp(-1, 1) | Eyes and head follow cursor coords across 300x240 normalized space |
| 2 | `pup-facing-flip` | CSS Transform | Cursor Position | `scale(-1, 1)` vs `scale(1, 1)` | Flips mascot horizontal orientation when mouse crosses center line |
| 3 | `pup-blink-cycle` | Procedural Timer | Ambient | `sin(phase * PI)`, 2.2s - 6s interval | Natural eyelid closing and opening |
| 4 | `pup-tail-wag-ambient` | Harmonic Sine | Idle State | `sin(time * 2.4) * (5deg + 17deg * wag)` | Subtle organic tail sway while idle |
| 5 | `pup-tail-wag-excited` | Harmonic Sine | Hover / Petting | `wagTarget: 1.0`, frequency ~4Hz | Fast excited wagging when user hovers directly on mascot |
| 6 | `pup-ear-spring` | 2nd Order Damping | Sudden Movement | `earV += (-150 * ear - 10 * earV) * dt` | Soft aerodynamic inertial lag on ears during movement |
| 7 | `pup-body-bounce` | Spring Damper | Hop / Woof | `bounceV += (-260 * bounce - 16 * bounceV) * dt` | Vertical recoil and landing squash |
| 8 | `pup-pose-peek` | Pose Interpolation | Hero Load | `headY: 4, earL: -6, earR: 6, tail: -20` | Mascot peeking above scalloped quilt line |
| 9 | `pup-pose-sit` | Pose Interpolation | Meet Scene | `bodyRot: -24, headX: -10, tail: 34, sit: 1` | Seated posture with paws grounded |
| 10 | `pup-pose-stand` | Pose Interpolation | Paths Scene | `BASE_POSE` | Neutral 4-legged standing posture |
| 11 | `pup-pose-snug` | Pose Interpolation | Dusk Scene | `headY: 9, headRot: 4, tail: -20` | Cozy resting posture nestled into border |
| 12 | `pup-pose-sleep` | Pose Interpolation | Night Scene | `eyes: 0, headY: 44, fn: -84, tail: 64` | Sleeping curled up on floor |
| 13 | `pup-trick-woof` | Action Sequence | Click | Speech bubble `"woof!"`, double bark jaw pop | Rapid mouth opening and bounce |
| 14 | `pup-trick-beg` | Action Sequence | Click | Speech bubble `"treat, please?"`, `bodyRot: -36` | Rearing up onto hind paws |
| 15 | `pup-trick-bow` | Action Sequence | Click | Speech bubble `"play with me!"`, `bodyRot: 15` | Playful downward canine stretch |
| 16 | `pup-trick-hop` | Action Sequence | Click | Speech bubble `"boing!"`, double jump | Vertical leap off bottom rail |
| 17 | `pup-trick-love` | Action Sequence | Click | Speech bubble `"I like you!"`, hearts burst | Happy closed eyes and floating SVG hearts |
| 18 | `pup-trick-tilt` | Action Sequence | Click | Speech bubble `"hm?"`, head cock | Inquisitive ear and head tilt |
| 19 | `pup-trick-sneeze` | Action Sequence | Click | Speech bubble `"achoo!"`, recoil | Sudden jolt backwards with ear shake |
| 20 | `pup-trick-zoomies` | Action Sequence | 4+ Clicks | High-speed lateral dashes across container | Frenetic left/right running cycle |
| 21 | `pup-speech-bubble` | CSS Transition | Trick Activation | `opacity: 0 -> 1`, `transform: translateY` | Rounded speech bubble pop-in and auto-hide |
| 22 | `pup-heart-particles` | CSS Keyframes | Love Trick | `@keyframes heartFloat`: `translateY(-60px) scale(1.4)` | Floating pink hearts fading upward |

---

## 2. Scroll-Linked Scene & Corridor Animations

| # | Animation Identifier | Target Element | Trigger | Motion Profile | Description |
|---|---|---|---|---|---|
| 23 | `corridor-horizontal-scroll` | `.tp-corridor__track` | Scroll (y: 900-4126) | `translateX(0px)` to `translateX(-4213.76px)` | Horizontal corridor track panning across viewport |
| 24 | `corridor-parquet-parallax` | `.tp-corridor__floor` | Scroll | `--floor-x: calc(trackX * 0.8)` | Parquet floor tiling parallax shift |
| 25 | `door-swing-open` (1–12) | `.tp-door__panel` | Viewport Proximity | `transform: rotateY(-75deg)` | 3D door rotation revealing illustrated puppy |
| 26 | `door-knob-sheen` | `.tp-door__knob` | Hover | `filter: brightness(1.2) drop-shadow(...)` | Brass knob glint reflection |
| 27 | `hero-sun-arc` | `.tp-hero__sun` | Initial Load | `rotate(0deg) scale(1)` with soft drift | Illustrated sun arc behind hero lineup |
| 28 | `quilt-border-wave` | `.tp-hero__quilt` | Ambient | SVG path translation | Organic scalloped border separating hero from meet scene |
| 29 | `journey-flight-path` | `.tp-journey__svg` | Scroll Into View | `stroke-dashoffset: 0` | Dashed flight route drawing from Seoul to Dubai |
| 30 | `journey-plane-pulse` | `.tp-journey__plane` | Ambient Loop | `translate(x, y) rotate(deg)` | Flight airplane traversing the trajectory line |
| 31 | `journey-radar-blip` | `.tp-journey__pin` | Ambient Loop | `scale(1) -> scale(1.8), opacity: 0` | Pulsating radar waves at Dubai arrival marker |
| 32 | `passport-leather-tilt` | `.tp-passport__card` | Pointer Move | 3D Perspective Tilt `rotateX/Y(±6deg)` | Tactile depth on gold-embossed passport cover |
| 33 | `passport-seal-shine` | `.tp-passport__seal` | Ambient Loop | `linear-gradient` sweep overlay | Gold foil reflection shimmer |
| 34 | `dusk-gradient-shift` | `.tp-scene.tp-dusk` | Scroll Progression | Amber peach to dusk violet cross-fade | Twilight sky transition during descent |
| 35 | `polaroid-card-hover` | `.tp-polaroid` | Hover | `rotate(±3deg) scale(1.04) translateY(-8px)` | Floating polaroid snapshot elevation |
| 36 | `star-twinkle-cycle` (1–30) | `.tp-star` | Ambient Loop | `opacity: 0.2 -> 1.0`, staggered 0.4s–2.8s | 30 individual night stars twinkling independently |
| 37 | `faq-accordion-expand` | `.tp-faq__content` | User Click | `grid-template-rows: 0fr -> 1fr` | Smooth non-layout-thrashing question expansion |
| 38 | `faq-chevron-flip` | `.tp-faq__chevron` | User Click | `transform: rotate(180deg)` | Arrow orientation indicator |
| 39 | `sticky-header-elevate` | `.tp-header` | Scroll (y > 50) | `backdrop-filter: blur(12px)`, shadow elevation | Header transition from transparent to frosted |

---

## 3. Micro-Interactions & Custom Cursor Feedback

| # | Animation Identifier | Target Element | Trigger | Visual Effect |
|---|---|---|---|---|
| 40 | `paw-cursor-press` | Custom Cursor | Mousedown | Switches instantly from `/cursor/paw.svg` to `/cursor/paw-press.svg` |
| 41 | `btn-hover-shimmer` | Primary CTAs | Hover | Subtle warm cream highlight glides across button pill |
| 42 | `whatsapp-pulse` | Floating WhatsApp CTA | Ambient Loop | Subtle pulsating green ring indicating online concierge readiness |
| 43 | `mobile-drawer-slide` | `.tp-mobile-nav` | Menu Toggle | `translateX(100%) -> translateX(0%)` with backdrop fade |
| 44 | `sticky-action-bar-dock` | Mobile Action Bar | Viewport < 768px | Fixed bottom dock with elevation shadow |
| 45 | `lineup-card-scale` | Hero Puppy Cards | Hover | `scale(1.03)` with soft warm shadow enlargement |
| 46 | `scroll-smooth-restore` | Root Scroll Container| Page Load / Route | `scroll-behavior: smooth` with zero horizontal layout shift |

---

## 4. Verification Summary

Every one of the 46 animation timelines has been validated in automated Playwright and dual-browser runs. All animations respect the `prefers-reduced-motion` media query for accessibility compliance.
