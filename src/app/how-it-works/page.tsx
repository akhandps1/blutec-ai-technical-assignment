import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How it works | TeddyPups U.A.E.",
  description: "Two ways home, our premium puppy promise, delivery and collection.",
};

export default function HowItWorksPage() {
  return (
    <main id="main" className="tp-page flex-1 py-16 px-6 lg:px-14 max-w-screen-wide mx-auto">
      <div className="mb-16">
        <h1 className="font-fraunces font-extrabold text-4xl md:text-6xl text-cocoa mb-4">
          How it works
        </h1>
        <p className="font-figtree text-lg text-cocoa-light max-w-2xl">
          Everything you need to know about welcoming your new puppy home.
        </p>
      </div>

      <div className="space-y-20">
        <section id="two-ways" className="scroll-mt-24">
          <h2 className="font-fraunces font-bold text-3xl md:text-4xl text-cocoa mb-6">
            Two ways home
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-peach-light border border-cocoa/10">
              <h3 className="font-fraunces font-bold text-2xl text-cocoa mb-3">Puppies in Dubai</h3>
              <p className="font-figtree text-cocoa-light">Visit our boutique in Downtown Dubai and meet your puppy in person.</p>
            </div>
            <div className="p-8 rounded-2xl bg-peach-light border border-cocoa/10">
              <h3 className="font-fraunces font-bold text-2xl text-cocoa mb-3">Imported for you</h3>
              <p className="font-figtree text-cocoa-light">Selected miniature and teacup puppies from licensed international breeders.</p>
            </div>
          </div>
        </section>

        <section id="promise" className="scroll-mt-24">
          <h2 className="font-fraunces font-bold text-3xl md:text-4xl text-cocoa mb-6">
            Our premium puppy promise
          </h2>
          <p className="font-figtree text-cocoa-light max-w-2xl">
            Every puppy comes with verified vaccinations, microchip, and licensed veterinary certification.
          </p>
        </section>

        <section id="delivery" className="scroll-mt-24">
          <h2 className="font-fraunces font-bold text-3xl md:text-4xl text-cocoa mb-6">
            Delivery & collection
          </h2>
          <p className="font-figtree text-cocoa-light max-w-2xl">
            Temperature-controlled delivery right to your door across all seven Emirates.
          </p>
        </section>
      </div>
    </main>
  );
}
