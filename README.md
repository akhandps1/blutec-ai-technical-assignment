# TeddyPups U.A.E. — Website Clone

Production-ready reproduction of **TeddyPups U.A.E.** (`https://puppy.instabizweb.com/`), developed as part of the **Blutec AI Technical Assignment**.

---

## Reference Website
- **Live Reference:** [https://puppy.instabizweb.com/](https://puppy.instabizweb.com/)
- **Brand:** TeddyPups U.A.E. (Dubai, United Arab Emirates)
- **Primary Market:** Premium teacup and miniature puppies in Dubai and international concierge.

---

## Technology Stack
- **Framework:** Next.js 14 (App Router, Server Components & SSG)
- **Language:** TypeScript 5 (Strict Mode)
- **Styling:** Tailwind CSS V3, PostCSS, Autoprefixer
- **Motion & Interaction:** GSAP, GSAP ScrollTrigger, Framer Motion, and pure CSS hardware-accelerated keyframes
- **Icons & Graphics:** Inline SVG vector graphics + Lucide React fallback
- **Fonts:** Self-hosted Google Variable Fonts (`Fraunces`, `Figtree`, `Shantell Sans`)
- **Code Quality:** ESLint, Prettier, TypeScript Compiler (`tsc`)
- **Testing:** Playwright (E2E & Visual Regression)
- **Deployment Platform:** Vercel

---

## Project Folder Architecture

\`\`\`
blutec-ai-website-clone/
├── .agent/
│   ├── rules/                 # Antigravity agent operational rules
│   └── skills/                # Antigravity specialized workflow skills
├── docs/
│   └── BUILD_PROGRESS.md      # Live implementation & verification tracker
├── public/
│   └── assets/
│       ├── animations/        # Lottie / CSS animation assets
│       ├── backgrounds/       # Background patterns and gradients
│       ├── fonts/             # 10 WOFF2 self-hosted font files
│       ├── icons/             # Brand favicons and app icons
│       ├── images/            # 198 original high-resolution master images
│       ├── logos/             # Primary brand logos
│       ├── misc/              # Auxiliary files
│       ├── svg/               # 42 standalone vector SVG components
│       └── videos/            # 6 H.264 MP4 puppy profile video clips
├── research/                  # 16 complete reverse engineering reports
├── src/
│   ├── app/                   # Next.js App Router routes
│   │   ├── contact/           # /contact
│   │   ├── faq/               # /faq
│   │   ├── gone-home/         # /gone-home
│   │   ├── happy-families/    # /happy-families
│   │   ├── how-it-works/      # /how-it-works
│   │   ├── puppies/           # /puppies & /puppies/[slug]
│   │   ├── globals.css        # Tailwind styles & 46 custom keyframes
│   │   ├── layout.tsx         # Global HTML & font layout
│   │   ├── not-found.tsx      # Custom 404 storybook page
│   │   └── page.tsx           # Homepage
│   ├── components/            # Reusable UI component modules
│   │   ├── animations/
│   │   ├── cards/
│   │   ├── forms/
│   │   ├── layout/
│   │   ├── navigation/
│   │   ├── sections/
│   │   └── shared/
│   ├── config/                # Site metadata & navigation config
│   ├── features/              # Feature modules (catalog filters, etc.)
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility helpers (cn, formatters)
│   ├── styles/                # CSS modules and variables
│   └── types/                 # Shared TypeScript interfaces
├── tests/                     # E2E and visual tests
├── AGENTS.md                  # Autonomous agent behavior guidelines
├── README.md                  # Project documentation
├── package.json               # Dependency definitions & scripts
└── tsconfig.json              # Strict TypeScript compiler options
\`\`\`

---

## Installation & Setup

### Prerequisites
- Node.js \`>= 18.18.0\` (Recommended: Node 20+)
- npm \`>= 9.0.0\` or pnpm \`>= 8.0.0\`

### Step-by-Step Installation
\`\`\`bash
# 1. Clone repository
git clone <repository-url>
cd blutec-ai-website-clone

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local

# 4. Start local development server
npm run dev
\`\`\`

The application will be available at \`http://localhost:3000\`.

---

## Available Scripts

| Script | Command | Purpose |
|---|---|---|
| \`npm run dev\` | \`next dev\` | Starts Next.js development server with hot-reload |
| \`npm run build\` | \`next build\` | Compiles production-optimized build |
| \`npm run start\` | \`next start\` | Serves production build locally |
| \`npm run lint\` | \`next lint\` | Executes ESLint validation |
| \`npm run format\` | \`prettier --write ...\` | Formats all code with Prettier and Tailwind plugin |
| \`npm run test:e2e\` | \`playwright test\` | Runs full E2E test suite |

---

## Deployment to Vercel

The workspace is pre-configured for zero-configuration deployment to **Vercel**:
1. Connect the GitHub repository in the Vercel Dashboard.
2. Framework Preset: **Next.js**.
3. Root Directory: \`blutec-ai-website-clone\` (or repository root).
4. Environment Variables: Populate \`NEXT_PUBLIC_SITE_URL\` and \`NEXT_PUBLIC_WHATSAPP_PHONE\`.
5. Deploy.
