/**
 * Spell Card Component
 * Reusable card component for displaying individual spells with interactive effects
 */
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import type { Spell } from '@/lib/utils/spells';
import { 
  SPELL_TYPE_LABELS, 
  SPELL_STATUS_LABELS, 
  SPELL_STATUS_COLORS,
  SPELL_TYPE_ICONS 
} from '@/lib/utils/spells';
import { GiMoonOrbit } from 'react-icons/gi';
import { MdArrowForward } from 'react-icons/md';
import { useState } from 'react';

interface SpellCardProps {
  spell: Spell;
  onClick?: (spell: Spell) => void;
  variant?: 'default' | 'compact' | 'detailed';
  showActions?: boolean;
  className?: string;
}

export function SpellCard({
  spell,
  onClick,
  variant = 'default',
  showActions = false,
  className,
}: SpellCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const SpellIcon = SPELL_TYPE_ICONS[spell.type];
  
  const isCompact = variant === 'compact';
  const isDetailed = variant === 'detailed';

  const cardContent = (
    <>
      {/* Corner decorations */}
      <div className="pointer-events-none absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-[#8B6F47]/40" />
      <div className="pointer-events-none absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-[#8B6F47]/40" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-[#8B6F47]/40" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-[#8B6F47]/40" />

      {/* 3D Glow Effect on Hover */}
      <div 
        className={cn(
          "absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 pointer-events-none",
          "bg-linear-to-br from-[#CC8800]/0 via-[#8B6F47]/0 to-[#B8860B]/0",
          isHovered && "opacity-20"
        )}
      />

      {/* Card Header */}
      <CardHeader className={cn(isCompact && "pb-2", isDetailed && "pb-4")}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            {/* Icon with 3D Effect */}
            <div 
              className={cn(
                "p-2 rounded-lg bg-[#8B6F47]/10 border border-[#8B6F47]/30",
                "transition-all duration-300 shrink-0",
                isHovered && "shadow-[0_0_20px_rgba(139,111,71,0.4)] -translate-y-1 scale-110"
              )}
            >
              <SpellIcon className={cn(
                "text-[#8B6F47] transition-all duration-300",
                isHovered && "drop-shadow-[0_0_8px_rgba(204,136,0,0.6)]",
                isHovered && "animate-pulse"
              )} 
              style={{
                width: isCompact ? '20px' : '24px',
                height: isCompact ? '20px' : '24px',
              }}
              />
            </div>

            <div className="flex-1 min-w-0">
              <CardTitle className={cn(
                "font-['MedievalSharp'] text-[#1A1A1A] mb-1 transition-all duration-300",
                isCompact && "text-base",
                !isCompact && "text-xl",
                isDetailed && "text-2xl",
                isHovered && "text-[#8B6F47]"
              )}>
                {spell.name}
              </CardTitle>
              {!isCompact && (
                <CardDescription className="font-['Crimson_Text'] text-sm text-[#4A4A4A]">
                  {SPELL_TYPE_LABELS[spell.type]}
                </CardDescription>
              )}
            </div>
          </div>

          {/* Status Badge */}
          <Badge 
            className={cn(
              "font-['Crimson_Text'] text-xs shrink-0 transition-all duration-300",
              SPELL_STATUS_COLORS[spell.status],
              isHovered && "shadow-[0_0_10px_rgba(139,111,71,0.4)]"
            )}
          >
            {SPELL_STATUS_LABELS[spell.status]}
          </Badge>
        </div>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="space-y-4 relative z-10">
        {/* Description */}
        {!isCompact && (
          <p className="font-['Crimson_Text'] text-sm text-[#1A1A1A] leading-relaxed">
            {spell.description}
          </p>
        )}

        {/* Energy Level Progress */}
        {spell.energyLevel !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-['Crimson_Text'] text-xs text-[#4A4A4A]">
                Energy Level
              </span>
              <span className="font-['Crimson_Text'] text-xs font-semibold text-[#8B6F47]">
                {spell.energyLevel}%
              </span>
            </div>
            <Progress 
              value={spell.energyLevel} 
              className={cn(
                "h-2 bg-[#8B6F47]/20 border border-[#8B6F47]/30 transition-all duration-300",
                isHovered && "shadow-[0_0_12px_rgba(139,111,71,0.3)]"
              )}
            />
          </div>
        )}

        {/* Ritual Date */}
        {spell.ritualDate && !isCompact && (
          <div className="flex items-center gap-2 text-sm">
            <GiMoonOrbit className="h-4 w-4 text-[#CC8800] shrink-0" />
            <span className="font-['Crimson_Text'] text-[#4A4A4A]">
              Ritual Date:{' '}
              <span className="font-semibold text-[#1A1A1A]">
                {spell.ritualDate.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                })}
              </span>
            </span>
          </div>
        )}

        {/* Lunar Phase */}
        {spell.lunarPhase && !isCompact && (
          <div className="flex items-center gap-2">
            <Badge className="bg-[#CC8800]/10 text-[#CC8800] border border-[#CC8800]/30 font-['Crimson_Text'] text-xs">
              🌙 {spell.lunarPhase}
            </Badge>
          </div>
        )}

        {/* Healer Notes (Detailed View) */}
        {spell.healerNotes && isDetailed && (
          <div className="rounded-md bg-[#E8DCC0] border border-[#8B6F47]/20 p-3">
            <p className="font-['Crimson_Text'] text-xs text-[#4A4A4A] italic">
              <strong className="text-[#1A1A1A] not-italic">Healer&apos;s Notes:</strong>{' '}
              {spell.healerNotes}
            </p>
          </div>
        )}

        {/* Requested Date */}
        {!isCompact && (
          <div className="pt-2 border-t border-[#8B6F47]/20 font-['Crimson_Text'] text-xs text-[#4A4A4A]">
            Requested {spell.requestedDate.toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric',
              year: 'numeric'
            })}
          </div>
        )}

        {/* Action Buttons */}
        {showActions && (
          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline"
              size="sm"
              onClick={() => onClick?.(spell)}
              className="flex-1 border-2 border-[#8B6F47]/30 hover:bg-[#CC8800]/20 font-['Crimson_Text']"
            >
              View Details
              <MdArrowForward className="ml-2 h-3 w-3" />
            </Button>
          </div>
        )}
      </CardContent>
    </>
  );

  return (
    <Card
      onClick={() => onClick?.(spell)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative border-2 border-[#8B6F47]/30 bg-[#F4E8D0]/95",
        "transition-all duration-300 cursor-pointer",
        isHovered && "shadow-[0_8px_32px_rgba(139,111,71,0.4)] -translate-y-2",
        className
      )}
    >
      {cardContent}
    </Card>
  );
}
