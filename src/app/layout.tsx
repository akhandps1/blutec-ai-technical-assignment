import type { Metadata } from "next";
import { Figtree, Fraunces, Shantell_Sans } from "next/font/google";
import "@/styles/globals.css";
import { siteConfig } from "@/config/site";

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
    icon: "/assets/icons/favicon-icon.png",
    apple: "/assets/icons/apple-icon.png",
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
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-terracotta focus:text-white focus:rounded-full">
          Skip to content
        </a>
        <div className="flex-1 flex flex-col">{children}</div>
      </body>
    </html>
  );
}
