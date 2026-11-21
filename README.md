# TeddyPups U.A.E. — Production Website Reproduction

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
[![React 18](https://img.shields.io/badge/React-18.3-blue?logo=react)](https://react.dev/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS 3](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An exact, evidence-based reverse-engineered production reproduction of **TeddyPups U.A.E.** ([https://puppy.instabizweb.com/](https://puppy.instabizweb.com/)), developed for the **Blutec AI Technical Assignment**.

---

## 🔗 Quick Links
- **GitHub Repository:** [https://github.com/akhandps1/blutec-ai-technical-assignment](https://github.com/akhandps1/blutec-ai-technical-assignment)
- **Original Reference Website:** [https://puppy.instabizweb.com/](https://puppy.instabizweb.com/)
- **Local Test Server:** `http://localhost:3030/`
- **Final Delivery Report:** [docs/FINAL_DELIVERY_REPORT.md](./docs/FINAL_DELIVERY_REPORT.md)
- **Visual QA Report:** [docs/VISUAL_QA_REPORT.md](./docs/VISUAL_QA_REPORT.md)
- **Functional QA Report:** [docs/FUNCTIONAL_QA_REPORT.md](./docs/FUNCTIONAL_QA_REPORT.md)
- **Responsive QA Report:** [docs/RESPONSIVE_QA_REPORT.md](./docs/RESPONSIVE_QA_REPORT.md)
- **Loom Presentation Script:** [docs/LOOM_PRESENTATION_SCRIPT.md](./docs/LOOM_PRESENTATION_SCRIPT.md)
- **20 Technical Interview Q&A:** [docs/INTERVIEW_TECHNICAL_QA.md](./docs/INTERVIEW_TECHNICAL_QA.md)

---

## 🐕 Key Features & Achievements

- **52 Statically Pre-Rendered Pages:** 7 primary marketing pages, 42 individual puppy detail profile pages (`/puppies/[slug]`), and custom 404 page.
- **260 Original Assets Mapped:** 10 local variable WOFF2 fonts, 198 original puppy and family photos, 6 vertical 9:16 MP4 video clips, and 42 native SVG vector graphics.
- **46 Reverse-Engineered CSS Keyframes:** Continuous animated running puppy runner mascot (`PuppyRunner.tsx`), sunset/night twilight with 9 twinkling stars, scalloped header and footer borders, and pinned horizontal corridor treadmill.
- **Real-Time Interactive Catalog:** 11 filter sticker chips on `/puppies` (`Everywhere`, `Imported`, `Korean Teacup`, `Maltipoo`, `Pomeranian`, `Poodle`, `Cavapoo`, `Shih Tzu`, `Boys`, `Girls`, `With video`) with zero layout shift and URL query parameter synchronization.
- **Media Player with Vertical Video Switching:** Puppy profile hero displays photo gallery with counter (`1 / 2`) and dynamically mounts an HTML5 vertical 9:16 video player upon clicking the play thumbnail (`▶`).
- **Storybook Contact Letterform:** Authentic letterform with postage stamp, puppy dropdown (16 options), UAE phone validation (`+971 50 123 4567`), and honeypot spam protection.
- **Flawless Responsive Layouts:** Tested across 5 viewports (1440x900, 1280x800, 768x1024, 390x844, 375x812) with sticky mobile bottom action bar and accessible slide-out navigation drawer.

---

## 🛠 Technology Stack

- **Framework:** Next.js 14 (App Router, Server Components, SSG via `generateStaticParams`)
- **Language:** TypeScript 5.6 (Strict Mode, 0 errors)
- **Styling:** Tailwind CSS V3, PostCSS, Autoprefixer
- **Motion & Interaction:** GSAP 3.12, ScrollTrigger, Framer Motion 11, hardware-accelerated CSS keyframes
- **Fonts:** Self-hosted Google Variable Fonts (`Fraunces`, `Figtree`, `Shantell Sans`)
- **Testing & QA:** Playwright automated multi-viewport regression suite
- **Deployment:** Vercel / GitHub

---

## 📂 Project Architecture

```
blutec-ai-website-clone/
├── .agent/
│   ├── rules/                 # Antigravity agent operational rules
│   │   ├── animation-standards.md
│   │   ├── asset-management.md
│   │   ├── code-quality.md
│   │   ├── reference-fidelity.md
│   │   ├── responsive-design.md
│   │   └── testing-and-git.md
│   └── skills/                # 7 specialized Antigravity agent skills
├── docs/                      # QA and Technical Delivery Reports
│   ├── BUILD_PROGRESS.md      # Live implementation tracker
│   ├── FINAL_DELIVERY_REPORT.md
│   ├── FUNCTIONAL_QA_REPORT.md
│   ├── INTERVIEW_TECHNICAL_QA.md
│   ├── LOOM_PRESENTATION_SCRIPT.md
│   ├── RESPONSIVE_QA_REPORT.md
│   └── VISUAL_QA_REPORT.md
├── public/
│   ├── assets/
│   │   ├── fonts/             # 10 local variable WOFF2 fonts
│   │   ├── images/            # 198 original high-resolution master images
│   │   ├── logos/             # High-res brand logo
│   │   ├── svg/               # 42 standalone SVG components
│   │   └── videos/            # 6 vertical 9:16 MP4 puppy video clips
│   ├── brand -> assets/logos  # Static symlink for direct asset resolution
│   └── media -> assets/images # Static symlink for direct asset resolution
├── scripts/
│   └── verify-clone.js        # Automated multi-viewport test & screenshot runner
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── brand/[...slug]/   # Fallback API route handler
│   │   ├── contact/           # /contact
│   │   ├── faq/               # /faq
│   │   ├── gone-home/         # /gone-home
│   │   ├── happy-families/    # /happy-families
│   │   ├── how-it-works/      # /how-it-works
│   │   ├── media/[...slug]/   # Fallback API route handler
│   │   ├── puppies/           # /puppies catalog & /puppies/[slug] detail
│   │   ├── layout.tsx         # Global layout with Header, Footer, Mascot
│   │   ├── not-found.tsx      # Custom 404 storybook page
│   │   └── page.tsx           # Homepage (8 story scenes)
│   ├── components/            # Modular React components
│   │   ├── animations/        # PuppyRunner.tsx
│   │   ├── layout/            # Header.tsx, Footer.tsx, MobileActionBar.tsx
│   │   └── sections/          # 8 homepage scene modules
│   ├── data/                  # Clean structured JSON page markup
│   ├── styles/                # globals.css & theme-custom.css (46 keyframes)
│   └── config/                # Site navigation & contact metadata
├── tests/
│   └── visual/                # High-res Playwright screenshots across viewports
├── AGENTS.md                  # Autonomous agent behavior guidelines
├── README.md                  # Master documentation
├── package.json
└── tsconfig.json              # Strict TypeScript compiler options
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js `>= 18.18.0` (Recommended: Node 20+)
- npm `>= 9.0.0` or pnpm `>= 8.0.0`

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/akhandps1/blutec-ai-technical-assignment.git
cd blutec-ai-technical-assignment

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit **`http://localhost:3000`** in your browser.

### 3. Production Build & Verification
```bash
# Verify TypeScript types and ESLint
npm run lint
npx tsc --noEmit

# Compile production build (generates 52/52 static pages)
npm run build

# Start production server
npm run start
```

### 4. Run Automated Visual Regression Suite
```bash
# Runs Playwright across Desktop, Laptop, Tablet, and Mobile
node scripts/verify-clone.js
```
Captures full-page screenshots into `tests/visual/`.

---

## 📊 Build & Quality Metrics

```
Route (app)                              Size     First Load JS
┌ ○ /                                    155 B          87.4 kB
├ ○ /_not-found                          155 B          87.4 kB
├ ƒ /brand/[...slug]                     0 B                0 B
├ ○ /contact                             6.42 kB        93.7 kB
├ ○ /faq                                 5.66 kB        92.9 kB
├ ○ /gone-home                           155 B          87.4 kB
├ ○ /happy-families                      155 B          87.4 kB
├ ○ /how-it-works                        155 B          87.4 kB
├ ƒ /media/[...slug]                     0 B                0 B
├ ○ /puppies                             58.9 kB         146 kB
└ ● /puppies/[slug]                      989 B          88.3 kB (42 paths)
+ First Load JS shared by all            87.3 kB
```

---

## 📄 License
This project is developed strictly for educational and technical assignment assessment purposes under the MIT License.
