import { HeroSection } from '@/components/hero-section';
import { ServicesGrid } from '@/components/services-grid';
import { AboutSection } from '@/components/about-section';
import { TestimonialsCarousel } from '@/components/testimonials-carousel';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ServicesGrid />
      <AboutSection />
      <TestimonialsCarousel />
      {/* Additional sections will be added here (footer, etc.) */}
    </main>
  );
}
