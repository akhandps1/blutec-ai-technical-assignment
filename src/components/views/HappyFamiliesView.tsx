"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import momentsData from "@/data/happy_families_moments.json";

interface MomentItem {
  index: number;
  style: string;
  caption: string;
  imgSrc: string;
  originalUrl: string;
  alt: string;
}

export default function HappyFamiliesView() {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const moments: MomentItem[] = momentsData as MomentItem[];

  const openLightbox = (index: number) => {
    setActivePhoto(index);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
  };

  const closeLightbox = useCallback(() => {
    setActivePhoto(null);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
  }, []);

  const showNext = useCallback(() => {
    setActivePhoto((prev) => (prev !== null ? (prev + 1) % moments.length : 0));
  }, [moments.length]);

  const showPrev = useCallback(() => {
    setActivePhoto((prev) =>
      prev !== null ? (prev - 1 + moments.length) % moments.length : moments.length - 1
    );
  }, [moments.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhoto === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhoto, closeLightbox, showNext, showPrev]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) showPrev();
      else showNext();
    }
    touchStartX.current = null;
  };

  // Parse CSS variables from inline string like "--tilt:-2.2deg;--tape:#f6d79a;--i:0"
  const parseStyle = (styleStr: string): React.CSSProperties => {
    const styleObj: Record<string, string> = {};
    styleStr.split(";").forEach((pair) => {
      const [k, v] = pair.split(":");
      if (k && v) {
        styleObj[k.trim()] = v.trim();
      }
    });
    return styleObj as React.CSSProperties;
  };

  return (
    <main id="main" tabIndex={-1} className="relative pt-[var(--header-h)] outline-none">
      <div data-page="families" className="tp-page">
        <section aria-labelledby="families-title" className="tp-memories">
          <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
            {/* Header */}
            <div className="tp-memories__head">
              <div>
                <p className="font-scrawl text-lg text-toffee-ink" data-reveal="true">
                  our wall of happy endings
                </p>
                <h1
                  id="families-title"
                  className="font-plush text-giant tp-memories__title flex items-center gap-3 flex-wrap"
                  data-reveal="true"
                >
                  Happy families
                  <svg
                    viewBox="0 0 48 44"
                    className="tp-memories__heart w-8 h-8 text-toffee-deep inline-block"
                    aria-hidden="true"
                  >
                    <path
                      d="M24 40C10 30 4 22 4 14.5 4 8.7 8.6 4 14.3 4c4.1 0 7.6 2.4 9.7 6 2.1-3.6 5.6-6 9.7-6C39.4 4 44 8.7 44 14.5 44 22 38 30 24 40z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </h1>
                <p className="text-lede mt-6 max-w-[50ch] text-cocoa-soft" data-reveal="true">
                  Nothing makes us happier than seeing our puppies in loving homes! Here are some
                  beautiful moments shared by our amazing clients after welcoming their furry
                  friends.
                </p>
                <p className="font-scrawl mt-5 text-lg text-toffee-ink" data-reveal="true">
                  64 moments and counting
                </p>
              </div>

              {/* Testimonial Note */}
              <figure className="tp-memories__note" data-reveal="true">
                <span
                  aria-hidden="true"
                  className="tp-tape tp-tape--center"
                  style={{ "--tape": "#cfe5f6" } as any}
                />
                <blockquote className="font-plush-text text-cocoa">
                  “TeddyPups truly made our dream a reality. They supported us at every step of
                  the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely
                  perfect. Having 24/7 support throughout the process gave us complete peace of
                  mind.”
                </blockquote>
                <figcaption className="font-scrawl text-toffee-ink mt-3">
                  Sarah M., Dubai, UAE
                </figcaption>
              </figure>
            </div>

            {/* 64 Polaroid Grid Wall */}
            <div className="mt-16 md:mt-20">
              <ul className="tp-wall" aria-label="Photos from TeddyPups families">
                {moments.map((m, idx) => (
                  <li
                    key={idx}
                    className="tp-wall__item"
                    data-reveal="true"
                    style={{ "--d": `${idx * 15}ms` } as any}
                  >
                    <button
                      type="button"
                      className="tp-wall__print text-left w-full transition-transform hover:-translate-y-1 hover:rotate-1 duration-200"
                      aria-label={`Open photo ${idx + 1} of ${moments.length}`}
                      onClick={() => openLightbox(idx)}
                    >
                      <span className="tp-polaroid block" style={parseStyle(m.style)}>
                        <span aria-hidden="true" className="tp-tape tp-tape--center" />
                        <span className="tp-polaroid__photo block relative overflow-hidden bg-[#e8c8a8]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            alt={m.alt || "A happy TeddyPups family with their new puppy"}
                            src={m.originalUrl}
                            loading={idx < 8 ? "eager" : "lazy"}
                            className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </span>
                        <span className="tp-polaroid__caption font-scrawl text-center block mt-2 text-sm text-cocoa-soft min-h-[1.2rem]">
                          {m.caption}
                        </span>
                      </span>

                      {/* Paw Icon */}
                      <svg
                        viewBox="0 0 64 64"
                        className="tp-wall__paw w-5 h-5 text-toffee opacity-40 mx-auto mt-2"
                        aria-hidden="true"
                        fill="currentColor"
                      >
                        <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Mascot Section */}
            <div className="tp-memories__foot mt-20 flex justify-center">
              <div className="pup-buddy w-36 md:w-44" data-facing="left" data-live="">
                <svg
                  viewBox="0 0 300 240"
                  role="img"
                  aria-label="Teddy, admiring the wall"
                  focusable="false"
                  style={{ overflow: "visible" }}
                >
                  <g data-p="root" transform="translate(300 0) scale(-1 1)">
                    <ellipse
                      data-p="shadow"
                      cx="150"
                      cy="230"
                      rx="92"
                      ry="7"
                      fill="#2a170e"
                      opacity="0.12"
                    />
                    <path
                      d="M76.8 175.6Q69.0 167.9 78.2 160.7Q76.6 151.8 90.3 147.3Q95.2 138.9 110.9 137.9Q121.6 131.3 136.7 134.0Q151.1 130.5 162.9 136.4Q178.7 136.4 185.3 144.5Q199.7 148.2 199.7 157.1Q210.3 163.7 203.9 171.9Q208.7 180.4 197.0 186.3Q195.3 195.2 180.3 198.0Q172.3 205.7 156.6 204.8Q143.7 210.0 130.0 205.6Q114.5 207.4 105.1 200.2Q89.7 198.3 86.3 189.6Q73.6 184.3 76.8 175.6Z"
                      fill="#f2be6b"
                      stroke="#2a170e"
                      strokeWidth="3.4"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    <g transform="translate(212 90)">
                      <circle cx="0" cy="0" r="42" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" />
                      <circle cx="-14" cy="-4" r="5" fill="#2a170e" />
                      <circle cx="14" cy="-4" r="5" fill="#2a170e" />
                      <path d="M-6 8 Q0 12 6 8" stroke="#2a170e" strokeWidth="3" fill="none" strokeLinecap="round" />
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Lightbox Modal Dialog */}
        {activePhoto !== null && (
          <dialog
            ref={dialogRef}
            aria-label="Photo viewer"
            className="fixed inset-0 z-50 m-0 h-dvh max-h-none w-screen max-w-none bg-cocoa/95 p-0 text-milk backdrop:bg-cocoa/70 flex flex-col"
            open
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between gap-4 px-4 py-3 bg-cocoa/40 z-10">
              <p className="font-scrawl text-lg text-milk">
                {activePhoto + 1} / {moments.length}
              </p>
              <button
                type="button"
                onClick={closeLightbox}
                className="h-11 rounded-full bg-milk px-5 font-semibold text-cocoa hover:bg-amber transition-colors"
                aria-label="Close photo viewer"
              >
                Close
              </button>
            </div>

            {/* Central Stage */}
            <div
              className="relative flex-1 overflow-hidden flex items-center justify-center p-4 cursor-pointer"
              onClick={(e) => {
                if (e.target === e.currentTarget) closeLightbox();
              }}
            >
              <div className="relative max-w-4xl max-h-[75vh] w-full h-full flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={moments[activePhoto].alt || `Photo ${activePhoto + 1} from TeddyPups families`}
                  src={moments[activePhoto].originalUrl}
                  className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl transition-opacity duration-200"
                />
              </div>
            </div>

            {/* Bottom Navigation Controls */}
            <div className="flex justify-center gap-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-3 bg-cocoa/40 z-10">
              <button
                type="button"
                onClick={showPrev}
                className="h-12 rounded-full border-2 border-milk px-6 font-semibold text-milk hover:bg-milk hover:text-cocoa transition-colors"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={showNext}
                className="h-12 rounded-full bg-honey px-6 font-semibold text-cocoa hover:bg-amber transition-colors"
              >
                Next
              </button>
            </div>
          </dialog>
        )}
      </div>
    </main>
  );
}
