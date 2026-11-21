import type { Metadata } from "next";
import happyFamiliesData from "@/data/happy_families_data.json";

export const metadata: Metadata = {
  title: "Happy families | TeddyPups U.A.E.",
  description: "Stories, snapshots & sweet memories from homes across the Emirates.",
};

export default function HappyFamiliesPage() {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: happyFamiliesData.main }}
      suppressHydrationWarning
    />
  );
}
