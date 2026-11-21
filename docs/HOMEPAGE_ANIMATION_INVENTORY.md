# Homepage Animation Inventory & Verification

## 1. Master Animation List
| Animation Name | Trigger Type | Implementation | Easing / Duration | Verified State |
| :--- | :--- | :--- | :--- | :--- |
| **PupJourney Character Motion** | Continuous Scroll | Bézier Curve Interpolation (RAF) | Smootherstep Quintic | **PASS** |
| **Paw Print Drops** | Distance Walked | SVG DOM Injection + Web Animations API | 2600ms ease-out fade | **PASS** |
| **Treadmill Synchronization** | Scroll (Meet Pups) | Horizontal TranslateX (.tp-meet__track) | Synced with scroll velocity | **PASS** |
| **Airplane Arc Flight** | Infinite Ambient | CSS Keyframes (tp-plane-bob) | 3.2s ease-in-out infinite | **PASS** |
| **WhatsApp Chat Sequence** | Scroll Reveal | CSS Opacity & TranslateY | Staggered on scroll | **PASS** |
| **Passport Page Turn** | Scroll Reveal | 3D Perspective Book Seam | Cubic-bezier(0.22, 1, 0.36, 1) | **PASS** |
| **Cottage Porch Door Swing** | Scroll (Home Visited) | CSS 3D rotateY(-102deg) | 1.2s cubic-bezier(0.3, 1.25, 0.5, 1) | **PASS** |
| **Footer Basket Snug Mascot** | Scroll Dwell | Docking into .tp-basket__pup | Smooth clamp | **PASS** |
| **Interactive Tricks on Click** | Pointer Click | Random selector: woof, beg, bow, hop, love, zoomies | 0.8s - 2.4s sequence | **PASS** |
| **Cursor Gaze Tracking** | Pointer Move | 2D Vector Normalization to Eye Transform | Real-time spring lerp | **PASS** |
