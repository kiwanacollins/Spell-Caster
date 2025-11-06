import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
  GiSpellBook, 
  GiCalendar, 
  GiChatBubble, 
  GiCrystalBall,
  GiMoon,
  GiSun,
  GiProgression,
  GiScrollUnfurled,
  GiSparkles,
  GiCandles,
  GiPentacle
} from "react-icons/gi";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/login");
  }

  // Get current time for greeting
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good Morning" : currentHour < 18 ? "Good Afternoon" : "Good Evening";
  
  // Sample data - Replace with real data from database
  const energyAlignment = 75; // 0-100%
  const spiritualPoints = 250;
  const currentLevel = "Seeker";
  const nextLevel = "Adept";
  const pointsToNextLevel = 750;

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-b from-[#2C2416] to-[#1A1A1A]">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Personalized Welcome Alert with Ancient Styling */}
        <Alert className="border-4 border-[#8B6F47] bg-gradient-to-br from-[#F4E8D0] to-[#E8DCC0] shadow-[0_8px_20px_rgba(0,0,0,0.4)]">
          <GiCrystalBall className="h-6 w-6 text-[#B8860B] drop-shadow-[0_0_8px_rgba(184,134,11,0.6)]" />
          <AlertTitle className="font-['MedievalSharp'] text-2xl text-[#1A1A1A] mb-2">
            {greeting}, {user.name || "Seeker"}
          </AlertTitle>
          <AlertDescription className="font-['Crimson_Text'] text-base text-[#4A4A4A]">
            The cosmic energies align in your favor today. Your spiritual journey continues to unfold with divine guidance.
          </AlertDescription>
        </Alert>

        {/* Energy Reading Widget */}
        <Card className="border-4 border-[#8B6F47] bg-[#F4E8D0] shadow-[0_6px_16px_rgba(0,0,0,0.3)] overflow-hidden relative">
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#B8860B] opacity-60" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#B8860B] opacity-60" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#B8860B] opacity-60" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#B8860B] opacity-60" />
          
          <CardHeader>
            <CardTitle className="flex items-center justify-between font-['MedievalSharp'] text-[#1A1A1A]">
              <span className="flex items-center gap-2">
                <GiSparkles className="h-6 w-6 text-[#CC8800]" />
                Energy Alignment
              </span>
              <Badge className="bg-[#B8860B] text-[#1A1A1A] font-['Crimson_Text'] border-2 border-[#8B6F47]">
                {energyAlignment}%
              </Badge>
            </CardTitle>
            <CardDescription className="font-['Crimson_Text'] text-[#4A4A4A]">
              Your spiritual energy flows with the universe
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Progress 
                value={energyAlignment} 
                className="h-4 bg-[#8B6F47]/30 border-2 border-[#8B6F47]" 
              />
              <div className="flex justify-between mt-2">
                <span className="text-xs font-['Crimson_Text'] text-[#4A4A4A]">Misaligned</span>
                <span className="text-xs font-['Crimson_Text'] text-[#4A4A4A]">Perfect Harmony</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="text-center">
                <GiMoon className="h-8 w-8 text-[#C0C0C0] mx-auto mb-1" />
                <p className="text-xs font-['Crimson_Text'] text-[#4A4A4A]">Moon Phase</p>
                <p className="text-sm font-semibold font-['Crimson_Text'] text-[#1A1A1A]">Waxing Crescent</p>
              </div>
              <div className="text-center">
                <GiSun className="h-8 w-8 text-[#CC8800] mx-auto mb-1" />
                <p className="text-xs font-['Crimson_Text'] text-[#4A4A4A]">Chakra Balance</p>
                <p className="text-sm font-semibold font-['Crimson_Text'] text-[#1A1A1A]">Harmonious</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Active Spells */}
          <Card className="border-4 border-[#8B6F47] bg-[#F4E8D0] shadow-[4px_4px_12px_rgba(0,0,0,0.3)] transition-all hover:shadow-[6px_6px_16px_rgba(0,0,0,0.4)] hover:-translate-y-1">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 font-['MedievalSharp'] text-lg text-[#1A1A1A]">
                <GiSpellBook className="h-5 w-5 text-[#8B6F47]" />
                Active Spells
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-[#CC8800] font-['Crimson_Text']">0</p>
              <p className="text-xs text-[#4A4A4A] font-['Crimson_Text'] mt-1">
                Currently manifesting
              </p>
            </CardContent>
          </Card>

          {/* Consultations */}
          <Card className="border-4 border-[#8B6F47] bg-[#F4E8D0] shadow-[4px_4px_12px_rgba(0,0,0,0.3)] transition-all hover:shadow-[6px_6px_16px_rgba(0,0,0,0.4)] hover:-translate-y-1">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 font-['MedievalSharp'] text-lg text-[#1A1A1A]">
                <GiCalendar className="h-5 w-5 text-[#8B6F47]" />
                Consultations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-[#CC8800] font-['Crimson_Text']">0</p>
              <p className="text-xs text-[#4A4A4A] font-['Crimson_Text'] mt-1">
                Scheduled sessions
              </p>
            </CardContent>
          </Card>

          {/* Messages */}
          <Card className="border-4 border-[#8B6F47] bg-[#F4E8D0] shadow-[4px_4px_12px_rgba(0,0,0,0.3)] transition-all hover:shadow-[6px_6px_16px_rgba(0,0,0,0.4)] hover:-translate-y-1">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 font-['MedievalSharp'] text-lg text-[#1A1A1A]">
                <GiChatBubble className="h-5 w-5 text-[#8B6F47]" />
                Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-[#CC8800] font-['Crimson_Text']">0</p>
              <p className="text-xs text-[#4A4A4A] font-['Crimson_Text'] mt-1">
                Unread messages
              </p>
            </CardContent>
          </Card>

          {/* Spiritual Points */}
          <Card className="border-4 border-[#8B6F47] bg-[#F4E8D0] shadow-[4px_4px_12px_rgba(0,0,0,0.3)] transition-all hover:shadow-[6px_6px_16px_rgba(0,0,0,0.4)] hover:-translate-y-1">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 font-['MedievalSharp'] text-lg text-[#1A1A1A]">
                <GiProgression className="h-5 w-5 text-[#8B6F47]" />
                Spirit Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-[#CC8800] font-['Crimson_Text']">{spiritualPoints}</p>
              <p className="text-xs text-[#4A4A4A] font-['Crimson_Text'] mt-1">
                Level: {currentLevel}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Section */}
        <Card className="border-4 border-[#8B6F47] bg-[#F4E8D0] shadow-[0_6px_16px_rgba(0,0,0,0.3)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-['MedievalSharp'] text-[#1A1A1A]">
              <GiPentacle className="h-6 w-6 text-[#B8860B]" />
              Quick Actions
            </CardTitle>
            <CardDescription className="font-['Crimson_Text'] text-[#4A4A4A]">
              Begin your spiritual practice
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/services">
                <Button className="w-full h-auto py-4 flex flex-col items-center gap-2 bg-[#1A1A1A] hover:bg-[#8B6F47] border-2 border-[#8B6F47] text-[#F4E8D0] font-['Crimson_Text'] transition-all shadow-[2px_2px_8px_rgba(0,0,0,0.3)] hover:shadow-[4px_4px_12px_rgba(0,0,0,0.4)]">
                  <GiSpellBook className="h-8 w-8" />
                  <span className="text-sm">Request New Spell</span>
                </Button>
              </Link>
              
              <Link href="/dashboard/consultations">
                <Button className="w-full h-auto py-4 flex flex-col items-center gap-2 bg-[#1A1A1A] hover:bg-[#8B6F47] border-2 border-[#8B6F47] text-[#F4E8D0] font-['Crimson_Text'] transition-all shadow-[2px_2px_8px_rgba(0,0,0,0.3)] hover:shadow-[4px_4px_12px_rgba(0,0,0,0.4)]">
                  <GiCalendar className="h-8 w-8" />
                  <span className="text-sm">Book Consultation</span>
                </Button>
              </Link>
              
              <Link href="/dashboard/messages">
                <Button className="w-full h-auto py-4 flex flex-col items-center gap-2 bg-[#1A1A1A] hover:bg-[#8B6F47] border-2 border-[#8B6F47] text-[#F4E8D0] font-['Crimson_Text'] transition-all shadow-[2px_2px_8px_rgba(0,0,0,0.3)] hover:shadow-[4px_4px_12px_rgba(0,0,0,0.4)]">
                  <GiChatBubble className="h-8 w-8" />
                  <span className="text-sm">Message Healer</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-4 border-[#8B6F47] bg-[#F4E8D0] shadow-[0_6px_16px_rgba(0,0,0,0.3)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-['MedievalSharp'] text-[#1A1A1A]">
                <GiScrollUnfurled className="h-6 w-6 text-[#8B6F47]" />
                Recent Activity
              </CardTitle>
              <CardDescription className="font-['Crimson_Text'] text-[#4A4A4A]">
                Your spiritual journey timeline
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-[#E8DCC0] rounded border-2 border-[#8B6F47]/30">
                  <GiCandles className="h-5 w-5 text-[#CC8800] mt-1 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold font-['Crimson_Text'] text-[#1A1A1A]">
                      Welcome to your sacred space
                    </p>
                    <p className="text-xs font-['Crimson_Text'] text-[#4A4A4A] mt-1">
                      Your spiritual journey begins now. Explore our services to manifest your desires.
                    </p>
                    <p className="text-xs font-['Crimson_Text'] text-[#8B6F47] mt-2">
                      Just now
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Spiritual Level Progress */}
          <Card className="border-4 border-[#8B6F47] bg-[#F4E8D0] shadow-[0_6px_16px_rgba(0,0,0,0.3)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-['MedievalSharp'] text-[#1A1A1A]">
                <GiProgression className="h-6 w-6 text-[#8B6F47]" />
                Spiritual Level
              </CardTitle>
              <CardDescription className="font-['Crimson_Text'] text-[#4A4A4A]">
                Your path to enlightenment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <Badge className="bg-[#1A1A1A] text-[#F4E8D0] font-['Crimson_Text'] text-sm px-3 py-1 border-2 border-[#8B6F47]">
                  {currentLevel}
                </Badge>
                <span className="text-sm font-['Crimson_Text'] text-[#4A4A4A]">
                  {spiritualPoints} / {pointsToNextLevel} SP
                </span>
              </div>
              <Progress 
                value={(spiritualPoints / pointsToNextLevel) * 100} 
                className="h-3 bg-[#8B6F47]/30 border-2 border-[#8B6F47]"
              />
              <p className="text-xs font-['Crimson_Text'] text-[#4A4A4A] text-center">
                {pointsToNextLevel - spiritualPoints} points until {nextLevel}
              </p>
              <div className="bg-[#E8DCC0] rounded p-3 border-2 border-[#8B6F47]/30">
                <p className="text-xs font-['Crimson_Text'] text-[#4A4A4A] mb-2">
                  <strong className="text-[#1A1A1A]">Current Perks:</strong>
                </p>
                <ul className="text-xs font-['Crimson_Text'] text-[#4A4A4A] space-y-1 ml-4">
                  <li>• Access to basic spells and readings</li>
                  <li>• Message healer through all channels</li>
                  <li>• 10% first-time client discount</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Mystical Insight Alert */}
        <Alert className="border-4 border-[#CC8800] bg-gradient-to-br from-[#1A1A1A] to-[#2C2416] shadow-[0_8px_20px_rgba(0,0,0,0.5)]">
          <GiMoon className="h-6 w-6 text-[#C0C0C0]" />
          <AlertTitle className="font-['MedievalSharp'] text-xl text-[#F4E8D0]">
            Today's Mystical Insight
          </AlertTitle>
          <AlertDescription className="font-['Crimson_Text'] text-base text-[#C0C0C0] mt-2">
            The universe whispers: "Your intentions are powerful. Channel your energy toward what truly matters, and watch the cosmos align in your favor."
          </AlertDescription>
        </Alert>

      </div>
    </div>
  );
}
