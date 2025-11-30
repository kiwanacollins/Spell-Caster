import { HeroSection } from '@/components/hero-section';
import { ServicesGrid } from '@/components/services-grid';
import { ParallaxSection } from '@/components/parallax-section';
import { AboutSection } from '@/components/about-section';
import { TestimonialsCarousel } from '@/components/testimonials-carousel';
import { CTASection } from '@/components/cta-section';
import { RuneObserver } from '@/components/rune-observer';
import { Footer } from '@/components/footer';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { MessengerButton } from '@/components/messenger-button';

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-ink-900">
      {/* Scroll-triggered rune glow observer */}
      <RuneObserver />
      <HeroSection />
      
      {/* Parchment Paper Container - Content sits within the paper boundaries */}
      <div className="relative w-full flex justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div
          className="relative w-full max-w-[1400px] shadow-2xl"
          style={{
            backgroundImage: `url(/textures/parchment-light.webp)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
          }}
        >
          {/* Paper edge shadow for depth */}
          <div className="absolute inset-0 shadow-[0_0_60px_rgba(0,0,0,0.5)]" style={{ pointerEvents: 'none' }} />
          
          {/* Content Container with padding to keep content within paper */}
          <div className="relative z-10 px-4 sm:px-8 lg:px-16 py-8 sm:py-12">
            <ServicesGrid />
            <ParallaxSection />
            <AboutSection />
            <TestimonialsCarousel />
            <CTASection />
          </div>
        </div>
      </div>
      
      <Footer />
      
      {/* WhatsApp Contact Button */}
      <WhatsAppButton />
      
      {/* Facebook Messenger Contact Button */}
      <MessengerButton />
    </main>
  );
}
