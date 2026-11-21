# Rule: Animation Standards

1. **Use Documented Keyframes:** Base all motion on the 46 reverse-engineered CSS keyframes cataloged in `research/ANIMATION_INTERACTION_MAP.md`.
2. **Performance First:** Animate only hardware-accelerated properties (`transform`, `opacity`, `clip-path`). Never animate `width`, `height`, `top`, or `left`.
3. **Reduced Motion:** Always include `@media (prefers-reduced-motion: reduce)` fallbacks for non-essential continuous running animations.
4. **Zero Layout Shifts:** Reserve dimensions on animated containers to maintain zero Cumulative Layout Shift (CLS).
5. **Clean Unmounts:** Clean up any GSAP timelines, requestAnimationFrame loops, or scroll listeners on component unmount.
