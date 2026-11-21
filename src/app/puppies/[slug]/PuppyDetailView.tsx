"use client";

import React, { useEffect, useRef } from "react";

interface PuppyDetailViewProps {
  html: string;
}

export default function PuppyDetailView({ html }: PuppyDetailViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const thumbs = container.querySelectorAll<HTMLButtonElement>(
      'button[aria-label*="photo"], button[aria-label*="video"]'
    );
    const mainBox = container.querySelector<HTMLButtonElement>(
      "button.absolute.inset-0.block.size-full"
    );
    const counter = container.querySelector<HTMLSpanElement>(
      "span.self-center.rounded-full.bg-cocoa\\/80"
    );
    const prevBtn = container.querySelector<HTMLButtonElement>('button[aria-label="Previous photo"]');
    const nextBtn = container.querySelector<HTMLButtonElement>('button[aria-label="Next photo"]');

    if (!thumbs.length || !mainBox) return;

    let currentIndex = 0;

    function selectMedia(index: number) {
      if (!mainBox || index < 0 || index >= thumbs.length) return;
      currentIndex = index;

      thumbs.forEach((t, idx) => {
        const isCurrent = idx === currentIndex;
        t.setAttribute("aria-current", isCurrent ? "true" : "false");
        if (isCurrent) {
          t.classList.remove("border-cocoa/30");
          t.classList.add("border-cocoa");
        } else {
          t.classList.remove("border-cocoa");
          t.classList.add("border-cocoa/30");
        }
      });

      if (counter) {
        counter.innerHTML = `${currentIndex + 1} / ${thumbs.length}`;
      }

      const activeThumb = thumbs[currentIndex];
      const isVideo = activeThumb.querySelector("span")?.textContent?.includes("▶") ||
                      activeThumb.getAttribute("aria-label")?.includes("video");

      const thumbImg = activeThumb.querySelector("img");
      const thumbSrc = thumbImg?.getAttribute("src") || "";

      if (isVideo && thumbSrc) {
        const videoSrc = thumbSrc.replace(/f\d+\.jpg$/, ".mp4");
        mainBox.innerHTML = `
          <video controls autoplay playsinline loop class="size-full object-cover">
            <source src="${videoSrc}" type="video/mp4" />
          </video>
        `;
      } else if (thumbSrc) {
        mainBox.innerHTML = `
          <img alt="Puppy photo" class="size-full object-cover" src="${thumbSrc}" />
        `;
      }
    }

    thumbs.forEach((thumb, idx) => {
      thumb.addEventListener("click", () => selectMedia(idx));
    });

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        selectMedia((currentIndex - 1 + thumbs.length) % thumbs.length);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        selectMedia((currentIndex + 1) % thumbs.length);
      });
    }
  }, [html]);

  return (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
