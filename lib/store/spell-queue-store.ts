import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

/**
 * Admin Spell Queue Store
 * Manages spell requests, AI responses, and admin workflow
 */

export type SpellStatus =
  | 'pending' // Just submitted
  | 'reviewing' // Admin is reviewing
  | 'ai-generating' // AI is generating response
  | 'ready-for-approval' // AI response ready for admin review
  | 'approved' // Admin approved, ready to cast
  | 'in-progress' // Spell is being cast
  | 'completed' // Spell completed
  | 'cancelled'; // User or admin cancelled

export type SpellPriority = 'urgent' | 'high' | 'normal' | 'low';

export interface SpellRequest {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  serviceType:
    | 'love'
    | 'protection'
    | 'wealth'
    | 'health'
    | 'career'
    | 'spiritual-cleansing'
    | 'divination'
    | 'custom';
  title: string;
  description: string;
  priority: SpellPriority;
  status: SpellStatus;
  createdAt: Date;
  updatedAt: Date;
  targetDate?: Date; // When spell should be cast
  estimatedDuration?: number; // Minutes
  aiResponse?: {
    id: string;
    content: string;
    generatedAt: Date;
    approvedBy?: string;
    approvedAt?: Date;
    modifications?: string; // Admin edits to AI response
  };
  adminNotes?: string;
  ingredients?: string[];
  ritualSteps?: string[];
  moonPhase?: 'new' | 'waxing' | 'full' | 'waning';
  completionNotes?: string;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  amount: number;
}

export interface QueueFilters {
  status?: SpellStatus[];
  priority?: SpellPriority[];
  serviceType?: SpellRequest['serviceType'][];
  dateRange?: {
    start: Date;
    end: Date;
  };
  searchQuery?: string;
}

interface SpellQueueState {
  // Queue Data
  spells: SpellRequest[];
  filteredSpells: SpellRequest[];
  activeSpellId: string | null;
  
  // UI State
  isLoading: boolean;
  error: string | null;
  filters: QueueFilters;
  sortBy: 'createdAt' | 'priority' | 'targetDate' | 'status';
  sortOrder: 'asc' | 'desc';
  
  // AI Generation State
  generatingAIResponse: Record<string, boolean>; // spellId -> isGenerating
  
  // Stats
  stats: {
    total: number;
    pending: number;
    inProgress: number;
    completed: number;
    needsAttention: number; // Urgent + ready for approval
  };
  
  // Actions - Spell Management
  setSpells: (spells: SpellRequest[]) => void;
  addSpell: (spell: SpellRequest) => void;
  updateSpell: (spellId: string, updates: Partial<SpellRequest>) => void;
  deleteSpell: (spellId: string) => void;
  setActiveSpell: (spellId: string | null) => void;
  
  // Actions - Status Updates
  updateStatus: (spellId: string, status: SpellStatus) => void;
  updatePriority: (spellId: string, priority: SpellPriority) => void;
  
  // Actions - AI Integration
  generateAIResponse: (spellId: string) => Promise<void>;
  approveAIResponse: (spellId: string, modifications?: string) => void;
  rejectAIResponse: (spellId: string) => void;
  
  // Actions - Admin Notes
  updateAdminNotes: (spellId: string, notes: string) => void;
  addCompletionNotes: (spellId: string, notes: string) => void;
  
  // Actions - Filtering & Sorting
  setFilters: (filters: Partial<QueueFilters>) => void;
  clearFilters: () => void;
  setSortBy: (sortBy: SpellQueueState['sortBy']) => void;
  toggleSortOrder: () => void;
  applyFilters: () => void;
  
  // Actions - Bulk Operations
  bulkUpdateStatus: (spellIds: string[], status: SpellStatus) => void;
  bulkUpdatePriority: (spellIds: string[], priority: SpellPriority) => void;
  
