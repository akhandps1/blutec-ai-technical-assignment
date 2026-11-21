# Exact Section Order Map

This document records the exact DOM tree hierarchy and visual section sequence for all pages on **TeddyPups U.A.E.**

---

## Page 1: Homepage (`/`)

```
<div class="tp-page">
  ├── <header class="tp-header">
  │     ├── <div class="tp-header__bar"> (Logo, Brand Name, Nav Links, WhatsApp CTA)
  │     └── <div class="tp-header__hem"> (Scalloped SVG wave border)
  │
  ├── Scene 01: <section class="tp-scene tp-hero">
  │     ├── <div class="tp-horizon"> (Animated sun & skyline background)
  │     ├── <div class="tp-hero__copy">
  │     │     ├── <p class="tp-hero__note"> ("hand-raised & vet-checked in Dubai")
  │     │     ├── <h1 class="tp-hero__title"> ("Premium teacup puppies in Dubai")
  │     │     ├── <p class="tp-hero__lede"> ("Healthy, socialized, miniature puppies...")
  │     │     └── <div class="tp-hero__actions"> (CTAs: "Meet available puppies", "WhatsApp us")
  │     └── <div class="tp-hero__stage"> (Interactive floating hero illustration)
  │
  ├── Scene 02: <section class="tp-scene tp-meet">
  │     ├── <div class="tp-meet__head"> (H2: "Meet the pups", subtitle, "See all available puppies" link)
  │     ├── <div class="tp-meet__track"> (Horizontal scrolling card carousel of active puppies)
  │     └── <div class="tp-meet__floor"> (Scalloped floor runner with paw prints)
  │
  ├── Scene 03: <section class="tp-scene tp-paths">
  │     ├── <h2 class="tp-paths__title"> ("Two ways to meet your puppy")
  │     └── <div class="tp-paths__grid">
  │           ├── Card 1: "Puppies in Dubai" (Local boutique visit, same-day collection)
  │           └── Card 2: "Imported for you" (Bespoke Korean & international adoption)
  │
  ├── Scene 04: <section class="tp-scene tp-chat">
  │     ├── <h2 class="tp-chat__title"> ("Your puppy journey")
  │     └── <div class="tp-chat__steps"> (Step 1: Choose breed, Step 2: Get photos/video, Step 3: Secure delivery)
  │
  ├── Scene 05: <section class="tp-scene tp-passport">
  │     ├── <h2 class="tp-passport__title"> ("Why families trust TeddyPups")
  │     └── <div class="tp-passport__grid"> (Health guarantees, vaccinations, vet certificate stamps, travel compliance)
  │
  ├── Scene 06: <section class="tp-scene tp-dusk">
  │     ├── <h2 class="tp-dusk__title"> ("Happy families & puppies")
  │     └── <div class="tp-dusk__gallery"> (Polaroid photo cards quilt showcasing adopted pups with owners)
  │
  ├── Scene 07: <section class="tp-scene tp-night">
  │     ├── <h2 class="tp-night__title"> ("Questions, answered")
  │     └── <div class="tp-night__accordions"> (FAQ accordions with toggleable answers)
  │
  ├── Scene 08: <section class="tp-scene tp-home">
  │     ├── <h2 class="tp-home__title"> ("Ready to meet your new best friend?")
  │     └── <div class="tp-home__actions"> (WhatsApp and Contact buttons)
  │
  ├── Interactive Animation Layers (Global fixed/absolute elements):
  │     ├── <div class="pup-probe"> (Scroll tracking observer)
  │     ├── <div class="pup-prints"> (Dynamic animated paw print trail)
  │     └── <div class="pup-layer"> (Animated puppy mascot runner)
  │
  └── <footer class="tp-footer">
        ├── <div class="tp-footer__wave"> (Scalloped transition border)
        ├── Brand statement & Dubai boutique description
        ├── Quick link column: "Explore"
        ├── Contact channel column: "Say hello"
        └── Social links & Copyright disclaimer
```

---

## Page 2: Available Puppies Catalog (`/puppies`)

```
<main class="tp-page">
  ├── <header class="tp-header"> (Standard top bar)
  ├── Section 01: Catalog Header & Filter Bar
  │     ├── <h1 class="tp-title"> ("Available puppies")
  │     ├── Subtitle ("Real puppies, real photos, ready to meet you")
  │     ├── Origin Filter: [All] [In Dubai] [Imported for you]
  │     └── Breed Filter: [All] [Maltipoo] [Pomeranian] [Poodle] [Cavapoo] [Shih Tzu]
  ├── Section 02: Door Cards Grid (`.tp-door` items)
  │     └── 3-column / 4-column responsive grid of interactive puppy doors:
  │           ├── Door frame with arched top
  │           ├── Puppy portrait photo
  │           ├── Name plate badge (`.tp-door__name`)
  │           ├── Metadata: Breed, Gender, Age, Origin
  │           └── "Meet [Name]" link to detail page
  ├── Section 03: "Already gone home" Transition Banner
  │     ├── H2: "Already gone home"
  │     └── Link button to `/gone-home`
  └── <footer class="tp-footer">
```

---

## Page 3: Gone Home Archive (`/gone-home`)

