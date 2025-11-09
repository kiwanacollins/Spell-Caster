'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GiCrystalBall } from "react-icons/gi";

// Mystical quotes to rotate
const spiritualQuotes = [
  "Magic is simply the art of focusing intention. Let us guide your transformation.",
  "The universe responds to your energy. What you seek, seeks you.",
  "Your desires are whispers from the divine. Trust the process.",
  "In the stillness, all answers reveal themselves.",
  "The cosmos works through you, not for you. Align and thrive.",
];

// Get selected quote based on day (pure function, called outside render)
function getSelectedQuote(): string {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return spiritualQuotes[dayOfYear % spiritualQuotes.length];
}

interface WelcomeSectionProps {
  userName?: string;
  userAvatar?: string;
  userInitials?: string;
  greeting?: string;
}

/**
 * Welcome & Personal Touch Section Component
 * Displays personalized greeting, mystical subheader, spiritual quote, and user message
 * 
 * Subtasks:
 * 4.2.1.1 - Welcome header with personalized greeting
 * 4.2.1.2 - Mystical subheader
 * 4.2.1.3 - Spiritual quote using shadcn Alert
 * 4.2.1.4 - User's personal message using shadcn Card
 */
export function WelcomeSection({
  userName = "Seeker",
  userAvatar,
  userInitials = "SK",
  greeting,
}: WelcomeSectionProps) {
  // Calculate greeting if not provided
  const currentHour = new Date().getHours();
  const calculatedGreeting = greeting || (
    currentHour < 12 ? "Good Morning" : currentHour < 18 ? "Good Afternoon" : "Good Evening"
  );

  const selectedQuote = getSelectedQuote();

  return (
    <div className="space-y-6">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .welcome-container > * {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .welcome-container > *:nth-child(1) { animation-delay: 0.1s; }
        .welcome-container > *:nth-child(2) { animation-delay: 0.2s; }
        .welcome-container > *:nth-child(3) { animation-delay: 0.3s; }
      `}</style>

      <div className="welcome-container space-y-6">
      {/* 4.2.1.1 - Welcome Header with Personalized Greeting */}
      <div>
        <Alert className="border-4 border-[#8B6F47] bg-linear-to-br from-[#F4E8D0] to-[#E8DCC0] shadow-[0_8px_20px_rgba(0,0,0,0.4)] overflow-hidden relative">
          {/* Decorative corner element */}
          <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
            <GiCrystalBall className="w-full h-full text-[#8B6F47]" />
          </div>

          <GiCrystalBall className="h-6 w-6 text-[#B8860B] drop-shadow-[0_0_8px_rgba(184,134,11,0.6)] relative z-10" />
          
          <div className="relative z-10">
            <AlertTitle className="font-['MedievalSharp'] text-3xl text-[#1A1A1A] mb-1">
              {calculatedGreeting}, {userName} ✨
            </AlertTitle>

            {/* 4.2.1.2 - Mystical Subheader */}
            <AlertDescription className="font-['Crimson_Text'] text-base text-[#4A4A4A] leading-relaxed">
              Step into your sacred space — where your desires manifest and your energy aligns
            </AlertDescription>
          </div>
        </Alert>
      </div>

      {/* 4.2.1.3 - Spiritual Quote using shadcn Alert */}
      <div>
        <Alert className="border-4 border-[#CC8800] bg-linear-to-br from-[#1A1A1A] to-[#2C2416] shadow-[0_8px_20px_rgba(0,0,0,0.5)] relative overflow-hidden">
          {/* Decorative mystical elements */}
          <div className="absolute -top-8 -right-8 w-32 h-32 opacity-5 rounded-full bg-[#CC8800]" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 opacity-5 rounded-full bg-[#B8860B]" />

          <div className="absolute top-4 left-4 text-3xl opacity-20">✦</div>
          <div className="absolute bottom-4 right-4 text-3xl opacity-20">✦</div>

          <div className="relative z-10">
            <AlertTitle className="font-['MedievalSharp'] text-lg text-[#C0C0C0] mb-2">
              💫 Mystical Wisdom
            </AlertTitle>
            <AlertDescription className="font-['IM_Fell_English'] text-base text-[#F4E8D0] italic leading-relaxed">
              &ldquo;{selectedQuote}&rdquo;
            </AlertDescription>
          </div>
        </Alert>
      </div>

      {/* 4.2.1.4 - User's Personal Message using shadcn Card */}
      <div>
        <Card className="border-4 border-[#8B6F47] bg-[#F4E8D0] shadow-[0_6px_16px_rgba(0,0,0,0.3)] overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border-2 border-[#8B6F47]">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback className="bg-[#8B6F47] text-[#F4E8D0] font-['MedievalSharp']">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="font-['Cinzel'] text-lg text-[#1A1A1A]">
                  Message from the Healer
                </CardTitle>
                <CardDescription className="font-['Crimson_Text'] text-[#4A4A4A]">
                  Your spiritual guide
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {/* Personal message */}
              <div className="bg-[#E8DCC0] rounded-lg p-4 border-2 border-[#8B6F47]/30">
                <p className="font-['Crimson_Text'] text-[#1A1A1A] leading-relaxed">
                  Welcome to your sacred sanctuary. I am here to guide you through life&apos;s mystical journey, helping you manifest your deepest desires and align your spirit with the universe&apos;s infinite power.
                </p>
              </div>

              {/* Availability status */}
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-[#2C5530] animate-pulse" />
                <span className="font-['Crimson_Text'] text-[#4A4A4A]">
                  Available for consultations
                </span>
              </div>

              {/* Quick stats about the healer */}
              <div className="grid grid-cols-3 gap-3 pt-2 border-t-2 border-[#8B6F47]/20">
                <div className="text-center">
                  <p className="font-['MedievalSharp'] text-[#8B6F47] text-lg">15+</p>
                  <p className="font-['Crimson_Text'] text-[#4A4A4A] text-xs">Years Experience</p>
                </div>
                <div className="text-center">
                  <p className="font-['MedievalSharp'] text-[#8B6F47] text-lg">97%</p>
                  <p className="font-['Crimson_Text'] text-[#4A4A4A] text-xs">Success Rate</p>
                </div>
                <div className="text-center">
                  <p className="font-['MedievalSharp'] text-[#8B6F47] text-lg">5000+</p>
                  <p className="font-['Crimson_Text'] text-[#4A4A4A] text-xs">Clients Blessed</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  );
}
