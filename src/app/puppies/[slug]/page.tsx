import type { Metadata } from "next";
import { notFound } from "next/navigation";
import allPuppiesDetails from "@/data/all_puppies_details.json";
import PuppyDetailView from "./PuppyDetailView";

interface PuppyPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return Object.keys(allPuppiesDetails).map((slug) => ({
    slug,
  }));
}

export function generateMetadata({ params }: PuppyPageProps): Metadata {
  const slug = params.slug;
  const html = (allPuppiesDetails as Record<string, string>)[slug];

  if (!html) {
    return {
      title: "Puppy Not Found | TeddyPups U.A.E.",
    };
  }

  // Extract puppy title from markup if possible
  const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/);
  const title = h1Match ? h1Match[1].replace(/<[^>]+>/g, "").trim() : "Puppy Profile";

  return {
    title: `${title} | TeddyPups U.A.E.`,
    description: `Meet ${title}. Hand-raised and vet-checked teacup puppy in Dubai.`,
  };
}

export default function PuppyPage({ params }: PuppyPageProps) {
  const slug = params.slug;
  const html = (allPuppiesDetails as Record<string, string>)[slug];

  if (!html) {
    notFound();
  }

  return <PuppyDetailView html={html} />;
}
