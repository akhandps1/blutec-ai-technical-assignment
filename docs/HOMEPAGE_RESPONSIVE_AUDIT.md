# Homepage Responsive Audit Across 6 Standard Viewports

## 1. Viewport Matrix & Overflow Test Results

All viewports were rigorously tested via Playwright browser automation on the local production build (`http://localhost:3030`).

| Viewport Profile | Resolution | Device Category | Scroll Width | Client Width | Overflow (px) | Status |
|------------------|------------|-----------------|--------------|--------------|---------------|--------|
| **Desktop 4K / Ultrawide** | 1920 × 1080 | Desktop Large | 1920px | 1920px | **0px** | **PASS** |
| **Desktop Standard** | 1440 × 900 | MacBook Pro 15" | 1440px | 1440px | **0px** | **PASS** |
| **Laptop** | 1280 × 800 | MacBook Air 13" | 1280px | 1280px | **0px** | **PASS** |
| **Tablet Portrait** | 768 × 1024 | iPad Air / Mini | 768px | 768px | **0px** | **PASS** |
| **Mobile Standard** | 390 × 844 | iPhone 12/13/14 | 390px | 390px | **0px** | **PASS** |
| **Mobile Compact** | 375 × 812 | iPhone X/XS/11 Pro | 375px | 375px | **0px** | **PASS** |

---

## 2. Responsive Adaptations by Screen Tier

### Desktop Tier (>= 1024px)
- **Header:** Full inline navigation bar with animated paw indicator on active route, desktop WhatsApp CTA button.
- **Meet the Pups:** Pinned horizontal corridor promenade with 3226px scroll track, 12 3D swinging doors, and parquet floor parallax.
- **Two Ways:** 3-column split view (Showroom window | Central Signpost with Mascot | Korea-Dubai Flight Map).
- **Puppy Journey:** 2-column layout (Steps on left, interactive smartphone mockup on right).
- **Puppy Passport:** Open 2-page leather booklet with 4 circular stamps.
- **Happy Families:** 4-column polaroid collage.

### Tablet Tier (768px - 1023px)
- **Header:** Scaled padding, condensed nav spacing.
- **Two Ways:** Stacked vertical layout with central signpost anchored smoothly.
- **Puppy Journey:** Centered vertical flow with phone mockup beneath step list.
- **Happy Families:** 2-column polaroid board.

### Mobile Tier (< 768px)
- **Header:** Sticky compact bar with brand logo and mobile hamburger drawer button.
- **Bottom Action Bar:** Sticky `.tp-action-bar` with quick WhatsApp and Call touch targets (`pb-[env(safe-area-inset-bottom)]`).
- **Meet the Pups:** Pinned corridor smoothly unlocks into horizontal swipe carousel, ensuring zero touch friction.
- **Puppy Passport:** Stacked single-column card layout (`@media (min-width: 900px)` breakpoint respected), preventing horizontal layout spilling.
- **Typography:** Clamp-based fluid font sizing (`clamp(2rem, 5vw, 3.5rem)`), ensuring no awkward line wrapping.
- **Horizontal Overflow:** `overflow-x: clip` on `html` and `body` guarantees strict 0px horizontal scrollbar across all mobile browsers.
