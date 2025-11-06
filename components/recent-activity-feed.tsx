'use client';

import * as React from 'react';
import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  GiSpellBook,
  GiCalendar,
  GiChatBubble,
  GiProgression,
  GiCoins,
  GiCandles,
  GiScrollUnfurled,
  GiTwoCoins,
} from 'react-icons/gi';
import { formatActivityTime } from '@/lib/utils/activity-feed';

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: Date | string;
  icon: 'GiSpellBook' | 'GiCalendar' | 'GiChatBubble' | 'GiTwoCoins' | 'GiProgression' | 'GiCoins' | 'GiCandles';
  badge?: {
    label: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  };
  href?: string;
  isNew?: boolean;
}

interface RecentActivityFeedProps {
  activities: ActivityItem[];
  maxHeight?: string;
  showHeader?: boolean;
}

// Icon map for converting string keys to components
const ICON_MAP = {
  GiSpellBook,
  GiCalendar,
  GiChatBubble,
  GiTwoCoins,
  GiProgression,
  GiCoins,
  GiCandles,
} as const;

/**
 * Recent Activity Feed Component
 *
 * Displays a scrollable feed of recent user activities with mystical styling.
 * Supports badges, icons, timestamps, and optional navigation links.
 *
 * Features:
 * - Scrollable area with custom styling
 * - Activity items with icons and badges
 * - Real-time timestamp formatting
 * - Optional link navigation
 * - Highlight for new activities
 * - Responsive design
 *
 * Usage:
 * ```tsx
 * // Server component
 * import { getSampleActivityFeed } from '@/lib/utils/activity-feed';
 *
 * export default function Dashboard() {
 *   const activities = getSampleActivityFeed();
 *   return <RecentActivityFeed activities={activities} maxHeight="h-96" showHeader />;
 * }
 * ```
 */
export function RecentActivityFeed({
  activities,
  maxHeight = 'h-96',
  showHeader = true,
}: RecentActivityFeedProps) {
  const ActivityCard = ({ activity }: { activity: ActivityItem }) => {
    const IconComponent = ICON_MAP[activity.icon];

    const cardContent = (
      <>
        <div className="flex gap-3">
          {/* Icon */}
          <div className="shrink-0 mt-1">
            <div className={`relative ${activity.isNew ? 'animate-pulse' : ''}`}>
              <IconComponent className="h-5 w-5 text-[#CC8800]" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <p className="font-['Crimson_Text'] font-semibold text-sm text-[#1A1A1A] line-clamp-2">
                  {activity.title}
                </p>
                <p className="font-['Crimson_Text'] text-xs text-[#4A4A4A] mt-1 line-clamp-2">
                  {activity.description}
                </p>
              </div>

              {/* Badge */}
              {activity.badge && (
                <div className="shrink-0">
                  <Badge
                    variant={activity.badge.variant || 'default'}
                    className="text-xs whitespace-nowrap bg-[#B8860B] text-[#1A1A1A] border-[#8B6F47]"
                  >
                    {activity.badge.label}
                  </Badge>
                </div>
              )}
            </div>

            {/* Timestamp */}
            <p className="font-['Crimson_Text'] text-xs text-[#8B6F47] mt-2">
              {formatActivityTime(activity.timestamp)}
            </p>
          </div>
        </div>

        {/* New indicator dot */}
        {activity.isNew && (
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#CC8800] animate-pulse" />
        )}
      </>
    );

    if (activity.href) {
      return (
        <Link
          href={activity.href}
          className={`group p-3 bg-[#E8DCC0] rounded border-2 border-[#8B6F47]/30 transition-all duration-300 hover:border-[#B8860B]/50 cursor-pointer hover:bg-[#DFD0A8] ${
            activity.isNew ? 'ring-2 ring-[#CC8800]/50' : ''
          } block relative`}
        >
          {cardContent}
        </Link>
      );
    }

    return (
      <div
        className={`group p-3 bg-[#E8DCC0] rounded border-2 border-[#8B6F47]/30 transition-all duration-300 ${
          activity.isNew ? 'ring-2 ring-[#CC8800]/50' : ''
        } relative`}
      >
        {cardContent}
      </div>
    );
  };

  return (
    <Card className="border-4 border-[#8B6F47] bg-[#F4E8D0] shadow-[0_6px_16px_rgba(0,0,0,0.3)]">
      {showHeader && (
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-['MedievalSharp'] text-[#1A1A1A]">
            <GiScrollUnfurled className="h-6 w-6 text-[#8B6F47]" />
            Recent Activity
          </CardTitle>
          <CardDescription className="font-['Crimson_Text'] text-[#4A4A4A]">
            Your spiritual journey timeline
          </CardDescription>
        </CardHeader>
      )}
      <CardContent className={`${showHeader ? 'pt-0' : ''}`}>
        <ScrollArea className={`${maxHeight} rounded border-2 border-[#8B6F47]/20 bg-[#F4E8D0]/50 p-3`}>
          <div className="space-y-3 pr-4">
            {activities.length > 0 ? (
              activities.map((activity, index) => (
                <div
                  key={activity.id}
                  style={{
                    animation: `slideIn 0.3s ease-out ${index * 50}ms both`,
                  }}
                >
                  <ActivityCard activity={activity} />
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-32 text-center">
                <p className="font-['Crimson_Text'] text-sm text-[#4A4A4A]">
                  No recent activities yet. Begin your spiritual journey!
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </Card>
  );
}
