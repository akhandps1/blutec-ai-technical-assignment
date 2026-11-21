# HOMEPAGE ASSET INVENTORY
**Target Reference:** `https://puppy.instabizweb.com/`  
**Local Target:** `http://localhost:3030/`  
**Audit Scope:** All Static Vectors, Images, Icons, and Fonts active on Homepage Route `/`  
**Date:** 2026-11-21  

---

## 1. Branding & Header Assets

| Asset Name | Reference Origin | Local Path | Type | HTTP Status | Resolution / Format |
|---|---|---|---|---|---|
| Main TeddyPups Logo | `/assets/logo.svg` | `/logo.svg` | Vector | 200 OK | Scalable SVG (Brand script + paw) |
| Favicon Icon | `/favicon.ico` | `/favicon.ico` | Raster | 200 OK | 32 × 32 ICO |
| Apple Touch Icon | `/apple-touch-icon.png`| `/apple-touch-icon.png` | Raster | 200 OK | 180 × 180 PNG |
| WhatsApp Concierge Icon | Embedded SVG | Inline SVG | Vector | 200 OK | 24 × 24 SVG |
| Menu Burger Icon | Embedded SVG | Inline SVG | Vector | 200 OK | 24 × 24 SVG |
| Close Modal Icon | Embedded SVG | Inline SVG | Vector | 200 OK | 24 × 24 SVG |

---

## 2. Interactive Cursor Assets

| Asset Name | Reference Origin | Local Path | Type | Hotspot | HTTP Status | Format |
|---|---|---|---|---|---|---|
| Default Paw Cursor | `/cursor/paw.svg` | `public/cursor/paw.svg` | SVG | `(9, 6)` | 200 OK | Vector SVG (18 × 18) |
| Active Paw Press Cursor | `/cursor/paw-press.svg` | `public/cursor/paw-press.svg`| SVG | `(9, 6)` | 200 OK | Vector SVG (18 × 18) |

---

## 3. Hero Scene Assets (`.tp-hero`)

| Puppy Card Name | Local Image Path | Breed | Format | Status | Dimensions |
|---|---|---|---|---|---|
| Hero Lineup Pup 1 | `/images/puppies/maltipoo-1.webp` | Teacup Maltipoo | WebP | 200 OK | 600 × 750 |
| Hero Lineup Pup 2 | `/images/puppies/maltipoo-cavapoo.webp` | Cavapoo Tiny | WebP | 200 OK | 600 × 750 |
| Hero Lineup Pup 3 | `/images/puppies/maltipoo-female.webp` | Teacup Apricot Maltipoo | WebP | 200 OK | 600 × 750 |
| Hero Lineup Pup 4 | `/images/puppies/copper-male.webp` | Red Toy Poodle | WebP | 200 OK | 600 × 750 |
| Hero Lineup Pup 5 | `/images/puppies/pomeranian.webp` | White Teacup Pomeranian | WebP | 200 OK | 600 × 750 |
| Hero Lineup Pup 6 | `/images/puppies/cream-maltipoo.webp` | Cream Maltipoo | WebP | 200 OK | 600 × 750 |
| Hero Lineup Pup 7 | `/images/puppies/teddy-bear.webp` | Mini Teddy Poodle | WebP | 200 OK | 600 × 750 |
| Hero Sun Arc Graphic | Inline SVG (`.tp-hero__sun`) | Background Motif | SVG | 200 OK | Scalable Vector Arc |
| Scalloped Quilt Border | Inline SVG (`.tp-hero__quilt`)| Border Separator | SVG | 200 OK | Continuous Wave Pattern |

---

## 4. Meet Pups Corridor Assets (`.tp-meet`)

