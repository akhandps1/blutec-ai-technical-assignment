import React from "react";
import notFoundData from "@/data/not_found_data.json";

export const metadata = {
  title: "Lost : This page has wandered off | TeddyPups U.A.E.",
  description: "The page you are looking for has wandered off. Return home to meet our puppies.",
};

export default function NotFound() {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: notFoundData.main }}
      suppressHydrationWarning
    />
  );
}
