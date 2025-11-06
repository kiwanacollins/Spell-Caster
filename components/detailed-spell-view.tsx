/**
 * Detailed Spell View Modal
 * Full spell information with ritual timeline, healer notes, and status updates
 */
'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import type { Spell } from '@/lib/utils/spells';
import {
  SPELL_TYPE_LABELS,
  SPELL_STATUS_LABELS,
  SPELL_STATUS_COLORS,
  SPELL_TYPE_ICONS,
} from '@/lib/utils/spells';
import {
  GiSpellBook,
  GiHeartBottle,
  GiCandles,
  GiScrollUnfurled,
  GiCrystalBall,
} from 'react-icons/gi';
import { MdClose } from 'react-icons/md';

interface DetailedSpellViewProps {
  spell: Spell | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DetailedSpellView({
  spell,
  isOpen,
  onClose,
}: DetailedSpellViewProps) {
  if (!spell) return null;

  const SpellIcon = SPELL_TYPE_ICONS[spell.type];

  const ritualTimeline = [
    {
      id: 'request',
      title: 'Spell Requested',
      date: spell.requestedDate,
      status: 'completed',
      icon: GiScrollUnfurled,
      description: 'Your spell request was received and reviewed',
    },
    {
      id: 'preparation',
      title: 'Ritual Preparation',
      date: spell.startDate,
      status: spell.status === 'pending' ? 'pending' : 'completed',
      icon: GiCandles,
      description: 'Gathering materials and aligning with lunar energy',
    },
    {
      id: 'ritual',
      title: 'Active Casting',
      date: spell.ritualDate,
      status:
        spell.status === 'active' || spell.status === 'completed'
          ? 'active'
          : 'pending',
      icon: GiSpellBook,
      description: 'Performing the ritual and channeling spiritual energy',
    },
    {
      id: 'completion',
      title: 'Spell Completion',
      date: spell.completionDate,
      status:
        spell.status === 'completed' ? 'completed' : 'pending',
      icon: GiHeartBottle,
      description: 'Ritual is complete and energy is integrated',
    },
  ].filter((item) => item.date || spell.status === item.status);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[#F4E8D0] border-2 border-[#8B6F47]/30">
        {/* Corner decorations */}
        <div className="pointer-events-none absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-[#8B6F47]/40" />
        <div className="pointer-events-none absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-[#8B6F47]/40" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-[#8B6F47]/40" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-[#8B6F47]/40" />

        {/* Close Button */}
        <DialogClose className="absolute right-4 top-4 rounded-md opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
          <MdClose className="h-5 w-5 text-[#8B6F47]" />
          <span className="sr-only">Close</span>
        </DialogClose>

        {/* Header */}
        <DialogHeader>
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 rounded-lg bg-[#8B6F47]/10 border border-[#8B6F47]/30">
              <SpellIcon className="h-8 w-8 text-[#8B6F47]" />
            </div>
            <div className="flex-1">
              <DialogTitle className="font-['MedievalSharp'] text-2xl text-[#1A1A1A] mb-2">
                {spell.name}
              </DialogTitle>
              <DialogDescription className="font-['Crimson_Text'] text-base text-[#4A4A4A] mb-3">
                {SPELL_TYPE_LABELS[spell.type]}
              </DialogDescription>
              <Badge
                className={cn(
                  "font-['Crimson_Text']",
                  SPELL_STATUS_COLORS[spell.status]
                )}
              >
                {SPELL_STATUS_LABELS[spell.status]}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Description */}
          <div>
            <h3 className="font-['MedievalSharp'] text-lg text-[#1A1A1A] mb-2">
              Overview
            </h3>
            <p className="font-['Crimson_Text'] text-sm text-[#1A1A1A] leading-relaxed">
              {spell.description}
            </p>
          </div>

          {/* Energy and Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Energy Level */}
            {spell.energyLevel !== undefined && (
              <div className="col-span-2 md:col-span-1">
                <h4 className="font-['Crimson_Text'] text-sm font-semibold text-[#1A1A1A] mb-2">
                  Energy Level
                </h4>
                <div className="space-y-2">
                  <Progress
                    value={spell.energyLevel}
                    className="h-3 bg-[#8B6F47]/20 border border-[#8B6F47]/30"
                  />
                  <p className="font-['Crimson_Text'] text-xs text-[#4A4A4A]">
                    {spell.energyLevel}% - Spiritual alignment
                  </p>
                </div>
              </div>
            )}

            {/* Lunar Phase */}
            {spell.lunarPhase && (
              <div className="col-span-2 md:col-span-1">
                <h4 className="font-['Crimson_Text'] text-sm font-semibold text-[#1A1A1A] mb-2">
                  Lunar Phase
                </h4>
                <Badge className="bg-[#CC8800]/10 text-[#CC8800] border border-[#CC8800]/30 font-['Crimson_Text']">
                  🌙 {spell.lunarPhase}
                </Badge>
              </div>
            )}

            {/* Ritual Date */}
            {spell.ritualDate && (
              <div className="col-span-2 md:col-span-1">
                <h4 className="font-['Crimson_Text'] text-sm font-semibold text-[#1A1A1A] mb-2">
                  Ritual Date
                </h4>
                <p className="font-['Crimson_Text'] text-sm text-[#4A4A4A]">
                  {spell.ritualDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
            )}

            {/* Status Timeline */}
            <div className="col-span-2">
              <h4 className="font-['Crimson_Text'] text-sm font-semibold text-[#1A1A1A] mb-3">
                Spell Timeline
              </h4>
              <div className="space-y-2">
                {ritualTimeline.map((timeline) => {
                  const TimelineIcon = timeline.icon;
                  const isCompleted = timeline.status === 'completed';
                  const isActive = timeline.status === 'active';

                  return (
                    <div
                      key={timeline.id}
                      className="flex gap-3 items-start p-3 rounded-md bg-[#E8DCC0]/50 border border-[#8B6F47]/20"
                    >
                      <div
                        className={cn(
                          'p-2 rounded-md shrink-0',
                          isCompleted && 'bg-[#B8860B]/20',
                          isActive && 'bg-[#2C5530]/20',
                          !isCompleted && !isActive && 'bg-[#8B6F47]/10'
                        )}
                      >
                        <TimelineIcon
                          className={cn(
                            'h-5 w-5',
                            isCompleted && 'text-[#B8860B]',
                            isActive && 'text-[#2C5530]',
                            !isCompleted && !isActive && 'text-[#8B6F47]'
                          )}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-['Crimson_Text'] font-semibold text-[#1A1A1A]">
                          {timeline.title}
                        </p>
                        <p className="font-['Crimson_Text'] text-xs text-[#4A4A4A] mt-1">
                          {timeline.description}
                        </p>
                        {timeline.date && (
                          <p className="font-['Crimson_Text'] text-xs text-[#8B6F47] mt-1">
                            {timeline.date.toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </p>
                        )}
                      </div>
                      <Badge
                        className={cn(
                          'text-xs shrink-0',
                          isCompleted &&
                            'bg-[#B8860B]/20 text-[#B8860B] border-[#B8860B]/30',
                          isActive &&
                            'bg-[#2C5530]/20 text-[#2C5530] border-[#2C5530]/30',
                          !isCompleted &&
                            !isActive &&
                            'bg-[#8B6F47]/10 text-[#8B6F47] border-[#8B6F47]/30'
                        )}
                      >
                        {isCompleted ? '✓ Done' : isActive ? 'Active' : 'Pending'}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Accordion Sections */}
          <Accordion type="single" collapsible className="border-2 border-[#8B6F47]/20 rounded-md bg-white/50">
            {/* Ingredients */}
            {spell.ingredients && spell.ingredients.length > 0 && (
              <AccordionItem value="ingredients">
                <AccordionTrigger className="font-['Crimson_Text'] hover:bg-[#CC8800]/10">
                  <div className="flex items-center gap-2">
                    <GiCandles className="h-4 w-4 text-[#8B6F47]" />
                    <span>Ritual Ingredients</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {spell.ingredients.map((ingredient, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 text-sm font-['Crimson_Text']"
                      >
                        <div className="w-2 h-2 rounded-full bg-[#8B6F47]/60" />
                        <span>{ingredient}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            {/* Your Notes */}
            {spell.notes && (
              <AccordionItem value="notes">
                <AccordionTrigger className="font-['Crimson_Text'] hover:bg-[#CC8800]/10">
                  <div className="flex items-center gap-2">
                    <GiScrollUnfurled className="h-4 w-4 text-[#8B6F47]" />
                    <span>Your Notes</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="font-['Crimson_Text'] text-sm text-[#1A1A1A] leading-relaxed italic">
                    &ldquo;{spell.notes}&rdquo;
                  </p>
                </AccordionContent>
              </AccordionItem>
            )}

            {/* Healer Notes */}
            {spell.healerNotes && (
              <AccordionItem value="healer-notes">
                <AccordionTrigger className="font-['Crimson_Text'] hover:bg-[#CC8800]/10">
                  <div className="flex items-center gap-2">
                    <GiCrystalBall className="h-4 w-4 text-[#8B6F47]" />
                    <span>Healer&apos;s Guidance</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="rounded-md bg-[#E8DCC0] border border-[#8B6F47]/20 p-4">
                    <p className="font-['Crimson_Text'] text-sm text-[#1A1A1A] leading-relaxed">
                      {spell.healerNotes}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-[#8B6F47]/20">
            <Button
              variant="outline"
              className="flex-1 border-2 border-[#8B6F47]/30 hover:bg-[#CC8800]/20 font-['Crimson_Text']"
              onClick={onClose}
            >
              Close
            </Button>
            <Button className="flex-1 bg-[#8B6F47] hover:bg-[#8B6F47]/80 text-[#F4E8D0] font-['Crimson_Text']">
              Update Spell
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
