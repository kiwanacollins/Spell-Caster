/**
 * Spiritual Calendar Utilities
 * Server-side utilities for generating calendar data with lunar phases and events
 */

export type MoonPhase = 'new' | 'waxing-crescent' | 'first-quarter' | 'waxing-gibbous' | 'full' | 'waning-gibbous' | 'last-quarter' | 'waning-crescent';

export type CalendarEventType = 'consultation' | 'spell-completion' | 'ritual' | 'energy-peak' | 'ceremony';

export interface CalendarEvent {
  id: string;
  date: Date;
  title: string;
  type: CalendarEventType;
  description?: string;
  time?: string;
}

export interface MoonPhaseData {
  phase: MoonPhase;
  illumination: number; // 0-100%
  name: string;
  nextPhaseDate: Date;
}

/**
 * Calculate the moon phase for a given date
 * Uses simplified lunar calculation (29.53 day cycle)
 */
export function getMoonPhase(date: Date): MoonPhaseData {
  // Known new moon: January 6, 2000
  const knownNewMoon = new Date(2000, 0, 6, 18, 14).getTime();
  const lunarCycle = 29.53058867; // days
  
  const timeDiff = date.getTime() - knownNewMoon;
  const daysSinceNewMoon = timeDiff / (1000 * 60 * 60 * 24);
  const currentCycle = daysSinceNewMoon % lunarCycle;
  
  // Calculate illumination (0-100%)
  const illumination = Math.round(50 * (1 - Math.cos((currentCycle / lunarCycle) * 2 * Math.PI)));
  
  // Determine phase name
  let phase: MoonPhase;
  let name: string;
  
  if (currentCycle < 1.84566) {
    phase = 'new';
    name = 'New Moon';
  } else if (currentCycle < 7.38264) {
    phase = 'waxing-crescent';
    name = 'Waxing Crescent';
  } else if (currentCycle < 9.22830) {
    phase = 'first-quarter';
    name = 'First Quarter';
  } else if (currentCycle < 14.76528) {
    phase = 'waxing-gibbous';
    name = 'Waxing Gibbous';
  } else if (currentCycle < 16.61094) {
    phase = 'full';
    name = 'Full Moon';
  } else if (currentCycle < 22.14792) {
    phase = 'waning-gibbous';
    name = 'Waning Gibbous';
  } else if (currentCycle < 23.99358) {
    phase = 'last-quarter';
    name = 'Last Quarter';
  } else {
    phase = 'waning-crescent';
    name = 'Waning Crescent';
  }
  
  // Calculate next phase date (approximately 7.4 days)
  const nextPhaseDate = new Date(date.getTime() + (7.38264 * 24 * 60 * 60 * 1000));
  
  return {
    phase,
    illumination,
    name,
    nextPhaseDate,
  };
}

/**
 * Check if a date has significant lunar energy (New Moon or Full Moon)
 */
export function isLunarPowerDate(date: Date): boolean {
  const moonData = getMoonPhase(date);
  return moonData.phase === 'new' || moonData.phase === 'full';
}

/**
 * Generate sample calendar events for demonstration
 */
export function getSampleCalendarEvents(): CalendarEvent[] {
  const today = new Date();
  const events: CalendarEvent[] = [];
  
  // Consultation in 3 days
  const consultationDate = new Date(today);
  consultationDate.setDate(today.getDate() + 3);
  events.push({
    id: 'event-1',
    date: consultationDate,
    title: 'Spiritual Consultation',
    type: 'consultation',
    description: 'Energy reading and guidance session',
    time: '2:00 PM',
  });
  
  // Spell completion in 5 days
  const spellDate = new Date(today);
  spellDate.setDate(today.getDate() + 5);
  events.push({
    id: 'event-2',
    date: spellDate,
    title: 'Love Attraction Spell Complete',
    type: 'spell-completion',
    description: 'Your spell casting will be complete',
  });
  
  // Full moon ritual in 7 days
  const ritualDate = new Date(today);
  ritualDate.setDate(today.getDate() + 7);
  events.push({
    id: 'event-3',
    date: ritualDate,
    title: 'Full Moon Ritual',
    type: 'ritual',
    description: 'Peak lunar energy for manifestation',
  });
  
  // Energy peak in 10 days
  const energyDate = new Date(today);
  energyDate.setDate(today.getDate() + 10);
  events.push({
    id: 'event-4',
    date: energyDate,
    title: 'Personal Energy Peak',
    type: 'energy-peak',
    description: 'Optimal time for spiritual work',
  });
  
  // Group ceremony in 14 days
  const ceremonyDate = new Date(today);
  ceremonyDate.setDate(today.getDate() + 14);
  events.push({
    id: 'event-5',
    date: ceremonyDate,
    title: 'Sacred Circle Ceremony',
    type: 'ceremony',
    description: 'Join us for a collective healing ritual',
    time: '7:00 PM',
  });
  
  return events;
}

/**
 * Get events for a specific date
 */
export function getEventsForDate(date: Date, events: CalendarEvent[]): CalendarEvent[] {
  return events.filter(event => 
    event.date.toDateString() === date.toDateString()
  );
}

/**
 * Get dates that have events
 */
export function getDatesWithEvents(events: CalendarEvent[]): Date[] {
  return events.map(event => event.date);
}
