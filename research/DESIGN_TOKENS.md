# Exact Design Tokens Specification

This document provides exact, measured design tokens extracted from the reference stylesheets and computed DOM values.

---

## 1. Color Palette Tokens

### Primary Brand Palette
| Token Name | Hex Code | RGB Value | CSS Variable / Tailwind Class | Intended Purpose | Measured In |
|---|---|---|---|---|---|
| `color-primary-terracotta` | `#C2622B` | `rgb(194, 98, 43)` | `--color-primary` / `text-terracotta` | Primary brand accent, link hovers, badge borders | Measured in CSS |
| `color-primary-terracotta-dark`| `#A24A1A`| `rgb(162, 74, 26)` | `--color-primary-dark` | Nav links, active states, emphasized text | Measured in computed styles |
| `color-primary-cinnamon` | `#8E3F15` | `rgb(142, 63, 21)` | `--color-cinnamon` | Subheadings, descriptive story paragraphs | Measured in computed styles |

### Dark Text & Surface Palette
| Token Name | Hex Code | RGB Value | CSS Variable / Tailwind Class | Intended Purpose | Measured In |
|---|---|---|---|---|---|
| `color-text-cocoa` | `#2A170E` | `rgb(42, 23, 14)` | `--color-cocoa` / `text-cocoa` | Primary heading text, solid drop shadows, door frames | Measured in computed styles |
| `color-text-cocoa-light` | `#5A3A28` | `rgb(90, 58, 40)` | `--color-cocoa-light` | Secondary text, card captions, muted labels | Measured in CSS |
| `color-bg-dark-espresso` | `#24130B` | `rgb(36, 19, 11)` | `--color-espresso` / `bg-espresso` | Footer background, night scene background | Measured in computed styles |

### Warm Neutral & Milk Backgrounds
| Token Name | Hex Code | RGB Value | CSS Variable / Tailwind Class | Intended Purpose | Measured In |
|---|---|---|---|---|---|
| `color-bg-milk` | `#FFFDF8` | `rgb(255, 253, 248)` | `--color-milk` / `bg-milk` | Primary page background, card surfaces | Measured in computed styles |
| `color-bg-peach-light` | `#FFF8EA` | `rgb(255, 248, 234)` | `--color-peach-light` | Secondary background tint, alternated rows | Measured in CSS |
| `color-bg-peach-warm` | `#FFF1D8` | `rgb(255, 241, 216)` | `--color-peach-warm` | Active filter pill, letter paper background | Measured in CSS |
| `color-bg-cream` | `#FBF7F0` | `rgb(251, 247, 240)` | `--color-cream` | Outer gutter background | Measured in CSS |

### Accent & Functional Colors
| Token Name | Hex Code | RGB Value | CSS Variable / Tailwind Class | Intended Purpose | Measured In |
|---|---|---|---|---|---|
| `color-accent-amber` | `#F2BE6B` | `rgb(242, 190, 107)` | `--color-amber` | Sun disc, star twinkles, warm highlights | Measured in CSS |
| `color-accent-amber-light`| `#FBE3B4` | `rgb(251, 227, 180)` | `--color-amber-light` | Sun glow ring, subtle card border | Measured in CSS |
| `color-accent-green` | `#1F7A4D` | `rgb(31, 122, 77)` | `--color-green` / `bg-forest` | WhatsApp CTA button, health badge background | Measured in computed styles |
| `color-accent-green-dark`| `#1F5D3A` | `rgb(31, 93, 58)` | `--color-green-dark` | WhatsApp button hover / active state | Measured in CSS |
| `color-accent-sky` | `#BFDDF5` | `rgb(191, 221, 245)` | `--color-sky` | Daytime hero horizon sky tint | Measured in CSS |
| `color-accent-blue` | `#2F6E9E` | `rgb(47, 110, 158)` | `--color-sky-dark` | Sky accents and airplane trajectory line | Measured in CSS |
| `color-alert-red` | `#B3261E` | `rgb(179, 38, 30)` | `--color-red` | "GONE HOME" rubber stamp, error notices | Measured in CSS |
| `color-alert-red-light`| `#FDE7E5` | `rgb(253, 231, 229)` | `--color-red-light` | Gone stamp background tint | Measured in CSS |

---

## 2. Typography Tokens

The site relies on three complementary Google variable font families loaded via local WOFF2 files:

