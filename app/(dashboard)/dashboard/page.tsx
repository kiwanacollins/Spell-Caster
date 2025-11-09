import { getCurrentUser } from "@/lib/auth";
import { getDefaultQuickStats } from "@/lib/utils/quick-stats";
import { getSampleActivityFeed } from "@/lib/utils/activity-feed";
import { getSampleCalendarEvents } from "@/lib/utils/spiritual-calendar";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { EnergyReadingWidget } from "@/components/energy-reading-widget";
import { QuickStatsCards } from "@/components/quick-stats-cards";
import { RecentActivityFeed } from "@/components/recent-activity-feed";
import { QuickActionButtons } from "@/components/quick-action-buttons";
import { SpiritualCalendar } from "@/components/spiritual-calendar";
import { WelcomeSection } from "@/components/dashboard/welcome-section";
import { 
  GiPentacle,
  GiProgression,
  GiMoon
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
  
  // Get activity feed data once (server-side)
  const activities = getSampleActivityFeed();
  
  // Get calendar events data (server-side)
  const calendarEvents = getSampleCalendarEvents();

  return (
    <div className="min-h-screen p-4 md:p-8 bg-linear-to-b from-[#2C2416] to-[#1A1A1A]">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* NEW: Welcome & Personal Touch Section - Replaces old personalized welcome */}
        <WelcomeSection 
          userName={user.name || "Seeker"}
          userAvatar={user.image}
          userInitials={user.name?.substring(0, 2).toUpperCase() || "SK"}
          greeting={greeting}
        />

        {/* Energy Reading Widget - Reusable Component */}
        <EnergyReadingWidget
          energyLevel={energyAlignment}
          showMoonPhase
          showChakra
          moonPhase="Waxing Crescent"
          chakraStatus="Harmonious"
          animateOnMount
          size="md"
        />

        {/* Quick Stats Cards Grid */}
        <QuickStatsCards
          stats={getDefaultQuickStats(0, 0, 0, spiritualPoints, currentLevel)}
          columns={4}
          enableHover
          animateOnMount
        />

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
            <QuickActionButtons layout="row" variant="default" />
          </CardContent>
        </Card>

        {/* Recent Activity Feed and Spiritual Level Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity Feed - Using New Component */}
          <RecentActivityFeed 
            activities={activities}
            maxHeight="h-96"
            showHeader
          />

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

        {/* Spiritual Calendar with Lunar Phases */}
        <SpiritualCalendar 
          events={calendarEvents}
          showLunarPhases
          showEventDetails
        />

        {/* Today's Mystical Insight Alert */}
        <Alert className="border-4 border-[#CC8800] bg-linear-to-br from-[#1A1A1A] to-[#2C2416] shadow-[0_8px_20px_rgba(0,0,0,0.5)]">
          <GiMoon className="h-6 w-6 text-[#C0C0C0]" />
          <AlertTitle className="font-['MedievalSharp'] text-xl text-[#F4E8D0]">
            Today&apos;s Mystical Insight
          </AlertTitle>
          <AlertDescription className="font-['Crimson_Text'] text-base text-[#C0C0C0] mt-2">
            The universe whispers: &ldquo;Your intentions are powerful. Channel your energy toward what truly matters, and watch the cosmos align in your favor.&rdquo;
          </AlertDescription>
        </Alert>

      </div>
    </div>
  );
}
