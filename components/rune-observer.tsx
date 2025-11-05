'use client';

import { useEffect } from 'react';

/**
 * Observes elements with the class `js-rune` and toggles the `is-visible` class
 * when they enter the viewport to trigger glow animations.
 */
export function RuneObserver() {
  useEffect(() => {
    const runes = Array.from(document.querySelectorAll<HTMLElement>('.js-rune'));
    if (runes.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Animate each rune once
            io.unobserve(entry.target);
          }
        }
      },
      { root: null, threshold: 0.2 }
    );

    runes.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
