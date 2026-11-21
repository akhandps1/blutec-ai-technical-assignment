# Homepage Section Inventory & Structural Mapping

## 1. Overview
This document specifies the exact structural order, semantic DOM elements, design tokens, asset bindings, and interactive behaviors for every section of the Homepage (`/`).

---

## 2. Master Section Order & Inventory

### Section 1: Hero Section (`.tp-hero`)
- **Semantic Tag:** `<section data-pup-scene="true" data-tone="light" class="tp-scene tp-hero" aria-labelledby="hero-title">`
- **Background Styling:** `linear-gradient(#fffdf8, #fff1d8)` with SVG sunrise arc (`.tp-hero__sun`).
- **Core Content:**
  - Kicker: `"every puppy is family"` with hand-drawn wavy underline (`font-scrawl`).
  - H1: `"Premium teacup puppies in Dubai"` (`font-plush`).
  - Lede: `"Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide."`
  - CTAs: Primary button `"View available puppies"` (`/puppies`) and ghost button `"Enquire on WhatsApp"` with WhatsApp link.
- **Lineup & Mascot:**
  - `.tp-lineup`: 7 featured showroom puppies peeking over quilt edge with polaroid photo cards, tilt angles (`--tilt: -5deg`, `3deg`, `-2deg`), and individual puppy badges.
  - Mascot (`.pup-buddy`): Peek pose (`pose: "peek"`), resting paws over quilt (`ledgePaws`), reactive gaze tracking pointer.

### Section 2: Meet the Pups Corridor (`.tp-meet`)
- **Semantic Tag:** `<section id="meet" class="tp-meet" data-pin-range="true">`
- **Pinning & Stage:**
  - Sticky stage height: `100vh`, pinned over `calc(3226px + 100vh)` scroll distance on viewports >= 768px.
  - Horizontal translation track: `.tp-meet__track` translating from `translateX(0px)` to `translateX(-4213px)`.
- **Corridor Elements:**
  - Central Mascot Actor: Sitting attentively (`pose: "sit"`), watching doors pass by.
  - Checkerboard Floor: Real-time tile translation (`--floor-x`) matching scroll speed.
  - Interactive Doors (`.tp-door`): 12 distinct puppy room doors with brass nameplates, swing angles (`--door-open: -75deg`), and puppy reveal illustrations.

### Section 3: Two Paths to Your Puppy (`.tp-paths`)
- **Semantic Tag:** `<section id="paths" class="tp-scene tp-paths" data-tone="warm">`
- **Header:** Kicker `"two ways to find each other"`, title `"From our showroom, or from afar"`.
- **Cards Grid:**
  - **Path A (Showroom):** Dubai showroom visit, booking appointment, meet in person.
  - **Path B (Bespoke Import):** Direct flight from elite partner breeders in South Korea, health clearances, climate-controlled transport.
- **Mascot Instance:** Standing pose (`pose: "stand"`), following cursor.

### Section 4: Journey & Timeline Switcher (`.tp-journey` / `.tp-journeys`)
- **Semantic Tag:** `<section class="tp-scene tp-journeys">`
- **Interactive Switcher:**
  - Segmented toggle (`.tp-switch`) with sliding thumb indicator (`.tp-switch__thumb`).
  - Tab 1: `"Dubai Showroom"` (Same-day adoption).
  - Tab 2: `"Imported from Korea"` (Door-to-door flight journey).
- **Postcard & Flight Map:**
  - SVG airplane bob animation (`tp-plane-bob`).
  - Dotted flight trajectory route connecting Seoul (ICN) to Dubai (DXB).
- **Step Cards:** 4 staggered milestone cards entering with `--i` animation delays.

### Section 5: The TeddyPups Passport & Guarantee (`.tp-passport`)
- **Semantic Tag:** `<section id="passport" class="tp-scene tp-passport">`
- **Interactive Flip / Stamp Card:**
  - Gold-embossed leather passport cover with metallic crest.
  - Guarantee list: 10-year genetic health guarantee, microchip registration, vaccination record, UAE municipality registration.
- **Mascot Instance:** Sitting attentively (`pose: "sit"`).

### Section 6: Dusk Scene — Happy Families Preview (`.tp-dusk`)
- **Semantic Tag:** `<section id="dusk" class="tp-scene tp-dusk" data-tone="dusk">`
- **Color Shift:** Smooth gradient transition from honey cream into warm twilight amber (`#f7c66b` to `#c2622b`).
- **Content:**
  - Polaroid photo masonry preview of adopted puppies across UAE.
  - Link to full gallery: `"Explore 64+ Happy Families"`.
- **Mascot Instance:** Sitting cozy (`pose: "sit"`).

### Section 7: Night Scene — Ambient Starfield (`.tp-night`)
- **Semantic Tag:** `<section id="night" class="tp-scene tp-night" data-tone="night">`
- **Atmosphere:** Deep espresso cocoa background with 30 twinkling SVG stars (`tp-twinkle`).
- **Mascot Instance:** Sleeping / snuggling pose (`pose: "sleep"`).

### Section 8: Home Section & Final CTA (`.tp-home`)
- **Semantic Tag:** `<section id="home" class="tp-scene tp-home">`
- **Final Banner:**
  - Call to action: `"Ready to welcome your new family member?"`
  - Showroom address, opening hours, and direct WhatsApp / call buttons.
- **Mascot Instance:** Sitting happily (`pose: "sit"`).

### Section 9: Global Persistent Mascot Runner (`PuppyRunner`)
- **Semantic Tag:** `<div class="pup-layer pointer-events-none fixed inset-x-0 bottom-4 z-30">`
- **Trot Animation:** Continuous cycle across viewport (`tp-runner-x`, `tp-runner-leg-a`, `tp-runner-leg-b`, `tp-runner-wag`, `tp-runner-bob`).
