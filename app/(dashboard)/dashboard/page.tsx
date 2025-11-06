import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GiSpellBook, GiCalendar, GiChatBubble, GiCrystalBall } from "react-icons/gi";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="bg-[#F4E8D0] border-4 border-[#8B6F47] rounded-sm p-6 md:p-8">
          <div className="flex items-start gap-4">
            <GiCrystalBall className="h-12 w-12 text-[#B8860B] drop-shadow-[0_0_12px_rgba(184,134,11,0.6)]" />
            <div>
              <h1 className="font-['MedievalSharp'] text-3xl md:text-4xl text-[#1A1A1A] mb-2">
                Welcome Back, {user.name}
              </h1>
              <p className="font-['Crimson_Text'] text-base md:text-lg text-[#4A4A4A]">
                Your spiritual journey continues...
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats Cards - Using shadcn Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Active Spells Card */}
          <Card className="border-4 border-[#8B6F47] bg-[#F4E8D0] shadow-[4px_4px_12px_rgba(0,0,0,0.3)]">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 font-['MedievalSharp'] text-[#1A1A1A]">
                <GiSpellBook className="h-5 w-5 text-[#8B6F47]" />
                Active Spells
              </CardTitle>
              <CardDescription className="font-['Crimson_Text'] text-[#4A4A4A]">
                Currently in progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-[#CC8800] font-['Crimson_Text']">0</p>
              <p className="text-sm text-[#4A4A4A] font-['Crimson_Text'] mt-2">
                No active spells at the moment
              </p>
            </CardContent>
          </Card>

          {/* Upcoming Consultations Card */}
          <Card className="border-4 border-[#8B6F47] bg-[#F4E8D0] shadow-[4px_4px_12px_rgba(0,0,0,0.3)]">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 font-['MedievalSharp'] text-[#1A1A1A]">
                <GiCalendar className="h-5 w-5 text-[#8B6F47]" />
                Upcoming Consultations
              </CardTitle>
              <CardDescription className="font-['Crimson_Text'] text-[#4A4A4A]">
                Scheduled sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-[#CC8800] font-['Crimson_Text']">0</p>
              <p className="text-sm text-[#4A4A4A] font-['Crimson_Text'] mt-2">
                Book your first consultation
              </p>
            </CardContent>
          </Card>

          {/* Unread Messages Card */}
          <Card className="border-4 border-[#8B6F47] bg-[#F4E8D0] shadow-[4px_4px_12px_rgba(0,0,0,0.3)]">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 font-['MedievalSharp'] text-[#1A1A1A]">
                <GiChatBubble className="h-5 w-5 text-[#8B6F47]" />
                Unread Messages
              </CardTitle>
              <CardDescription className="font-['Crimson_Text'] text-[#4A4A4A]">
                Across all channels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-[#CC8800] font-['Crimson_Text']">0</p>
              <p className="text-sm text-[#4A4A4A] font-['Crimson_Text'] mt-2">
                Your inbox is clear
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Coming Soon Notice */}
        <Card className="border-4 border-[#8B6F47] bg-linear-to-b from-[#1A1A1A] to-[#1A1A1A]/80 shadow-[4px_4px_12px_rgba(0,0,0,0.3)]">
          <CardContent className="p-8 text-center">
            <GiCrystalBall className="h-16 w-16 text-[#B8860B] mx-auto mb-4 animate-pulse" />
            <p className="text-[#C0C0C0] font-['Crimson_Text'] text-lg">
              The mystical energies are gathering...
            </p>
            <p className="text-[#4A4A4A] font-['Crimson_Text'] text-sm mt-2">
              Full dashboard features manifesting soon
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
