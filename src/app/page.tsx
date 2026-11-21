import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import MeetPupsSection from "@/components/sections/MeetPupsSection";
import PathsSection from "@/components/sections/PathsSection";
import JourneySection from "@/components/sections/JourneySection";
import PassportSection from "@/components/sections/PassportSection";
import DuskSection from "@/components/sections/DuskSection";
import NightSection from "@/components/sections/NightSection";
import HomeSection from "@/components/sections/HomeSection";

export const metadata: Metadata = {
  title: "TeddyPups U.A.E. — Premium teacup puppies in Dubai",
  description:
    "Hand-raised, vet-checked teacup puppies in Dubai. Health guarantee, passport, microchip, and doorstep delivery across the Emirates.",
};

export default function HomePage() {
  return (
    <main id="main" tabIndex={-1} className="relative pt-[var(--header-h)] outline-none">
      <div className="tp-page">
        <HeroSection />
        <MeetPupsSection />
        <PathsSection />
        <JourneySection />
        <PassportSection />
        <DuskSection />
        <NightSection />
        <HomeSection />
      </div>
      <div className="pup-probe" />
      <div className="pup-prints" />
    </main>
  );
}
