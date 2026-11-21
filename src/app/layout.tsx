import type { Metadata } from "next";
import { Figtree, Fraunces, Shantell_Sans } from "next/font/google";
import "@/styles/globals.css";
import { siteConfig } from "@/config/site";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileActionBar from "@/components/layout/MobileActionBar";
import PuppyRunner from "@/components/animations/PuppyRunner";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const shantell = Shantell_Sans({
  subsets: ["latin"],
  variable: "--font-shantell",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TeddyPups U.A.E. — Premium teacup puppies in Dubai",
  description: siteConfig.description,
  icons: {
    icon: "/brand/logo.png",
    apple: "/brand/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${figtree.variable} ${fraunces.variable} ${shantell.variable}`}>
      <body className="min-h-screen flex flex-col bg-milk text-cocoa antialiased selection:bg-amber selection:text-cocoa">
        <a
          href="#main"
          className="sr-only-focusable fixed left-4 top-4 z-[100] rounded-full bg-cocoa px-5 py-3 font-semibold text-milk"
        >
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
        <MobileActionBar />
        <PuppyRunner />
      </body>
    </html>
  );
}
