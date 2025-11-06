/**
 * Spells Page Client Component
 * Client-side filtering and sorting for My Spells page
 */
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { 
  GiSpellBook, 
  GiHearts, 
  GiCoins, 
  GiShield, 
  GiHeartBottle,
  GiCrystalBall,
  GiHorseshoe,
  GiBriefcase,
  GiFamilyTree,
  GiMoonOrbit,
  GiFunnel,
  GiScrollUnfurled
} from 'react-icons/gi';
import { cn } from '@/lib/utils';
import type { Spell, SpellStatus, SpellType } from '@/lib/utils/spells';
import { 
  SPELL_TYPE_LABELS, 
  SPELL_STATUS_LABELS, 
  SPELL_STATUS_COLORS,
  filterSpellsByStatus,
  filterSpellsByType,
  sortSpells
} from '@/lib/utils/spells';

interface SpellsPageClientProps {
  spells: Spell[];
}

const SPELL_TYPE_ICONS: Record<SpellType, typeof GiHearts> = {
  'love': GiHearts,
  'prosperity': GiCoins,
  'protection': GiShield,
  'healing': GiHeartBottle,
  'clarity': GiCrystalBall,
  'luck': GiHorseshoe,
  'career': GiBriefcase,
  'family': GiFamilyTree,
  'spiritual-growth': GiMoonOrbit,
};

