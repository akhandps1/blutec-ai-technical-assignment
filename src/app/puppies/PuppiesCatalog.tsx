"use client";

import React, { useEffect, useRef } from "react";
import puppiesData from "@/data/puppies_data.json";

export default function PuppiesCatalog() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const chips = container.querySelectorAll<HTMLButtonElement>("button.tp-sticker-chip");
    const cards = container.querySelectorAll<HTMLLIElement>("ul.tp-sketches > li");

    function applyFilter(filterText: string) {
      const lower = filterText.toLowerCase();

      chips.forEach((chip) => {
        const chipText = (chip.textContent || "").trim();
        const matches = chipText.toLowerCase() === lower || (lower === "all" && chipText.toLowerCase() === "everywhere");
        chip.setAttribute("aria-pressed", matches ? "true" : "false");
      });

      cards.forEach((card) => {
        const text = (card.textContent || "").toLowerCase();
        const aria = (card.querySelector("a")?.getAttribute("aria-label") || "").toLowerCase();
        const combined = `${text} ${aria}`;

        let visible = true;
        if (lower === "everywhere" || lower === "all") {
          visible = true;
        } else if (lower === "imported") {
          visible = combined.includes("imported") || combined.includes("korean");
        } else if (lower === "korean teacup") {
          visible = combined.includes("korean");
        } else if (lower === "maltipoo") {
          visible = combined.includes("maltipoo");
        } else if (lower === "pomeranian") {
          visible = combined.includes("pomeranian") || combined.includes("pomsky");
        } else if (lower === "poodle") {
          visible = combined.includes("poodle");
        } else if (lower === "cavapoo") {
          visible = combined.includes("cavapoo");
        } else if (lower === "shih tzu") {
          visible = combined.includes("shih") || combined.includes("shitzu");
        } else if (lower === "boys") {
          visible = combined.includes("boy") || combined.includes("male");
        } else if (lower === "girls") {
          visible = combined.includes("girl") || combined.includes("female");
        } else {
          visible = combined.includes(lower);
        }

        card.style.display = visible ? "" : "none";
      });
    }

    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        const filterText = (chip.textContent || "").trim();
        applyFilter(filterText);
      });
    });

    // Check URL parameters on mount
    const searchParams = new URLSearchParams(window.location.search);
    const origin = searchParams.get("origin");
    const breed = searchParams.get("breed");

    if (origin === "imported") {
      applyFilter("Imported");
    } else if (breed) {
      applyFilter(breed);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: puppiesData.main }}
      suppressHydrationWarning
    />
  );
}
