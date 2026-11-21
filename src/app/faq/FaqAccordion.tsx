"use client";

import React, { useEffect, useRef } from "react";
import faqData from "@/data/faq_data.json";

export default function FaqAccordion() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const input = container.querySelector<HTMLInputElement>(".tp-notes__search input");
    const countEl = container.querySelector<HTMLParagraphElement>(".tp-notes__count");
    const board = container.querySelector<HTMLElement>(".tp-notes__board");
    const notes = Array.from(container.querySelectorAll<HTMLLIElement>("li.tp-note"));

    if (!notes.length) return;

    // Cache original texts and DOM elements
    const noteData = notes.map((note) => {
      const qSpan = note.querySelector<HTMLElement>(".tp-note__q span.font-plush-text");
      const aP = note.querySelector<HTMLElement>(".tp-note__flap p");
      const btn = note.querySelector<HTMLButtonElement>(".tp-note__q button");
      const ans = note.querySelector<HTMLElement>(".tp-note__answer");
      const origQ = qSpan?.textContent || "";
      const origA = aP?.textContent || "";

      return { note, qSpan, aP, btn, ans, origQ, origA };
    });

    function setNoteFolded(item: typeof noteData[0], unfolded: boolean) {
      if (unfolded) {
        item.note.setAttribute("data-unfolded", "true");
        item.btn?.setAttribute("aria-expanded", "true");
        item.ans?.removeAttribute("inert");
      } else {
        item.note.removeAttribute("data-unfolded");
        item.btn?.setAttribute("aria-expanded", "false");
        item.ans?.setAttribute("inert", "");
      }
    }

    // Click handler for buttons
    noteData.forEach((item) => {
      if (!item.btn) return;
      item.btn.addEventListener("click", () => {
        const isUnfolded = item.note.hasAttribute("data-unfolded");
        setNoteFolded(item, !isUnfolded);
      });
    });

    // Search filtering handler
    if (input && countEl && board) {
      input.addEventListener("input", () => {
        const query = input.value.trim();
        const lower = query.toLowerCase();

        // Remove any existing empty state
        const existingEmpty = board.querySelector(".tp-note--empty");
        if (existingEmpty) {
          existingEmpty.remove();
        }

        if (!lower) {
          // Reset to default
          noteData.forEach((item) => {
            item.note.style.display = "";
            if (item.qSpan) item.qSpan.textContent = item.origQ;
            if (item.aP) item.aP.textContent = item.origA;
            setNoteFolded(item, false);
          });
          countEl.textContent = `${notes.length} notes on the board`;
          return;
        }

        let matchCount = 0;
        const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(`(${escapeRegex(query)})`, "gi");

        noteData.forEach((item) => {
          const matchQ = item.origQ.toLowerCase().includes(lower);
          const matchA = item.origA.toLowerCase().includes(lower);

          if (matchQ || matchA) {
            item.note.style.display = "";
            matchCount++;

            // Highlight matches
            if (item.qSpan) {
              item.qSpan.innerHTML = item.origQ.replace(regex, "<mark>$1</mark>");
            }
            if (item.aP) {
              item.aP.innerHTML = item.origA.replace(regex, "<mark>$1</mark>");
            }

            // Auto-unfold if the answer matched
            if (matchA) {
              setNoteFolded(item, true);
            } else {
              setNoteFolded(item, false);
            }
          } else {
            item.note.style.display = "none";
            setNoteFolded(item, false);
          }
        });

        countEl.textContent = `${matchCount} ${matchCount === 1 ? "note" : "notes"} found`;

        if (matchCount === 0) {
          const emptyDiv = document.createElement("div");
          emptyDiv.className = "tp-note tp-note--empty";
          emptyDiv.innerHTML = `
            <span aria-hidden="true" class="tp-note__pin"></span>
            <p class="font-plush-text text-[1.2rem] font-bold">No note about “${query}” yet.</p>
            <p class="mt-2">
              <a href="https://wa.me/971500000000" target="_blank" rel="noopener noreferrer" class="link-ink">Ask us on WhatsApp</a> and we'll answer.
            </p>
          `;
          board.appendChild(emptyDiv);
        }
      });
    }

    // Scroll reveal with IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).setAttribute("data-revealed", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 }
    );

    notes.forEach((note) => {
      note.setAttribute("data-armed", "true");
      const rect = note.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        note.setAttribute("data-revealed", "true");
      } else {
        observer.observe(note);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: faqData.main }}
      suppressHydrationWarning
    />
  );
}
