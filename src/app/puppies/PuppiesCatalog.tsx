"use client";

import React, { useEffect, useRef } from "react";
import puppiesData from "@/data/puppies_data.json";

export default function PuppiesCatalog() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const chips = Array.from(container.querySelectorAll<HTMLButtonElement>("button.tp-sticker-chip"));
    const cards = Array.from(container.querySelectorAll<HTMLLIElement>("ul.tp-sketches > li"));
    const countEl = container.querySelector<HTMLParagraphElement>("p.font-scrawl.mt-10");
    const filterPad = container.querySelector<HTMLDivElement>(".tp-sketchpad");
    const sketchesContainer = container.querySelector<HTMLDivElement>("ul.tp-sketches")?.parentElement;

    if (!cards.length) return;

    // Filter state
    interface FilterState {
      origin: string;
      breed: string;
      gender: string;
      collection: string;
    }

    const state: FilterState = {
      origin: "",
      breed: "",
      gender: "",
      collection: "",
    };

    // Read initial URL
    const params = new URLSearchParams(window.location.search);
    state.origin = params.get("origin") || "";
    state.breed = params.get("breed") || "";
    state.gender = params.get("gender") || "";
    state.collection = params.get("collection") || "";

    function updateUrl() {
      const p = new URLSearchParams();
      if (state.origin) p.set("origin", state.origin);
      if (state.breed) p.set("breed", state.breed);
      if (state.gender) p.set("gender", state.gender);
      if (state.collection) p.set("collection", state.collection);

      const qs = p.toString();
      const newUrl = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
      window.history.replaceState(null, "", newUrl);
    }

    // Identify chip groups
    const rows = Array.from(container.querySelectorAll<HTMLDivElement>(".tp-sketchpad > div.flex"));
    const boyGirlRow = rows[2] || null;

    let clearBtn = container.querySelector<HTMLButtonElement>(".tp-clear-filters");
    if (!clearBtn && boyGirlRow) {
      clearBtn = document.createElement("button");
      clearBtn.type = "button";
      clearBtn.className = "tp-clear-filters link-ink ml-auto text-[0.95rem] font-semibold";
      clearBtn.textContent = "Clear filters";
      clearBtn.style.display = "none";
      boyGirlRow.appendChild(clearBtn);

      clearBtn.addEventListener("click", () => {
        state.origin = "";
        state.breed = "";
        state.gender = "";
        state.collection = "";
        updateUrl();
        render();
      });
    }

    function render() {
      const anyActive = Boolean(state.origin || state.breed || state.gender || state.collection);

      // 1. Update chip pressed states
      chips.forEach((chip) => {
        const text = (chip.textContent || "").trim().toLowerCase();
        let pressed = false;

        if (text === "everywhere") {
          pressed = !state.origin && !state.collection;
        } else if (text === "in dubai") {
          pressed = state.origin === "local";
        } else if (text === "imported") {
          pressed = state.origin === "imported";
        } else if (text === "korean teacup") {
          pressed = state.collection === "korean-teacup";
        } else if (text === "boys") {
          pressed = state.gender === "male";
        } else if (text === "girls") {
          pressed = state.gender === "female";
        } else {
          // Breeds
          const breedSlug = text.replace(/\s+/g, "-");
          pressed = state.breed === breedSlug || state.breed === text;
        }

        chip.setAttribute("aria-pressed", pressed ? "true" : "false");
      });

      // 2. Show / hide clear button
      if (clearBtn) {
        clearBtn.style.display = anyActive ? "" : "none";
      }

      // 3. Filter cards
      let visibleCount = 0;
      cards.forEach((card) => {
        const a = card.querySelector("a");
        const href = a?.getAttribute("href") || "";
        const aria = (a?.getAttribute("aria-label") || "").toLowerCase();
        const text = (card.textContent || "").toLowerCase();
        const combined = `${href} ${aria} ${text}`;

        let matchesOrigin = true;
        if (state.origin === "local") {
          matchesOrigin = combined.includes("dubai") || (!combined.includes("imported") && !combined.includes("korea"));
        } else if (state.origin === "imported") {
          matchesOrigin = combined.includes("imported") || combined.includes("korea");
        }

        let matchesCollection = true;
        if (state.collection === "korean-teacup") {
          matchesCollection = combined.includes("korean") || combined.includes("teacup");
        }

        let matchesBreed = true;
        if (state.breed) {
          const b = state.breed.toLowerCase();
          if (b === "shih-tzu" || b === "shih tzu") {
            matchesBreed = combined.includes("shih");
          } else if (b === "pomeranian") {
            matchesBreed = combined.includes("pomeranian") || combined.includes("pom");
          } else {
            matchesBreed = combined.includes(b);
          }
        }

        let matchesGender = true;
        if (state.gender === "male") {
          matchesGender = combined.includes("boy") || combined.includes("male");
        } else if (state.gender === "female") {
          matchesGender = combined.includes("girl") || combined.includes("female");
        }

        const isVisible = matchesOrigin && matchesCollection && matchesBreed && matchesGender;
        card.style.display = isVisible ? "" : "none";
        if (isVisible) visibleCount++;
      });

      // 4. Update count text
      if (countEl) {
        countEl.textContent = `${visibleCount} ${visibleCount === 1 ? "puppy" : "puppies"} ${anyActive ? "match" : "looking for a home"}`;
      }

      // 5. Empty state
      const existingEmpty = container.querySelector(".tp-catalog-empty");
      if (visibleCount === 0) {
        if (!existingEmpty && sketchesContainer) {
          const emptyDiv = document.createElement("div");
          emptyDiv.className = "tp-catalog-empty tp-sketchpad mt-10 grid items-center gap-6 md:grid-cols-[auto_1fr] md:gap-10";
          emptyDiv.innerHTML = `
            <div class="pup-buddy mx-auto w-44 md:w-52" data-facing="right">
              <svg viewBox="0 0 300 240" role="img" aria-label="Teddy, tilting his head" focusable="false" style="overflow: visible;">
                <ellipse cx="150" cy="230" rx="92" ry="7" fill="#2a170e" opacity="0.12"></ellipse>
                <path d="M120 180 C120 130 180 130 180 180 Z" fill="#f2be6b" stroke="#2a170e" stroke-width="3.4"></path>
                <circle cx="150" cy="110" r="44" fill="#f2be6b" stroke="#2a170e" stroke-width="3.4"></circle>
                <ellipse cx="140" cy="105" rx="5" ry="6" fill="#2a170e"></ellipse>
                <ellipse cx="160" cy="105" rx="5" ry="6" fill="#2a170e"></ellipse>
                <path d="M146 116 Q150 120 154 116" stroke="#2a170e" stroke-width="2.5" fill="none"></path>
              </svg>
            </div>
            <div>
              <p class="font-plush text-big">No puppies match just now.</p>
              <p class="mt-3 max-w-[48ch] text-cocoa-soft">Tell us what you're hoping for and we'll let you know what's in our showroom or what we can bring in for you.</p>
              <div class="mt-6 flex flex-wrap gap-3">
                <a href="https://wa.me/971500000000" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">Ask on WhatsApp</a>
                <button type="button" class="btn btn-ghost tp-reset-puppies">Show all puppies</button>
              </div>
            </div>
          `;
          sketchesContainer.parentNode?.insertBefore(emptyDiv, sketchesContainer.nextSibling);

          const resetBtn = emptyDiv.querySelector(".tp-reset-puppies");
          resetBtn?.addEventListener("click", () => {
            state.origin = "";
            state.breed = "";
            state.gender = "";
            state.collection = "";
            updateUrl();
            render();
          });
        }
      } else if (existingEmpty) {
        existingEmpty.remove();
      }
    }

    // Attach chip click listeners
    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        const text = (chip.textContent || "").trim().toLowerCase();

        if (text === "everywhere") {
          state.origin = "";
          state.collection = "";
        } else if (text === "in dubai") {
          state.origin = state.origin === "local" ? "" : "local";
          state.collection = "";
        } else if (text === "imported") {
          state.origin = state.origin === "imported" ? "" : "imported";
        } else if (text === "korean teacup") {
          state.collection = state.collection === "korean-teacup" ? "" : "korean-teacup";
        } else if (text === "boys") {
          state.gender = state.gender === "male" ? "" : "male";
        } else if (text === "girls") {
          state.gender = state.gender === "female" ? "" : "female";
        } else {
          // Breeds
          const breedSlug = text.replace(/\s+/g, "-");
          state.breed = state.breed === breedSlug ? "" : breedSlug;
        }

        updateUrl();
        render();
      });
    });

    // Initial render
    render();
  }, []);

  return (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: puppiesData.main }}
      suppressHydrationWarning
    />
  );
}
