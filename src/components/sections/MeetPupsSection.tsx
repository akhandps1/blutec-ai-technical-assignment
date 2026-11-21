import React from "react";
import homeData from "@/data/home_data.json";

export default function MeetPupsSection() {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: homeData.meet }}
      suppressHydrationWarning
    />
  );
}
