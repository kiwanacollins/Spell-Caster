/**
 * Spiritual Calendar Component
 * Displays calendar with lunar phases, consultation dates, and mystical events
 */
'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  GiMoonOrbit, 
  GiCrystalBall, 
  GiSpellBook, 
  GiCandles, 
  GiSun, 
  GiMoon 
} from 'react-icons/gi';
import { cn } from '@/lib/utils';
import type { CalendarEvent, MoonPhase } from '@/lib/utils/spiritual-calendar';
import { getMoonPhase, getEventsForDate } from '@/lib/utils/spiritual-calendar';

interface SpiritualCalendarProps {
  events?: CalendarEvent[];
  showLunarPhases?: boolean;
  showEventDetails?: boolean;
  className?: string;
}

const EVENT_ICON_MAP = {
  consultation: GiCrystalBall,
  'spell-completion': GiSpellBook,
  ritual: GiCandles,
  'energy-peak': GiSun,
  ceremony: GiMoonOrbit,
};

const EVENT_BADGE_COLORS = {
  consultation: 'bg-[#CC8800]/20 text-[#CC8800] border-[#CC8800]/30',
  'spell-completion': 'bg-[#8B0000]/20 text-[#8B0000] border-[#8B0000]/30',
  ritual: 'bg-[#B8860B]/20 text-[#B8860B] border-[#B8860B]/30',
  'energy-peak': 'bg-[#2C5530]/20 text-[#2C5530] border-[#2C5530]/30',
  ceremony: 'bg-[#8B6F47]/20 text-[#8B6F47] border-[#8B6F47]/30',
};

const MOON_PHASE_ICONS: Record<MoonPhase, typeof GiMoon> = {
  'new': GiMoon,
  'waxing-crescent': GiMoon,
  'first-quarter': GiMoon,
  'waxing-gibbous': GiMoon,
  'full': GiMoonOrbit,
  'waning-gibbous': GiMoon,
  'last-quarter': GiMoon,
  'waning-crescent': GiMoon,
};

