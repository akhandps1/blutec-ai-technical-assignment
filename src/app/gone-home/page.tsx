import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gone home | TeddyPups U.A.E.",
  description: "These little ones found their families in Dubai & beyond.",
};

export default function GoneHomePage() {
  return (
    <main id="main" className="tp-page flex-1 py-16 px-6 lg:px-14 max-w-screen-wide mx-auto">
      <div className="mb-12">
        <h1 className="font-fraunces font-extrabold text-4xl md:text-6xl text-cocoa mb-4">
          Gone home
        </h1>
        <p className="font-figtree text-lg text-cocoa-light">
          These little ones found their families in Dubai & beyond.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="tp-polaroid p-4 bg-white rounded shadow-polaroid transform -rotate-2 hover:rotate-0 transition-transform">
          <div className="aspect-square bg-peach-light rounded mb-3 flex items-center justify-center font-shantell text-cocoa-light">
            Adopted Pup Photo
          </div>
          <div className="inline-block px-2 py-0.5 rounded bg-stamp-light text-stamp-red font-figtree font-bold text-xs uppercase tracking-wider mb-1">
            Gone Home
          </div>
          <h2 className="font-fraunces font-bold text-lg text-cocoa">Ace</h2>
          <p className="font-figtree text-xs text-cocoa-light">Pomeranian • Boy</p>
        </div>
      </div>
    </main>
  );
}
