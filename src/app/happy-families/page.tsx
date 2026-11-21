import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Happy families | TeddyPups U.A.E.",
  description: "Stories, snapshots & sweet memories from homes across the Emirates.",
};

export default function HappyFamiliesPage() {
  return (
    <main id="main" className="tp-page flex-1 py-16 px-6 lg:px-14 max-w-screen-wide mx-auto">
      <div className="mb-12">
        <h1 className="font-fraunces font-extrabold text-4xl md:text-6xl text-cocoa mb-4">
          Happy families
        </h1>
        <p className="font-figtree text-lg text-cocoa-light">
          Stories, snapshots & sweet memories from homes across the Emirates.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        <div className="tp-polaroid p-3 bg-white rounded shadow-polaroid transform rotate-1 hover:rotate-0 transition-transform">
          <div className="aspect-square bg-peach-light rounded mb-2 flex items-center justify-center font-shantell text-xs text-cocoa-light">
            Family Photo
          </div>
          <p className="font-shantell text-xs text-cocoa text-center">Teddy in his new home</p>
        </div>
      </div>
    </main>
  );
}
