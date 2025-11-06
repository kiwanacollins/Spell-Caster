import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

/**
 * Global Notification Store
 * Manages toast notifications, alerts, and mystical messages across the app
 */

export type NotificationType = 'success' | 'error' | 'warning' | 'info' | 'mystical';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number; // milliseconds, null for persistent
  createdAt: Date;
  isDismissed: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  // Mystical-specific properties
  icon?: string; // Rune or mystical icon
  glowColor?: string; // For mystical notifications
  soundEffect?: string; // Optional sound file
}

interface NotificationState {
  // Notifications
  notifications: Notification[];
  maxNotifications: number;
  
  // UI State
  isVisible: boolean;
  position: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center';
  
  // Actions
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'isDismissed'>) => void;
  dismissNotification: (id: string) => void;
  clearAll: () => void;
  
  // Convenience Methods
  success: (title: string, message?: string, duration?: number) => void;
  error: (title: string, message?: string, duration?: number) => void;
  warning: (title: string, message?: string, duration?: number) => void;
  info: (title: string, message?: string, duration?: number) => void;
  mystical: (title: string, message?: string, icon?: string, glowColor?: string) => void;
  
  // Settings
  setMaxNotifications: (max: number) => void;
  setPosition: (position: NotificationState['position']) => void;
  toggleVisibility: () => void;
}

const DEFAULT_DURATION = 5000; // 5 seconds

export const useNotificationStore = create<NotificationState>()(
  devtools(
    (set, get) => ({
      // Initial State
      notifications: [],
      maxNotifications: 5,
      isVisible: true,
      position: 'top-right',

      // Actions
      addNotification: (notification) => {
        const id = `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const newNotification: Notification = {
          ...notification,
          id,
          createdAt: new Date(),
          isDismissed: false,
        };

        set((state) => {
          const notifications = [newNotification, ...state.notifications].slice(
            0,
            state.maxNotifications
          );
          return { notifications };
        });

        // Auto-dismiss after duration
        if (notification.duration !== null) {
          const duration = notification.duration || DEFAULT_DURATION;
          setTimeout(() => {
            get().dismissNotification(id);
          }, duration);
        }
      },

      dismissNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.map((notif) =>
            notif.id === id ? { ...notif, isDismissed: true } : notif
          ),
        }));

        // Remove after animation
        setTimeout(() => {
          set((state) => ({
            notifications: state.notifications.filter((notif) => notif.id !== id),
          }));
        }, 300); // Match animation duration
      },

      clearAll: () => {
        set({ notifications: [] });
      },

      // Convenience Methods
      success: (title, message, duration = DEFAULT_DURATION) => {
        get().addNotification({
          type: 'success',
          title,
          message,
          duration,
          icon: '✓',
          glowColor: '#2C5530', // Enchanted Emerald
        });
      },

      error: (title, message, duration = DEFAULT_DURATION) => {
        get().addNotification({
          type: 'error',
          title,
          message,
          duration,
          icon: '⚠',
          glowColor: '#8B0000', // Blood Moon Red
        });
      },

      warning: (title, message, duration = DEFAULT_DURATION) => {
        get().addNotification({
          type: 'warning',
          title,
          message,
          duration,
          icon: '⚡',
          glowColor: '#CC8800', // Mystical Amber
        });
      },

      info: (title, message, duration = DEFAULT_DURATION) => {
        get().addNotification({
          type: 'info',
          title,
          message,
          duration,
          icon: 'ℹ',
          glowColor: '#C0C0C0', // Moonlit Silver
        });
      },

      mystical: (title, message, icon = '✨', glowColor = '#B8860B') => {
        get().addNotification({
          type: 'mystical',
          title,
          message,
          duration: 7000, // Longer duration for mystical messages
          icon,
          glowColor,
          soundEffect: '/sounds/mystical-chime.mp3',
        });
      },

      // Settings
      setMaxNotifications: (max) => set({ maxNotifications: max }),
      setPosition: (position) => set({ position }),
      toggleVisibility: () => set((state) => ({ isVisible: !state.isVisible })),
    }),
    { name: 'NotificationStore' }
  )
);