### Font Families
1. **Display Serif (`Fraunces`):**
   - CSS Definition: `font-family: Fraunces, "Fraunces Fallback", ui-serif, Georgia, serif;`
   - Weight Range: 100 to 900 (Used predominantly in **800** bold display)
   - Roles: Main headings (H1, H2), hero title, puppy names, prominent numbers
2. **Body Sans (`Figtree`):**
   - CSS Definition: `font-family: Figtree, "Figtree Fallback", ui-sans-serif, system-ui, sans-serif;`
   - Weight Range: 300 to 900 (Used in **400**, **500**, **620**, **650**)
   - Roles: Navigation links, body copy, specification keys, button labels, footer
3. **Playful Handwritten Marker (`Shantell Sans`):**
   - CSS Definition: `font-family: "Shantell Sans", "Shantell Sans Fallback", cursive;`
   - Weight Range: 300 to 800 (Used in **500** and **600**)
   - Roles: Storybook accent notes, stickers, captions, whimsical commentary

### Measured Type Scale Matrix
| Role | Element | Font Family | Size (Desktop) | Weight | Line Height | Letter Spacing | Color |
|---|---|---|---|---|---|---|---|
| Hero Display | `h1.tp-hero__title` | Fraunces | `99px` | 800 | `91.08px` (0.92) | `-2.475px` (-0.025em) | `#2A170E` |
| Page Display | `h1.tp-title` | Fraunces | `64px` - `72px` | 800 | `68px` | `-1.8px` | `#2A170E` |
| Section Head | `h2` | Fraunces | `92.16px` / `48px` | 800 | `84.78px` / `52px` | `-2.304px` | `#2A170E` |
| Card Title | `h3` | Fraunces | `28px` - `32px` | 700 | `34px` | `-0.5px` | `#2A170E` |
| Story Accent | `p.tp-note` | Shantell Sans | `23.2px` | 500 | `37.12px` (1.6) | Normal | `#8E3F15` |
| Body Text | `p` | Figtree | `17px` | 400 | `27.2px` (1.6) | Normal | `#5A3A28` |
| Button CTA | `button, a.btn` | Figtree | `15.2px` | 650 | `16.72px` (1.1) | Normal | `#FFFFFF` |
| Nav Link | `.tp-nav-link` | Figtree | `16px` | 620 | `25.6px` | Normal | `#A24A1A` |
| Small Badge | `.tp-badge` | Figtree | `12px` - `13px` | 600 | `16px` | `+0.5px` | Varied |

---

## 3. Spacing, Layout & Grid Tokens

### Container Constraints
- **Ultra-wide Max Width:** `110rem` (`1760px`) with `.gutter`
- **Standard Max Width:** `96rem` (`1536px`)
- **Reading / Form Max Width:** `48rem` (`768px`) to `56rem` (`896px`)
- **Gutter Padding (Desktop):** `56px` (`3.5rem`) horizontal
- **Gutter Padding (Tablet):** `32px` (`2rem`) horizontal
- **Gutter Padding (Mobile):** `16px` - `20px` (`1rem` - `1.25rem`) horizontal

### Responsive Breakpoints (Tailwind V3/V4 Spec)
- **sm:** `640px`
- **md:** `768px` (Tablet threshold, mobile menu transitions to desktop nav)
- **lg:** `1024px` (Laptop threshold, 3-column grids active)
- **xl:** `1280px` (Desktop layout, full scene illustrations active)
- **2xl:** `1536px` (Large display layout)

### Border Radii
- **Pill / Circular:** `9999px` (Buttons, filter pills, badge tags)
- **Large Card:** `1.5rem` (`24px`) to `2rem` (`32px`) (Sections, containers)
- **Door / Polaroid:** `0.9rem` (`14px`) to `1rem` (`16px`) (Puppy photo frames)
- **Arched Top Door:** `100px 100px 14px 14px` (Door cards `.tp-door`)

### Shadow Tokens (Hard Playful Offset Shadows)
- **CTA Button Shadow:** `0px 8px 0px -2.4px #2A170E`
- **Card Offset Shadow:** `0px 10px 0px -2px rgba(42, 23, 14, 0.15)`
- **Polaroid Photo Shadow:** `0px 12px 24px -6px rgba(42, 23, 14, 0.12)`
