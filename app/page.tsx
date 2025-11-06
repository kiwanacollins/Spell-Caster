import { HeroSection } from '@/components/hero-section';
import { ServicesGrid } from '@/components/services-grid';
import { ParallaxSection } from '@/components/parallax-section';
import { AboutSection } from '@/components/about-section';
import { TestimonialsCarousel } from '@/components/testimonials-carousel';
import { CTASection } from '@/components/cta-section';
import { RuneObserver } from '@/components/rune-observer';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Scroll-triggered rune glow observer */}
      <RuneObserver />
      <HeroSection />
      <ServicesGrid />
      <ParallaxSection />
      <AboutSection />
      <TestimonialsCarousel />
      <CTASection />
      <Footer />
    </main>
  );
}
