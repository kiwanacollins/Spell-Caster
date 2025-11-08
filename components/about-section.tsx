'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';

// Dynamically import 3D background (client-side only)
const SketchfabBackground = dynamic(
  () => import('@/components/3d/sketchfab-background').then((mod) => mod.SketchfabBackground),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-charcoal/10" />,
  }
);

export function AboutSection() {
  return (
    <section className="relative py-20 px-4 bg-parchment-100 overflow-hidden">
      {/* 3D Sketchfab Background - Fire Animation */}
      <SketchfabBackground 
        modelId="8cf82052fb164a25a0ca40d09a19c4dc" 
        opacity={0.15}
        className="z-0"
      />

      {/* Translucent Protective Overlay - Sits in front of 3D but behind content */}
      <div className="absolute inset-0 z-5 bg-linear-to-b from-parchment-100/60 via-parchment-100/40 to-parchment-100/60 backdrop-blur-sm" />

      {/* Background texture overlay */}
      <div className="absolute inset-0 bg-parchment-texture opacity-30 z-10" />

      <div className="relative z-20 container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-6">
            {/* Section Header */}
            <div className="mb-8">
              <h2 className="font-gothic text-4xl sm:text-5xl md:text-6xl text-ink-900 mb-6">
                Meet Your Guide
              </h2>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-16 bg-linear-to-r from-transparent to-mystical-amber" />
                <span className="text-mystical-amber text-2xl">✦</span>
                <div className="h-px w-16 bg-linear-to-l from-transparent to-mystical-amber" />
              </div>
            </div>

            {/* Introduction */}
            <p className="font-serif text-lg text-ink-800 leading-relaxed">
              For over two decades, I have walked the sacred path between the
              seen and unseen worlds, serving as a bridge for those seeking
              spiritual healing, guidance, and transformation.
            </p>

            {/* Story */}
            <p className="font-serif text-base text-ink-700 leading-relaxed">
              My journey began in childhood, when I first discovered my innate
              connection to the mystical forces that govern our universe. Through
              years of study with master practitioners, deep meditation, and
              countless sacred rituals, I have honed my abilities to channel
              divine energy and ancient wisdom.
            </p>

            <p className="font-serif text-base text-ink-700 leading-relaxed">
              I work with the energies of the moon, the power of sacred herbs,
              the wisdom of the tarot, and the ancient art of spell casting to
              help guide souls toward their highest purpose. Every spell I cast,
              every reading I perform, is infused with authentic spiritual energy
              and a deep commitment to your wellbeing.
            </p>

            {/* Philosophy */}
            <div className="bg-mystical-amber/10 border-2 border-mystical-bronze/30 rounded-ritual p-6 my-8">
              <h3 className="font-cinzel text-xl text-mystical-purple mb-3">
                My Sacred Promise
              </h3>
              <p className="font-serif text-sm text-ink-700 leading-relaxed italic">
                &quot;Every soul that seeks my guidance is treated with the utmost
                respect, confidentiality, and care. I honor the sacred trust you
                place in me, and I commit to working with pure intentions to
                manifest the highest good for your spiritual journey.&quot;
              </p>
            </div>

            {/* Specialties */}
            <div className="space-y-3">
              <h3 className="font-cinzel text-lg text-ink-900">
                Areas of Expertise:
              </h3>
              <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-8 py-14 px-10 rounded-ritual border-2 border-mystical-bronze/30 overflow-hidden min-h-[520px]">
                {/* Parchment background */}
                <div
                  className="absolute inset-0 opacity-50"
                  style={{
                    backgroundImage: 'url(/textures/parchment.webp)',
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                  }}
                />
                
                {/* Content */}
                <div className="relative z-10 col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[
                    'Love & Relationship Healing',
                    'Protection & Curse Removal',
                    'Wealth & Prosperity Magic',
                    'Tarot & Oracle Divination',
                    'Energy Healing & Chakras',
                    'Lunar & Seasonal Rituals',
                  ].map((specialty, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 font-serif text-base text-ink-900 font-medium"
                    >
                      <span className="text-mystical-amber text-lg">✧</span>
                      <span>{specialty}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-6">
              <Button
                asChild
                size="lg"
                className="relative bg-mystical-amber hover:bg-mystical-gold text-ink-900 font-cinzel text-base px-8 py-6 rounded-ritual border-2 border-mystical-amber transition-all duration-300 hover:shadow-candle hover:scale-105 overflow-hidden group"
              >
                <Link href="/consultations">
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
            </div>
          </div>

          {/* Right: Portrait Image */}
          <div className="relative">
            {/* Decorative corner elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-mystical-gold opacity-60 z-10" />
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-4 border-r-4 border-mystical-gold opacity-60 z-10" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-4 border-l-4 border-mystical-gold opacity-60 z-10" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-mystical-gold opacity-60 z-10" />

            {/* Portrait container with mystical frame */}
            <div className="relative overflow-hidden rounded-ritual border-4 border-mystical-bronze shadow-obsidian">
              {/* Inner glow effect */}
              <div className="absolute inset-0 bg-linear-to-br from-mystical-amber/20 via-transparent to-mystical-purple/20 z-10 pointer-events-none" />

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/healer-portrait.webp"
                alt="Professional Spiritual Healer and Spell Caster"
                width={600}
                height={800}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover"
              />

              {/* Bottom decorative overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-ink-900/40 to-transparent z-10 pointer-events-none" />
            </div>

            {/* Floating mystical elements */}
            <div className="absolute -top-8 -right-8 w-16 h-16 bg-mystical-amber/30 rounded-full blur-2xl animate-float-slow" />
            <div className="absolute -bottom-12 -left-12 w-20 h-20 bg-mystical-purple/20 rounded-full blur-2xl animate-float" />
          </div>
        </div>
      </div>
    </section>
  );
}
