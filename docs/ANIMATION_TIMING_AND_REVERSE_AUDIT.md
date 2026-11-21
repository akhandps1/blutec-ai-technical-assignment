# Animation Timing and Reverse Scroll Audit

## 1. Timing Function Analysis
The reference website employs three distinct cubic Bézier curves to give characters and UI elements an authentic, lively physical feel:
- **Silk (--ease-silk):** cubic-bezier(0.22, 1, 0.36, 1) — Used for smooth deceleration of UI cards and photo polaroids.
- **Pounce (--ease-pounce):** cubic-bezier(0.34, 1.56, 0.64, 1) — Used for bouncy character hops, button hover micro-interactions, and door opening.
- **Snap (--ease-snap):** cubic-bezier(0.7, 0, 0.2, 1) — Used for quick layout switches.

## 2. Reverse Scroll Audit
To prevent common animation bugs in cloned sites (such as animations sticking or breaking when scrolling up):
1. **Hold Range Continuity:** Hold ranges are sorted monotonically. Reversing the scroll position calculates the exact same progress fraction v in reverse.
2. **Door Closure on Scroll Up:** When scrolling above the Home section, [data-visited="true"] resets to false, smoothly rotating the door back to 0 degrees (rotateY(0deg)).
3. **Paw Print Clutter Prevention:** Paws are only deposited when v.walked advances. Scrolling upward does not emit backwards paws.
4. **Verified Coordinates in Browser:**
   - Scroll Down y=8000 (Footer): translate3d(-53.44px, 491.59px, 0px)
   - Reverse Scroll y=4000 (Journey): translate3d(189.5px, 671.18px, 0px)
   - Reverse Scroll y=0 (Hero): translate3d(402.58px, 517.64px, 0px)
