# Complete UI/UX Design System Specification

## 1. Aesthetic Identity & Theme
TeddyPups U.A.E. embodies a **whimsical luxury storybook aesthetic**. It artfully fuses warm earthy tones (Cocoa, Terracotta, Milk, Peach) with handcrafted organic shapes (scalloped hem dividers, rubber stamp badges, polaroids, arched door frames) and micro-animated storybook mascots.

The resulting experience conveys high-end boutique trust, ethical veterinary rigor, and adorable warmth.

---

## 2. Core Design Components

### A. The Scalloped Header & Hem
- Fixed / sticky top navigation with blur backdrop filter (`backdrop-blur-md`).
- Lower border features an organic wavy/scalloped hem created with SVG path repetition (`#tp-curtain-scallop`).
- Nav links display a whimsical paw print indicator on hover.

### B. Arched Door Cards (`.tp-door`)
- Used exclusively on the Available Puppies catalog.
- Shape: Arched top with straight bottom (`border-radius: 100px 100px 14px 14px`).
- Depth: 3D perspective with Y-axis swing on cursor hover (`transform: rotateY(-38deg)`).
- Content: Photo, name plate badge, breed, age, and location tag.

### C. Polaroid Cards (`.tp-polaroid`)
- Used on Happy Families and Gone Home galleries.
- Heavy white border (`12px - 16px` padding) with photo cutout.
- Playful random tilt angle (`--tilt: -3deg to +3deg`).
- Red rubber stamp mark (`tp-gone-stamp`) for adopted puppies.

### D. Storybook Letterform (`.tp-letterform`)
- Styled like high-grade stationery paper with postage stamp graphic.
- Input fields appear as underlines and lined writing paper.
- Submitting triggers an envelope folding animation sequence.

### E. The Animated Mascot Runner
- Hand-crafted SVG / DOM vector puppy character.
- Runs across section transitions leaving fading paw prints in its wake.