export function SpiritualCalendar({
  events = [],
  showLunarPhases = true,
  showEventDetails = true,
  className,
}: SpiritualCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [_hoveredDate, setHoveredDate] = useState<Date | undefined>();
  
  // Get events for selected date
  const selectedEvents = selectedDate ? getEventsForDate(selectedDate, events) : [];
  
  // Get moon phase for selected date
  const moonData = selectedDate ? getMoonPhase(selectedDate) : null;
  
  // Get dates with events for highlighting
  const eventDates = events.map(e => e.date.toDateString());
  
  return (
    <Card className="relative overflow-hidden border-2 border-[#8B6F47]/30 bg-[#F4E8D0]/95 backdrop-blur-sm">
      {/* Mystical corner decorations */}
      <div className="pointer-events-none absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-[#8B6F47]/40" />
      <div className="pointer-events-none absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-[#8B6F47]/40" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-[#8B6F47]/40" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-[#8B6F47]/40" />
      
      <div className="relative p-6">
        {/* Header with moon phase indicator */}
        {showLunarPhases && moonData && (
          <div className="mb-6 flex items-center justify-between border-b border-[#8B6F47]/30 pb-4">
            <div className="flex items-center gap-3">
              {(() => {
                const MoonIcon = MOON_PHASE_ICONS[moonData.phase];
                return <MoonIcon className="h-8 w-8 text-[#8B6F47]" />;
              })()}
              <div>
                <h3 className="font-['MedievalSharp'] text-lg text-[#1A1A1A]">
                  {moonData.name}
                </h3>
                <p className="font-['Crimson_Text'] text-sm text-[#4A4A4A]">
                  {moonData.illumination}% Illuminated
                </p>
              </div>
            </div>
            <Badge 
              variant="outline" 
              className="border-[#8B6F47]/40 bg-[#CC8800]/10 font-['Crimson_Text'] text-[#CC8800]"
            >
              Lunar Energy: {moonData.phase === 'full' || moonData.phase === 'new' ? 'Peak' : 'Moderate'}
            </Badge>
          </div>
        )}
        
        <div className={cn('grid gap-6', showEventDetails ? 'lg:grid-cols-[1fr,300px]' : '', className)}>
          {/* Calendar */}
          <div className="flex justify-center w-full">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              showOutsideDays={false}
              className={cn(
                "rounded-lg border-2 border-[#8B6F47]/20 bg-[#F4E8D0] p-4 w-full max-w-md",
                "font-['Crimson_Text']",
                "[&_.rdp-month_caption]:font-['MedievalSharp'] [&_.rdp-month_caption]:text-lg [&_.rdp-month_caption]:mb-2",
                "[&_.rdp-weekday]:text-[#8B6F47] [&_.rdp-weekday]:font-semibold [&_.rdp-weekday]:text-sm",
                "[&_button]:hover:bg-[#CC8800]/20 [&_button]:hover:text-[#1A1A1A]",
                "[&_button]:transition-all [&_button]:duration-300 [&_button]:text-sm [&_button]:min-w-9 [&_button]:h-9",
                "[&_button[data-selected-single=true]]:bg-[#8B6F47] [&_button[data-selected-single=true]]:text-[#F4E8D0]",
                "[&_button[data-selected-single=true]]:shadow-[0_0_20px_rgba(139,111,71,0.4)]",
              )}
              modifiers={{
                hasEvent: (date) => eventDates.includes(date.toDateString()),
                lunarPower: (date) => {
                  const phase = getMoonPhase(date);
                  return phase.phase === 'full' || phase.phase === 'new';
                },
              }}
              modifiersClassNames={{
                hasEvent: cn(
                  "relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2",
                  "after:h-1.5 after:w-1.5 after:rounded-full after:bg-[#8B0000]",
                  "after:shadow-[0_0_6px_rgba(139,0,0,0.6)]",
                  "after:animate-pulse"
                ),
                lunarPower: cn(
                  "ring-2 ring-[#CC8800]/50 ring-offset-2 ring-offset-[#F4E8D0]",
                  "shadow-[0_0_15px_rgba(204,136,0,0.3)]"
                ),
              }}
              onDayMouseEnter={(date) => setHoveredDate(date)}
              onDayMouseLeave={() => setHoveredDate(undefined)}
            />
          </div>
          
          {/* Event Details Panel */}
          {showEventDetails && (
            <div className="space-y-4">
              {/* Selected Date Info */}
              {selectedDate && (
                <Card className="border-2 border-[#8B6F47]/30 bg-[#F4E8D0]/50 p-4">
                  <h4 className="mb-3 font-['MedievalSharp'] text-base text-[#1A1A1A]">
                    {selectedDate.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </h4>
                  
                  {selectedEvents.length > 0 ? (
                    <div className="space-y-3">
                      {selectedEvents.map((event) => {
                        const EventIcon = EVENT_ICON_MAP[event.type];
                        return (
                          <div
                            key={event.id}
                            className={cn(
                              "rounded-md border-2 p-3 transition-all duration-300",
                              "hover:shadow-lg hover:-translate-y-0.5",
                              EVENT_BADGE_COLORS[event.type]
                            )}
                          >
                            <div className="flex items-start gap-2">
                              <EventIcon className="mt-0.5 h-5 w-5 shrink-0" />
                              <div className="flex-1">
                                <p className="font-['MedievalSharp'] text-sm leading-tight">
                                  {event.title}
                                </p>
                                {event.time && (
                                  <p className="mt-1 font-['Crimson_Text'] text-xs opacity-80">
                                    {event.time}
                                  </p>
                                )}
                                {event.description && (
                                  <p className="mt-1 font-['Crimson_Text'] text-xs leading-snug opacity-70">
                                    {event.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="rounded-md border border-dashed border-[#8B6F47]/30 p-4 text-center">
                      <GiCandles className="mx-auto mb-2 h-8 w-8 text-[#8B6F47]/40" />
                      <p className="font-['Crimson_Text'] text-sm text-[#4A4A4A]/70">
                        No events scheduled for this date
                      </p>
                    </div>
                  )}
                </Card>
              )}
              
              {/* Upcoming Events */}
              {events.length > 0 && (
                <Card className="border-2 border-[#8B6F47]/30 bg-[#F4E8D0]/50 p-4">
                  <h4 className="mb-3 font-['MedievalSharp'] text-base text-[#1A1A1A]">
                    Upcoming Events
                  </h4>
                  <div className="space-y-2">
                    {events.slice(0, 5).map((event) => {
                      const EventIcon = EVENT_ICON_MAP[event.type];
                      return (
                        <button
                          key={event.id}
                          onClick={() => setSelectedDate(event.date)}
                          className={cn(
                            "w-full rounded-md border p-2 text-left transition-all duration-300",
                            "hover:shadow-md hover:-translate-y-0.5",
                            "border-[#8B6F47]/20 bg-white/50",
                            selectedDate?.toDateString() === event.date.toDateString() && "ring-2 ring-[#8B6F47]/50"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <EventIcon className="h-4 w-4 text-[#8B6F47]" />
                            <div className="flex-1">
                              <p className="font-['Crimson_Text'] text-xs font-semibold text-[#1A1A1A]">
                                {event.title}
                              </p>
                              <p className="font-['Crimson_Text'] text-xs text-[#4A4A4A]">
                                {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
