import { HeroSection } from '@/components/hero-section';
import { ServicesGrid } from '@/components/services-grid';
import { AboutSection } from '@/components/about-section';
import { TestimonialsCarousel } from '@/components/testimonials-carousel';
import { CTASection } from '@/components/cta-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ServicesGrid />
      <AboutSection />
      <TestimonialsCarousel />
      <CTASection />
      <Footer />
    </main>
  );
}
