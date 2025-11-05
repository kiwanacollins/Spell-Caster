'use client';

import { useState, useEffect } from 'react';
import { TestimonialSkeleton } from '@/components/ui/skeleton';

interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  service: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    rating: 5,
    text: 'The love spell exceeded all my expectations. Within weeks, my soulmate appeared in the most magical way. The energy work was profound and life-changing.',
    service: 'Love Spell',
    image: '/images/testimonials/sarah-chen.webp'
  },
  {
    id: '2', 
    name: 'Marcus Thompson',
    rating: 5,
    text: 'The protection ritual created an immediate shift in my energy. Negative influences vanished, and I feel surrounded by divine light and safety.',
    service: 'Protection Magic',
    image: '/images/testimonials/marcus-thompson.webp'
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    rating: 5,
    text: 'My tarot reading was incredibly accurate and insightful. The guidance I received helped me navigate a difficult period with clarity and confidence.',
    service: 'Tarot Reading',
    image: '/images/testimonials/elena-rodriguez.webp'
  },
  {
    id: '4',
    name: 'David Kim',
    rating: 5,
    text: 'The wealth manifestation ritual brought unexpected opportunities and financial abundance. The cosmic alignment was perfect for my business launch.',
    service: 'Wealth Magic',
    image: '/images/testimonials/david-kim.webp'
  },
  {
    id: '5',
    name: 'Luna Williams',
    rating: 5,
    text: 'The chakra healing session balanced my entire energy system. I feel more grounded, peaceful, and connected to my spiritual path than ever before.',
    service: 'Energy Healing',
    image: '/images/testimonials/luna-williams.webp'
  },
  {
    id: '6',
    name: 'James Anderson',
    rating: 5,
    text: 'The lunar ritual perfectly aligned with the new moon energy. My manifestations are coming to fruition with divine timing and magical synchronicities.',
    service: 'Moon Ritual',
    image: '/images/testimonials/james-anderson.webp'
  },
  {
    id: '7',
    name: 'Aria Patel',
    rating: 5,
    text: 'The crystal ball divination revealed hidden aspects of my destiny. The visions were clear and have guided me toward my highest path.',
    service: 'Divination',
    image: '/images/testimonials/aria-patel.webp'
  }
];

interface TestimonialsCarouselProps {
  showLoading?: boolean;
}

export function TestimonialsCarouselWithLoading({ showLoading = false }: TestimonialsCarouselProps) {
  const [isLoading, setIsLoading] = useState(showLoading);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (showLoading) {
      const timer = setTimeout(() => setIsLoading(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [showLoading]);

  useEffect(() => {
    if (!isLoading) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <section className="relative py-20 px-4 bg-mystical-purple/10">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="font-gothic text-4xl sm:text-5xl md:text-6xl text-parchment-200 mb-6">
              Voices of Transformation
            </h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-linear-to-r from-transparent to-mystical-amber" />
              <span className="text-mystical-amber text-2xl">✦</span>
              <div className="h-px w-16 bg-linear-to-l from-transparent to-mystical-amber" />
            </div>
            <p className="font-serif text-lg text-parchment-300 max-w-2xl mx-auto">
              Discover the profound transformations experienced by our spiritual community
            </p>
          </div>

          <div className="relative">
            <TestimonialSkeleton />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20 px-4 bg-mystical-purple/10">
      {/* Rest of the actual testimonials carousel component... */}
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-gothic text-4xl sm:text-5xl md:text-6xl text-parchment-200 mb-6">
            Voices of Transformation
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-linear-to-r from-transparent to-mystical-amber" />
            <span className="text-mystical-amber text-2xl">✦</span>
            <div className="h-px w-16 bg-linear-to-l from-transparent to-mystical-amber" />
          </div>
          <p className="font-serif text-lg text-parchment-300 max-w-2xl mx-auto">
            Discover the profound transformations experienced by our spiritual community
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="bg-parchment-100 p-8 rounded-ritual border-2 border-parchment-400 min-h-[300px] flex flex-col justify-center">
            <div className="text-center">
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-mystical-gold text-xl animate-glow">⭐</span>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-serif text-lg text-ink-700 leading-relaxed mb-6 max-w-2xl mx-auto">
                "{testimonials[currentIndex].text}"
              </blockquote>

              {/* Client info */}
              <div className="flex items-center justify-center gap-4">
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-mystical-gold shadow-mystical"
                  />
                  <div className="absolute inset-0 rounded-full bg-mystical-amber/20 animate-pulse" />
                </div>
                <div className="text-left">
                  <p className="font-cinzel text-lg text-ink-900 font-semibold">
                    {testimonials[currentIndex].name}
                  </p>
                  <div className="flex items-center gap-2">
                    <span 
                      className="text-sm px-2 py-1 rounded border text-[#d4af37] bg-mystical-purple/80 border-[#d4af37]"
                      style={{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}
                    >
                      {testimonials[currentIndex].service}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-mystical-gold shadow-glow'
                    : 'bg-parchment-400 hover:bg-mystical-amber'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}