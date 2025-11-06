import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

/**
 * User Profile & Spiritual Progress Store
 * Manages user state, energy alignment, badges, and spiritual journey tracking
 */

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'milestone' | 'achievement' | 'special';
  unlockedAt: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface SpiritualProfile {
  energyAlignment: number; // 0-100%
  spiritualLevel: number; // 1-100
  spiritualPoints: number;
  badges: Badge[];
  auraColor: string;
  dominantElement: 'fire' | 'water' | 'earth' | 'air' | 'spirit';
  chakraBalance: {
    root: number;
    sacral: number;
    solarPlexus: number;
    heart: number;
    throat: number;
    thirdEye: number;
    crown: number;
  };
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    whatsapp: boolean;
    messenger: boolean;
    push: boolean;
  };
  privacy: {
    showProfile: boolean;
    allowTestimonials: boolean;
    shareProgress: boolean;
  };
  communication: {
    preferredChannel: 'whatsapp' | 'messenger' | 'in-app';
    language: string;
    timezone: string;
  };
  theme: {
    reducedMotion: boolean;
    highContrast: boolean;
  };
}

export interface UserStats {
  totalSpellsRequested: number;
  activeSpells: number;
  completedSpells: number;
  consultationsBooked: number;
  consultationsCompleted: number;
  totalSpent: number;
  memberSince: Date;
  lastActivityAt: Date;
  streakDays: number;
  journalEntries: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
  spiritualProfile: SpiritualProfile;
  preferences: UserPreferences;
  stats: UserStats;
  birthDate?: Date;
  birthTime?: string;
  birthPlace?: string;
  referralCode?: string;
  referredBy?: string;
}

interface UserState {
  // User Data
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Spiritual Progress
  pendingBadges: Badge[]; // Badges waiting to be shown in unlock animation
  energyHistory: { date: Date; value: number }[];
  levelUpPending: boolean;

  // Actions - Authentication
  setUser: (user: User | null) => void;
  updateProfile: (updates: Partial<User>) => void;
  logout: () => void;

  // Actions - Spiritual Progress
  updateEnergyAlignment: (value: number) => void;
  awardSpiritualPoints: (points: number, reason?: string) => void;
  unlockBadge: (badge: Badge) => void;
  dismissBadge: (badgeId: string) => void;
  levelUp: () => void;
  updateChakra: (chakra: keyof SpiritualProfile['chakraBalance'], value: number) => void;

  // Actions - Preferences
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  toggleNotification: (channel: keyof UserPreferences['notifications']) => void;

  // Actions - Stats
  incrementStat: (stat: keyof Pick<UserStats, 'totalSpellsRequested' | 'activeSpells' | 'completedSpells' | 'consultationsBooked' | 'consultationsCompleted' | 'journalEntries'>) => void;
  updateStreak: () => void;
  addSpent: (amount: number) => void;

  // Actions - Error Handling
  setError: (error: string | null) => void;
  setLoading: (isLoading: boolean) => void;

  // Helpers
  canLevelUp: () => boolean;
  getNextLevelPoints: () => number;
  getBadgesByCategory: (category: Badge['category']) => Badge[];
}

