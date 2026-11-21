import type { Metadata } from "next";
import HappyFamiliesView from "@/components/views/HappyFamiliesView";

export const metadata: Metadata = {
  title: "Happy families | TeddyPups U.A.E.",
  description: "Stories, snapshots & sweet memories from homes across the Emirates.",
};

export default function HappyFamiliesPage() {
  return <HappyFamiliesView />;
}
