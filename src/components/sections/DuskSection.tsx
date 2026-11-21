import React from "react";
import homeData from "@/data/home_data.json";

export default function DuskSection() {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: homeData.dusk }}
      suppressHydrationWarning
    />
  );
}
