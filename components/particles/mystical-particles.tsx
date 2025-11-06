'use client';

import { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Container } from '@tsparticles/engine';

interface MysticalParticlesProps {
  type?: 'smoke' | 'mist' | 'both';
  className?: string;
}

export function MysticalParticles({
  type = 'both',
  className = '',
}: MysticalParticlesProps) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    // Particles loaded successfully - removed console.debug to prevent CORS errors with iframes
  };

  // Mystical smoke configuration
  const smokeConfig = {
    fullScreen: { enable: false },
    background: {
      color: {
        value: 'transparent',
      },
    },
    fpsLimit: 60,
    particles: {
      color: {
        value: ['#CC8800', '#8B6F47', '#F4E8D0'],
      },
      move: {
        enable: true,
        speed: 0.5,
        direction: 'top' as const,
        random: true,
        straight: false,
        outModes: {
          default: 'out' as const,
          top: 'destroy' as const,
          bottom: 'none' as const,
        },
      },
      number: {
        value: 40,
        density: {
          enable: true,
        },
      },
      opacity: {
        value: { min: 0.1, max: 0.4 },
        animation: {
          enable: true,
          speed: 0.5,
          sync: false,
        },
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: { min: 20, max: 60 },
        animation: {
          enable: true,
          speed: 2,
          sync: false,
        },
      },
    },
    detectRetina: true,
  };

  // Mystical mist configuration
  const mistConfig = {
    fullScreen: { enable: false },
    background: {
      color: {
        value: 'transparent',
      },
    },
    fpsLimit: 60,
    particles: {
      color: {
        value: ['#9966CC', '#CC8800', '#C0C0C0'],
      },
      move: {
        enable: true,
        speed: 0.3,
        direction: 'none' as const,
        random: true,
        straight: false,
        outModes: {
          default: 'bounce' as const,
        },
      },
      number: {
        value: 30,
        density: {
          enable: true,
        },
      },
      opacity: {
        value: { min: 0.05, max: 0.2 },
        animation: {
          enable: true,
          speed: 0.3,
          sync: false,
        },
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: { min: 30, max: 80 },
        animation: {
          enable: true,
          speed: 1,
          sync: false,
        },
      },
    },
    detectRetina: true,
  };

  if (!init) {
    return null;
  }

  if (type === 'both') {
    return (
      <>
        <div className={`absolute inset-0 pointer-events-none ${className}`}>
          <Particles
            id="mystical-smoke"
            particlesLoaded={particlesLoaded}
            options={smokeConfig}
          />
        </div>
        <div className={`absolute inset-0 pointer-events-none ${className}`}>
          <Particles
            id="mystical-mist"
            particlesLoaded={particlesLoaded}
            options={mistConfig}
          />
        </div>
      </>
    );
  }

  const config = type === 'smoke' ? smokeConfig : mistConfig;

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Particles
        id={`mystical-${type}`}
        particlesLoaded={particlesLoaded}
        options={config}
      />
    </div>
  );
}
