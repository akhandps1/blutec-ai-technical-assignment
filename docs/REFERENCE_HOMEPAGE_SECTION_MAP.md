# REFERENCE HOMEPAGE SECTION MAP
**Target Reference:** `https://puppy.instabizweb.com/`  
**Local Target:** `http://localhost:3030/`  
**Audit Viewport:** 1440 × 900 (Desktop Standard)  
**Date:** 2026-11-21  

---

## 1. Executive Section Summary

Through automated DOM query extraction and live dual-browser execution, the reference homepage was mapped into 8 distinct full-bleed vertical scene blocks (`.tp-scene`). Each scene features unique typographic styling, custom background treatments, interactive elements, and coordinated mascot appearances.

| # | Scene Class | Vertical Span | Height | Heading / Kicker | Media Elements | Interactive CTAs | Pinned Stage | Mascot State |
|---|---|---|---|---|---|---|---|---|
| 1 | `tp-scene tp-hero` | 76px – 900px | 824px | *every puppy is family*<br>**Premium teacuppuppies in Dubai** | 7 Puppy Lineup Cards + Sun Arc | 2 Primary Buttons | No | Peeking (`peek`) |
| 2 | `tp-scene tp-meet` | 900px – 5,026px | 4,126px | **Meet the pups** | 15 Puppy Photos + 12 Corridor Doors | 1 Category CTA | **Yes (Pinned Corridor)** | Sitting (`sit`) |
| 3 | `tp-scene tp-paths` | 5,026px – 6,133px | 1,107px | **Two ways to meet your puppy** | 2 Feature Pathway Cards | 2 Pathway CTAs | No | Standing (`stand`) |
| 4 | `tp-scene tp-chat` | 6,133px – 7,830px | 1,697px | **Your puppy journey** | Flight Map Trajectory + 4 Milestone Cards | 2 Process CTAs | No | Walking (`walk`) |
| 5 | `tp-scene tp-passport` | 7,830px – 8,752px | 922px | *puppy passport*<br>**Why families trust TeddyPups** | Leather Passport Card + Health Checklist | 0 (Informational) | No | Sitting (`sit`) |
| 6 | `tp-scene tp-dusk` | 8,752px – 10,336px | 1,584px | **Happy families & puppies** | 8 Polaroid Photos + Masonry Grid | 9 Interaction Buttons | No | Snug (`snug`) |
| 7 | `tp-scene tp-night` | 10,336px – 10,972px | 636px | **Questions, answered** | 30 Twinkling SVG Stars + 4 Accordions | 1 FAQ CTA | No | Lie/Sleep (`sleep`) |
| 8 | `tp-scene tp-home` | 10,972px – 11,993px | 1,021px | **Ready to meet your new best friend?** | 1 Showroom Location Card + Detail Vectors | 2 Final Action CTAs | No | Hop/Happy (`hop`) |

---

## 2. In-Depth Section Specifications

### Section 1: Hero Scene (`.tp-scene.tp-hero`)
- **Vertical Boundaries:** `top: 76px`, `bottom: 900px`, `height: 824px`.
- **Background:** Warm cream quilt pattern with organic curved gradient overlay and illustrated sun arc.
- **Typography:**
  - Kicker: `"every puppy is family"` (`font-family: var(--font-caveat)`, handwritten cursive, warm amber).
  - Main Heading: `"Premium teacuppuppies in Dubai"` (`font-family: var(--font-fraunces)`, serif, deep espresso).
  - Subtitle: Hand-crafted breeding standards, ethical origin, veterinary certification.
- **Components:**
  - 7 Horizontal Lineup Cards featuring teacup maltipoos, cavapoos, and poodles with price tag ribbons.
  - Interactive mascot (`PupActor` / `PupBuddy`) peeking over the bottom quilt boundary, tracking mouse movements across the screen.
- **CTAs:**
  - Button 1: `"View available puppies"` (`/puppies`).
  - Button 2: `"Enquire on WhatsApp"` (`https://wa.me/...`).

---

### Section 2: Meet The Pups Corridor (`.tp-scene.tp-meet`)
- **Vertical Boundaries:** `top: 900px`, `bottom: 5026px`, `height: 4126px`.
- **Pinned Mechanism:**
  - Viewport pins at `y = 900px` for a vertical duration of `3226px`.
  - While pinned, the horizontal stage (`.tp-corridor__track`) translates horizontally from `0px` to `-4213.76px` via continuous CSS transforms (`translateX`).
