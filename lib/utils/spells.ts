/**
 * Spells Utilities
 * Server-side utilities for spell data and management
 */

export type SpellStatus = 'pending' | 'in-progress' | 'active' | 'completed' | 'cancelled';
export type SpellType = 'love' | 'prosperity' | 'protection' | 'healing' | 'clarity' | 'luck' | 'career' | 'family' | 'spiritual-growth';

export interface Spell {
  id: string;
  name: string;
  type: SpellType;
  status: SpellStatus;
  requestedDate: Date;
  startDate?: Date;
  completionDate?: Date;
  description: string;
  ritualDate?: Date;
  energyLevel?: number; // 0-100
  lunarPhase?: string;
  ingredients?: string[];
  notes?: string;
  healerNotes?: string;
}

export const SPELL_TYPE_LABELS: Record<SpellType, string> = {
  'love': 'Love & Romance',
  'prosperity': 'Prosperity & Wealth',
  'protection': 'Protection & Safety',
  'healing': 'Healing & Wellness',
  'clarity': 'Clarity & Wisdom',
  'luck': 'Luck & Fortune',
  'career': 'Career & Success',
  'family': 'Family & Harmony',
  'spiritual-growth': 'Spiritual Growth',
};

export const SPELL_STATUS_LABELS: Record<SpellStatus, string> = {
  'pending': 'Pending Review',
  'in-progress': 'Preparing Ritual',
  'active': 'Actively Working',
  'completed': 'Completed',
  'cancelled': 'Cancelled',
};

export const SPELL_STATUS_COLORS: Record<SpellStatus, string> = {
  'pending': 'bg-[#CC8800]/20 text-[#CC8800] border-[#CC8800]/30',
  'in-progress': 'bg-[#8B6F47]/20 text-[#8B6F47] border-[#8B6F47]/30',
  'active': 'bg-[#2C5530]/20 text-[#2C5530] border-[#2C5530]/30',
  'completed': 'bg-[#B8860B]/20 text-[#B8860B] border-[#B8860B]/30',
  'cancelled': 'bg-[#4A4A4A]/20 text-[#4A4A4A] border-[#4A4A4A]/30',
};

/**
 * Generate sample spell data for demonstration
 */
export function getSampleSpells(): Spell[] {
  const today = new Date();
  
  return [
    {
      id: 'spell-1',
      name: 'Love Attraction Ritual',
      type: 'love',
      status: 'active',
      requestedDate: new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
      startDate: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      description: 'A powerful ritual to attract genuine love and meaningful romantic connections into your life.',
      ritualDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      energyLevel: 85,
      lunarPhase: 'Waxing Moon',
      ingredients: ['Rose quartz', 'Red candles', 'Rose petals', 'Honey'],
      notes: 'Please keep an open heart during the ritual period',
      healerNotes: 'Strong spiritual alignment detected. Excellent timing for manifestation.',
    },
    {
      id: 'spell-2',
      name: 'Prosperity & Abundance Spell',
      type: 'prosperity',
      status: 'in-progress',
      requestedDate: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      description: 'Attract wealth, financial opportunities, and abundant blessings into your life.',
      energyLevel: 70,
      lunarPhase: 'First Quarter',
      ingredients: ['Citrine', 'Green candles', 'Cinnamon', 'Bay leaves'],
      healerNotes: 'Preparing ritual materials. Will begin on the next new moon.',
    },
    {
      id: 'spell-3',
      name: 'Protection Shield Casting',
      type: 'protection',
      status: 'completed',
      requestedDate: new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      startDate: new Date(today.getTime() - 21 * 24 * 60 * 60 * 1000), // 21 days ago
      completionDate: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      description: 'Create a powerful protective shield around you and your home from negative energies.',
      energyLevel: 100,
      lunarPhase: 'Full Moon',
      ingredients: ['Black tourmaline', 'White sage', 'Salt', 'Obsidian'],
      notes: 'Felt immediate relief after the ritual',
      healerNotes: 'Successfully completed. Shield is strong and active for 3 months.',
    },
    {
      id: 'spell-4',
      name: 'Emotional Healing Ritual',
      type: 'healing',
      status: 'active',
      requestedDate: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
      startDate: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      description: 'Heal past emotional wounds and release trauma to embrace inner peace.',
      energyLevel: 75,
      lunarPhase: 'Waning Gibbous',
      ingredients: ['Amethyst', 'Lavender', 'White candles', 'Clear quartz'],
      healerNotes: 'Deep healing energy flowing. Continue meditation practices.',
    },
    {
      id: 'spell-5',
      name: 'Career Success Manifestation',
      type: 'career',
      status: 'pending',
      requestedDate: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      description: 'Manifest career advancement, recognition, and professional success.',
      notes: 'Hoping for a promotion soon',
    },
    {
      id: 'spell-6',
      name: 'Clarity & Insight Divination',
      type: 'clarity',
      status: 'completed',
      requestedDate: new Date(today.getTime() - 45 * 24 * 60 * 60 * 1000), // 45 days ago
      startDate: new Date(today.getTime() - 40 * 24 * 60 * 60 * 1000),
      completionDate: new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000),
      description: 'Gain clarity on life path decisions and receive divine guidance.',
      energyLevel: 95,
      lunarPhase: 'New Moon',
      ingredients: ['Selenite', 'Incense', 'Clear quartz', 'Moonstone'],
      healerNotes: 'Powerful insights revealed. Trust your intuition moving forward.',
    },
    {
      id: 'spell-7',
      name: 'Good Luck Charm',
      type: 'luck',
      status: 'active',
      requestedDate: new Date(today.getTime() - 12 * 24 * 60 * 60 * 1000),
      startDate: new Date(today.getTime() - 8 * 24 * 60 * 60 * 1000),
      description: 'Attract good fortune and lucky opportunities in all areas of life.',
      energyLevel: 80,
      lunarPhase: 'Waxing Crescent',
      ingredients: ['Four-leaf clover', 'Gold candles', 'Lucky coins', 'Tiger eye'],
      healerNotes: 'Luck energy building strongly. Stay open to opportunities.',
    },
    {
      id: 'spell-8',
      name: 'Family Harmony Blessing',
      type: 'family',
      status: 'in-progress',
      requestedDate: new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000),
      description: 'Restore peace, understanding, and loving connection within family relationships.',
      energyLevel: 65,
      healerNotes: 'Gathering family photo for ritual focus.',
    },
  ];
}

/**
 * Filter spells by status
 */
export function filterSpellsByStatus(spells: Spell[], status: SpellStatus | 'all'): Spell[] {
  if (status === 'all') return spells;
  return spells.filter(spell => spell.status === status);
}

/**
 * Filter spells by type
 */
export function filterSpellsByType(spells: Spell[], type: SpellType | 'all'): Spell[] {
  if (type === 'all') return spells;
  return spells.filter(spell => spell.type === type);
}

/**
 * Sort spells by date
 */
export function sortSpells(spells: Spell[], sortBy: 'newest' | 'oldest' | 'status'): Spell[] {
  const sorted = [...spells];
  
  if (sortBy === 'newest') {
    sorted.sort((a, b) => b.requestedDate.getTime() - a.requestedDate.getTime());
  } else if (sortBy === 'oldest') {
    sorted.sort((a, b) => a.requestedDate.getTime() - b.requestedDate.getTime());
  } else if (sortBy === 'status') {
    const statusOrder: Record<SpellStatus, number> = {
      'active': 1,
      'in-progress': 2,
      'pending': 3,
      'completed': 4,
      'cancelled': 5,
    };
    sorted.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
  }
  
  return sorted;
}
