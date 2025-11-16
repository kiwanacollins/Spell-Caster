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
    id: 'revenge-spell',
    name: 'Revenge Spell',
    description:
      'Karmic justice magic to return negative energy to those who wronged you, ensuring wrongdoers face consequences through universal law.',
    icon: '/icons/services/revenge-spell.svg',
    category: 'Spells',
  },
  {
    id: 'get-back-lost-items',
    name: 'Get Back Lost Items',
    description:
      'Powerful rituals to recover lost possessions, retrieve stolen items, and restore what rightfully belongs to you through ancient tracking magic.',
    icon: '/icons/services/get-back-lost-items.png',
    category: 'Spells',
  },
  {
    id: 'land-solving-spell',
    name: 'Land Solving Spell',
    description:
      'Resolve property disputes, clear land titles, and manifest rightful ownership through sacred land blessing rituals.',
    icon: '/icons/services/land-solving-spell.png',
    category: 'Spells',
  },
  {
    id: 'obsession-spell',
    name: 'Obsession Spell',
    description:
      'Create powerful magnetic attraction and deep emotional connection, making someone unable to stop thinking about you.',
    icon: '/icons/services/obsession-spell.png',
    category: 'Spells',
  },
  {
    id: 'stop-cheating-spell',
    name: 'Stop Cheating Spell',
    description:
      'End infidelity and restore loyalty in relationships through powerful binding and truth-revealing rituals.',
    icon: '/icons/services/stop-cheating-spell.png',
    category: 'Spells',
  },
  {
    id: 'binding-spell',
    name: 'Binding Spell',
    description:
      'Create unbreakable bonds, prevent separation, and secure lasting commitment through ancient binding rituals.',
    icon: '/icons/services/bonding-spell.png',
    category: 'Spells',
  },
  {
    id: 'gay-lesbian-spell',
    name: 'Gay & Lesbian Spell',
    description:
      'Specialized love spells for LGBTQ+ relationships, attracting compatible partners and strengthening same-sex bonds.',
    icon: '/icons/services/gay-and-lesibian-spell.png',
    category: 'Spells',
  },
  {
    id: 'winning-court-case',
    name: 'Winning a Court Case',
    description:
      'Gain favor in legal matters, influence judges and juries, and ensure justice prevails in your favor.',
    icon: '/icons/services/winning-a-court-case.png',
    category: 'Spells',
  },
  {
    id: 'business-boost-spells',
    name: 'Business Boost Spells',
    description:
      'Attract customers, increase profits, overcome competition, and manifest unprecedented business success.',
    icon: '/icons/services/business-boost-spell.png',
    category: 'Spells',
  },
  {
    id: 'cleansing-rituals',
    name: 'Cleansing Rituals and Spells',
    description:
      'Remove negative energy, break curses, cleanse your aura, and purify your space from all harmful influences.',
    icon: '/icons/services/Chakra-Meditation.svg',
    category: 'Rituals',
  },
  {
    id: 'divorce-spell',
    name: 'Divorce Spell',
    description:
      'Facilitate peaceful separation, speed up divorce proceedings, and help both parties move on to new beginnings.',
    icon: '/icons/services/divorce-spell.png',
    category: 'Spells',
  },
  {
    id: 'marriage-commitment',
    name: 'Marriage and Commitment',
    description:
      'Manifest marriage proposals, strengthen commitment, and create lasting unions blessed by ancient spirits.',
    icon: '/icons/services/marriage-and-commitment.png',
    category: 'Spells',
  },
  {
    id: 'magic-wallet',
    name: 'Magic Wallet',
    description:
      'Enchanted wallets that continuously attract money, multiply wealth, and ensure your pockets never run empty.',
    icon: '/icons/services/magic-wallet.png',
    category: 'Artifacts',
  },
  {
    id: 'financial-issues',
    name: 'Financial Issues',
    description:
      'Overcome debt, attract financial opportunities, break poverty cycles, and manifest abundance and prosperity.',
    icon: '/icons/services/financial-issues.png',
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
    id: 'magic-rings',
    name: 'Magic Rings',
    description:
      'Channel mystical energies through sacred rings infused with ancient power to protect, attract, and transform your destiny.',
    icon: '/icons/services/magic-rings.svg',
    category: 'Artifacts',
  },
];

export function ServicesGrid() {
  return (
    <section className="relative py-20 px-4 bg-transparent">
      {/* Background texture overlay - leaf impression stone */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'url(/textures/leaf-impression-stone.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* Overlay to darken and blend the texture */}
      <div className="absolute inset-0 bg-parchment-100/60" />

      <div className="relative z-10 container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-gothic text-4xl sm:text-5xl md:text-6xl text-ink-900 mb-6">
            Sacred Services
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-linear-to-r from-transparent to-mystical-amber" />
            <span className="text-mystical-amber text-2xl">✦</span>
            <div className="h-px w-16 bg-linear-to-l from-transparent to-mystical-amber" />
          </div>
          <p className="font-serif text-lg sm:text-xl text-ink-800 max-w-2xl mx-auto">
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
              <div className="relative h-full rounded-ritual overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                {/* Golden background with metallic gradient */}
                <div className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg, #fef3c7 0%, #fefce8 50%, #fde68a 100%)',
                  }}
                />
                
                {/* Metallic sheen overlay for realistic gold effect */}
                <div 
                  className="absolute inset-0 opacity-60"
                  style={{
                    background: 'linear-gradient(135deg, rgba(254, 240, 138, 0.5) 0%, transparent 50%, rgba(252, 211, 77, 0.5) 100%)',
                  }}
                />
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4) 0%, transparent 50%)',
                  }}
                />

                {/* Corner decorative elements - ancient style */}
                <div className="absolute top-0 left-0 w-12 h-12">
                  <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-700 opacity-60" />
                  <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-yellow-600 opacity-40" />
                </div>
                <div className="absolute top-0 right-0 w-12 h-12">
                  <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-700 opacity-60" />
                  <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-yellow-600 opacity-40" />
                </div>
                <div className="absolute bottom-0 left-0 w-12 h-12">
                  <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-700 opacity-60" />
                  <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-yellow-600 opacity-40" />
                </div>
                <div className="absolute bottom-0 right-0 w-12 h-12">
                  <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-700 opacity-60" />
                  <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-yellow-600 opacity-40" />
                </div>

                {/* Subtle texture overlay on gold */}
                <div className="absolute inset-0 opacity-10 mix-blend-multiply"
                  style={{
                    backgroundImage: `repeating-linear-gradient(
                      45deg,
                      transparent,
                      transparent 2px,
                      rgba(139, 115, 85, 0.1) 2px,
                      rgba(139, 115, 85, 0.1) 4px
                    )`
                  }}
                />

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
                    service.id === 'candle-magic'
                      ? 'mb-12' 
                      : service.id === 'astrology'
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

                  {/* Decorative divider with rune that glows on scroll */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-px w-8 bg-linear-to-r from-transparent to-mystical-bronze" />
                    <span className="text-mystical-bronze text-sm js-rune rune">❋</span>
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
          <p className="font-serif text-ink-800 mb-6">
            Can&apos;t find what you&apos;re seeking?
          </p>
          <Link
            href="/contact"
            className="relative inline-block px-8 py-4 text-ink-900 font-cinzel text-lg rounded-ritual border-2 border-amber-600 transition-all duration-300 hover:shadow-2xl hover:scale-105 overflow-hidden group"
          >
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
