import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/hero-section';
import { BloodTypesSection } from '@/components/blood-types-section';
import { HowItWorksSection } from '@/components/how-it-works-section';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <BloodTypesSection />
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  );
}
