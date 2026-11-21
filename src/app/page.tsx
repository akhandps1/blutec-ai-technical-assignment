import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  return (
    <main id="main" className="tp-page flex-1">
      {/* Top Header Placeholder */}
      <header className="sticky top-0 z-40 bg-milk/90 backdrop-blur-md border-b border-cocoa/10">
        <div className="max-w-screen-wide mx-auto px-6 lg:px-14 h-19 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <Image src="/assets/logos/logo.png" alt="TeddyPups Logo" fill className="object-contain" priority />
            </div>
            <span className="font-fraunces font-bold text-2xl text-cocoa">TeddyPups</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {siteConfig.navItems.map((item) => (
              <Link key={item.href} href={item.href} className="font-figtree font-medium text-terracotta-dark hover:text-terracotta transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-forest text-white font-figtree font-semibold text-sm shadow-hard-offset hover:bg-forest-dark transition-all"
          >
            WhatsApp us
          </a>
        </div>
      </header>

      {/* Hero Scene Placeholder */}
      <section className="tp-scene tp-hero relative py-20 lg:py-32 px-6 lg:px-14 max-w-screen-wide mx-auto">
        <div className="max-w-3xl">
          <p className="font-shantell font-medium text-terracotta-cinnamon text-xl mb-4">
            hand-raised & vet-checked in Dubai
          </p>
          <h1 className="font-fraunces font-extrabold text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95] text-cocoa mb-6 tracking-tight">
            Premium teacup<br />puppies in Dubai
          </h1>
          <p className="font-figtree text-lg md:text-xl text-cocoa-light mb-8 max-w-xl">
            Healthy, socialized, miniature puppies ready to meet you in Dubai or travel to your family worldwide.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/puppies"
              className="px-6 py-3.5 rounded-full bg-forest text-white font-figtree font-semibold shadow-hard-offset hover:bg-forest-dark transition-all"
            >
              Meet available puppies
            </Link>
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full border-2 border-cocoa text-cocoa font-figtree font-semibold hover:bg-cocoa/5 transition-colors"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
