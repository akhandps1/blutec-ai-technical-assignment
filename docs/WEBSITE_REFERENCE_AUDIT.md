# COMPLETE 7-ROUTE WEBSITE REFERENCE AUDIT
**Reference URL:** `https://puppy.instabizweb.com/`  
**Local Target:** `http://localhost:3030/`  
**Audit Scope:** Complete Website-Wide (7 Routes)  
**Execution Date:** 2026-11-21  
**Status:** 100% Inspected & Documented  

---

## 1. Executive Reference Overview

The reference website **TeddyPups U.A.E.** (`https://puppy.instabizweb.com`) is a luxury boutique digital experience showcasing premium ethical teacup puppies in Dubai. The platform combines editorial serif typography, warm artisanal textures, rich canine photo assets, interactive 3D scroll physics, and a bespoke kinematic mascot ("Teddy").

### Core Technical Architecture
- **Framework & Rendering:** Next.js with Static Site Generation (SSG) and Server-Side Rendering (SSR).
- **Design Aesthetic:** Warm luxury cream palette (`#FFFDF8`), espresso cocoa (`#2A170E`), harvest gold (`#F2BE6B`), and soft sand accents (`#E5D7C5`).
- **Typography:**
  - Headings: `Fraunces` (Editorial serif with optical sizing).
  - Handwritten Accents: `Caveat` (Playful script for kickers and personal notes).
  - Body & UI: `Plus Jakarta Sans` (Geometric grotesque for crisp readability).
- **Interactive Highlights:**
  - Custom puppy paw vector cursor (`/cursor/paw.svg` & `/cursor/paw-press.svg`).
  - Decompiled 9-landmark SVG mascot with spring-damped pointer tracking and click trick routines.
  - Pinned sticky corridor with horizontal stage translation and 3D door swing reveals.
  - Interactive 64-polaroid memory masonry with modal lightbox and keyboard controls.
  - FAQ multi-category accordions with synchronized ARIA states.
  - Real-time client-side breed filtering on the available puppies catalog.

---

## 2. Seven-Route Matrix & Health Status

| Route # | Route Path | Page Title | Reference Status | Local Status (Port 3030) | Section Count | Key Functionality |
|---|---|---|---|---|---|---|
| **1** | `/` | `TeddyPups U.A.E. — Premium teacup puppies in Dubai` | HTTP 200 OK | HTTP 200 OK | 11 Sections | Hero lineup, Pinned corridor, Journey map, Dusk gallery, Mascot |
| **2** | `/puppies/maltipoo-max-male` | `Max, Maltipoo puppy \| TeddyPups U.A.E.` | HTTP 200 OK | HTTP 200 OK | 4 Sections | Multi-photo & video gallery, Bio specs, Adoption WhatsApp CTA |
| **3** | `/puppies` | `Available puppies \| TeddyPups U.A.E.` | HTTP 200 OK | HTTP 200 OK | 4 Sections | Breed filter sticker chips, Puppy cards grid, Price tags |
| **4** | `/happy-families` | `Happy families \| TeddyPups U.A.E.` | HTTP 200 OK | HTTP 200 OK | 3 Sections | 64 Polaroid memories, Full-screen touch lightbox, Testimonials |
| **5** | `/how-it-works` | `How it works \| TeddyPups U.A.E.` | HTTP 200 OK | HTTP 200 OK | 9 Sections | 4-step adoption timeline, Seoul flight logistics, Health warranty |
| **6** | `/faq` | `Questions & answers \| TeddyPups U.A.E.` | HTTP 200 OK | HTTP 200 OK | 4 Sections | Multi-category expandable accordions, Travel & care FAQs |
| **7** | `/contact` | `Visit & contact \| TeddyPups U.A.E.` | HTTP 200 OK | HTTP 200 OK | 5 Sections | Interactive letterform, Boutique showroom hours, Map & Valet |

---

## 3. Global Design System Tokens

```css
:root {
  /* Color Palette */
  --color-cream: #FFFDF8;
  --color-sand: #F7F3EB;
  --color-cocoa: #2A170E;
  --color-gold: #F2BE6B;
  --color-amber: #D97706;
  --color-twilight: #1E1B4B;
  --color-night: #0F172A;

  /* Typography Scale */
  --font-heading: 'Fraunces', serif;
  --font-kicker: 'Caveat', cursive;
  --font-body: 'Plus Jakarta Sans', sans-serif;

  /* Spacing & Radii */
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-warm: 0 10px 30px -10px rgba(42, 23, 14, 0.12);
  --shadow-elevated: 0 20px 40px -15px rgba(42, 23, 14, 0.20);
}
```

---

## 4. Shared Layout Components

1. **Header (`<Header />`):**
   - Translucent frosted glass effect on scroll (`backdrop-filter: blur(12px)`).
   - Desktop navigation links (`hidden md:flex`) and animated mobile hamburger toggle (`.tp-header__burger`).
   - Integrated primary WhatsApp concierge CTA pill.
2. **Footer (`<Footer />`):**
   - Four-column information layout: Brand bio, Navigation quick links, Dubai Boutique hours, Legal disclaimer.
   - Sleeping / snug mascot resting above footer border.
3. **Sticky Mobile Action Bar:**
   - Docks persistently to the viewport bottom on screens $< 768\text{px}$.
   - Instant two-tap access to WhatsApp concierge and puppy catalog.
4. **Custom Paw Cursor Engine:**
   - Default state: `/cursor/paw.svg` (hotspot at 9, 6).
   - Active state: `/cursor/paw-press.svg` on buttons, cards, doors, and polaroids.
