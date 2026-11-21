import React from "react";
import homeData from "@/data/home_data.json";

export default function NightSection() {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: homeData.night }}
      suppressHydrationWarning
    />
  );
}
