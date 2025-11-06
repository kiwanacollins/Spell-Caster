'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { GiSparkles, GiMoon, GiSun } from 'react-icons/gi';

interface EnergyReadingWidgetProps {
  energyLevel?: number;
  showMoonPhase?: boolean;
  showChakra?: boolean;
  moonPhase?: string;
  chakraStatus?: string;
  animateOnMount?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Energy Reading Widget Component
 * 
 * A mystical energy meter that displays user's spiritual alignment (0-100%).
 * Features animated progress bar with ancient styling and optional moon/chakra data.
 * 
 * Usage:
 * ```tsx
 * <EnergyReadingWidget 
 *   energyLevel={75}
 *   showMoonPhase
 *   showChakra
 *   moonPhase="Waxing Crescent"
 *   chakraStatus="Harmonious"
 * />
 * ```
 */
export function EnergyReadingWidget({
  energyLevel = 75,
  showMoonPhase = true,
  showChakra = true,
  moonPhase = 'Waxing Crescent',
  chakraStatus = 'Harmonious',
  animateOnMount = true,
  size = 'md',
}: EnergyReadingWidgetProps) {
  const [displayedLevel, setDisplayedLevel] = React.useState(animateOnMount ? 0 : energyLevel);
  const [isAnimating, setIsAnimating] = React.useState(animateOnMount);

  // Animate energy meter on mount
  React.useEffect(() => {
    if (!animateOnMount) return;

    let animationFrameId: NodeJS.Timeout;
    const startTime = Date.now();
    const duration = 1500; // 1.5 seconds animation

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease-out cubic animation
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayedLevel(Math.round(energyLevel * easeProgress));

      if (progress < 1) {
        animationFrameId = setTimeout(animate, 16); // ~60fps
      } else {
        setIsAnimating(false);
      }
    };

    animate();
    return () => clearTimeout(animationFrameId);
  }, [energyLevel, animateOnMount]);

  // Get energy status description based on level
  const getEnergyStatus = (level: number): { label: string; color: string } => {
    if (level >= 90) return { label: 'Divine Alignment', color: '#FFD700' };
    if (level >= 75) return { label: 'High Alignment', color: '#D4AF37' };
    if (level >= 50) return { label: 'Moderate Alignment', color: '#CC8800' };
    if (level >= 25) return { label: 'Low Alignment', color: '#8B6F47' };
    return { label: 'Misaligned', color: '#8B4513' };
  };

  const status = getEnergyStatus(displayedLevel);

  // Size mappings
  const sizeClasses = {
    sm: {
      card: 'border-2',
      title: 'text-lg',
      badge: 'text-sm',
      progressHeight: 'h-3',
      labelSize: 'text-xs',
      iconSize: 'h-4 w-4',
    },
    md: {
      card: 'border-4',
      title: 'text-2xl',
      badge: 'text-base',
      progressHeight: 'h-4',
      labelSize: 'text-sm',
      iconSize: 'h-6 w-6',
    },
    lg: {
      card: 'border-4',
      title: 'text-3xl',
      badge: 'text-lg',
      progressHeight: 'h-6',
      labelSize: 'text-base',
      iconSize: 'h-8 w-8',
    },
  };

  const sizeConfig = sizeClasses[size];

