'use client';

import * as React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  GiSpellBook,
  GiCalendar,
  GiChatBubble,
  GiProgression,
} from 'react-icons/gi';

// Icon map for converting string keys to components
const ICON_MAP = {
  GiSpellBook,
  GiCalendar,
  GiChatBubble,
  GiProgression,
} as const;

export interface QuickStat {
  id: string;
  label: string;
  value: number | string;
  sublabel: string;
  icon: keyof typeof ICON_MAP;
  href?: string;
  animated?: boolean;
}

interface QuickStatsCardsProps {
  stats: QuickStat[];
  columns?: 1 | 2 | 3 | 4;
  enableHover?: boolean;
  animateOnMount?: boolean;
}

/**
 * Quick Stats Cards Component
 *
 * Displays key metrics in a grid of mystical stat cards.
 * Each card shows a stat with icon, value, and description.
 * Supports hover animations and optional links.
 *
 * Icon names supported:
 * - GiSpellBook
 * - GiCalendar
 * - GiChatBubble
 * - GiProgression
 *
 * Usage:
 * ```tsx
 * // Server component
 * import { getDefaultQuickStats } from '@/lib/utils/quick-stats';
 * 
 * export default function Dashboard() {
 *   const stats = getDefaultQuickStats(5, 2, 3, 250, 'Adept');
 *   return <QuickStatsCards stats={stats} columns={4} enableHover animateOnMount />;
 * }
 * ```
 */
export function QuickStatsCards({
  stats,
  columns = 4,
  enableHover = true,
  animateOnMount = false,
}: QuickStatsCardsProps) {
  const [displayedValues, setDisplayedValues] = React.useState<Record<string, number | string>>(
    stats.reduce((acc, stat) => {
      acc[stat.id] = animateOnMount && typeof stat.value === 'number' ? 0 : stat.value;
      return acc;
    }, {} as Record<string, number | string>)
  );

  // Animate stat values on mount
  React.useEffect(() => {
    if (!animateOnMount) return;

    stats.forEach((stat) => {
      if (stat.animated !== false && typeof stat.value === 'number') {
        const startTime = Date.now();
        const duration = 1000; // 1 second animation

        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Ease-out cubic animation
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const animatedValue = Math.round(stat.value as number * easeProgress);

          setDisplayedValues((prev) => ({
            ...prev,
            [stat.id]: animatedValue,
          }));

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        animate();
      }
    });
  }, [stats, animateOnMount]);

  const gridColsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[columns];

  const StatCard = ({ stat }: { stat: QuickStat }) => {
    const IconComponent = ICON_MAP[stat.icon];
    
    return (
      <Card
        className={`border-4 border-[#8B6F47] bg-[#F4E8D0] shadow-[4px_4px_12px_rgba(0,0,0,0.3)] ${
          enableHover ? 'transition-all hover:shadow-[6px_6px_16px_rgba(0,0,0,0.4)] hover:-translate-y-1 cursor-pointer' : ''
        }`}
      >
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 font-['MedievalSharp'] text-lg text-[#1A1A1A]">
            <IconComponent className="h-5 w-5 text-[#8B6F47]" />
            {stat.label}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-[#CC8800] font-['Crimson_Text']">
            {displayedValues[stat.id]}
          </p>
          <p className="text-xs text-[#4A4A4A] font-['Crimson_Text'] mt-1">
            {stat.sublabel}
          </p>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className={`grid ${gridColsClass} gap-4`}>
      {stats.map((stat) =>
        stat.href ? (
          <Link key={stat.id} href={stat.href}>
            <StatCard stat={stat} />
          </Link>
        ) : (
          <StatCard key={stat.id} stat={stat} />
        )
      )}
    </div>
  );
}
