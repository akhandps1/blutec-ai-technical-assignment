import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Questions & answers | TeddyPups U.A.E.",
  description: "Frequently asked questions about puppy health, visits, and adoptions.",
};

const faqs = [
  { q: "Are your puppies vaccinated and health-checked?", a: "Yes, every single puppy receives complete age-appropriate vaccinations, routine deworming, and a thorough health examination by licensed veterinary doctors." },
  { q: "Can I meet a puppy before I decide?", a: "Absolutely. You can schedule a private visit at our Downtown Dubai boutique or request real-time video calls." },
  { q: "Can I take my puppy home the same day?", a: "For puppies currently residing at our Dubai boutique who have completed their quarantine and health clearances, same-day collection is available." },
  { q: "Do you import puppies from abroad?", a: "Yes, we specialize in rare, exquisite Korean teacup breeds imported directly through ethical international partnerships." },
  { q: "How does an imported puppy travel to Dubai?", a: "Imported puppies travel under strict temperature-controlled aviation guidelines accompanied by pet travel specialists." },
  { q: "Will I see photos and health details first?", a: "Yes, you receive high-resolution photos, videos, and full veterinary certificates before committing." },
  { q: "Do you deliver?", a: "Yes, we provide VIP climate-controlled white-glove delivery across all UAE Emirates and worldwide shipping." },
  { q: "Which breeds do you usually have?", a: "We specialize in Maltipoos, Pomeranians, Toy Poodles, Cavapoos, and Shih Tzus." },
  { q: "Is there help after my puppy comes home?", a: "Yes, our team provides 24/7 post-adoption guidance, feeding instructions, and veterinary advisory." },
];

export default function FAQPage() {
  return (
    <main id="main" className="tp-page flex-1 py-16 px-6 lg:px-14 max-w-screen-wide mx-auto">
      <div className="mb-12">
        <h1 className="font-fraunces font-extrabold text-4xl md:text-6xl text-cocoa mb-4">
          Questions & answers
        </h1>
        <p className="font-figtree text-lg text-cocoa-light">
          Everything you need to know about welcoming your new companion.
        </p>
      </div>

      <div className="max-w-3xl space-y-4">
        {faqs.map((faq, i) => (
          <details key={i} className="group border border-cocoa/15 rounded-xl bg-milk p-6 open:bg-peach-light/50 transition-colors">
            <summary className="font-fraunces font-bold text-xl text-cocoa cursor-pointer list-none flex items-center justify-between">
              <h2>{faq.q}</h2>
              <span className="text-terracotta text-2xl group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-4 font-figtree text-cocoa-light leading-relaxed">
              {faq.a}
            </p>
          </details>
        ))}
      </div>
    </main>
  );
}
