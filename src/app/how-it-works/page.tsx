import type { Metadata } from "next";
import howItWorksData from "@/data/how_it_works_data.json";
import HowItWorksView from "./HowItWorksView";

export const metadata: Metadata = {
  title: "How it works | TeddyPups U.A.E.",
  description:
    "Everything you need to know about welcoming your new companion. From boutique visits to doorstep delivery.",
};

export default function HowItWorksPage() {
  return <HowItWorksView html={howItWorksData.main} />;
}
