'use client';

import { useEffect, useRef } from 'react';

export function ParallaxSection() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      
      const scrolled = window.scrollY;
      const parallaxElement = parallaxRef.current;
      const rect = parallaxElement.getBoundingClientRect();
      const elementTop = rect.top + scrolled;
      const elementHeight = rect.height;
      
      // Only apply parallax when element is in view
      if (scrolled + window.innerHeight > elementTop && scrolled < elementTop + elementHeight) {
        const yPos = -(scrolled - elementTop) * 0.5;
        parallaxElement.style.backgroundPosition = `center ${yPos}px`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={parallaxRef}
      className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden"
      style={{
        backgroundImage: 'url(/images/Parallax.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay for better text readability if needed */}
      <div className="absolute inset-0 bg-ink-900/30" />
      
      {/* Optional content overlay */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-parchment-100">
          {/* Add any content you want to overlay on the parallax image */}
        </div>
      </div>
    </section>
  );
}
