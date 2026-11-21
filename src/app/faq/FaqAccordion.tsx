"use client";

import React, { useEffect, useRef } from "react";
import faqData from "@/data/faq_data.json";

export default function FaqAccordion() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const buttons = container.querySelectorAll<HTMLButtonElement>("button[aria-controls]");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const isExpanded = btn.getAttribute("aria-expanded") === "true";
        const targetId = btn.getAttribute("aria-controls");
        const targetEl = targetId ? container.querySelector<HTMLElement>(`#${targetId}`) : null;

        if (isExpanded) {
          btn.setAttribute("aria-expanded", "false");
          if (targetEl) targetEl.setAttribute("inert", "");
        } else {
          btn.setAttribute("aria-expanded", "true");
          if (targetEl) targetEl.removeAttribute("inert");
        }
      });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: faqData.main }}
      suppressHydrationWarning
    />
  );
}
