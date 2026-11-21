import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function PuppyDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const title = params.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <main id="main" className="tp-page flex-1 py-12 px-6 lg:px-14 max-w-screen-wide mx-auto">
      <Link href="/puppies" className="inline-flex items-center gap-2 font-figtree font-semibold text-terracotta mb-8 hover:underline">
        &larr; All puppies
      </Link>

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Media Gallery Container */}
        <div className="space-y-4">
          <div className="aspect-[4/3] rounded-2xl bg-peach-light border-2 border-cocoa/15 flex items-center justify-center font-shantell text-cocoa-light text-xl">
            {title} Photo / Video Slider
          </div>
          <div className="flex gap-3">
            <button className="w-20 h-20 rounded-xl border-2 border-cocoa bg-peach-light flex items-center justify-center font-figtree text-xs">Photo 1</button>
            <button className="w-20 h-20 rounded-xl border border-cocoa/30 bg-peach-light flex items-center justify-center font-figtree text-xs">▶ Video</button>
          </div>
        </div>

        {/* Specifications */}
        <div>
          <h1 className="font-fraunces font-extrabold text-4xl md:text-5xl text-cocoa mb-3">{title}</h1>
          <div className="inline-block px-3 py-1 rounded-full bg-peach-warm text-terracotta-dark font-figtree font-semibold text-sm mb-6">
            Imported for you
          </div>

          <div className="border-t border-b border-cocoa/10 py-6 my-6 space-y-4 font-figtree text-cocoa">
            <div className="flex justify-between"><span className="text-cocoa-light">Breed</span><span className="font-semibold">Miniature / Teacup</span></div>
            <div className="flex justify-between"><span className="text-cocoa-light">Age</span><span className="font-semibold">3 months</span></div>
            <div className="flex justify-between"><span className="text-cocoa-light">Health Certificate</span><span className="font-semibold text-forest">Verified & Licensed</span></div>
          </div>

          <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="block w-full text-center py-4 rounded-full bg-forest text-white font-figtree font-bold text-lg shadow-hard-offset hover:bg-forest-dark transition-all">
            Ask about {title}
          </a>
        </div>
      </div>
    </main>
  );
}
