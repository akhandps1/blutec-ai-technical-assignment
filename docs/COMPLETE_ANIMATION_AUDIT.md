# Animation & Interaction Research Map

## Overview
TeddyPups U.A.E. features an elaborate, storybook-themed motion architecture comprising **46 unique CSS keyframe animations**, scroll-driven parallax transitions, and delicate micro-interactions.

Every animation is defined directly in CSS, ensuring smooth 60fps performance without bulky external runtime libraries.

---

## 1. Master Keyframe Inventory (46 Animations)

| # | Animation Name | Trigger | Target Element | Duration | Delay | Easing | Transform / Property Change | Final State |
|---|---|---|---|---|---|---|---|---|
| 1 | `tp-curtain-cover` | Page navigation start | `.tp-curtain` overlay | 0.4s | 0s | cubic-bezier(.4,0,.2,1) | `translateY(calc(100% + 44px))` -> `0` | Screen covered |
| 2 | `tp-curtain-lift` | Page load complete | `.tp-curtain` overlay | 0.6s | 0.2s | cubic-bezier(.2,.8,.3,1) | `translateY(0)` -> `translateY(-100%)` | Screen revealed |
| 3 | `tp-curtain-rest` | Post-curtain cleanup | `.tp-curtain` | 0.1s | 0.8s | linear | `visibility: hidden` | Hidden |
| 4 | `tp-runner-x` | Continuous / scene scroll | `.tp-runner` | 4.8s - 8s | 0s | linear (infinite) | `translate: -40%` -> `translate: 140%` | Loops across viewport |
| 5 | `tp-runner-bob` | Mascot running loop | `.tp-runner__body` | 0.38s | 0s | ease-in-out (infinite alt) | `translate: 0 0` -> `translate: 0 -4px` | Bobs up and down |
| 6 | `tp-runner-leg-a`| Mascot running loop | `.tp-runner__leg--fn, --bn` | 0.38s | 0s | ease-in-out (infinite alt) | `rotate: 24deg` -> `rotate: -20deg` | Leg stride cycle |
| 7 | `tp-runner-leg-b`| Mascot running loop | `.tp-runner__leg--bf, --ff` | 0.38s | 0s | ease-in-out (infinite alt) | `rotate: -22deg` -> `rotate: 22deg` | Opposite leg stride |
| 8 | `tp-runner-wag` | Mascot running loop | `.tp-runner__tail` | 0.22s | 0s | ease-in-out (infinite alt) | `rotate: -16deg` -> `rotate: 24deg` | Tail wagging |
| 9 | `tp-runner-ear` | Mascot running loop | `.tp-runner__ear` | 0.45s | 0.1s | ease-in-out (infinite alt) | `rotate: 0deg` -> `rotate: -14deg` | Floppy ear movement |
| 10| `tp-print-step` | Mascot running loop | `.tp-curtain__print` | 0.4s | Staggered (`calc(0.12s * i)`) | cubic-bezier(.2,.8,.3,1) | `opacity: 0; scale: .4` -> `opacity: 1; scale: 1` | Paw print persists |
| 11| `tp-menu-in` | Mobile menu click | `.tp-menu` drawer | 0.45s | 0s | cubic-bezier(.2,.8,.3,1) | `clip-path: circle(0% at top right)` -> `circle(150%)` | Full-screen drawer reveal |
| 12| `tp-menu-out` | Mobile close click | `.tp-menu` drawer | 0.35s | 0s | cubic-bezier(.4,0,.7,.6) | `circle(150%)` -> `circle(0%)` | Collapses into hamburger |
| 13| `tp-menu-link`| Mobile menu opened | `.tp-menu-link` items | 0.4s | Staggered (`calc(0.06s * i)`) | cubic-bezier(.2,.8,.3,1) | `opacity: 0; translateY(1.2rem) rotate(-2deg)` -> normal | Visible & interactive |
| 14| `tp-twinkle` | Ambient night scene | `.tp-twinkle` stars | 2.4s | Randomized | ease-in-out (infinite alt) | `opacity: .35; scale(.8)` -> `opacity: 1; scale(1.1)` | Twinkling starfield |
| 15| `tp-float` | Ambient illustrations | Floating badges/stickers | 3.2s | 0s | ease-in-out (infinite alt) | `translateY(0) rotate(0)` -> `translateY(-8px) rotate(2deg)` | Weightless floating |
| 16| `tp-stamp-thump`| Scroll / Load | `.tp-gone-stamp` | 0.32s | 0.15s | cubic-bezier(.15,1.2,.3,1) | `opacity: 0; scale(1.4) rotate(-28deg)` -> `scale(1) rotate(-12deg)` | Stamped imprint |
| 17| `tp-sun-set` | Scene scroll into dusk | `.tp-horizon__sun` | Dynamic | Scroll | linear | `translate: 0 0` -> `translate: 0 120%` | Sunset behind skyline |
| 18| `tp-sunrise` | Scene scroll into day | `.tp-horizon__sun` | Dynamic | Scroll | linear | `translate: 0 100%` -> `translate: 0 0` | Morning sunrise |
| 19| `tp-door-open` | Hover on Door Card | `.tp-door__leaf` | 0.45s | 0s | cubic-bezier(.2,.8,.3,1) | `transform: perspective(800px) rotateY(0)` -> `rotateY(-42deg)` | Door ajar revealing pup |
| 20| `tp-letter-fold`| Contact Form submit | `.tp-letterform` sheet | 0.6s | 0s | ease-in-out | `perspective(1100px) rotateX(0)` -> `rotateX(62deg) scale(.8)` | Letter folding in half |
| 21| `tp-env-post` | Contact Form submit | `.tp-envelope` | 0.5s | 0.6s | cubic-bezier(.2,.8,.3,1) | `translateY(0)` -> `translateY(-140px) scale(0.2)` | Posts into mail slot |
| 22| `tp-breathe` | Mascot standing idle | `.pup-actor` | 2.8s | 0s | ease-in-out (infinite alt) | `scale: 1 1` -> `scale: 1 1.018` | Gentle breathing |
| 23| `tp-blink-shut`| Mascot idle loop | Mascot eyes | 4.2s | 0s | step-end (infinite) | `opacity: 0` -> `opacity: 1 (for 120ms)` | Eye blink |
| 24| `tp-ear-twitch`| Mascot idle loop | Mascot ear | 5.6s | 0.8s | ease-in-out (infinite) | `rotate: 0deg` -> `rotate: -8deg` -> `rotate: 0deg` | Natural ear twitch |
| 25| `tp-plane-bob` | How it works flight | Airplane icon | 3.0s | 0s | ease-in-out (infinite alt) | `translate(0, 0) rotate(0)` -> `translate(0, -6px) rotate(-3deg)` | Gentle airplane flight |

