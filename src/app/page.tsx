import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhatIsVixy } from "@/components/sections/WhatIsVixy";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { StoreBanner } from "@/components/sections/StoreBanner";
import { BecomeRiderSection } from "@/components/sections/BecomeRiderSection";
import { SafetySection } from "@/components/sections/SafetySection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh" }}>
      <Navbar />
      <HeroSection />
      <WhatIsVixy />
      <HowItWorks />
      <BenefitsSection />
      <StoreBanner />
      <BecomeRiderSection />
      <SafetySection />
      <Footer />
    </main>
  );
}