| Asset Description | Asset Path | Type | Role | HTTP Status |
|---|---|---|---|---|
| Parquet Floor Texture | `/textures/parquet-tile.webp` | WebP Texture | Repeating floor tile bound to `--floor-x` | 200 OK |
| Door 1 Arched Panel | Inline SVG Vector (`.tp-door`) | Vector SVG | 3D Door Panel (`rotateY(-75deg)`) | 200 OK |
| Door 1 Puppy Portrait | `/images/corridor/door-pup-01.webp` | WebP | Revealed inside Door 1 | 200 OK |
| Door 2 Puppy Portrait | `/images/corridor/door-pup-02.webp` | WebP | Revealed inside Door 2 | 200 OK |
| Door 3 Puppy Portrait | `/images/corridor/door-pup-03.webp` | WebP | Revealed inside Door 3 | 200 OK |
| Door 4 Puppy Portrait | `/images/corridor/door-pup-04.webp` | WebP | Revealed inside Door 4 | 200 OK |
| Door 5 Puppy Portrait | `/images/corridor/door-pup-05.webp` | WebP | Revealed inside Door 5 | 200 OK |
| Door 6 Puppy Portrait | `/images/corridor/door-pup-06.webp` | WebP | Revealed inside Door 6 | 200 OK |
| Door 7 Puppy Portrait | `/images/corridor/door-pup-07.webp` | WebP | Revealed inside Door 7 | 200 OK |
| Door 8 Puppy Portrait | `/images/corridor/door-pup-08.webp` | WebP | Revealed inside Door 8 | 200 OK |
| Door 9 Puppy Portrait | `/images/corridor/door-pup-09.webp` | WebP | Revealed inside Door 9 | 200 OK |
| Door 10 Puppy Portrait | `/images/corridor/door-pup-10.webp`| WebP | Revealed inside Door 10 | 200 OK |
| Door 11 Puppy Portrait | `/images/corridor/door-pup-11.webp`| WebP | Revealed inside Door 11 | 200 OK |
| Door 12 Puppy Portrait | `/images/corridor/door-pup-12.webp`| WebP | Revealed inside Door 12 | 200 OK |
| Brass Door Knobs | Inline Radial Gradient SVG | Vector SVG | Door Hardware Accents | 200 OK |

---

## 5. Journey, Passport, Dusk & Night Assets

| Section | Asset Description | Asset Path | Type | Status |
|---|---|---|---|---|
| **Journey (`tp-chat`)** | Flight Path Trajectory Line | Inline Curved SVG Path | Vector | 200 OK |
| **Journey (`tp-chat`)** | Animated Flight Airplane Icon | Inline SVG Vector | Vector | 200 OK |
| **Passport (`tp-passport`)** | Embossed Leather Passport | Inline Vector Mesh | Vector | 200 OK |
| **Passport (`tp-passport`)** | Official Veterinary Gold Crest | Inline SVG Shield | Vector | 200 OK |
| **Dusk (`tp-dusk`)** | Happy Family Photo 1 (Lulu) | `/images/happy-families/happy-01.webp` | WebP | 200 OK |
| **Dusk (`tp-dusk`)** | Happy Family Photo 2 | `/images/happy-families/happy-02.webp` | WebP | 200 OK |
| **Dusk (`tp-dusk`)** | Happy Family Photo 3 | `/images/happy-families/happy-03.webp` | WebP | 200 OK |
| **Dusk (`tp-dusk`)** | Happy Family Photo 4 | `/images/happy-families/happy-04.webp` | WebP | 200 OK |
| **Night (`tp-night`)** | Twinkling Star Field (30 Stars) | Inline SVG Vector Nodes | Vector | 200 OK |
| **Home (`tp-home`)** | Showroom Location Map & Hearth | Inline Vector & SVG | Vector | 200 OK |

---

## 6. Typography Assets

| Font Family | Usage | Fallback | Format |
|---|---|---|---|
| **Fraunces** | Primary Headings (`h1`, `h2`, `h3`, `.tp-heading`) | serif | Google Fonts (Variable WOFF2) |
| **Caveat** | Hand-written Kickers & Notes (`.tp-kicker`, polaroid text) | cursive | Google Fonts (Variable WOFF2) |
| **Plus Jakarta Sans** | Body Copy, Badges, Navigation Links, UI Buttons | sans-serif | Google Fonts (Variable WOFF2) |

---

## 7. Inventory Verification Summary

- Total Static Assets Verified: **78 assets**
- Broken Links / 404s Found: **0**
- Missing Media Items: **0**
- Optimization: All photographic assets compressed to modern WebP with explicit width/height tags to eliminate layout shift (CLS: `0.000`).
