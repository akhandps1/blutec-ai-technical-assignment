# Homepage Responsive QA & Viewport Compatibility Report

## 1. Overview
The TeddyPups homepage was audited across 9 target viewports spanning ultra-wide desktop monitors, standard laptops, tablets, and mobile devices down to 360px.

This QA report validates horizontal overflow constraints, media query breakpoints, fluid typography scaling, touch target dimensions, and layout adaptability.

---

## 2. 9-Viewport Zero-Overflow Matrix

All viewports were audited using automated Playwright tests reading `document.documentElement.scrollWidth` against `window.innerWidth`.

| Viewport Name | Target Dimensions | Device Equivalent | Local scrollWidth | Inner Width | Zero Overflow Status |
|---|---|---|---|---|---|
| `desktop-ultrawide` | 1920 × 1080 | 27" - 32" QHD/4K Monitor | 1920px | 1920px | **PASS (100% Zero Overflow)** |
| `desktop-standard` | 1440 × 900 | 24" Desktop / MacBook Pro 15" | 1440px | 1440px | **PASS (100% Zero Overflow)** |
| `laptop` | 1280 × 800 | MacBook Air 13" / Common Laptop | 1280px | 1280px | **PASS (100% Zero Overflow)** |
| `desktop-small` | 1024 × 768 | iPad Landscape / Small Laptop | 1024px | 1024px | **PASS (100% Zero Overflow)** |
| `tablet-portrait` | 768 × 1024 | iPad Mini / Air Portrait | 768px | 768px | **PASS (100% Zero Overflow)** |
| `mobile-large-430` | 430 × 932 | iPhone 14/15/16 Pro Max | 430px | 430px | **PASS (100% Zero Overflow)** |
| `mobile-iphone14-390` | 390 × 844 | iPhone 12/13/14 Standard | 390px | 390px | **PASS (100% Zero Overflow)** |
| `mobile-iphoneX-375` | 375 × 812 | iPhone X / XS / 11 Pro / SE | 375px | 375px | **PASS (100% Zero Overflow)** |
| `mobile-android-360` | 360 × 800 | Samsung Galaxy S-Series / Android | 360px | 360px | **PASS (100% Zero Overflow)** |

---

## 3. Key Responsive Adaptations Implemented

1. **Header Navigation Switcher (`hidden md:block`):**
   - On screens `< 768px`, the horizontal desktop link bar is hidden, preventing layout blowout, and replaced by the mobile hamburger menu button.
2. **Global Viewport Clip (`overflow-x: clip`):**
   - Applied to both `html` and `body` in `src/styles/globals.css`. Unlike `overflow-x: hidden`, `overflow-x: clip` avoids breaking `position: sticky` on desktop while strictly prohibiting horizontal bounce or expansion.
3. **Hero Polaroid Gallery Fluid Layout:**
   - On desktop, cards peek over the quilt horizontally. On mobile `< 640px`, the gallery condenses into a horizontally scrollable snap-strip with touch inertia.
4. **Corridor Horizontal-to-Vertical Fallback:**
   - On desktop (`>= 768px`), the Meet Pups section pins and glides horizontally.
   - On small screens (`< 768px`), horizontal scroll with momentum touch drag is fully supported.
5. **Sticky Mobile Action Bar (`.tp-action-bar`):**
   - Appears fixed at viewport bottom on screens `< 768px` providing one-tap WhatsApp and Call access with 48px touch targets.
