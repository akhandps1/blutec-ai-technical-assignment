import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="tp-page flex-1 min-h-[70vh] flex items-center justify-center py-20 px-6 text-center">
      <div className="max-w-lg p-10 rounded-2xl bg-peach-light border-2 border-cocoa/20 shadow-hard-offset">
        <p className="font-shantell text-terracotta-cinnamon text-lg mb-2">have you seen this page?</p>
        <h1 className="font-fraunces font-extrabold text-3xl md:text-4xl text-cocoa mb-4">
          LOST : THIS PAGE HAS WANDERED OFF
        </h1>
        <p className="font-figtree text-cocoa-light mb-8">
          One page, last seen wandering off. It answers to the address you typed, but it isn&apos;t here any more. Teddy is on the case.
        </p>
        <Link href="/" className="inline-block px-8 py-3.5 rounded-full bg-forest text-white font-figtree font-semibold shadow-hard-offset hover:bg-forest-dark transition-all">
          Take me home
        </Link>
      </div>
    </main>
  );
}