  // Actions - Error Handling
  setError: (error: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  
  // Helpers
  getSpellById: (spellId: string) => SpellRequest | undefined;
  getSpellsByStatus: (status: SpellStatus) => SpellRequest[];
  getNeedsAttention: () => SpellRequest[];
  updateStats: () => void;
}

export const useSpellQueueStore = create<SpellQueueState>()(
  devtools(
    (set, get) => ({
      // Initial State
      spells: [],
      filteredSpells: [],
      activeSpellId: null,
      isLoading: false,
      error: null,
      filters: {},
      sortBy: 'createdAt',
      sortOrder: 'desc',
      generatingAIResponse: {},
      stats: {
        total: 0,
        pending: 0,
        inProgress: 0,
        completed: 0,
        needsAttention: 0,
      },

      // Spell Management
      setSpells: (spells) => {
        set({ spells, filteredSpells: spells });
        get().updateStats();
        get().applyFilters();
      },

      addSpell: (spell) => {
        set((state) => ({
          spells: [spell, ...state.spells],
        }));
        get().updateStats();
        get().applyFilters();
      },

      updateSpell: (spellId, updates) => {
        set((state) => ({
          spells: state.spells.map((spell) =>
            spell.id === spellId
              ? { ...spell, ...updates, updatedAt: new Date() }
              : spell
          ),
        }));
        get().updateStats();
        get().applyFilters();
      },

      deleteSpell: (spellId) => {
        set((state) => ({
          spells: state.spells.filter((spell) => spell.id !== spellId),
          activeSpellId:
            state.activeSpellId === spellId ? null : state.activeSpellId,
        }));
        get().updateStats();
        get().applyFilters();
      },

      setActiveSpell: (spellId) => set({ activeSpellId: spellId }),

      // Status Updates
      updateStatus: (spellId, status) => {
        get().updateSpell(spellId, { status });
      },

      updatePriority: (spellId, priority) => {
        get().updateSpell(spellId, { priority });
      },

      // AI Integration
      generateAIResponse: async (spellId) => {
        const spell = get().getSpellById(spellId);
        if (!spell) return;

        set((state) => ({
          generatingAIResponse: { ...state.generatingAIResponse, [spellId]: true },
        }));

        try {
          // This will be replaced with actual API call
          const response = await fetch('/api/ai/generate-response', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              spellId,
              serviceType: spell.serviceType,
              description: spell.description,
            }),
          });

          if (!response.ok) throw new Error('Failed to generate AI response');

          const data = await response.json();

          get().updateSpell(spellId, {
            status: 'ready-for-approval',
            aiResponse: {
              id: data.id,
              content: data.content,
              generatedAt: new Date(),
            },
          });
        } catch (error) {
          set({ error: (error as Error).message });
        } finally {
          set((state) => ({
            generatingAIResponse: { ...state.generatingAIResponse, [spellId]: false },
          }));
        }
      },

      approveAIResponse: (spellId, modifications) => {
        const spell = get().getSpellById(spellId);
        if (!spell?.aiResponse) return;

        get().updateSpell(spellId, {
          status: 'approved',
          aiResponse: {
            ...spell.aiResponse,
            approvedAt: new Date(),
            modifications,
          },
        });
      },

      rejectAIResponse: (spellId) => {
        get().updateSpell(spellId, {
          status: 'reviewing',
          aiResponse: undefined,
        });
      },

      // Admin Notes
      updateAdminNotes: (spellId, notes) => {
        get().updateSpell(spellId, { adminNotes: notes });
      },

      addCompletionNotes: (spellId, notes) => {
        get().updateSpell(spellId, {
          completionNotes: notes,
          status: 'completed',
        });
      },

      // Filtering & Sorting
      setFilters: (filters) => {
        set((state) => ({
          filters: { ...state.filters, ...filters },
        }));
        get().applyFilters();
      },

      clearFilters: () => {
        set({ filters: {} });
        get().applyFilters();
      },

      setSortBy: (sortBy) => {
        set({ sortBy });
        get().applyFilters();
      },

      toggleSortOrder: () => {
        set((state) => ({
          sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc',
        }));
        get().applyFilters();
      },

      applyFilters: () => {
        const state = get();
        let filtered = [...state.spells];

        // Apply status filter
        if (state.filters.status?.length) {
          filtered = filtered.filter((spell) =>
            state.filters.status!.includes(spell.status)
          );
        }

        // Apply priority filter
        if (state.filters.priority?.length) {
          filtered = filtered.filter((spell) =>
            state.filters.priority!.includes(spell.priority)
          );
        }

        // Apply service type filter
        if (state.filters.serviceType?.length) {
          filtered = filtered.filter((spell) =>
            state.filters.serviceType!.includes(spell.serviceType)
          );
        }

        // Apply date range filter
        if (state.filters.dateRange) {
          filtered = filtered.filter(
            (spell) =>
              spell.createdAt >= state.filters.dateRange!.start &&
              spell.createdAt <= state.filters.dateRange!.end
          );
        }

        // Apply search query
        if (state.filters.searchQuery) {
          const query = state.filters.searchQuery.toLowerCase();
          filtered = filtered.filter(
            (spell) =>
              spell.title.toLowerCase().includes(query) ||
              spell.description.toLowerCase().includes(query) ||
              spell.userName.toLowerCase().includes(query)
          );
        }

        // Apply sorting
        filtered.sort((a, b) => {
          const aValue = a[state.sortBy];
          const bValue = b[state.sortBy];

          if (aValue instanceof Date && bValue instanceof Date) {
            return state.sortOrder === 'asc'
              ? aValue.getTime() - bValue.getTime()
              : bValue.getTime() - aValue.getTime();
          }

          if (typeof aValue === 'string' && typeof bValue === 'string') {
            return state.sortOrder === 'asc'
              ? aValue.localeCompare(bValue)
              : bValue.localeCompare(aValue);
          }

          return 0;
        });

        set({ filteredSpells: filtered });
      },

      // Bulk Operations
      bulkUpdateStatus: (spellIds, status) => {
        set((state) => ({
          spells: state.spells.map((spell) =>
            spellIds.includes(spell.id)
              ? { ...spell, status, updatedAt: new Date() }
              : spell
          ),
        }));
        get().updateStats();
        get().applyFilters();
      },

      bulkUpdatePriority: (spellIds, priority) => {
        set((state) => ({
          spells: state.spells.map((spell) =>
            spellIds.includes(spell.id)
              ? { ...spell, priority, updatedAt: new Date() }
              : spell
          ),
        }));
        get().applyFilters();
      },

      // Error Handling
      setError: (error) => set({ error }),
      setLoading: (isLoading) => set({ isLoading }),

      // Helpers
      getSpellById: (spellId) => {
        return get().spells.find((spell) => spell.id === spellId);
      },

      getSpellsByStatus: (status) => {
        return get().spells.filter((spell) => spell.status === status);
      },

      getNeedsAttention: () => {
        return get().spells.filter(
          (spell) =>
            spell.priority === 'urgent' || spell.status === 'ready-for-approval'
        );
      },

      updateStats: () => {
        const spells = get().spells;
        set({
          stats: {
            total: spells.length,
            pending: spells.filter((s) => s.status === 'pending').length,
            inProgress: spells.filter((s) => s.status === 'in-progress').length,
            completed: spells.filter((s) => s.status === 'completed').length,
            needsAttention: spells.filter(
              (s) => s.priority === 'urgent' || s.status === 'ready-for-approval'
            ).length,
          },
        });
      },
    }),
    { name: 'SpellQueueStore' }
  )
);
