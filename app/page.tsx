import { HeroSection } from '@/components/hero-section';
import { ServicesGrid } from '@/components/services-grid';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ServicesGrid />
      {/* Additional sections will be added here (testimonials, footer, etc.) */}
    </main>
  );
}
