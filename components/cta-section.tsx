'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="relative py-20 px-4 bg-transparent overflow-hidden">
      {/* Background mystical elements */}
      <div className="absolute inset-0 bg-parchment-texture opacity-5" />
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-mystical-purple/30 via-transparent to-mystical-amber/20" />
      
      {/* Floating orbs */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-mystical-amber/20 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute top-20 right-20 w-40 h-40 bg-mystical-purple/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-10 left-1/3 w-24 h-24 bg-mystical-gold/20 rounded-full blur-2xl animate-float-fast" />

      {/* Mystical circle pattern */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <div className="w-[600px] h-[600px] border-2 border-mystical-amber rounded-full animate-rune-pulse" />
        <div className="absolute w-[500px] h-[500px] border-2 border-mystical-amber rounded-full animate-rune-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute w-[400px] h-[400px] border-2 border-mystical-amber rounded-full animate-rune-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 container mx-auto max-w-4xl">
        <div className="text-center space-y-8">
          {/* Mystical symbol */}
          <div className="flex justify-center">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 bg-mystical-amber/30 rounded-full blur-xl animate-glow" />
              <div className="relative text-6xl text-mystical-amber animate-rune-pulse">
                ✦
              </div>
            </div>
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h2 className="font-gothic text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ink-900 leading-tight">
              Join the Circle
            </h2>
            
            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-linear-to-r from-transparent to-mystical-amber" />
              <span className="text-mystical-amber text-xl">⟡</span>
              <div className="h-px w-16 bg-linear-to-l from-transparent to-mystical-amber" />
            </div>
          </div>

          {/* Subheadline */}
          <p className="font-serif text-xl sm:text-2xl md:text-3xl text-ink-800 max-w-3xl mx-auto leading-relaxed">
            Step into a world of ancient wisdom and spiritual transformation
          </p>

          {/* Description */}
          <p className="font-serif text-base sm:text-lg text-ink-700 max-w-2xl mx-auto leading-relaxed">
            Whether you seek love, protection, prosperity, or guidance, your
            journey begins here. Join thousands who have discovered the power of
            authentic spiritual healing.
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-mystical-amber/20 rounded-full flex items-center justify-center border-2 border-mystical-amber/40">
                <span className="text-2xl text-mystical-amber">✓</span>
              </div>
              <p className="font-serif text-sm text-ink-800">
                Authentic Spiritual Guidance
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-mystical-amber/20 rounded-full flex items-center justify-center border-2 border-mystical-amber/40">
                <span className="text-2xl text-mystical-amber">✓</span>
              </div>
              <p className="font-serif text-sm text-ink-800">
                Confidential & Sacred
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-mystical-amber/20 rounded-full flex items-center justify-center border-2 border-mystical-amber/40">
                <span className="text-2xl text-mystical-amber">✓</span>
              </div>
              <p className="font-serif text-sm text-ink-800">
                Proven Results
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              asChild
              size="lg"
              className="relative text-ink-900 font-cinzel text-lg px-10 py-7 rounded-ritual border-2 border-amber-600 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden group"
            >
              <Link href="/services">
                {/* Gold gradient background */}
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg, #fef3c7 0%, #fefce8 50%, #fde68a 100%)',
                  }}
                />
                
                {/* Metallic sheen overlay */}
                <div 
                  className="absolute inset-0 opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(254, 240, 138, 0.5) 0%, transparent 50%, rgba(252, 211, 77, 0.5) 100%)',
                  }}
                />
                
                {/* Highlight effect */}
                <div 
                  className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4) 0%, transparent 50%)',
                  }}
                />
                
                <span className="relative z-10">Explore Services</span>
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
              className="relative bg-transparent hover:bg-parchment-100/10 text-ink-900 font-cinzel text-lg px-10 py-7 rounded-ritual border-2 border-ink-800 hover:border-amber-500 transition-all duration-300 overflow-hidden group"
            >
              <Link href="/consultations">
                {/* Subtle gold glow on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #fef3c7 0%, #fefce8 50%, #fde68a 100%)',
                  }}
                />
                <span className="relative z-10">Book a Reading</span>
              </Link>
            </Button>
          </div>

          {/* Trust indicator */}
          <div className="pt-8">
            <p className="font-serif text-sm text-ink-600 italic">
              Join our sacred community • No commitment required • Begin your
              transformation today
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
