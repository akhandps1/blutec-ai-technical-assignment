# Accessibility Audit & Implementation Gaps Report

## 1. Accessibility Evaluation (WCAG 2.1 AA Standards)

### Strengths Observed in Reference Site
1. **Semantic Heading Hierarchy:** Logical document progression from `<h1>` through `<h2>` and `<h3>` across all pages.
2. **Keyboard Navigation Target:** Skip-to-content anchor (`<a href="#main">`) is present on all pages.
3. **Color Contrast:** Deep Cocoa (`#2A170E`) on Milk Cream (`#FFFDF8`) yields a contrast ratio of **15.2:1**, exceeding WCAG AAA standards.
4. **Form Labels & Attributes:** Required input fields include standard HTML attributes (`type="tel"`, `type="email"`, `required`).
5. **Video Attributes:** HTML5 puppy videos include `playsinline` and `aria-label` descriptions.

### Accessibility Gaps & Recommended Fixes
1. **Empty Image Alt Tags:** Several thumbnail images contain empty `alt=""` tags. When reproducing, all puppy images must feature descriptive alt text (e.g. `alt="Max, male Maltipoo puppy resting on blanket"`).
2. **Focus Visibility:** Focus rings on custom styled buttons rely on subtle outlines. Enhanced visible focus outlines (`focus-visible:ring-2 focus-visible:ring-terracotta`) must be provided.
3. **Reduced Motion Query:** While animations run in CSS, a `@media (prefers-reduced-motion: reduce)` media query should disable high-frequency mascot bobbing and running loops for vestibular-sensitive users.
4. **Accordion ARIA States:** FAQ buttons must explicitly manage `aria-expanded="true/false"` and `aria-controls`.

---

## 2. Inaccessible Resources & Technical Boundaries
- **Backend API Routes:** `/api/*` routes are disallowed by `robots.txt` and executed internally as Next.js Server Actions. Backend processing is treated as an opaque black box.
- **Admin Dashboard:** `/admin` route is restricted and disallowed.
- **Static Favicon File:** `/favicon.ico` returns 404; the site dynamically serves `/icon.png` and `/apple-icon.png`.
