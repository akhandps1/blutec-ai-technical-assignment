import type { Metadata } from "next";
import PuppiesCatalog from "./PuppiesCatalog";

export const metadata: Metadata = {
  title: "Available puppies | TeddyPups U.A.E.",
  description:
    "Real puppies, real photos. Hand-raised teacup Maltipoos, Pomeranians, Poodles, Cavapoos & Shih Tzus in Dubai.",
};

export default function PuppiesPage() {
  return <PuppiesCatalog />;
}
