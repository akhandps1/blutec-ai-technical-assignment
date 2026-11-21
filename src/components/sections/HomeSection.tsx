import React from "react";
import homeData from "@/data/home_data.json";

export default function HomeSection() {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: homeData.home }}
      suppressHydrationWarning
    />
  );
}
