'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'default' | 'text' | 'circular' | 'card';
}

export function Skeleton({ className, variant = 'default' }: SkeletonProps) {
  const baseClasses = 'bg-parchment-200/20 animate-parchment-shimmer';
  
  const variantClasses = {
    default: 'rounded-md',
    text: 'rounded h-4',
    circular: 'rounded-full',
    card: 'rounded-ritual border-2 border-parchment-400/30',
  };

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        className
      )}
    />
  );
}

// Ancient-themed loading components
export function ServiceCardSkeleton() {
  return (
    <div className="relative h-full bg-parchment-100 rounded-ritual border-2 border-parchment-400/30 p-8 animate-pulse">
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-mystical-gold/20" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-mystical-gold/20" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-mystical-gold/20" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-mystical-gold/20" />

      {/* Category badge */}
      <Skeleton className="absolute top-4 right-4 w-16 h-6" />

      {/* Icon placeholder */}
      <div className="flex justify-center mb-6">
        <Skeleton variant="circular" className="w-24 h-24" />
      </div>

      {/* Title */}
      <Skeleton className="w-3/4 h-8 mx-auto mb-4" />

      {/* Decorative divider */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <Skeleton className="w-8 h-px" />
        <Skeleton variant="circular" className="w-3 h-3" />
        <Skeleton className="w-8 h-px" />
      </div>

      {/* Description lines */}
      <div className="space-y-2 mb-6">
        <Skeleton variant="text" className="w-full" />
        <Skeleton variant="text" className="w-5/6" />
        <Skeleton variant="text" className="w-4/5" />
      </div>

      {/* CTA */}
      <Skeleton className="w-20 h-6 mx-auto" />
    </div>
  );
}

export function TestimonialSkeleton() {
  return (
    <div className="bg-parchment-100 p-8 rounded-ritual border-2 border-parchment-400/30 animate-pulse">
      {/* Stars */}
      <div className="flex justify-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} variant="circular" className="w-4 h-4" />
        ))}
      </div>

      {/* Quote lines */}
      <div className="space-y-2 mb-6">
        <Skeleton variant="text" className="w-full" />
        <Skeleton variant="text" className="w-11/12" />
        <Skeleton variant="text" className="w-4/5" />
      </div>

      {/* Client info */}
      <div className="flex items-center gap-4">
        <Skeleton variant="circular" className="w-12 h-12" />
        <div className="space-y-2">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-16 h-3" />
        </div>
      </div>
    </div>
  );
}

export function AboutSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-pulse">
      {/* Text content */}
      <div className="space-y-6">
        <Skeleton className="w-3/4 h-12" />
        <div className="space-y-3">
          <Skeleton variant="text" className="w-full" />
          <Skeleton variant="text" className="w-11/12" />
          <Skeleton variant="text" className="w-5/6" />
        </div>
        
        {/* Philosophy box */}
        <div className="bg-mystical-amber/5 p-6 rounded-ritual border border-mystical-bronze/30">
          <Skeleton className="w-32 h-6 mb-4" />
          <div className="space-y-2">
            <Skeleton variant="text" className="w-full" />
            <Skeleton variant="text" className="w-4/5" />
          </div>
        </div>

        <Skeleton className="w-40 h-12" />
      </div>

      {/* Portrait placeholder */}
      <div className="relative">
        <Skeleton className="w-full aspect-[3/4] rounded-lg" />
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-mystical-gold/20" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-mystical-gold/20" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-mystical-gold/20" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-mystical-gold/20" />
      </div>
    </div>
  );
}

// Ritual Circle Loading Spinner
export function RitualCircleLoader({ size = 'default' }: { size?: 'small' | 'default' | 'large' }) {
  const sizeClasses = {
    small: 'w-8 h-8',
    default: 'w-16 h-16', 
    large: 'w-24 h-24',
  };

  return (
    <div className={cn('relative animate-ritual-spin', sizeClasses[size])}>
      {/* Outer circle */}
      <div className="absolute inset-0 border-2 border-mystical-gold/30 rounded-full" />
      
      {/* Inner rotating runes */}
      <div className="absolute inset-2 border border-mystical-amber/50 rounded-full animate-ritual-spin-reverse flex items-center justify-center">
        <span className="text-mystical-gold animate-candle-flicker">✦</span>
      </div>
      
      {/* Center dot */}
      <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-mystical-gold rounded-full transform -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}

// Candle Flicker Loading
export function CandleLoader() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-2 h-6 bg-mystical-amber rounded-full animate-candle-flicker" />
      <div className="w-2 h-8 bg-mystical-gold rounded-full animate-candle-flicker" style={{ animationDelay: '0.3s' }} />
      <div className="w-2 h-6 bg-mystical-amber rounded-full animate-candle-flicker" style={{ animationDelay: '0.6s' }} />
    </div>
  );
}