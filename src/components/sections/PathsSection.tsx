import React from "react";
import homeData from "@/data/home_data.json";

export default function PathsSection() {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: homeData.paths }}
      suppressHydrationWarning
    />
  );
}
