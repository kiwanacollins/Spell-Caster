import { getCurrentUser, isAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { QuickActionButtons } from "@/components/quick-action-buttons";
import { WelcomeSection } from "@/components/dashboard/welcome-section";
import { SacredOfferingsSection } from "@/components/dashboard/sacred-offerings";
import { VideoTestimonialsSection } from "@/components/dashboard/video-testimonials-section";
import { ContactSupportSection } from "@/components/dashboard/contact-support";
import { TrustAuthenticitySection } from "@/components/dashboard/trust-authenticity";
import { 
  GiPentacle,
  GiMoon
} from "react-icons/gi";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/login");
  }

  // Get admin status to display role badge
  const userIsAdmin = await isAdmin();

  // Get current time for greeting
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good Morning" : currentHour < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="min-h-screen p-4 md:p-8 bg-linear-to-b from-[#2C2416] to-[#1A1A1A]">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* NEW: Welcome & Personal Touch Section - Replaces old personalized welcome */}
        <WelcomeSection 
          userName={user.name || "Seeker"}
          userAvatar={user.image || undefined}
          userInitials={user.name?.substring(0, 2).toUpperCase() || "SK"}
          greeting={greeting}
          userRole={userIsAdmin ? "admin" : "user"}
        />

        {/* NEW: Sacred Offerings Section - Service Summary with Categories */}
        <SacredOfferingsSection />

        {/* NEW: Video Testimonials Section - Client Success Stories */}
        <VideoTestimonialsSection />

        {/* NEW: Contact & Support Section - Healer Connection */}
        <ContactSupportSection 
          userName={user.name || "Seeker"}
          isAvailable={true}
        />

        {/* NEW: Trust & Authenticity Section - Credibility & Safety */}
        <TrustAuthenticitySection />

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
