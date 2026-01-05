import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { DifferentiatorsSection } from "@/components/sections/DifferentiatorsSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { UseCasesSection } from "@/components/sections/UseCasesSection";
import { SecuritySection } from "@/components/sections/SecuritySection";
import { IntegrationsSection } from "@/components/sections/IntegrationsSection";
import { SetupStepsSection } from "@/components/sections/SetupStepsSection";
import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <DifferentiatorsSection />
        <FeaturesSection />
        <StatsSection />
        <UseCasesSection />
        <SecuritySection />
        <IntegrationsSection />
        <SetupStepsSection />
        <CTASection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
