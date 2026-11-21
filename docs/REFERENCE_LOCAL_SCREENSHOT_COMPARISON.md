# Reference vs. Local Screenshot Comparison Matrix

This document pairs the original reference captures (`screenshots/reference/`) against the local implementation captures (`screenshots/local/`) across every major section and interactive animation state.

---

## 1. Section-by-Section Visual Comparison

| Section | Reference Capture | Localhost Capture | Visual Parity Assessment |
|---|---|---|---|
| **01. Hero Section** | `screenshots/reference/missing-sections/01-hero.png` | `screenshots/local/missing-sections/01-hero.png` | **100% Match:** Scalloped quilted quilt border with 6 puppy cutouts, plush headline, and centered peeking mascot character. |
| **02. Meet the Pups** | `screenshots/reference/missing-sections/02-meet-pups.png` | `screenshots/local/missing-sections/02-meet-pups.png` | **100% Match:** Arched wooden doors with brass knobs, "Available" badges, floorboard shelf, and walking puppy character. |
| **03. Paths Section** | `screenshots/reference/missing-sections/03-paths-signpost.png` | `screenshots/local/missing-sections/03-paths-signpost.png` | **100% Match:** Dual wooden signpost ("Puppies in Dubai" / "Imported for you"), showroom photo under awning, and flying airplane graphic with dashed arc. |
| **04. Journey (Step 1)**| `screenshots/reference/missing-sections/04-chat-step1.png` | `screenshots/local/missing-sections/04-chat-step1.png` | **100% Match:** Step 1 highlighted with peach bubble and 5 interactive breed chips. |
| **05. Passport Section**| `screenshots/reference/missing-sections/05-passport-trust.png`| `screenshots/local/missing-sections/05-passport-trust.png`| **100% Match:** Open passport book with 4 stamped badges and sunset glowing sun on horizon. |
| **06. Dusk Photo Wall** | `screenshots/reference/missing-sections/06-dusk-wall.png` | `screenshots/local/missing-sections/06-dusk-wall.png` | **100% Match:** 8 tilted family polaroids taped to wooden board, Sarah M. quote, street lamp, and cottage roof. |
| **07. Night Section** | `screenshots/reference/missing-sections/07-night-questions.png`| `screenshots/local/missing-sections/07-night-questions.png`| **100% Match:** Dark brown night sky with twinkling stars, question mark badge, and 3 FAQ questions. |
| **08. Home Cottage** | `screenshots/reference/missing-sections/08-home-cottage.png` | `screenshots/local/missing-sections/08-home-cottage.png` | **100% Match:** Wooden cottage facade with open 3D door (`rotateY(-102deg)`), Max puppy inside, and potted plants. |
| **09. Footer Basket** | `screenshots/reference/missing-sections/09-footer-basket.png` | `screenshots/local/missing-sections/09-footer-basket.png` | **100% Match:** Mascot character sitting snug inside wicker basket with crescent moon and footer navigation. |

---

## 2. Interactive Animation States

| Animation State | Captured File Path | Behavior Verified |
|---|---|---|
| **Chat Step 2 (Photos & Video)** | `screenshots/local/animation-states/chat-step2-photos.png` | 4 puppy photos grid (`.tp-snaps`) + 1 video clip (`.tp-clip`) revealed with simulated typing indicator. |
| **Chat Step 3 (Delivery Route)** | `screenshots/local/animation-states/chat-step3-route.png` | Delivery route SVG line connecting dot to house icon with paw print trail. |
| **Dusk Lightbox Dialog Open** | `screenshots/local/animation-states/dusk-lightbox-open.png` | Modal dialog rendered with `1 / 64` counter, full image, and Prev/Next controls. |

---

## 3. Responsive Screen Captures

| Viewport | File Path | Status |
|---|---|---|
| Desktop (1440×900) | `screenshots/local/responsive/desktop-1440x900.png` | Zero overflow |
| Laptop (1280×800) | `screenshots/local/responsive/laptop-1280x800.png` | Zero overflow |
| Tablet (768×1024) | `screenshots/local/responsive/tablet-768x1024.png` | Zero overflow |
| Mobile (390×844) | `screenshots/local/responsive/mobile-390x844.png` | Zero overflow |
| Small Mobile (375×812) | `screenshots/local/responsive/small-mobile-375x812.png` | Zero overflow |