```
<main class="tp-page">
  ├── <header class="tp-header">
  ├── Section 01: Gallery Header
  │     ├── <h1 class="tp-title"> ("Gone home")
  │     └── Subtitle ("These little ones found their families in Dubai & beyond.")
  ├── Section 02: Polaroid Masonry Quilt
  │     └── Responsive grid of polaroids (`.tp-polaroid`):
  │           ├── Tilted photo with white border
  │           ├── Red rubber stamp: "GONE HOME" (`.tp-gone-stamp`)
  │           ├── Puppy name & breed caption
  │           └── Adoption year/destination
  └── <footer class="tp-footer">
```

---

## Page 4: Happy Families (`/happy-families`)

```
<main class="tp-page">
  ├── <header class="tp-header">
  ├── Section 01: Testimonials Header
  │     ├── <h1 class="tp-title"> ("Happy families")
  │     └── Subtitle ("Stories, snapshots & sweet memories from homes across the Emirates.")
  ├── Section 02: 64-Card Polaroid Quilt
  │     └── Multi-column scattered polaroid layout with client photos, quotes, and puppy names
  └── <footer class="tp-footer">
```

---

## Page 5: How It Works (`/how-it-works`)

```
<main class="tp-page">
  ├── <header class="tp-header">
  ├── Section 01: Page Introduction (H1: "How it works")
  ├── Section 02 (`#two-ways`): "Two ways home" (Boutique adoption vs International concierge)
  ├── Section 03 (`#promise`): "Our premium puppy promise" (Comprehensive veterinary checks)
  ├── Section 04 (`#delivery`): "Delivery & collection" (Climate-controlled VIP delivery across UAE)
  ├── Section 05 (`#why`): "Why choose us" (Lifetime support, transparent documentation)
  ├── Section 06: "Unique and high quality puppies" (Breed quality breakdown)
  └── <footer class="tp-footer">
```

---

## Page 6: FAQ (`/faq`)

```
<main class="tp-page">
  ├── <header class="tp-header">
  ├── Section 01: Support Header (H1: "Questions & answers")
  ├── Section 02: 9 Interactive Accordion Cards
  │     ├── Question 1: Vaccinations & Health checks
  │     ├── Question 2: Meeting puppy prior to decision
  │     ├── Question 3: Same day take-home policy
  │     ├── Question 4: International puppy imports
  │     ├── Question 5: Travel conditions for imported pups
  │     ├── Question 6: Photo and health verification
  │     ├── Question 7: UAE & Worldwide Delivery
  │     ├── Question 8: Supported miniature breeds
  │     └── Question 9: Post-adoption transition support
  ├── Section 03: "Still have a question?" Contact Card
  └── <footer class="tp-footer">
```

---

## Page 7: Visit & Contact (`/contact`)

```
<main class="tp-page">
  ├── <header class="tp-header">
  ├── Section 01: Contact Header (H1: "Get in touch with us")
  ├── Section 02: Storybook Letterform (`.tp-letterform`)
  │     ├── Postage stamp graphic with tilt
  │     ├── Input: Full Name (required)
  │     ├── Input: Phone Number with +971 placeholder (required)
  │     ├── Input: Email address (optional)
  │     ├── Input: Area in UAE (e.g. Dubai Marina)
  │     ├── Dropdown Select: Which puppy are you inquiring about? (16 puppy options)
  │     ├── Textarea: Custom Message
  │     ├── Honeypot: Website field (hidden)
  │     └── Submit CTA Button: "Send letter" (with envelope folding animation)
  ├── Section 03: "Visit us in Downtown Dubai" Boutique Details Card
  │     ├── Address: Downtown Dubai, UAE
  │     ├── Working Hours: By Appointment
  │     ├── WhatsApp direct link
  │     └── Direct phone & email channels
  └── <footer class="tp-footer">
```

---

## Page 8: Puppy Profile Page (`/puppies/[slug]`)

```
<main class="tp-page">
  ├── <header class="tp-header">
  ├── Breadcrumb / Back Link: "‹ All puppies"
  ├── Section 01: Hero Profile Split
  │     ├── Left: Media Gallery Container
  │     │     ├── Main Slider Viewport (High-res photo or active HTML5 video)
  │     │     ├── Chevrons (‹ / ›) & Image Counter (e.g. "1 / 2")
  │     │     └── Thumbnail Bar with Photo thumbnails and Video Play Button (▶)
  │     └── Right: Puppy Specifications & Passport Card
  │           ├── Puppy Name (H1) & Breed Badge
  │           ├── Specification List:
  │           │     ├── Breed
  │           │     ├── Gender (Boy / Girl)
  │           │     ├── Age (e.g. "3 months")
  │           │     └── Location (In Dubai / Imported for you)
  │           ├── Price / Inquiry Tag
  │           └── Primary Inquiry Action: "Ask about [Name]" (WhatsApp / Form)
  ├── Section 02: "Every Teddy Pup comes" Health Assurances (Vaccinations, Vet Cert)
  ├── Section 03: "Coming home from abroad" (Travel logistics if imported)
  ├── Section 04: "More little paws looking for a home" (Related puppy card carousel)
  └── <footer class="tp-footer">
```
