import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Visit & contact | TeddyPups U.A.E.",
  description: "Get in touch with us in Downtown Dubai, UAE.",
};

export default function ContactPage() {
  return (
    <main id="main" className="tp-page flex-1 py-16 px-6 lg:px-14 max-w-screen-wide mx-auto">
      <div className="mb-12">
        <h1 className="font-fraunces font-extrabold text-4xl md:text-6xl text-cocoa mb-4">
          Get in touch with us
        </h1>
        <p className="font-figtree text-lg text-cocoa-light">
          Send us a message or visit our boutique in Downtown Dubai.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Storybook Letterform */}
        <div className="tp-letterform bg-peach-warm p-8 md:p-12 rounded-2xl border-2 border-cocoa/20 shadow-hard-offset">
          <form className="space-y-6">
            <div>
              <label className="block font-figtree font-semibold text-cocoa text-sm mb-2">Your Name *</label>
              <input type="text" name="name" required className="w-full px-4 py-3 rounded-lg border border-cocoa/20 bg-white focus:outline-none focus:border-terracotta" />
            </div>
            <div>
              <label className="block font-figtree font-semibold text-cocoa text-sm mb-2">Phone Number *</label>
              <input type="tel" name="phone" placeholder="+971 50 123 4567" required className="w-full px-4 py-3 rounded-lg border border-cocoa/20 bg-white focus:outline-none focus:border-terracotta" />
            </div>
            <div>
              <label className="block font-figtree font-semibold text-cocoa text-sm mb-2">Email Address (optional)</label>
              <input type="email" name="email" placeholder="optional" className="w-full px-4 py-3 rounded-lg border border-cocoa/20 bg-white focus:outline-none focus:border-terracotta" />
            </div>
            <div>
              <label className="block font-figtree font-semibold text-cocoa text-sm mb-2">Area in UAE</label>
              <input type="text" name="area" placeholder="e.g. Dubai Marina" className="w-full px-4 py-3 rounded-lg border border-cocoa/20 bg-white focus:outline-none focus:border-terracotta" />
            </div>
            <div>
              <label className="block font-figtree font-semibold text-cocoa text-sm mb-2">Which puppy are you interested in?</label>
              <select name="puppyId" className="w-full px-4 py-3 rounded-lg border border-cocoa/20 bg-white focus:outline-none focus:border-terracotta">
                <option value="">any puppy (not sure yet)</option>
                <option value="max">Max (Maltipoo, boy)</option>
                <option value="maltipoo-female">Korean Teacup Maltipoo (girl)</option>
                <option value="poodle-female">Korean Teacup Poodle (girl)</option>
              </select>
            </div>
            <div>
              <label className="block font-figtree font-semibold text-cocoa text-sm mb-2">Message</label>
              <textarea name="message" rows={4} placeholder="Anything else you'd like to tell us…" className="w-full px-4 py-3 rounded-lg border border-cocoa/20 bg-white focus:outline-none focus:border-terracotta"></textarea>
            </div>
            {/* Honeypot */}
            <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
            <button type="submit" className="w-full py-4 rounded-full bg-forest text-white font-figtree font-bold text-lg shadow-hard-offset hover:bg-forest-dark transition-all">
              Send enquiry
            </button>
          </form>
        </div>

        {/* Visit Information */}
        <div className="space-y-8">
          <div className="p-8 rounded-2xl bg-milk border border-cocoa/15">
            <h2 className="font-fraunces font-bold text-2xl text-cocoa mb-4">Visit us in Downtown Dubai</h2>
            <p className="font-figtree text-cocoa-light mb-4">{siteConfig.address}</p>
            <p className="font-figtree text-sm text-cocoa-light mb-6">Visits by appointment to ensure dedicated time with each puppy.</p>
            <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forest text-white font-figtree font-semibold shadow-hard-offset hover:bg-forest-dark transition-all">
              Schedule visit on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
