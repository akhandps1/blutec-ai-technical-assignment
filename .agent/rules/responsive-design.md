# Rule: Responsive Design

1. **Four Viewport Standard:** Verify visual layouts against:
   - Desktop: `1440 × 900`
   - Laptop: `1280 × 800`
   - Tablet: `768 × 1024`
   - Mobile: `390 × 844`
2. **Mobile Navigation Drawer:** Mobile viewports (<768px) must switch to the full-screen radial clip-path navigation drawer (`.tp-menu`).
3. **Grid Stacking:** Multi-column grids must gracefully stack into 2-column or 1-column layouts as defined in `research/RESPONSIVE_BEHAVIOR.md`.
4. **Touch Target Sizing:** Interactive buttons and touch controls must meet the 44px minimum touch target size on mobile.
5. **Fluid Typography:** Scale headings using CSS `clamp()` or Tailwind responsive variants to prevent text overflow.
