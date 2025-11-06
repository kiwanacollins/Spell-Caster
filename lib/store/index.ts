/**
 * Zustand Store Index
 * Central export point for all state management stores
 */

export { useMessageStore } from './message-store';
export type {
  Message,
  MessageChannel,
  MessageStatus,
  Conversation,
} from './message-store';

export { useUserStore } from './user-store';
export type {
  User,
  SpiritualProfile,
  UserPreferences,
  UserStats,
  Badge,
} from './user-store';

export { useSpellQueueStore } from './spell-queue-store';
export type {
  SpellRequest,
  SpellStatus,
  SpellPriority,
  QueueFilters,
} from './spell-queue-store';

export { useNotificationStore } from './notification-store';
export type {
  Notification,
  NotificationType,
} from './notification-store';
