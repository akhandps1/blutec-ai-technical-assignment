import type { Metadata } from "next";
import FaqAccordion from "./FaqAccordion";

export const metadata: Metadata = {
  title: "Questions & answers | TeddyPups U.A.E.",
  description: "Frequently asked questions about puppy health, visits, and adoptions.",
};

export default function FAQPage() {
  return <FaqAccordion />;
}
