/**
 * Server-side utility for building default quick stats
 * This can be called from Server Components without issues
 */

export interface QuickStat {
  id: string;
  label: string;
  value: number | string;
  sublabel: string;
  icon: string; // Icon key for client-side rendering
  href?: string;
  animated?: boolean;
}

/**
 * Build default quick stats on the server
 * Returns plain objects that can be serialized and passed to client components
 */
export function getDefaultQuickStats(
  activeSpells = 0,
  upcomingConsultations = 0,
  unreadMessages = 0,
  spiritualPoints = 0,
  currentLevel = 'Seeker'
): QuickStat[] {
  return [
    {
      id: 'active-spells',
      label: 'Active Spells',
      value: activeSpells,
      sublabel: 'Currently manifesting',
      icon: 'GiSpellBook',
      href: '/dashboard/spells',
      animated: true,
    },
    {
      id: 'consultations',
      label: 'Consultations',
      value: upcomingConsultations,
      sublabel: 'Scheduled sessions',
      icon: 'GiCalendar',
      href: '/dashboard/consultations',
      animated: true,
    },
    {
      id: 'messages',
      label: 'Messages',
      value: unreadMessages,
      sublabel: 'Unread messages',
      icon: 'GiChatBubble',
      href: '/dashboard/messages',
      animated: true,
    },
    {
      id: 'spirit-points',
      label: 'Spirit Points',
      value: spiritualPoints,
      sublabel: `Level: ${currentLevel}`,
      icon: 'GiProgression',
      animated: true,
    },
  ];
}
