import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollProgress from "@/components/ScrollProgress";
import StickyCta from "@/components/StickyCta";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SpecialtiesSection from "@/components/SpecialtiesSection";
import OfficeSection from "@/components/OfficeSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-cream text-brand-dark">
      <ScrollProgress />
      <Header />
      <ScrollReveal>
        <main id="main" className="flex-1 pb-24 lg:pb-0">
          <HeroSection />
          <AboutSection />
          <SpecialtiesSection />
          <OfficeSection />
          <FAQSection />
          <ContactSection />
        </main>
      </ScrollReveal>
      <Footer />
      <StickyCta />
    </div>
  );
}
