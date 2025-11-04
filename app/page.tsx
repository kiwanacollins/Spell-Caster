import { HeroSection } from '@/components/hero-section';
import { ServicesGrid } from '@/components/services-grid';
import { AboutSection } from '@/components/about-section';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ServicesGrid />
      <AboutSection />
      {/* Additional sections will be added here (testimonials, footer, etc.) */}
    </main>
  );
}
