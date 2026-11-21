# Responsive Behavior & Breakpoint Audit

## 1. Breakpoint Architecture
The design adapts across four critical viewport thresholds:

```
Mobile (<768px)  ───>  Tablet (768px - 1023px)  ───>  Laptop (1024px - 1279px)  ───>  Desktop (>=1280px)
 390 × 844 px              768 × 1024 px                1280 × 800 px                 1440 × 900 px
```

---

## 2. Component-by-Component Responsive Adaptation

### A. Navigation Header
- **Desktop (>=768px):** Horizontal navigation bar displaying all links (Home, Puppies, Happy families, How it works, FAQ, Visit & contact) with active paw indicator and right-aligned WhatsApp button.
- **Mobile (<768px):** Links are hidden. Right side displays a rounded `Menu` button. Clicking opens a full-screen drawer (`.tp-menu`) with staggered circular reveal animation. WhatsApp CTA is moved inside the drawer.

### B. Hero Section (`.tp-hero`)
- **Desktop (>=1280px):** 2-column split with display title (`99px` Fraunces), floating badges, and interactive stage.
- **Tablet (768px - 1023px):** Centered title scaled to `64px`, actions stacked horizontally, background skyline compressed.
- **Mobile (<768px):** Display title clamped to `42px` - `48px`. Action buttons stack vertically with full width (`w-full`). Mascot runner pinned to bottom edge.

### C. Available Puppies Grid (`/puppies`)
- **Desktop (>=1280px):** 4-column door cards grid (`grid-cols-4`).
- **Laptop (1024px - 1279px):** 3-column grid (`grid-cols-3`).
- **Tablet (768px - 1023px):** 2-column grid (`grid-cols-2`).
- **Mobile (<768px):** 1-column single door card stacked layout (`grid-cols-1`) with full-width cards and touch-optimized touch targets.

### D. Happy Families & Gone Home Quilt
- **Desktop (>=1280px):** 5-column to 6-column staggered masonry with varying tilt angles (`-3deg` to `+3deg`).
- **Tablet (768px - 1023px):** 3-column grid with reduced rotation to prevent overlap.
- **Mobile (<768px):** 2-column grid with minimal rotation (`-1deg` to `+1deg`), optimizing readability and touch scroll.

### E. Puppy Profile Page (`/puppies/[slug]`)
- **Desktop (>=1024px):** 2-column layout. Left: Sticky media gallery with main slider and thumbnail row. Right: Specifications, health assurances, and inquiry form.
- **Mobile (<1024px):** Single vertical column. Media gallery occupies full viewport width with swipe gestures. Specifications and inquiry form follow below.

---

## 3. Touch & Viewport Adjustments
- **Touch Targets:** All mobile interactive buttons and filter pills provide a minimum tap target of `44 × 44px`.
- **Text Clamping:** Large Fraunces headings use dynamic CSS `clamp()` expressions to prevent overflow on narrow screens.
