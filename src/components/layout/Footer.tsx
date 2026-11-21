import React from "react";
import homeData from "@/data/home_data.json";

export default function Footer() {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: homeData.footer }}
      suppressHydrationWarning
    />
  );
}
