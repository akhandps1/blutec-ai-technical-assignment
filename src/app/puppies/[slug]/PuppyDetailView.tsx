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

    const thumbs = Array.from(
      container.querySelectorAll<HTMLButtonElement>(
        "ul[aria-label*='photos'] button, ul[aria-label*='All photos'] button, ul.overflow-x-auto button"
      )
    );
    const mainBox = container.querySelector<HTMLButtonElement>(
      "button.absolute.inset-0.block"
    );
    const counter = container.querySelector<HTMLSpanElement>(
      "span.self-center.rounded-full.bg-cocoa\\/80"
    );
    const prevBtn = container.querySelector<HTMLButtonElement>('button[aria-label="Previous photo"]');
    const nextBtn = container.querySelector<HTMLButtonElement>('button[aria-label="Next photo"]');
    const form = container.querySelector<HTMLFormElement>("form");

    // Extract puppy name
    const h1 = container.querySelector<HTMLElement>("h1");
    const puppyName = h1?.textContent?.trim() || "puppy";

    let currentIndex = 0;

    function getMediaInfo(index: number) {
      const activeThumb = thumbs[index];
      if (!activeThumb) return { isVideo: false, src: "", videoSrc: "", alt: "" };

      const isVideo =
        Boolean(activeThumb.querySelector("span")?.textContent?.includes("▶")) ||
        Boolean(activeThumb.getAttribute("aria-label")?.includes("video"));

      const thumbImg = activeThumb.querySelector("img");
      const thumbSrc = thumbImg?.getAttribute("src") || "";
      const videoSrc = isVideo && thumbSrc ? thumbSrc.replace(/f\d+\.jpg$/, ".mp4") : "";
      const alt = thumbImg?.getAttribute("alt") || `${puppyName} photo`;

      return { isVideo, src: thumbSrc, videoSrc, alt };
    }

    function selectMedia(index: number) {
      if (!mainBox || !thumbs.length || index < 0 || index >= thumbs.length) return;
      currentIndex = index;

      thumbs.forEach((t, idx) => {
        const isCurrent = idx === currentIndex;
        t.setAttribute("aria-current", isCurrent ? "true" : "false");
        if (isCurrent) {
          t.classList.remove("border-cocoa/30");
          t.classList.add("border-toffee-deep", "-rotate-3", "-translate-y-1");
        } else {
          t.classList.remove("border-toffee-deep", "-rotate-3", "-translate-y-1");
          t.classList.add("border-cocoa/30");
        }
      });

      if (counter) {
        counter.innerHTML = `${currentIndex + 1} / ${thumbs.length}`;
      }

      const media = getMediaInfo(currentIndex);

      if (media.isVideo && media.videoSrc) {
        mainBox.innerHTML = `
          <video controls autoplay playsinline loop class="size-full object-cover">
            <source src="${media.videoSrc}" type="video/mp4" />
          </video>
        `;
      } else if (media.src) {
        mainBox.innerHTML = `
          <img alt="${media.alt}" class="size-full object-cover" src="${media.src}" />
        `;
      }

      mainBox.setAttribute(
        "aria-label",
        `Open ${puppyName}, ${media.isVideo ? "video" : "photo"} ${currentIndex + 1} of ${thumbs.length} full screen`
      );
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

    // --- FULL SCREEN LIGHTBOX DIALOG ---
    let dialog = container.querySelector<HTMLDialogElement>("dialog.tp-media-dialog");
    if (!dialog) {
      dialog = document.createElement("dialog");
      dialog.className =
        "tp-media-dialog m-0 h-dvh max-h-none w-screen max-w-none bg-cocoa/95 p-0 text-milk backdrop:bg-cocoa/70";
      dialog.setAttribute("aria-label", `${puppyName} photos`);
      dialog.setAttribute("data-lenis-prevent", "true");
      container.appendChild(dialog);
    }

    function renderDialogContent() {
      if (!dialog) return;
      const media = getMediaInfo(currentIndex);
      const title = `${puppyName}, ${media.isVideo ? "video" : "photo"} ${currentIndex + 1} of ${thumbs.length}`;

      dialog.innerHTML = `
        <div class="flex h-full flex-col">
          <div class="flex items-center justify-between gap-4 px-4 py-3">
            <p class="font-scrawl text-lg">${title}</p>
            <button type="button" class="tp-dialog-close h-11 rounded-full bg-milk px-5 font-semibold text-cocoa">Close</button>
          </div>
          <div class="relative flex-1 touch-pan-y overflow-hidden flex items-center justify-center p-4">
            ${
              media.isVideo && media.videoSrc
                ? `<video src="${media.videoSrc}" controls autoplay playsinline class="size-full object-contain"></video>`
                : `<img src="${media.src}" alt="${media.alt}" class="size-full object-contain" />`
            }
          </div>
          ${
            thumbs.length > 1
              ? `
            <div class="flex justify-center gap-3 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-3">
              <button type="button" class="tp-dialog-prev h-12 rounded-full border-2 border-milk px-6 font-semibold">Previous</button>
              <button type="button" class="tp-dialog-next h-12 rounded-full bg-honey px-6 font-semibold text-cocoa">Next</button>
            </div>
            `
              : ""
          }
        </div>
      `;

      dialog.querySelector(".tp-dialog-close")?.addEventListener("click", () => {
        dialog?.close();
      });

      dialog.querySelector(".tp-dialog-prev")?.addEventListener("click", () => {
        selectMedia((currentIndex - 1 + thumbs.length) % thumbs.length);
        renderDialogContent();
      });

      dialog.querySelector(".tp-dialog-next")?.addEventListener("click", () => {
        selectMedia((currentIndex + 1) % thumbs.length);
        renderDialogContent();
      });
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (!dialog || !dialog.open) return;
      if (e.key === "ArrowLeft") {
        selectMedia((currentIndex - 1 + thumbs.length) % thumbs.length);
        renderDialogContent();
      } else if (e.key === "ArrowRight") {
        selectMedia((currentIndex + 1) % thumbs.length);
        renderDialogContent();
      } else if (e.key === "Escape") {
        dialog.close();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    if (mainBox) {
      mainBox.addEventListener("click", () => {
        renderDialogContent();
        dialog?.showModal();
      });
    }

    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) {
        dialog.close();
      }
    });

    // --- INTERACTIVE ENQUIRY FORM ---
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nameInput = form.querySelector<HTMLInputElement>('input[name="name"]');
        const phoneInput = form.querySelector<HTMLInputElement>('input[name="phone"]');
        const nameVal = (nameInput?.value || "").trim();
        const phoneVal = (phoneInput?.value || "").trim();

        let valid = true;

        if (nameVal.length < 2) {
          valid = false;
          if (nameInput) {
            nameInput.classList.add("border-[#b3261e]");
            nameInput.setAttribute("aria-invalid", "true");
          }
        } else if (nameInput) {
          nameInput.classList.remove("border-[#b3261e]");
          nameInput.setAttribute("aria-invalid", "false");
        }

        if (phoneVal.length < 5) {
          valid = false;
          if (phoneInput) {
            phoneInput.classList.add("border-[#b3261e]");
            phoneInput.setAttribute("aria-invalid", "true");
          }
        } else if (phoneInput) {
          phoneInput.classList.remove("border-[#b3261e]");
          phoneInput.setAttribute("aria-invalid", "false");
        }

        if (!valid) return;

        // Animated confirmation envelope
        const sentDiv = document.createElement("div");
        sentDiv.setAttribute("role", "status");
        sentDiv.className = "tp-sent rounded-[2rem] border-[3px] border-cocoa bg-honey p-8 text-center";
        sentDiv.style.animation = "tp-curtain-rest 0.3s ease both";
        sentDiv.innerHTML = `
          <svg viewBox="0 0 120 84" class="tp-envelope mx-auto w-32" aria-hidden="true">
            <path d="M6 10h108v68H6z" fill="#fffdf8" stroke="#2a170e" stroke-width="3" stroke-linejoin="round"></path>
            <path d="M6 10l54 40 54-40" fill="none" stroke="#2a170e" stroke-width="3" stroke-linejoin="round"></path>
            <circle cx="94" cy="62" r="12" fill="#c2622b" stroke="#2a170e" stroke-width="2.5"></circle>
          </svg>
          <p class="font-plush mt-4 text-[2rem]">Enquiry sent!</p>
          <p class="mx-auto mt-2 max-w-[38ch] text-cocoa-soft">Thanks for reaching out about ${puppyName}. We'll be in touch on WhatsApp shortly.</p>
          <a href="https://wa.me/971500000000?text=Hi%20TeddyPups%2C%20I'd%20love%20to%20know%20more%20about%20${encodeURIComponent(puppyName)}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp mt-6 inline-flex items-center gap-2">WhatsApp us</a>
        `;

        form.parentNode?.replaceChild(sentDiv, form);
      });
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [html]);

  return (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