  return (
    <Card
      className={`${sizeConfig.card} border-[#8B6F47] bg-[#F4E8D0] shadow-[0_6px_16px_rgba(0,0,0,0.3)] overflow-hidden relative transition-all duration-500`}
      style={{
        boxShadow: isAnimating
          ? `0 0 20px rgba(184, 134, 11, 0.4), 0 6px 16px rgba(0,0,0,0.3)`
          : '0 6px 16px rgba(0,0,0,0.3)',
      }}
    >
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#B8860B] opacity-60" />
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#B8860B] opacity-60" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#B8860B] opacity-60" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#B8860B] opacity-60" />

      {/* Mystical glow effect during animation */}
      {isAnimating && (
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${status.color} 0%, transparent 70%)`,
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }}
        />
      )}

      <CardHeader className={size === 'sm' ? 'pb-2' : 'pb-3'}>
        <CardTitle className={`flex items-center justify-between font-['MedievalSharp'] text-[#1A1A1A] ${sizeConfig.title}`}>
          <span className="flex items-center gap-2">
            <GiSparkles
              className={`${sizeConfig.iconSize} text-[#CC8800] drop-shadow-[0_0_8px_rgba(204,136,0,0.6)]`}
              style={{
                animation: isAnimating ? 'spin 3s linear infinite' : 'none',
              }}
            />
            Energy Alignment
          </span>
          <Badge
            className={`${sizeConfig.badge} bg-[#B8860B] text-[#1A1A1A] font-['Crimson_Text'] border-2 border-[#8B6F47] transition-all duration-300`}
            style={{
              backgroundColor: status.color,
              boxShadow: isAnimating ? `0 0 12px ${status.color}80` : 'none',
            }}
          >
            {displayedLevel}%
          </Badge>
        </CardTitle>
        <CardDescription className={`font-['Crimson_Text'] text-[#4A4A4A] ${sizeConfig.labelSize}`}>
          Your spiritual energy flows with the universe
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Animated Progress Bar */}
        <div className="relative">
          <Progress
            value={displayedLevel}
            className={`${sizeConfig.progressHeight} bg-[#8B6F47]/30 border-2 border-[#8B6F47]`}
          />
          {/* Subtle animated glow under progress */}
          {isAnimating && (
            <div
              className={`absolute top-0 left-0 ${sizeConfig.progressHeight} bg-linear-to-r from-transparent via-[#B8860B] to-transparent opacity-30 blur-md`}
              style={{
                width: `${displayedLevel}%`,
                animation: `slideGlow 1s ease-in-out infinite`,
              }}
            />
          )}
        </div>

        {/* Energy status labels */}
        <div className="flex justify-between items-center">
          <span className={`font-['Crimson_Text'] text-[#4A4A4A] ${sizeConfig.labelSize}`}>
            Misaligned
          </span>
          <span
            className={`font-['Crimson_Text'] font-semibold ${sizeConfig.labelSize}`}
            style={{ color: status.color }}
          >
            {status.label}
          </span>
          <span className={`font-['Crimson_Text'] text-[#4A4A4A] ${sizeConfig.labelSize}`}>
            Perfect Harmony
          </span>
        </div>

        {/* Moon Phase and Chakra Balance Grid */}
        {(showMoonPhase || showChakra) && (
          <div className={`grid gap-4 ${showMoonPhase && showChakra ? 'grid-cols-2' : 'grid-cols-1'} pt-2`}>
            {showMoonPhase && (
              <div
                className="text-center p-3 bg-[#E8DCC0] rounded border-2 border-[#8B6F47]/30 transition-all duration-300 hover:border-[#B8860B]/50"
              >
                <GiMoon className={`${sizeConfig.iconSize} text-[#C0C0C0] mx-auto mb-1`} />
                <p className={`font-['Crimson_Text'] text-[#4A4A4A] ${sizeConfig.labelSize}`}>
                  Moon Phase
                </p>
                <p className={`font-semibold font-['Crimson_Text'] text-[#1A1A1A] ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
                  {moonPhase}
                </p>
              </div>
            )}

            {showChakra && (
              <div
                className="text-center p-3 bg-[#E8DCC0] rounded border-2 border-[#8B6F47]/30 transition-all duration-300 hover:border-[#B8860B]/50"
              >
                <GiSun className={`${sizeConfig.iconSize} text-[#CC8800] mx-auto mb-1`} />
                <p className={`font-['Crimson_Text'] text-[#4A4A4A] ${sizeConfig.labelSize}`}>
                  Chakra Balance
                </p>
                <p className={`font-semibold font-['Crimson_Text'] text-[#1A1A1A] ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
                  {chakraStatus}
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>

      <style>{`
        @keyframes slideGlow {
          0% {
            filter: blur(4px);
            opacity: 0.1;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            filter: blur(4px);
            opacity: 0.1;
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.3;
          }
        }
      `}</style>
    </Card>
  );
}
