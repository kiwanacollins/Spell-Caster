'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GiMoon, GiSunSpot, GiStaryu } from "react-icons/gi";

/**
 * Mystical Insights / Guidance Section Component
 * Displays daily/weekly spiritual guidance with moon phases and astrology
 * 
 * Subtasks:
 * 4.2.4.1 - Daily/weekly guidance card using shadcn Card with mystical background
 * 4.2.4.2 - Moon phase indicator with current phase icon (🌒 🌓 🌔 🌕)
 * 4.2.4.3 - Personalized spiritual message
 * 4.2.4.4 - Ritual suggestion
 * 4.2.4.5 - Astrology insights tied to spell timing
 */
export function MysticalInsightsSection() {
  // Get current date to provide consistent daily guidance
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);

  // Moon phases data (lunar cycle is ~29.5 days)
  const moonPhases = [
    { name: 'New Moon', icon: '🌑', emoji: '🌑', energy: 'New Beginnings', color: 'bg-[#4A4A4A]' },
    { name: 'Waxing Crescent', icon: '🌒', emoji: '🌒', energy: 'Growth', color: 'bg-[#6B5B3A]' },
    { name: 'First Quarter', icon: '🌓', emoji: '🌓', energy: 'Action', color: 'bg-[#8B6F47]' },
    { name: 'Waxing Gibbous', icon: '🌔', emoji: '🌔', energy: 'Refinement', color: 'bg-[#A0820E]' },
    { name: 'Full Moon', icon: '🌕', emoji: '🌕', energy: 'Manifestation', color: 'bg-[#B8860B]' },
    { name: 'Waning Gibbous', icon: '🌖', emoji: '🌖', energy: 'Gratitude', color: 'bg-[#A0820E]' },
    { name: 'Last Quarter', icon: '🌗', emoji: '🌗', energy: 'Release', color: 'bg-[#8B6F47]' },
    { name: 'Waning Crescent', icon: '🌘', emoji: '🌘', energy: 'Rest', color: 'bg-[#6B5B3A]' },
  ];

  const currentMoonPhase = moonPhases[dayOfYear % moonPhases.length];

  // Astrology signs
  const astrologySigns = [
    { name: 'Aries', symbol: '♈', element: 'Fire', ruling: 'Mars', color: 'text-red-600' },
    { name: 'Taurus', symbol: '♉', element: 'Earth', ruling: 'Venus', color: 'text-green-600' },
    { name: 'Gemini', symbol: '♊', element: 'Air', ruling: 'Mercury', color: 'text-yellow-600' },
    { name: 'Cancer', symbol: '♋', element: 'Water', ruling: 'Moon', color: 'text-blue-600' },
    { name: 'Leo', symbol: '♌', element: 'Fire', ruling: 'Sun', color: 'text-orange-600' },
    { name: 'Virgo', symbol: '♍', element: 'Earth', ruling: 'Mercury', color: 'text-green-600' },
    { name: 'Libra', symbol: '♎', element: 'Air', ruling: 'Venus', color: 'text-pink-600' },
    { name: 'Scorpio', symbol: '♏', element: 'Water', ruling: 'Pluto', color: 'text-red-900' },
    { name: 'Sagittarius', symbol: '♐', element: 'Fire', ruling: 'Jupiter', color: 'text-purple-600' },
    { name: 'Capricorn', symbol: '♑', element: 'Earth', ruling: 'Saturn', color: 'text-slate-600' },
    { name: 'Aquarius', symbol: '♒', element: 'Air', ruling: 'Uranus', color: 'text-cyan-600' },
    { name: 'Pisces', symbol: '♓', element: 'Water', ruling: 'Neptune', color: 'text-indigo-600' },
  ];

  const currentSign = astrologySigns[dayOfYear % astrologySigns.length];

  // Spiritual messages (rotating daily)
  const spiritualMessages = [
    "The cosmic energies align in your favor. Trust your intuition and move forward with confidence.",
    "This is a powerful time for manifestation. Channel your intentions with focused energy.",
    "The universe whispers: release what no longer serves you. Make space for new blessings.",
    "Your spirit guides are close. Listen to the quiet voice within and follow its wisdom.",
    "The elements are in harmony. This is an auspicious time for ritual work and spellcasting.",
    "Protection surrounds you. Move through the day knowing the divine has your back.",
    "Abundance flows to those who are open to receive. Align yourself with prosperity consciousness.",
    "This moment holds transformative potential. Embrace change with grace and courage.",
  ];

  const currentMessage = spiritualMessages[dayOfYear % spiritualMessages.length];

  // Ritual suggestions
  const ritualSuggestions = [
    "Light a white candle and meditate on your highest intentions. Allow the flame to carry your desires to the universe.",
    "Create a small altar with crystals aligned to today's energy. Spend time grounding yourself in gratitude.",
    "Perform a simple cleansing ritual with sage or palo santo. Purify your space and spirit.",
    "Write down what you wish to manifest. Burn the paper safely to release your intention into the cosmos.",
    "Practice breathwork while visualizing golden light surrounding you. Feel the protection and peace.",
    "Create a tea ritual with herbal infusions. Drink mindfully while setting your intentions for the day.",
    "Walk barefoot on earth if possible. Connect with grounding energy and feel the planet's support.",
    "Journal three things you're grateful for. Gratitude amplifies your vibration and attracts abundance.",
  ];

  const currentRitual = ritualSuggestions[dayOfYear % ritualSuggestions.length];

  // Spell timing recommendations
  const spellTimings = [
    { phase: 'Waxing Moon (Growth)', recommendation: 'Perfect for attraction, love, and prosperity spells. Energy is building toward manifestation.', bestFor: 'Love, Wealth, Business, Binding' },
    { phase: 'Full Moon (Peak Power)', recommendation: 'Most potent time for all spellwork. Maximum energy and clarity. Ideal for major workings.', bestFor: 'All spells, especially Protection & Justice' },
    { phase: 'Waning Moon (Release)', recommendation: 'Excellent for banishing, cleansing, and removal spells. Release negativity and obstacles.', bestFor: 'Cleansing, Banishing, Divorce, Stop Cheating' },
    { phase: 'New Moon (New Beginnings)', recommendation: 'Powerful for fresh starts and new intentions. Begin new projects and relationships.', bestFor: 'New Love, New Business, Fresh Start Spells' },
  ];

  // Find current timing recommendation
  let currentTiming = spellTimings[0];
  if (currentMoonPhase.name.includes('Full')) {
    currentTiming = spellTimings[1];
  } else if (currentMoonPhase.name.includes('Waning')) {
    currentTiming = spellTimings[2];
  } else if (currentMoonPhase.name.includes('New')) {
    currentTiming = spellTimings[3];
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="text-center space-y-2">
        <h2 className="font-['MedievalSharp'] text-3xl text-[#F4E8D0]">✦ Mystical Insights ✦</h2>
        <p className="font-['Crimson_Text'] text-[#C0C0C0] text-lg">
          Daily guidance aligned with cosmic energies
        </p>
      </div>

      {/* Main Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 4.2.4.1 & 4.2.4.2 - Moon Phase Card */}
        <Card className="border-4 border-[#8B6F47] bg-[#F4E8D0] shadow-[0_6px_16px_rgba(0,0,0,0.3)]">
          <CardHeader className="pb-3">
            <CardTitle className="font-['MedievalSharp'] text-xl text-[#1A1A1A] text-center">
              🌙 Current Moon Phase
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Moon Phase Display */}
            <div className="text-center space-y-3">
              <div className="text-6xl">{currentMoonPhase.emoji}</div>
              <h3 className="font-['Cinzel'] text-2xl text-[#8B6F47]">
                {currentMoonPhase.name}
              </h3>
              
              {/* Energy Badge */}
              <div>
                <Badge className={`${currentMoonPhase.color} text-[#F4E8D0] font-['Cinzel'] text-sm px-3 py-1 border border-[#8B6F47]/50`}>
                  {currentMoonPhase.energy} Energy
                </Badge>
              </div>

              {/* Description */}
              <p className="font-['Crimson_Text'] text-[#4A4A4A] text-sm">
                {currentMoonPhase.name === 'Full Moon' && 'Peak cosmic power. Ideal for all manifestation work and major spells.'}
                {currentMoonPhase.name === 'New Moon' && 'Time for new beginnings and setting fresh intentions.'}
                {currentMoonPhase.name.includes('Waxing') && 'Building energy. Perfect for spells of attraction and growth.'}
                {currentMoonPhase.name.includes('Waning') && 'Releasing energy. Ideal for banishing and cleansing work.'}
              </p>
            </div>

            {/* Moon Cycle Progress */}
            <div className="bg-[#E8DCC0] rounded-lg p-3 border-2 border-[#8B6F47]/30">
              <p className="font-['Crimson_Text'] text-[#4A4A4A] text-xs mb-2">
                <strong>Lunar Cycle Position:</strong> {dayOfYear % moonPhases.length} / {moonPhases.length}
              </p>
              <div className="flex gap-1">
                {moonPhases.map((phase, index) => (
                  <div
                    key={index}
                    className={`h-2 flex-1 rounded ${
                      index === dayOfYear % moonPhases.length
                        ? 'bg-[#B8860B]'
                        : 'bg-[#8B6F47]/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Astrology & Element Card */}
        <Card className="border-4 border-[#8B6F47] bg-[#F4E8D0] shadow-[0_6px_16px_rgba(0,0,0,0.3)]">
          <CardHeader className="pb-3">
            <CardTitle className="font-['MedievalSharp'] text-xl text-[#1A1A1A] text-center">
              ✦ Today's Astrology
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Zodiac Sign */}
            <div className="text-center space-y-3">
              <div className="text-5xl">{currentSign.symbol}</div>
              <h3 className="font-['Cinzel'] text-2xl text-[#8B6F47]">
                {currentSign.name}
              </h3>
              
              {/* Element & Ruling Planet */}
              <div className="flex gap-2 justify-center">
                <Badge className="bg-[#2C5530] text-[#F4E8D0] font-['Cinzel'] text-xs px-2 py-1 border border-[#2C5530]/50">
                  {currentSign.element}
                </Badge>
                <Badge className="bg-[#8B0000] text-[#F4E8D0] font-['Cinzel'] text-xs px-2 py-1 border border-[#8B0000]/50">
                  Ruled by {currentSign.ruling}
                </Badge>
              </div>

              {/* Description */}
              <p className="font-['Crimson_Text'] text-[#4A4A4A] text-sm">
                Harness the {currentSign.element} element energy. The {currentSign.ruling} influence brings powerful transformation and alignment.
              </p>
            </div>

            {/* Elements Breakdown */}
            <div className="bg-[#E8DCC0] rounded-lg p-3 border-2 border-[#8B6F47]/30">
              <p className="font-['Crimson_Text'] text-[#4A4A4A] text-xs mb-2">
                <strong>Element Traits:</strong>
              </p>
              <ul className="text-xs font-['Crimson_Text'] text-[#4A4A4A] space-y-1 ml-3">
                {currentSign.element === 'Fire' && (
                  <>
                    <li>• Passionate and energetic</li>
                    <li>• Action-oriented and bold</li>
                    <li>• Ideal for manifestation work</li>
                  </>
                )}
                {currentSign.element === 'Earth' && (
                  <>
                    <li>• Grounded and stable</li>
                    <li>• Material abundance focus</li>
                    <li>• Perfect for prosperity spells</li>
                  </>
                )}
                {currentSign.element === 'Air' && (
                  <>
                    <li>• Intellectual and communicative</li>
                    <li>• Mental clarity and inspiration</li>
                    <li>• Great for knowledge spells</li>
                  </>
                )}
                {currentSign.element === 'Water' && (
                  <>
                    <li>• Emotional and intuitive</li>
                    <li>• Deep spiritual connection</li>
                    <li>• Powerful for love magic</li>
                  </>
                )}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Spiritual Message & Ritual Card */}
      <Card className="border-4 border-[#8B6F47] bg-[#F4E8D0] shadow-[0_6px_16px_rgba(0,0,0,0.3)]">
        <CardHeader className="pb-3">
          <CardTitle className="font-['MedievalSharp'] text-xl text-[#1A1A1A]">
            💫 Daily Spiritual Message
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* 4.2.4.3 - Personalized Spiritual Message */}
          <div className="bg-linear-to-b from-[#E8DCC0] to-[#F4E8D0] rounded-lg p-4 border-2 border-[#8B6F47]/30">
            <p className="font-['IM_Fell_English'] text-[#1A1A1A] italic text-lg leading-relaxed">
              &ldquo;{currentMessage}&rdquo;
            </p>
          </div>

          {/* 4.2.4.4 - Ritual Suggestion */}
          <div className="space-y-2">
            <h4 className="font-['Cinzel'] text-[#8B6F47] text-sm">Recommended Ritual</h4>
            <div className="bg-[#E8DCC0] rounded-lg p-3 border-2 border-[#8B6F47]/30">
              <p className="font-['Crimson_Text'] text-[#4A4A4A] text-sm">
                {currentRitual}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4.2.4.5 - Spell Timing & Astrology Card */}
      <Card className="border-4 border-[#8B6F47] bg-[#F4E8D0] shadow-[0_6px_16px_rgba(0,0,0,0.3)]">
        <CardHeader className="pb-3">
          <CardTitle className="font-['MedievalSharp'] text-xl text-[#1A1A1A]">
            ⏰ Optimal Spell Timing
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Current Timing Recommendation */}
          <div className="space-y-3">
            <div>
              <h4 className="font-['Cinzel'] text-[#8B6F47] text-lg mb-1">
                {currentTiming.phase}
              </h4>
              <p className="font-['Crimson_Text'] text-[#4A4A4A] text-sm mb-3">
                {currentTiming.recommendation}
              </p>
            </div>

            {/* Best For Services */}
            <div className="bg-[#E8DCC0] rounded-lg p-3 border-2 border-[#8B6F47]/30">
              <p className="font-['Crimson_Text'] text-[#4A4A4A] text-xs mb-2">
                <strong>Best for these services:</strong>
              </p>
              <p className="font-['Crimson_Text'] text-[#4A4A4A] text-sm">
                {currentTiming.bestFor}
              </p>
            </div>
          </div>

          {/* Timing Tips */}
          <div className="bg-[#E8DCC0] rounded-lg p-3 border-2 border-[#8B6F47]/30">
            <p className="font-['Crimson_Text'] text-[#4A4A4A] text-xs mb-2">
              <strong>Timing Tips:</strong>
            </p>
            <ul className="text-xs font-['Crimson_Text'] text-[#4A4A4A] space-y-1 ml-3">
              <li>• Morning hours (6-9 AM) are ideal for most spellwork</li>
              <li>• Align your work with this month's lunar phase</li>
              <li>• Consider planetary hours for additional power</li>
              <li>• Always ground your energy before and after rituals</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
