"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import homeData from "@/data/home_data.json";
import momentsData from "@/data/happy_families_moments.json";

interface MomentItem {
  index: number;
  style: string;
  caption: string;
  imgSrc: string;
  originalUrl: string;
  alt: string;
}

export default function DuskSection() {
  const containerRef = useRef<HTMLDivElement>(null);
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
    if (activePhoto === null) return;
    setActivePhoto((prev) => ((prev ?? 0) + 1) % moments.length);
  }, [activePhoto, moments.length]);

  const showPrev = useCallback(() => {
    if (activePhoto === null) return;
    setActivePhoto((prev) => ((prev ?? 0) - 1 + moments.length) % moments.length);
  }, [activePhoto, moments.length]);

  // Strip empty static dialog from HTML
  const sanitizedHtml = homeData.dusk.replace(/<dialog[\s\S]*?<\/dialog>/, "");

  // Attach click listeners to the 8 polaroid buttons inside the HTML
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const buttons = container.querySelectorAll<HTMLButtonElement>(".tp-photowall__print");
    buttons.forEach((btn, idx) => {
      btn.onclick = (e) => {
        e.preventDefault();
        openLightbox(idx);
      };
    });

    return () => {
      buttons.forEach((btn) => {
        btn.onclick = null;
      });
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhoto === null) return;
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "Escape") closeLightbox();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhoto, closeLightbox, showNext, showPrev]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) showNext();
    else if (diff < -50) showPrev();
    touchStartX.current = null;
  };

  return (
    <>
      <div
        ref={containerRef}
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        suppressHydrationWarning
      />

      {/* Lightbox Modal Dialog */}
      {activePhoto !== null && (
        <dialog
          ref={dialogRef}
          id="tp-lightbox-dialog"
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
                alt={moments[activePhoto]?.alt || `Photo ${activePhoto + 1} from TeddyPups families`}
                src={moments[activePhoto]?.originalUrl || moments[activePhoto]?.imgSrc}
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
    </>
  );
}