const POINTS_PER_LEVEL = 1000; // Points needed to reach next level

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial State
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        pendingBadges: [],
        energyHistory: [],
        levelUpPending: false,

        // Authentication Actions
        setUser: (user) =>
          set({
            user,
            isAuthenticated: !!user,
            error: null,
          }),

        updateProfile: (updates) =>
          set((state) => ({
            user: state.user ? { ...state.user, ...updates } : null,
          })),

        logout: () =>
          set({
            user: null,
            isAuthenticated: false,
            pendingBadges: [],
            energyHistory: [],
            levelUpPending: false,
          }),

        // Spiritual Progress Actions
        updateEnergyAlignment: (value) =>
          set((state) => {
            if (!state.user) return state;

            const clampedValue = Math.max(0, Math.min(100, value));
            const newHistory = [
              ...state.energyHistory,
              { date: new Date(), value: clampedValue },
            ].slice(-30); // Keep last 30 data points

            return {
              user: {
                ...state.user,
                spiritualProfile: {
                  ...state.user.spiritualProfile,
                  energyAlignment: clampedValue,
                },
              },
              energyHistory: newHistory,
            };
          }),

        awardSpiritualPoints: (points, reason) =>
          set((state) => {
            if (!state.user) return state;

            const currentProfile = state.user.spiritualProfile;
            const newPoints = currentProfile.spiritualPoints + points;
            const currentLevel = currentProfile.spiritualLevel;
            const pointsForNextLevel = currentLevel * POINTS_PER_LEVEL;

            let newLevel = currentLevel;
            let levelUpPending = false;

            if (newPoints >= pointsForNextLevel) {
              newLevel = currentLevel + 1;
              levelUpPending = true;
            }

            return {
              user: {
                ...state.user,
                spiritualProfile: {
                  ...currentProfile,
                  spiritualPoints: newPoints,
                  spiritualLevel: newLevel,
                },
              },
              levelUpPending,
            };
          }),

        unlockBadge: (badge) =>
          set((state) => {
            if (!state.user) return state;

            return {
              user: {
                ...state.user,
                spiritualProfile: {
                  ...state.user.spiritualProfile,
                  badges: [...state.user.spiritualProfile.badges, badge],
                },
              },
              pendingBadges: [...state.pendingBadges, badge],
            };
          }),

        dismissBadge: (badgeId) =>
          set((state) => ({
            pendingBadges: state.pendingBadges.filter((b) => b.id !== badgeId),
          })),

        levelUp: () =>
          set({
            levelUpPending: false,
          }),

        updateChakra: (chakra, value) =>
          set((state) => {
            if (!state.user) return state;

            const clampedValue = Math.max(0, Math.min(100, value));

            return {
              user: {
                ...state.user,
                spiritualProfile: {
                  ...state.user.spiritualProfile,
                  chakraBalance: {
                    ...state.user.spiritualProfile.chakraBalance,
                    [chakra]: clampedValue,
                  },
                },
              },
            };
          }),

        // Preferences Actions
        updatePreferences: (preferences) =>
          set((state) => {
            if (!state.user) return state;

            return {
              user: {
                ...state.user,
                preferences: {
                  ...state.user.preferences,
                  ...preferences,
                },
              },
            };
          }),

        toggleNotification: (channel) =>
          set((state) => {
            if (!state.user) return state;

            return {
              user: {
                ...state.user,
                preferences: {
                  ...state.user.preferences,
                  notifications: {
                    ...state.user.preferences.notifications,
                    [channel]: !state.user.preferences.notifications[channel],
                  },
                },
              },
            };
          }),

        // Stats Actions
        incrementStat: (stat) =>
          set((state) => {
            if (!state.user) return state;

            return {
              user: {
                ...state.user,
                stats: {
                  ...state.user.stats,
                  [stat]: state.user.stats[stat] + 1,
                  lastActivityAt: new Date(),
                },
              },
            };
          }),

        updateStreak: () =>
          set((state) => {
            if (!state.user) return state;

            const lastActivity = state.user.stats.lastActivityAt;
            const now = new Date();
            const daysDiff = Math.floor(
              (now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24)
            );

            let newStreak = state.user.stats.streakDays;

            if (daysDiff === 1) {
              // Consecutive day
              newStreak += 1;
            } else if (daysDiff > 1) {
              // Streak broken
              newStreak = 1;
            }
            // If same day (daysDiff === 0), streak stays the same

            return {
              user: {
                ...state.user,
                stats: {
                  ...state.user.stats,
                  streakDays: newStreak,
                  lastActivityAt: now,
                },
              },
            };
          }),

        addSpent: (amount) =>
          set((state) => {
            if (!state.user) return state;

            return {
              user: {
                ...state.user,
                stats: {
                  ...state.user.stats,
                  totalSpent: state.user.stats.totalSpent + amount,
                },
              },
            };
          }),

        // Error Handling
        setError: (error) => set({ error }),
        setLoading: (isLoading) => set({ isLoading }),

        // Helpers
        canLevelUp: () => {
          const state = get();
          if (!state.user) return false;

          const { spiritualPoints, spiritualLevel } = state.user.spiritualProfile;
          const pointsForNextLevel = spiritualLevel * POINTS_PER_LEVEL;

          return spiritualPoints >= pointsForNextLevel;
        },

        getNextLevelPoints: () => {
          const state = get();
          if (!state.user) return POINTS_PER_LEVEL;

          const { spiritualLevel } = state.user.spiritualProfile;
          return spiritualLevel * POINTS_PER_LEVEL;
        },

        getBadgesByCategory: (category) => {
          const state = get();
          if (!state.user) return [];

          return state.user.spiritualProfile.badges.filter(
            (badge) => badge.category === category
          );
        },
      }),
      {
        name: 'user-storage',
        partialize: (state) => ({
          // Persist user data and energy history
          user: state.user,
          isAuthenticated: state.isAuthenticated,
          energyHistory: state.energyHistory,
        }),
      }
    ),
    { name: 'UserStore' }
  )
);
