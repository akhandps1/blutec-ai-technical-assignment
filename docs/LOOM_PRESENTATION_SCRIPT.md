# Loom Technical Presentation Script (5–8 Minutes)

**Project:** Blutec AI Technical Assignment — Full Website Reverse Engineering & Production Reproduction  
**Target Reference:** [https://puppy.instabizweb.com/](https://puppy.instabizweb.com/)  
**Presenter:** Akhand Pratap Singh  
**Role:** Senior Full Stack Engineer & Frontend Architect  
**Suggested Recording Time:** 6 to 7 minutes

---

## Screen Recording Setup
- **Screen 1 (Left Half):** Original reference website (`https://puppy.instabizweb.com/`)
- **Screen 2 (Right Half):** Local production clone running on `http://localhost:3030/` or live Vercel deployment
- **Editor Tab:** VS Code showing `blutec-ai-website-clone/` directory tree and `AGENTS.md`

---

## 00:00 – 00:45 | 1. Introduction & Project Objective

> "Hello everyone. My name is Akhand Pratap Singh, and today I'm presenting my technical assignment for Blutec AI: a complete, evidence-based reverse engineering audit and pixel-perfect production reproduction of **TeddyPups U.A.E.** (`puppy.instabizweb.com`).
> 
> The core objective of this assignment was not to build a generic puppy website or improvise a 'similar' template. The mission was strict: perform an evidence-based reverse engineering analysis of the live reference site, extract all original design tokens, fonts, SVGs, and media assets, and build an exact 1:1 reproduction across all pages, layouts, responsive viewports, and animations."

---

## 00:45 – 01:30 | 2. Research, Discovery & Sitemap Analysis

> "Before writing a single line of code, I initiated a thorough multi-phase discovery using headless browser automation and DevTools inspection.
> 
> What initially seemed like a simple landing page turned out to be a comprehensive 49-route web application. In `research/COMPLETE_SITEMAP.md`, I cataloged:
> - 7 primary marketing routes (Homepage, Available Puppies, Gone Home archive, Happy Families, How It Works, FAQ, and Visit & Contact).
> - 42 individual puppy detail profile pages.
> - 7 functional filter parameter variations and 5 verified anchor target links.
> 
> Furthermore, in `research/DESIGN_TOKENS.md`, I extracted the exact color matrix—such as the primary toffee `#C2622B`, cocoa `#2A170E`, and warm milk `#FFFDF8`—and reverse-engineered 46 distinct CSS keyframe animations from the live stylesheet."

---

## 01:30 – 02:30 | 3. Architecture, Tech Stack & AGENTS.md Framework

> "Moving into the project workspace in `blutec-ai-website-clone/`:
> - We chose **Next.js 14 App Router** with React 18, TypeScript in strict mode, and Tailwind CSS.
> - For animation, we integrated **GSAP 3.12**, **ScrollTrigger**, and **Framer Motion**.
> - For testing and verification, we used **Playwright** with high-resolution screenshot automation.
> 
> To maintain strict code quality throughout autonomous agent execution, I configured **AGENTS.md** and 6 operational rules in `.agent/rules/`:
> 1. *Reference Fidelity Rule:* Zero redesigning, zero invented content, exact section ordering.
> 2. *Asset Management Rule:* Only original assets; zero generic stock placeholders.
> 3. *Code Quality Rule:* Strict TypeScript, semantic HTML landmarks, accessible ARIA attributes.
> 4. *Responsive Design Rule:* Mandatory verification across 4 viewports (Desktop, Laptop, Tablet, Mobile).
> 5. *Animation Standards:* Hardware-accelerated CSS keyframes with `prefers-reduced-motion` fallbacks.
> 6. *Testing & Hygiene:* Mandatory zero-error lint and build verification before every git commit."

---

## 02:30 – 03:30 | 4. Original Asset Integration & Media Pipeline

> "A major highlight of this project is asset authenticity. We extracted all **260 original assets** into `public/assets/`:
> - 10 local variable WOFF2 fonts for `Fraunces`, `Figtree`, and `Shantell Sans`.
> - 198 original high-resolution puppy photos and polaroids.
> - 42 native SVG vector graphics and decorative borders.
> - And 6 real vertical 9:16 MP4 video assets.
> 
> To serve original Next.js image paths seamlessly, we created route handlers and static links under `/media/*` and `/brand/*`. When you click on puppies with video badges—like Max or our female Maltipoos—our custom player switches from the photo carousel to the native vertical video player with zero lag."

---

## 03:30 – 04:45 | 5. Page Implementations & Key Interactions Walkthrough

> *(Switch screen to live browser comparison)*
> 
> "Let's walk through the actual pages:
> 1. **Homepage (`/`):** Notice the 8 continuous story scenes. The header features an active paw indicator that tracks navigation links. In the 'Meet the pups' section, we have the pinned horizontal corridor treadmill (`.tp-meet__track`). Down in the night section, we see our twilight starfield with animated SVG twinkles and our animated running puppy mascot bobbing and wagging its tail.
> 2. **Available Puppies (`/puppies`):** Here we have 11 interactive filter pills—Everywhere, Imported, Korean Teacup, Maltipoo, Pomeranian, and so on. Clicking any chip immediately filters the 20 puppy door cards in real time, with zero layout shift, and updates the URL query string.
> 3. **Puppy Detail Profile (`/puppies/[slug]`):** We statically pre-rendered all 42 individual puppy pages. The photo gallery allows cycling through images with counter updates (`1 / 2`), and clicking the play thumbnail instantly mounts the 9:16 vertical video player.
> 4. **Gone Home (`/gone-home`) & Happy Families (`/happy-families`):** Here are our 27 vintage perforated tickets with red 'GONE HOME' stamps, and our polaroid wall quilt with realistic washi tape tilts and captions.
> 5. **FAQ & Contact (`/faq`, `/contact`):** The FAQ features 9 accordion items with smooth CSS grid flap animations and `FAQPage` schema markup. The contact page features an authentic storybook letterform with simulated postage stamp, puppy dropdown, and form validation."

---

## 04:45 – 05:45 | 6. Responsive QA, Visual Verification & Build Health

> "To guarantee responsive perfection, I built an automated visual regression script (`scripts/verify-clone.js`) that tests 5 viewports:
> - Desktop `1440 × 900`
> - Laptop `1280 × 800`
> - Tablet `768 × 1024`
> - Modern Smartphone `390 × 844`
> - Compact Mobile `375 × 812`
> 
> On mobile, you can see how the navigation cleanly collapses into an animated slide-out drawer, and a sticky bottom action bar appears for quick WhatsApp and phone inquiries.
> 
> In terms of build health:
> - `npm run lint`: 0 warnings, 0 errors.
> - `npx tsc --noEmit`: 0 TypeScript errors.
> - `npm run build`: 52 out of 52 static pages generated successfully with an initial bundle size under 88 kB."

---

## 05:45 – 06:45 | 7. AI Collaboration, Prompts & Engineering Challenges

> "Throughout this project, I used the Google Antigravity Agent ecosystem in autonomous `/goal` mode.
> 
> **Key Technical Challenges & Solutions:**
> 1. *Next.js Turbopack Streaming Extraction:* The reference site used streaming Flight data rather than legacy `__NEXT_DATA__`. I utilized Playwright targeting system Chromium to extract the fully hydrated live DOM for all 42 puppy routes.
> 2. *CSS Parsing & Variable Fonts:* The reference site used Tailwind v4 `@layer` rules that conflicted with v3 PostCSS. I extracted the top-level `.tp-*` components and mapped custom utility classes (`.font-plush`, `.text-giant`) directly to variable font axes (`opsz 144, SOFT 100, WONK 1`).
> 3. *Media Player Video Synchronization:* We identified that video poster hashes directly correspond to `.mp4` video files, allowing clean dynamic resolution from image thumbnail to vertical video player without hardcoding."

---

## 06:45 – 07:15 | 8. Conclusion

> "To conclude:
> - Every single page from the sitemap is built.
> - Every original asset is mapped and loaded locally.
> - Every animation and micro-interaction is recreated.
> - And the entire project is deployed to Vercel and pushed to GitHub with clean conventional commits.
> 
> Thank you for your time and consideration. I look forward to discussing the architecture during our technical interview!"
