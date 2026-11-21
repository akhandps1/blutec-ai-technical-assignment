import type { Metadata } from "next";
import goneHomeData from "@/data/gone_home_data.json";

export const metadata: Metadata = {
  title: "Gone home | TeddyPups U.A.E.",
  description: "Puppies who have found their forever families across the Emirates.",
};

export default function GoneHomePage() {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: goneHomeData.main }}
      suppressHydrationWarning
    />
  );
}
