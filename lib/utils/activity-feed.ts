/**
 * Server-side utility for building activity feed data
 */

export type ActivityType = 
  | 'spell-started'
  | 'spell-completed'
  | 'consultation-booked'
  | 'consultation-completed'
  | 'message-received'
  | 'badge-earned'
  | 'level-up'
  | 'payment-received'
  | 'custom';

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: Date | string; // ISO string for serialization
  icon: 'GiSpellBook' | 'GiCalendar' | 'GiChatBubble' | 'GiTwoCoins' | 'GiProgression' | 'GiCoins' | 'GiCandles';
  badge?: {
    label: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  };
  href?: string;
  isNew?: boolean; // For highlighting new activities
}

/**
 * Get activity type icon
 */
export function getActivityIcon(type: ActivityType): ActivityItem['icon'] {
  const iconMap: Record<ActivityType, ActivityItem['icon']> = {
    'spell-started': 'GiSpellBook',
    'spell-completed': 'GiSpellBook',
    'consultation-booked': 'GiCalendar',
    'consultation-completed': 'GiCalendar',
    'message-received': 'GiChatBubble',
    'badge-earned': 'GiTwoCoins',
    'level-up': 'GiProgression',
    'payment-received': 'GiCoins',
    'custom': 'GiCandles',
  };
  return iconMap[type] || 'GiCandles';
}

/**
 * Format timestamp for display
 */
export function formatActivityTime(timestamp: Date | string): string {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/**
 * Build sample activity feed data for dashboard
 */
export function getSampleActivityFeed(): ActivityItem[] {
  const now = new Date();
  
  return [
    {
      id: 'activity-1',
      type: 'spell-completed',
      title: 'Love Spell Manifestation Complete',
      description: 'Your love attraction spell has reached its peak energy alignment',
      timestamp: new Date(now.getTime() - 5 * 60000), // 5 mins ago
      icon: 'GiSpellBook',
      badge: { label: 'Completed', variant: 'default' },
      href: '/dashboard/spells',
      isNew: true,
    },
    {
      id: 'activity-2',
      type: 'consultation-booked',
      title: 'Consultation Scheduled',
      description: 'Your tarot reading session is confirmed for tomorrow at 2:00 PM',
      timestamp: new Date(now.getTime() - 2 * 3600000), // 2 hours ago
      icon: 'GiCalendar',
      badge: { label: 'Scheduled', variant: 'secondary' },
      href: '/dashboard/consultations',
      isNew: false,
    },
    {
      id: 'activity-3',
      type: 'message-received',
      title: 'New Message from Healer',
      description: 'You have received guidance on your protection ritual',
      timestamp: new Date(now.getTime() - 4 * 3600000), // 4 hours ago
      icon: 'GiChatBubble',
      badge: { label: 'Unread', variant: 'outline' },
      href: '/dashboard/messages',
      isNew: false,
    },
    {
      id: 'activity-4',
      type: 'badge-earned',
      title: 'Badge Unlocked: Faithful Seeker',
      description: 'You have completed 5 consultations and earned the Faithful Seeker badge',
      timestamp: new Date(now.getTime() - 1 * 86400000), // 1 day ago
      icon: 'GiTwoCoins',
      badge: { label: 'Achievement', variant: 'default' },
      isNew: false,
    },
    {
      id: 'activity-5',
      type: 'level-up',
      title: 'Spiritual Level Up',
      description: 'You have advanced from Seeker to Adept. New services unlocked!',
      timestamp: new Date(now.getTime() - 2 * 86400000), // 2 days ago
      icon: 'GiProgression',
      badge: { label: 'Level Up', variant: 'default' },
      isNew: false,
    },
  ];
}
