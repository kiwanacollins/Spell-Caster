'use client';

import { useState, useEffect } from 'react';

interface Testimonial {
  name: string;
  image: string;
  rating: number;
  service: string;
  testimonial: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Jennifer Kennedy',
    image: '/images/testimonials/Jennifer-Kennedy.png',
    rating: 5,
    service: 'Love Spell',
    testimonial:
      'After years of heartbreak, I was skeptical about love spells. But the moment I connected with this healer, I felt a powerful shift in energy. Within weeks, my soulmate appeared in the most magical way. This is real, authentic spiritual work.',
  },
  {
    name: 'Mark Rogers',
    image: '/images/testimonials/Mark-Rogers.png',
    rating: 5,
    service: 'Wealth & Prosperity',
    testimonial:
      'I was struggling financially for years. The prosperity ritual performed for me opened doors I never knew existed. My business tripled in just 3 months. The energy work is profound and life-changing.',
  },
  {
    name: 'Ellie Malinova',
    image: '/images/testimonials/Ellie-Malinova.png',
    rating: 5,
    service: 'Protection Spell',
    testimonial:
      'I felt cursed and surrounded by negative energy. The protection spell lifted a weight I had carried for years. I finally feel safe, peaceful, and shielded from harm. Pure magic.',
  },
  {
    name: 'Wang Wang',
    image: '/images/testimonials/Wang-Wang.png',
    rating: 5,
    service: 'Tarot Reading',
    testimonial:
      'The tarot reading was incredibly accurate and insightful. Every card spoke directly to my situation. The guidance I received helped me make the right decisions at a critical time in my life.',
  },
  {
    name: 'Babul Hossain',
    image: '/images/testimonials/Babul-Hossain.png',
    rating: 5,
    service: 'Energy Healing',
    testimonial:
      'The chakra balancing session was transformative. I felt blocked energy release and a profound sense of alignment. My anxiety disappeared and I feel more centered than ever before.',
  },
  {
    name: 'Yrovi Ivory',
    image: '/images/testimonials/Yrovi-Ivory.png',
    rating: 5,
    service: 'Lunar Ritual',
    testimonial:
      'The full moon manifestation ritual helped me attract abundance in ways I never imagined. The connection to lunar energy is real and the results speak for themselves.',
  },
  {
    name: 'Rihanna Whales',
    image: '/images/testimonials/rihanna-whales.png',
    rating: 5,
    service: 'Crystal Ball Reading',
    testimonial:
      'The divination session revealed insights about my future that gave me clarity and peace. Everything predicted came true within months. This is genuine spiritual guidance.',
  },
];

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000); // Auto-rotate every 6 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10s
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="relative py-20 px-4 bg-ink-900 overflow-hidden">
      {/* Background mystical elements */}
      <div className="absolute inset-0 bg-parchment-texture opacity-5" />
      <div className="absolute top-20 left-10 w-64 h-64 bg-mystical-purple/10 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-mystical-amber/10 rounded-full blur-3xl animate-float" />

      <div className="relative z-10 container mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-gothic text-4xl sm:text-5xl md:text-6xl text-parchment-200 mb-6">
            Voices of Transformation
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-linear-to-r from-transparent to-mystical-amber" />
            <span className="text-mystical-amber text-2xl">✦</span>
            <div className="h-px w-16 bg-linear-to-l from-transparent to-mystical-amber" />
          </div>
          <p className="font-serif text-lg sm:text-xl text-parchment-300 max-w-2xl mx-auto">
            Real stories from souls who have experienced authentic spiritual
            healing
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="relative px-8 py-4">
          {/* Main testimonial container */}
          <div
            className="shadow-obsidian"
            style={{
              backgroundImage: `url(/textures/paper-torn-edge.png)`,
              backgroundSize: '105% 100%',
              backgroundRepeat: 'no-repeat',
              padding: 'clamp(2rem, 8vw, 5rem) clamp(1.5rem, 6vw, 4rem)',
            }}
          >
            {/* Content */}
            <div className="relative z-20">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                {/* Client Image */}
                <div className="shrink-0">
                  <div className="relative w-32 h-32 md:w-40 md:h-40">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-mystical-amber/30 rounded-full blur-xl" />

                    {/* Image container */}
                    <div className="relative w-full h-full rounded-full border-4 border-mystical-bronze overflow-hidden shadow-parchment">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={currentTestimonial.image}
                        alt={currentTestimonial.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    {/* Service badge */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 bg-mystical-purple border-2 border-[#d4af37] rounded-ritual shadow-lg">
                      <span
                        className="text-xs font-serif text-[#d4af37] font-bold tracking-wide"
                        style={{
                          textShadow:
                            '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                        }}
                      >
                        {currentTestimonial.service}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="flex-1 space-y-4 text-center md:text-left">
                  {/* Stars */}
                  <div className="flex justify-center md:justify-start gap-1">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <span
                        key={i}
                        className="text-mystical-amber text-xl animate-glow"
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="font-serif text-base md:text-lg text-ink-800 leading-relaxed italic">
                    &quot;{currentTestimonial.testimonial}&quot;
                  </blockquote>

                  {/* Name */}
                  <div className="pt-4">
                    <p className="font-cinzel text-xl text-mystical-purple font-semibold">
                      {currentTestimonial.name}
                    </p>
                    <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                      <span className="text-mystical-amber text-sm">✓</span>
                      <span className="text-sm font-serif text-ink-700">
                        Verified Client
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 w-12 h-12 bg-mystical-amber hover:bg-mystical-gold text-ink-900 rounded-full border-2 border-mystical-bronze shadow-lg transition-all duration-300 hover:scale-110 z-30"
            aria-label="Previous testimonial"
          >
            <span className="text-2xl">‹</span>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 w-12 h-12 bg-mystical-amber hover:bg-mystical-gold text-ink-900 rounded-full border-2 border-mystical-bronze shadow-lg transition-all duration-300 hover:scale-110 z-30"
            aria-label="Next testimonial"
          >
            <span className="text-2xl">›</span>
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 h-3 bg-mystical-amber rounded-full'
                  : 'w-3 h-3 bg-parchment-400 hover:bg-mystical-amber/60 rounded-full'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Trust Indicator */}
        <div className="text-center mt-12">
          <p className="font-serif text-parchment-300 text-sm">
            Join thousands of satisfied clients who have experienced authentic
            spiritual transformation
          </p>
        </div>
      </div>
    </section>
  );
}
