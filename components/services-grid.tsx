'use client';

import Link from 'next/link';

interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
}

const services: Service[] = [
  {
    id: 'love-spells',
    name: 'Love & Relationships',
    description:
      'Attract true love, heal broken hearts, and strengthen the bonds between souls destined to unite.',
    icon: '/icons/services/Love_Gloss_Be_Mine.svg',
    category: 'Spells',
  },
  {
    id: 'protection-spells',
    name: 'Protection & Shielding',
    description:
      'Ward off negative energies, break curses, and create sacred barriers against harm and malicious forces.',
    icon: '/icons/services/Shield_005_SPenguin.svg',
    category: 'Spells',
  },
  {
    id: 'wealth-prosperity',
    name: 'Wealth & Prosperity',
    description:
      'Open the doors to abundance, attract financial success, and manifest prosperity in all areas of life.',
    icon: '/icons/services/cash-and-coins.svg',
    category: 'Spells',
  },
  {
    id: 'tarot-oracle',
    name: 'Tarot & Oracle Readings',
    description:
      'Receive divine guidance through the sacred cards, revealing hidden truths and illuminating your path forward.',
    icon: '/icons/services/Oracle-card-deck.svg',
    category: 'Readings',
  },
  {
    id: 'crystal-ball',
    name: 'Crystal Ball Divination',
    description:
      'Peer into the mystical depths of the crystal sphere to glimpse future events and spiritual visions.',
    icon: '/icons/services/fortune-telling-crystal-ball.svg',
    category: 'Readings',
  },
  {
    id: 'astrology',
    name: 'Astrology & Zodiac',
    description:
      'Unlock the secrets written in the stars, understand your cosmic blueprint and planetary influences.',
    icon: '/icons/services/zodiac-wheel.svg',
    category: 'Readings',
  },
  {
    id: 'numerology',
    name: 'Sacred Numerology',
    description:
      'Decode the mystical language of numbers to reveal your life path, destiny, and spiritual purpose.',
    icon: '/icons/services/sacred-geometry-numbers.svg',
    category: 'Readings',
  },
  {
    id: 'energy-work',
    name: 'Chakra & Energy Healing',
    description:
      'Balance your energy centers, cleanse your aura, and restore harmony to body, mind, and spirit.',
    icon: '/icons/services/Chakra-Meditation.svg',
    category: 'Energy Work',
  },
  {
    id: 'moon-rituals',
    name: 'Lunar Rituals',
    description:
      'Harness the power of moon phases for manifestation, release, and spiritual transformation.',
    icon: '/icons/services/crescent-moon-with-stars.svg',
    category: 'Rituals',
  },
  {
    id: 'candle-magic',
    name: 'Candle Magic',
    description:
      'Direct your intentions through the sacred flame, using colors and herbs to manifest your desires.',
    icon: '/icons/services/ritual-candle-icon.svg',
    category: 'Rituals',
  },
  {
    id: 'herbal-remedies',
    name: 'Herbal Magic & Potions',
    description:
      "Craft sacred blends using nature's ancient wisdom to heal, protect, and empower your spiritual journey.",
    icon: '/icons/services/mortar-and-pestle-with-herbs.svg',
    category: 'Rituals',
  },
];

export function ServicesGrid() {
  return (
    <section className="relative py-20 px-4 bg-ink-900">
      {/* Background texture overlay */}
      <div className="absolute inset-0 bg-parchment-texture opacity-5" />

      <div className="relative z-10 container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-gothic text-4xl sm:text-5xl md:text-6xl text-parchment-200 mb-6">
            Sacred Services
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-linear-to-r from-transparent to-mystical-amber" />
            <span className="text-mystical-amber text-2xl">✦</span>
            <div className="h-px w-16 bg-linear-to-l from-transparent to-mystical-amber" />
          </div>
          <p className="font-serif text-lg sm:text-xl text-parchment-300 max-w-2xl mx-auto">
            Explore the ancient arts and mystical services offered to guide your
            spiritual journey
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link
              key={service.id}
              href={`/services/${service.id}`}
              className="group"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="relative h-full bg-parchment-100 rounded-ritual overflow-hidden border-2 border-parchment-400 transition-all duration-500 hover:border-mystical-amber hover:shadow-parchment-hover hover:-translate-y-2">
                {/* Corner decorative elements */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-mystical-gold opacity-40" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-mystical-gold opacity-40" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-mystical-gold opacity-40" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-mystical-gold opacity-40" />

                {/* Background texture */}
                <div className="absolute inset-0 bg-parchment-texture opacity-20" />

                {/* Card content */}
                <div className="relative p-8 flex flex-col items-center text-center h-full">
                  {/* Category badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-mystical-amber/10 border border-mystical-amber/30 rounded-ritual">
                    <span className="text-xs font-serif text-mystical-bronze uppercase tracking-wider">
                      {service.category}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className={`relative w-24 h-24 transition-all duration-500 group-hover:scale-110 group-hover:animate-float ${
                    service.id === 'protection-spells' || 
                    service.id === 'moon-rituals' || 
                    service.id === 'astrology' 
                      ? 'mb-8' 
                      : 'mb-6'
                  }`}>
                    <div className="absolute inset-0 bg-mystical-amber/20 rounded-full blur-xl group-hover:bg-mystical-amber/40 transition-all duration-500" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={service.icon}
                      alt={service.name}
                      width={96}
                      height={96}
                      loading="lazy"
                      decoding="async"
                      className="relative z-10 drop-shadow-lg w-24 h-auto"
                    />
                  </div>

                  {/* Service name */}
                  <h3 className="font-cinzel text-2xl text-ink-900 mb-4 group-hover:text-mystical-purple transition-colors duration-300">
                    {service.name}
                  </h3>

                  {/* Decorative divider */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-px w-8 bg-linear-to-r from-transparent to-mystical-bronze" />
                    <span className="text-mystical-bronze text-sm">❋</span>
                    <div className="h-px w-8 bg-linear-to-l from-transparent to-mystical-bronze" />
                  </div>

                  {/* Description */}
                  <p className="font-serif text-sm text-ink-700 leading-relaxed grow">
                    {service.description}
                  </p>

                  {/* Learn more indicator */}
                  <div className="mt-6 flex items-center gap-2 text-mystical-purple group-hover:text-mystical-amber transition-colors duration-300">
                    <span className="font-serif text-sm uppercase tracking-wider">
                      Explore
                    </span>
                    <span className="text-lg transform group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-linear-to-t from-mystical-amber/5 to-transparent" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <p className="font-serif text-parchment-300 mb-6">
            Can&apos;t find what you&apos;re seeking?
          </p>
          <Link
            href="/contact"
            className="relative inline-block px-8 py-4 bg-mystical-amber hover:bg-mystical-gold text-ink-900 font-cinzel text-lg rounded-ritual border-2 border-mystical-amber transition-all duration-300 hover:shadow-candle hover:scale-105 overflow-hidden group"
          >
            <span className="relative z-10">Request Custom Service</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/textures/wax-seal-for-CTAs-&-buttons.png"
              alt=""
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 opacity-20 group-hover:opacity-30 transition-opacity duration-300"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
