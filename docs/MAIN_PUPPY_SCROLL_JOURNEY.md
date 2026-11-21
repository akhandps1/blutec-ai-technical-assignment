# Main Puppy Scroll Journey: Complete Technical Specification

## 1. Architectural Overview
The core interactive feature of the TeddyPups website is PupJourney, a continuous scroll-driven character journey that travels down the entire page across 9 waypoints and reverses smoothly when scrolling upwards.

## 2. Key Components & Mechanics
PupJourney is implemented in src/components/animations/PupJourney.tsx with 3 primary DOM layers:
1. **.pup-probe**: A zero-width, full-viewport measurement probe used to calculate dynamic viewport boundaries without triggering reflows.
2. **.pup-prints**: A dedicated SVG container holding 24 paw print paths that fade in and out along the trajectory.
3. **.pup-layer**: A fixed-position layout container (contain: layout paint style; position: fixed; inset: 0;) housing .pup-actor.

## 3. Mathematical Foundations

### Quintic Smootherstep
Trajectory progress v in [0, 1] between waypoint hold ranges is smoothed using the quintic smootherstep function:
w = v^3 * (v * (6v - 15) + 10)
This provides continuous zero 1st and 2nd derivatives at endpoints, preventing any visual jerk when motion begins or ceases.

### Cubic Bézier Trajectory
Given starting waypoint coordinate P0 and target waypoint coordinate P1, control points C1 and C2 are computed dynamically:
DeltaX = P1.x - P0.x, arm = max(0.45 * |DeltaX|, 0)
C1 = (P0.x + dir * arm, P0.y - sink * s0)
C2 = (P1.x - dir * arm, P1.y - sink * s1)
The cubic Bézier point is calculated via De Casteljau interpolation:
B(t) = (1-t)^3 * P0 + 3(1-t)^2 * t * C1 + 3(1-t) * t^2 * C2 + t^3 * P1

### Soft Clamping to Safe Viewport
To ensure the puppy never clips against the browser chrome or sticky bars, soft-maximum and soft-minimum functions are applied:
softMax(x, limit, a) = limit + a * ln(1 + exp((x - limit)/a))

## 4. Waypoint Sequence & Docking States
| # | Section | Selector | Pose | Facing | Action | Layering |
| :- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Hero | .tp-hero__teddy | peek | Right (1) | peekaboo | Behind quilt (front: false) |
| 2 | Meet Pups | .tp-meet__teddy | walk | Right (1) | treadmill | Foreground (front: true) |
| 3 | Paths | .tp-fork__teddy | sit | Right (1) | Base sit | Foreground (front: true) |
| 4 | Journey | .tp-chat__teddy | sit | Right (1) | Phone gaze | Foreground (front: true) |
| 5 | Passport | .tp-book__teddy | sit | Right (1) | Book seam sit | Foreground (front: true) |
| 6 | Dusk | .tp-dusk__teddy | sit | Right (1) | Family look | Foreground (front: true) |
| 7 | Night | .tp-night__teddy | sit | Right (1) | tilt | Foreground (front: true) |
| 8 | Home | .tp-house__teddy | bow | Right (1) | Porch bow | Foreground (front: true) |
| 9 | Footer | .tp-basket__pup | snug | Right (1) | basket | Inside basket (front: false) |

## 5. Bidirectional Scroll Responsiveness
- **Scroll Down:** Progress v advances, character faces forward, drops paw prints at rate 34 * scale px, and transitions into walking stride (stride: 1).
- **Scroll Up:** Progress v smoothly reverses towards 0. Character smoothly transitions backward or turns, docking cleanly into previous waypoints.
- **Zero Jitter:** Non-overlapping hold ranges (computeHolds) prevent coordinate oscillation.