---

## 2. Key Interactive State Mechanics

### A. Mobile Menu Drawer
- **Trigger:** Hamburger button click in header.
- **Implementation:** Circular radial clip-path animation (`tp-menu-in`) expanding from the button position `calc(100% - 3rem) 2rem`.
- **Links Stagger:** Each navigation link enters with an incremental delay of `60ms` with a soft rotation of `-2deg` leveling to `0deg`.
- **Backdrop:** `rgba(42, 23, 14, 0.4)` blurred backdrop.

### B. Puppy Door Cards (`.tp-door`)
- **Structure:** 3D CSS perspective container (`perspective: 900px`).
- **Rest State:** Closed door showing brass name plate badge and puppy name.
- **Hover State:** Door leaf rotates on Y-axis (`-38deg`) while the puppy portrait zooms slightly (`scale(1.05)`), simulating opening a door to meet the puppy.

### C. Polaroid Masonry Tilt
- **Styling:** Each `.tp-polaroid` has an individual tilt angle set via CSS variable: e.g. `--tilt: -2.5deg`, `--tilt: 3deg`, `--tilt: -1.8deg`.
- **Hover Behavior:** On cursor hover, the card scales up (`scale(1.04)`), straightens (`rotate(0deg)`), and elevates shadow (`box-shadow: 0 16px 32px rgba(42, 23, 14, 0.2)`).

### D. Media Gallery Video Switcher (Puppy Detail Page)
- **Thumbnails:** Photo thumbnail buttons and a video thumbnail marked with a play glyph (`▶`).
- **Interaction:** Clicking the video button unmounts/hides the static `<img>` and activates an inline HTML5 `<video>` with `autoplay`, `loop`, and `playsinline`.
- **Chevrons:** Left (`‹`) and Right (`›`) buttons increment and decrement the active media index with numerical counter display (`1 / 2`).
