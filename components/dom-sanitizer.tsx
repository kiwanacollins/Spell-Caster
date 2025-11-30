'use client';

import { useEffect } from 'react';

export default function DomSanitizer() {
  useEffect(() => {
    try {
      // Remove attributes commonly injected by browser extensions that can
      // cause hydration mismatches during development.
      const attrsToRemove = ['cz-shortcut-listen'];
      const root = document.documentElement;

      attrsToRemove.forEach((attr) => {
        if (root.hasAttribute(attr)) {
          root.removeAttribute(attr);
        }
        if (document.body && document.body.hasAttribute(attr)) {
          document.body.removeAttribute(attr);
        }
      });

      // Also remove the attribute from any element that might have it.
      attrsToRemove.forEach((attr) => {
        document.querySelectorAll(`[${attr}]`).forEach((el) => {
          el.removeAttribute(attr);
        });
      });
    } catch (err) {
      // Silence any errors in sanitization to avoid affecting app UX
      // This is only a best-effort cleanup for dev-time extension attributes.
      console.debug('DomSanitizer could not remove extension attributes', err);
    }
  }, []);

  return null;
}
