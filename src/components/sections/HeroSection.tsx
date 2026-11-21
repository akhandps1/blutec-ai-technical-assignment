import React from "react";
import homeData from "@/data/home_data.json";

export default function HeroSection() {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: homeData.hero }}
      suppressHydrationWarning
    />
  );
}