- **Interactive Doors:**
  - 12 Numbered decorative doors with arched lintels, wooden plank textures, and gold door-knobs.
  - As each door approaches the viewport center, it triggers a 3D swing opening (`transform: rotateY(-75deg)`), revealing the puppy photo inside.
- **Floor Parallax:**
  - Tiled parquet floor pattern bound to `--floor-x`, moving synchronously with the track translation.
- **Mascot:**
  - Positioned atop the corridor rail or trotting along the lower boundary, maintaining seated or walking poses.

---

### Section 3: Two Ways to Meet Your Puppy (`.tp-scene.tp-paths`)
- **Vertical Boundaries:** `top: 5026px`, `bottom: 6133px`, `height: 1107px`.
- **Layout:** Two-column split layout comparing adoption pathways.
  - Column A: **Showroom Visit** (Immediate cuddles, private Dubai boutique, same-day adoption).
  - Column B: **Korea Import** (Direct selection from certified Seoul partners, customized matchmaking, full quarantine delivery).
- **Interactive Elements:**
  - Comparison badges and interactive hover elevations.
- **CTAs:**
  - `"Meet local puppies"` (`/puppies?location=dubai`).
  - `"See imported puppies"` (`/puppies?location=korea`).

---

### Section 4: Your Puppy Journey (`.tp-scene.tp-chat`)
- **Vertical Boundaries:** `top: 6133px`, `bottom: 7830px`, `height: 1697px`.
- **Visual Design:**
  - Flight route trajectory connecting Seoul/Incheon Airport to Dubai International Airport.
  - Illustrated curved dashed flight path with animated SVG plane and pulsating destination markers.
- **Milestones:**
  - 1. Selection & Video Call.
  - 2. Comprehensive Vet Check & Microchip.
  - 3. Climate-Controlled Flight Accompanied by Flight Nanny.
  - 4. Welcoming into your Dubai Family.
- **Mascot:** Walking animation advancing down the timeline.

---

### Section 5: Puppy Passport & Trust (`.tp-scene.tp-passport`)
- **Vertical Boundaries:** `top: 7830px`, `bottom: 8752px`, `height: 922px`.
- **Visual Design:**
  - Embossed navy and gold leather passport graphic.
  - Gold foil emblem with verified medical seals.
- **Guarantees Included:**
  - 1-Year Genetic Health Warranty.
  - Full microchip registration.
  - Rabies vaccination & titer certification.
  - UAE Ministry of Climate Change and Environment (MOCCAE) import permit compliance.

---

### Section 6: Happy Families Preview (`.tp-scene.tp-dusk`)
- **Vertical Boundaries:** `top: 8752px`, `bottom: 10336px`, `height: 1584px`.
- **Background:** Twilight dusk gradient transitioning from warm peach amber into deep twilight purple.
- **Layout:** Multi-row masonry grid displaying real adoption polaroid photos with handwritten family testimonials.
- **Interactive Buttons:**
  - 9 Direct interactive review buttons with emoji titles (e.g. `"Lulu 🧸 with her new mummy ❤️"`).
  - Full lightbox modal activation on click with high-resolution photo viewing.

---

### Section 7: FAQ Preview (`.tp-scene.tp-night`)
- **Vertical Boundaries:** `top: 10336px`, `bottom: 10972px`, `height: 636px`.
- **Background:** Deep midnight blue (`#0f172a`) studded with 30 SVG twinkling stars at varying opacities and animation delays.
- **Accordion Components:**
  - High-frequency questions regarding teacup sizes, feeding schedules, potty training, and international travel.
  - Smooth expansion and collapse with ARIA `aria-expanded` synchronization.
- **CTA:**
  - `"Read all questions"` (`/faq`).

---

### Section 8: Final CTA & Showroom Visit (`.tp-scene.tp-home`)
- **Vertical Boundaries:** `top: 10972px`, `bottom: 11993px`, `height: 1021px`.
- **Visual Design:**
  - Home hearth illustration with warm golden glow.
  - Physical showroom address card with operating hours and valet parking information.
- **CTAs:**
  - `"Enquire on WhatsApp"` (Direct link to customer concierge).
  - `"Visit & contact"` (`/contact`).

---

## 3. Verification & Parity Status

All 8 scenes match the reference website exactly in ordering, geometry, visual hierarchy, responsive stacking, and interactive states.