export function SpellsPageClient({ spells: initialSpells }: SpellsPageClientProps) {
  const [statusFilter, setStatusFilter] = useState<SpellStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<SpellType | 'all'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'status'>('newest');

  // Apply filters and sorting
  let filteredSpells = initialSpells;
  filteredSpells = filterSpellsByStatus(filteredSpells, statusFilter);
  filteredSpells = filterSpellsByType(filteredSpells, typeFilter);
  filteredSpells = sortSpells(filteredSpells, sortBy);

  const activeCount = initialSpells.filter(s => s.status === 'active').length;
  const pendingCount = initialSpells.filter(s => s.status === 'pending').length;
  const completedCount = initialSpells.filter(s => s.status === 'completed').length;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-['MedievalSharp'] text-4xl text-[#F4E8D0] mb-2">
            My Spells
          </h1>
          <p className="font-['Crimson_Text'] text-lg text-[#C0C0C0]">
            Track your spiritual workings and manifestations
          </p>
        </div>
        <Button 
          className="bg-[#8B6F47] hover:bg-[#8B6F47]/80 text-[#F4E8D0] font-['Crimson_Text'] border-2 border-[#B8860B]/50"
        >
          <GiSpellBook className="mr-2 h-5 w-5" />
          Request New Spell
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-2 border-[#8B6F47]/30 bg-[#F4E8D0]/95">
          <CardHeader className="pb-3">
            <CardTitle className="font-['MedievalSharp'] text-lg text-[#1A1A1A] flex items-center gap-2">
              <GiSpellBook className="h-5 w-5 text-[#2C5530]" />
              Active Spells
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-['MedievalSharp'] text-3xl text-[#2C5530]">{activeCount}</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-[#8B6F47]/30 bg-[#F4E8D0]/95">
          <CardHeader className="pb-3">
            <CardTitle className="font-['MedievalSharp'] text-lg text-[#1A1A1A] flex items-center gap-2">
              <GiScrollUnfurled className="h-5 w-5 text-[#CC8800]" />
              Pending Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-['MedievalSharp'] text-3xl text-[#CC8800]">{pendingCount}</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-[#8B6F47]/30 bg-[#F4E8D0]/95">
          <CardHeader className="pb-3">
            <CardTitle className="font-['MedievalSharp'] text-lg text-[#1A1A1A] flex items-center gap-2">
              <GiMoonOrbit className="h-5 w-5 text-[#B8860B]" />
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-['MedievalSharp'] text-3xl text-[#B8860B]">{completedCount}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Sorting */}
      <Card className="border-2 border-[#8B6F47]/30 bg-[#F4E8D0]/95">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex items-center gap-2 flex-1">
              <GiFunnel className="h-5 w-5 text-[#8B6F47]" />
              <span className="font-['Crimson_Text'] text-sm font-semibold text-[#1A1A1A]">
                Filter & Sort:
              </span>
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as SpellStatus | 'all')}>
              <SelectTrigger className="w-full md:w-48 border-2 border-[#8B6F47]/30 bg-[#F4E8D0] font-['Crimson_Text']">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent className="bg-[#F4E8D0] border-2 border-[#8B6F47]/30">
                <SelectItem value="all" className="font-['Crimson_Text']">All Statuses</SelectItem>
                <SelectItem value="active" className="font-['Crimson_Text']">Active</SelectItem>
                <SelectItem value="in-progress" className="font-['Crimson_Text']">In Progress</SelectItem>
                <SelectItem value="pending" className="font-['Crimson_Text']">Pending</SelectItem>
                <SelectItem value="completed" className="font-['Crimson_Text']">Completed</SelectItem>
                <SelectItem value="cancelled" className="font-['Crimson_Text']">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            {/* Type Filter */}
            <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as SpellType | 'all')}>
              <SelectTrigger className="w-full md:w-48 border-2 border-[#8B6F47]/30 bg-[#F4E8D0] font-['Crimson_Text']">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent className="bg-[#F4E8D0] border-2 border-[#8B6F47]/30">
                <SelectItem value="all" className="font-['Crimson_Text']">All Types</SelectItem>
                {Object.entries(SPELL_TYPE_LABELS).map(([key, label]) => (
                  <SelectItem key={key} value={key} className="font-['Crimson_Text']">
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full md:w-auto border-2 border-[#8B6F47]/30 bg-[#F4E8D0] hover:bg-[#CC8800]/20 font-['Crimson_Text']"
                >
                  Sort: {sortBy === 'newest' ? 'Newest First' : sortBy === 'oldest' ? 'Oldest First' : 'By Status'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#F4E8D0] border-2 border-[#8B6F47]/30">
                <DropdownMenuLabel className="font-['Crimson_Text']">Sort By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => setSortBy('newest')}
                  className="font-['Crimson_Text'] cursor-pointer"
                >
                  Newest First
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setSortBy('oldest')}
                  className="font-['Crimson_Text'] cursor-pointer"
                >
                  Oldest First
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setSortBy('status')}
                  className="font-['Crimson_Text'] cursor-pointer"
                >
                  By Status
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Active Filters Display */}
          {(statusFilter !== 'all' || typeFilter !== 'all') && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[#8B6F47]/20">
              <span className="font-['Crimson_Text'] text-sm text-[#4A4A4A]">Active filters:</span>
              {statusFilter !== 'all' && (
                <Badge className="bg-[#8B6F47]/20 text-[#8B6F47] border border-[#8B6F47]/30 font-['Crimson_Text']">
                  Status: {SPELL_STATUS_LABELS[statusFilter]}
                </Badge>
              )}
              {typeFilter !== 'all' && (
                <Badge className="bg-[#8B6F47]/20 text-[#8B6F47] border border-[#8B6F47]/30 font-['Crimson_Text']">
                  Type: {SPELL_TYPE_LABELS[typeFilter]}
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setStatusFilter('all');
                  setTypeFilter('all');
                }}
                className="h-6 px-2 font-['Crimson_Text'] text-xs text-[#8B0000] hover:text-[#8B0000] hover:bg-[#8B0000]/10"
              >
                Clear all
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Spells Grid */}
      {filteredSpells.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSpells.map((spell) => {
            const SpellIcon = SPELL_TYPE_ICONS[spell.type];
            return (
              <Card 
                key={spell.id}
                className="border-2 border-[#8B6F47]/30 bg-[#F4E8D0]/95 hover:shadow-[0_0_20px_rgba(139,111,71,0.3)] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                {/* Corner decorations */}
                <div className="pointer-events-none absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-[#8B6F47]/40" />
                <div className="pointer-events-none absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-[#8B6F47]/40" />
                <div className="pointer-events-none absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-[#8B6F47]/40" />
                <div className="pointer-events-none absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-[#8B6F47]/40" />

                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="p-2 rounded-lg bg-[#8B6F47]/10 border border-[#8B6F47]/30">
                        <SpellIcon className="h-6 w-6 text-[#8B6F47]" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="font-['MedievalSharp'] text-xl text-[#1A1A1A] mb-1">
                          {spell.name}
                        </CardTitle>
                        <CardDescription className="font-['Crimson_Text'] text-sm text-[#4A4A4A]">
                          {SPELL_TYPE_LABELS[spell.type]}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className={cn("font-['Crimson_Text'] text-xs", SPELL_STATUS_COLORS[spell.status])}>
                      {SPELL_STATUS_LABELS[spell.status]}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="font-['Crimson_Text'] text-sm text-[#1A1A1A] leading-relaxed">
                    {spell.description}
                  </p>

                  {/* Energy Level Progress */}
                  {spell.energyLevel !== undefined && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-['Crimson_Text'] text-xs text-[#4A4A4A]">
                          Energy Level
                        </span>
                        <span className="font-['Crimson_Text'] text-xs font-semibold text-[#8B6F47]">
                          {spell.energyLevel}%
                        </span>
                      </div>
                      <Progress 
                        value={spell.energyLevel} 
                        className="h-2 bg-[#8B6F47]/20 border border-[#8B6F47]/30"
                      />
                    </div>
                  )}

                  {/* Ritual Date */}
                  {spell.ritualDate && (
                    <div className="flex items-center gap-2 text-sm">
                      <GiMoonOrbit className="h-4 w-4 text-[#CC8800]" />
                      <span className="font-['Crimson_Text'] text-[#4A4A4A]">
                        Ritual Date:{' '}
                        <span className="font-semibold text-[#1A1A1A]">
                          {spell.ritualDate.toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </span>
                    </div>
                  )}

                  {/* Lunar Phase */}
                  {spell.lunarPhase && (
                    <div className="flex items-center gap-2">
                      <Badge className="bg-[#CC8800]/10 text-[#CC8800] border border-[#CC8800]/30 font-['Crimson_Text'] text-xs">
                        🌙 {spell.lunarPhase}
                      </Badge>
                    </div>
                  )}

                  {/* Healer Notes */}
                  {spell.healerNotes && (
                    <div className="rounded-md bg-[#E8DCC0] border border-[#8B6F47]/20 p-3">
                      <p className="font-['Crimson_Text'] text-xs text-[#4A4A4A] italic">
                        <strong className="text-[#1A1A1A] not-italic">Healer&apos;s Notes:</strong>{' '}
                        {spell.healerNotes}
                      </p>
                    </div>
                  )}

                  {/* Requested Date */}
                  <div className="pt-2 border-t border-[#8B6F47]/20 font-['Crimson_Text'] text-xs text-[#4A4A4A]">
                    Requested {spell.requestedDate.toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="border-2 border-[#8B6F47]/30 bg-[#F4E8D0]/95">
          <CardContent className="py-12 text-center">
            <GiSpellBook className="h-16 w-16 mx-auto mb-4 text-[#8B6F47]/40" />
            <p className="font-['MedievalSharp'] text-xl text-[#1A1A1A] mb-2">
              No spells found
            </p>
            <p className="font-['Crimson_Text'] text-[#4A4A4A] mb-6">
              Try adjusting your filters or request a new spell to begin your spiritual journey.
            </p>
            <Button 
              onClick={() => {
                setStatusFilter('all');
                setTypeFilter('all');
              }}
              className="bg-[#8B6F47] hover:bg-[#8B6F47]/80 text-[#F4E8D0] font-['Crimson_Text']"
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Results Count */}
      <div className="text-center font-['Crimson_Text'] text-sm text-[#C0C0C0]">
        Showing {filteredSpells.length} of {initialSpells.length} spell{initialSpells.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
