import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Available puppies | TeddyPups U.A.E.",
  description: "Browse available teacup and miniature puppies in Dubai and internationally.",
};

export default function PuppiesPage() {
  return (
    <main id="main" className="tp-page flex-1 py-16 px-6 lg:px-14 max-w-screen-wide mx-auto">
      <div className="mb-12">
        <h1 className="font-fraunces font-extrabold text-4xl md:text-6xl text-cocoa mb-4">
          Available puppies
        </h1>
        <p className="font-figtree text-lg text-cocoa-light">
          Real puppies, real photos, looking for their families right now.
        </p>
      </div>

      {/* Filter Tabs Placeholder */}
      <div className="flex flex-wrap gap-3 mb-10">
        <span className="font-figtree font-medium text-sm text-cocoa-light self-center mr-2">Filter by:</span>
        <Link href="/puppies" className="px-4 py-2 rounded-full bg-terracotta text-white font-figtree font-semibold text-sm">
          All
        </Link>
        <Link href="/puppies?origin=local" className="px-4 py-2 rounded-full border border-cocoa/20 text-cocoa font-figtree font-medium text-sm hover:border-cocoa">
          In Dubai
        </Link>
        <Link href="/puppies?origin=imported" className="px-4 py-2 rounded-full border border-cocoa/20 text-cocoa font-figtree font-medium text-sm hover:border-cocoa">
          Imported for you
        </Link>
      </div>

      {/* Puppy Door Cards Placeholder */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-20">
        <div className="border border-cocoa/20 rounded-door p-6 bg-milk hover:shadow-card-offset transition-all">
          <div className="aspect-square bg-peach-light rounded-t-[80px] rounded-b-lg mb-4 flex items-center justify-center text-cocoa-light font-shantell">
            Puppy Portrait
          </div>
          <h2 className="font-fraunces font-bold text-2xl text-cocoa mb-1">Max</h2>
          <p className="font-figtree text-sm text-cocoa-light mb-4">Maltipoo • Boy • 3 months</p>
          <Link href="/puppies/maltipoo-max-male" className="inline-block text-terracotta font-figtree font-semibold hover:underline">
            Meet Max &rarr;
          </Link>
        </div>
      </div>
    </main>
  );
}
