import React from "react";
import homeData from "@/data/home_data.json";

export default function JourneySection() {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: homeData.chat }}
      suppressHydrationWarning
    />
  );
}
