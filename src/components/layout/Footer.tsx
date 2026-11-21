import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Footer() {
  const twinkleStars = [
    { left: "6%", top: "18%", width: 12.6, delay: "0.00s" },
    { left: "14%", top: "42%", width: 8.4, delay: "0.40s" },
    { left: "23%", top: "12%", width: 9.8, delay: "0.80s" },
    { left: "31%", top: "30%", width: 7.0, delay: "1.20s" },
    { left: "44%", top: "9%", width: 11.2, delay: "1.60s" },
    { left: "52%", top: "36%", width: 7.7, delay: "2.00s" },
    { left: "63%", top: "15%", width: 10.5, delay: "2.40s" },
    { left: "71%", top: "40%", width: 7.0, delay: "2.80s" },
    { left: "92%", top: "33%", width: 8.4, delay: "3.20s" },
  ];

  return (
    <footer className="tp-footer relative pb-[calc(var(--bar-h)+2rem)] text-milk md:pb-10 bg-cocoa-dark overflow-hidden">
      {/* Scalloped top hill divider */}
      <svg aria-hidden="true" viewBox="0 0 1440 80" preserveAspectRatio="none" className="tp-footer__hill w-full h-20 text-cocoa-dark fill-current">
        <path d="M0 80V44c120-30 240-44 360-30s240 46 360 34 240-58 360-46 240 40 360 26v52z" />
      </svg>

      {/* Sky Atmosphere: Twinkling stars & Crescent Moon */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-6 h-64 overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {twinkleStars.map((star, idx) => (
            <svg
              key={idx}
              viewBox="0 0 40 40"
              className="tp-twinkle absolute text-amber"
              style={{
                left: star.left,
                top: star.top,
                width: `${star.width}px`,
                animationDelay: star.delay,
              }}
              aria-hidden="true"
            >
              <path d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z" fill="currentColor" />
            </svg>
          ))}
        </div>
        <span className="tp-moon"></span>
      </div>

      <div className="gutter relative mx-auto grid max-w-[110rem] gap-12 pt-20 md:grid-cols-12 md:gap-x-12 md:gap-y-6 md:pt-28 px-6 lg:px-14">
        {/* Brand Statement */}
        <div className="md:col-span-5">
          <p className="font-plush text-4xl text-amber mb-4">Home, at last.</p>
          <p className="max-w-md text-milk/80 leading-relaxed font-figtree">
            TeddyPups U.A.E. is a Dubai-based brand specializing in miniature puppies, offering premium services and worldwide shipping.
          </p>
        </div>

        {/* Teddy Mascot in Woven Basket */}
        <div className="order-last md:order-none md:col-span-5 md:col-start-1 md:row-start-2">
          <div className="tp-basket relative w-72 h-60">
            <svg aria-hidden="true" viewBox="0 0 300 240" className="tp-basket__back w-full h-full">
              <ellipse cx="212" cy="145" rx="96" ry="12" fill="#24130B" opacity="0.6" />
              <path d="M116 145 A96 12 0 0 1 308 145" stroke="#F2BE6B" strokeWidth="2" fill="none" />
            </svg>

            <div className="pup-stop tp-basket__pup absolute inset-0">
              <div className="pup-buddy animate-breathe" data-facing="right">
                <svg viewBox="0 0 300 240" role="img" aria-label="Teddy, sitting snug in his basket" className="w-full h-full">
                  <ellipse cx="150" cy="230" rx="92" ry="7" fill="#2a170e" opacity="0.15" />
                  {/* Pup Head and Snug Body */}
                  <circle cx="212" cy="120" r="32" fill="#e4a352" />
                  <ellipse cx="190" cy="110" rx="10" ry="16" fill="#c2622b" />
                  <ellipse cx="234" cy="110" rx="10" ry="16" fill="#c2622b" />
                  <circle cx="204" cy="116" r="3.5" fill="#2a170e" />
                  <circle cx="220" cy="116" r="3.5" fill="#2a170e" />
                  <ellipse cx="212" cy="124" rx="4.5" ry="3.5" fill="#2a170e" />
                  <path d="M208 127 Q212 131 216 127" stroke="#2a170e" strokeWidth="2" fill="none" />
                </svg>
              </div>
            </div>

            <svg aria-hidden="true" viewBox="0 0 300 240" className="tp-basket__front absolute inset-0 pointer-events-none">
              <path d="M116 145 C118 180 126 214 138 232 L286 232 C298 214 306 180 308 145 A96 12 0 0 1 116 145 Z" fill="#c2622b" opacity="0.9" />
              <path d="M121 178 Q212 197 303 178 M127 206 Q212 223 297 206" stroke="#24130B" strokeWidth="2" fill="none" opacity="0.4" />
            </svg>
          </div>
        </div>

        {/* Explore Navigation Column */}
        <nav aria-label="Footer" className="md:col-span-3 md:col-start-7 md:row-span-2 md:row-start-1">
          <h2 className="font-scrawl text-lg text-amber mb-4">Explore</h2>
          <ul className="space-y-3 font-figtree">
            {siteConfig.footerLinks.map((link) => (
              <li key={link.href}>
                <Link className="font-semibold text-milk/90 underline-offset-4 hover:text-amber hover:underline transition-colors" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Say Hello Column */}
        <div className="md:col-span-3 md:row-span-2 md:row-start-1 font-figtree">
          <h2 className="font-scrawl text-lg text-amber mb-4">Say hello</h2>
          <ul className="space-y-3 text-milk/90">
            <li>
              <a className="font-semibold hover:text-amber transition-colors" href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">
                WhatsApp +971 50 000 0000
              </a>
            </li>
            <li>
              <a className="break-all hover:text-amber transition-colors" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </li>
            <li className="text-milk/70">{siteConfig.address}</li>
          </ul>

          <ul className="mt-6 flex flex-wrap gap-3" aria-label="Social media">
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center rounded-full border-2 border-milk/30 px-4 text-sm font-semibold hover:border-amber hover:text-amber transition-colors">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center rounded-full border-2 border-milk/30 px-4 text-sm font-semibold hover:border-amber hover:text-amber transition-colors">
                TikTok
              </a>
            </li>
            <li>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center rounded-full border-2 border-milk/30 px-4 text-sm font-semibold hover:border-amber hover:text-amber transition-colors">
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Footer Row */}
      <div className="gutter relative mx-auto mt-16 flex max-w-[110rem] flex-col items-start justify-between gap-4 border-t border-milk/15 pt-6 text-sm text-milk/60 md:flex-row md:items-center px-6 lg:px-14">
        <span className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="TeddyPups Small Logo" width="36" height="36" className="size-9" src="/brand/logo.png" />
          &copy; 2026 TeddyPups U.A.E.
        </span>
        <span className="font-scrawl text-base text-amber/80">every puppy is family</span>
      </div>
    </footer>
  );
}
