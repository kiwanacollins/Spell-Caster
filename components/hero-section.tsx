'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';

// Dynamically import 3D component (client-side only)
const AncientBookScene = dynamic(
  () =>
    import('@/components/3d/ancient-book').then((mod) => mod.AncientBookScene),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-charcoal/20" />,
  }
);

// Dynamically import particle effects (client-side only)
const MysticalParticles = dynamic(
  () =>
    import('@/components/particles/mystical-particles').then(
      (mod) => mod.MysticalParticles
    ),
  { ssr: false }
);

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-charcoal">
      {/* Mystical Particle Effects */}
      <MysticalParticles type="both" className="opacity-60" />

      {/* 3D Ancient Book Background */}
      <div className="absolute inset-0 opacity-30 z-10">
        <AncientBookScene />
      </div>

      {/* Background texture overlay */}
      <div className="absolute inset-0 bg-[url('/textures/parchment-dark.webp')] bg-cover bg-center opacity-10 z-20" />

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-linear-to-b from-charcoal/90 via-charcoal/70 to-charcoal/90 z-30" />

      {/* Content */}
      <div className="relative z-40 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Headline */}
          <h1 className="font-unifraktur text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-parchment leading-tight animate-fade-in">
            <span 
              className="inline-block"
              style={{
                textShadow: '0 0 20px rgba(204, 136, 0, 0.8), 0 0 40px rgba(204, 136, 0, 0.5), 0 0 60px rgba(204, 136, 0, 0.3)'
              }}
            >
              Ancient Wisdom
            </span>
            <br />
            <span 
              className="text-mystical-amber"
              style={{
                textShadow: '0 0 20px rgba(204, 136, 0, 0.8), 0 0 40px rgba(204, 136, 0, 0.5), 0 0 60px rgba(204, 136, 0, 0.3)'
              }}
            >
              Meets Modern Healing
            </span>
          </h1>

          {/* Subheadline */}
          <p 
            className="font-crimson text-xl sm:text-2xl md:text-3xl text-parchment/90 max-w-2xl mx-auto leading-relaxed"
            style={{
              textShadow: '0 0 15px rgba(204, 136, 0, 0.5), 0 0 30px rgba(204, 136, 0, 0.3)'
            }}
          >
            Experience authentic spiritual services, sacred rituals, and energy
            work from a professional healer
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 py-6">
            <div className="h-px w-16 bg-linear-to-r from-transparent to-mystical-amber" />
            <span className="text-mystical-amber text-2xl">✦</span>
            <div className="h-px w-16 bg-linear-to-l from-transparent to-mystical-amber" />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              asChild
              size="lg"
              className="relative bg-mystical-amber hover:bg-sacred-gold text-charcoal font-philosopher text-lg px-8 py-6 rounded-none border-2 border-mystical-amber shadow-lg hover:shadow-mystical-amber/50 transition-all duration-300 hover:scale-105 overflow-hidden group"
            >
              <Link href="/services">
                <span className="relative z-10">Begin Your Journey</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/textures/wax-seal-for-CTAs-&-buttons.png"
                  alt=""
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                  aria-hidden="true"
                />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent hover:bg-parchment/10 text-parchment font-philosopher text-lg px-8 py-6 rounded-none border-2 border-parchment hover:border-mystical-amber transition-all duration-300"
            >
              <Link href="/consultations">Book a Consultation</Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="pt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-parchment/70 font-garamond text-sm">
            <div className="flex items-center gap-2">
              <span className="text-mystical-amber">✓</span>
              <span>Authentic Spiritual Guidance</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-mystical-amber">✓</span>
              <span>Confidential & Sacred</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-mystical-amber">✓</span>
              <span>Trusted by Thousands</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-parchment/30 flex items-start justify-center p-2">
          <div className="w-1 h-3 rounded-full bg-mystical-amber animate-pulse" />
        </div>
      </div>
    </section>
  );
}