'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  GiSpellBook,
  GiCalendar,
  GiChatBubble,
} from 'react-icons/gi';

export interface QuickAction {
  id: string;
  label: string;
  description?: string;
  icon: 'GiSpellBook' | 'GiCalendar' | 'GiChatBubble';
  href: string;
}

interface QuickActionButtonsProps {
  actions?: QuickAction[];
  layout?: 'row' | 'column';
  variant?: 'default' | 'compact';
}

// Icon map for converting string keys to components
const ICON_MAP = {
  GiSpellBook,
  GiCalendar,
  GiChatBubble,
} as const;

/**
 * Quick Action Buttons Component
 *
 * Displays a set of quick action buttons for common dashboard tasks.
 * Features mystical styling with hover animations and icon support.
 *
 * Default actions:
 * - Request New Spell
 * - Book Consultation
 * - Message Healer
 *
 * Usage:
 * ```tsx
 * // Use default actions
 * <QuickActionButtons />
 *
 * // Custom actions
 * <QuickActionButtons
 *   actions={[
 *     {
 *       id: 'spell',
 *       label: 'Request New Spell',
 *       icon: 'GiSpellBook',
 *       href: '/services',
 *     },
 *     // ... more actions
 *   ]}
 *   layout="column"
 *   variant="compact"
 * />
 * ```
 */
export function QuickActionButtons({
  actions,
  layout = 'row',
  variant = 'default',
}: QuickActionButtonsProps) {
  const defaultActions: QuickAction[] = [
    {
      id: 'spell',
      label: 'Request New Spell',
      icon: 'GiSpellBook',
      href: '/services',
    },
    {
      id: 'consultation',
      label: 'Book Consultation',
      icon: 'GiCalendar',
      href: '/dashboard/consultations',
    },
    {
      id: 'message',
      label: 'Message Healer',
      icon: 'GiChatBubble',
      href: '/dashboard/messages',
    },
  ];

  const finalActions = actions || defaultActions;

  const gridClass = layout === 'row' 
    ? 'grid-cols-1 md:grid-cols-3'
    : 'grid-cols-1';

  const buttonVariant = variant === 'compact' 
    ? 'h-12 px-6'
    : 'h-auto py-4';

  const buttonLayout = variant === 'compact' 
    ? 'flex-row items-center'
    : 'flex-col items-center';

  return (
    <div className={`grid ${gridClass} gap-4`}>
      {finalActions.map((action) => {
        const IconComponent = ICON_MAP[action.icon];

        return (
          <Link key={action.id} href={action.href}>
            <Button
              className={`w-full ${buttonVariant} flex ${buttonLayout} gap-2 bg-[#1A1A1A] hover:bg-[#8B6F47] border-2 border-[#8B6F47] text-[#F4E8D0] font-['Crimson_Text'] transition-all shadow-[2px_2px_8px_rgba(0,0,0,0.3)] hover:shadow-[4px_4px_12px_rgba(0,0,0,0.4)] hover:-translate-y-1 cursor-pointer`}
              asChild
            >
              <div className={`flex ${buttonLayout} gap-2 w-full h-full`}>
                <IconComponent className={variant === 'compact' ? 'h-5 w-5' : 'h-8 w-8'} />
                <span className={variant === 'compact' ? 'text-xs' : 'text-sm'}>
                  {action.label}
                </span>
              </div>
            </Button>
          </Link>
        );
      })}
    </div>
  );
}
