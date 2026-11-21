import React from "react";
import homeData from "@/data/home_data.json";

export default function PassportSection() {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: homeData.passport }}
      suppressHydrationWarning
    />
  );
}
