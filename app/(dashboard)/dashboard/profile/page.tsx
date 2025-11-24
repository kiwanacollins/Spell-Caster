import { getCurrentUser, isAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AiOutlineCheckCircle } from "react-icons/ai";

export const metadata = {
  title: "Profile & Settings | Dashboard - Your Spell Caster",
  description: "View and manage your profile",
};

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const userIsAdmin = await isAdmin();
  const userRole = userIsAdmin ? "admin" : "user";
  const userInitials = user.name?.substring(0, 2).toUpperCase() || "SK";

  return (
    <div className="min-h-screen p-4 md:p-8 bg-linear-to-b from-[#2C2416] to-[#1A1A1A]">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="bg-parchment-light border-4 border-aged-bronze/40 rounded p-8 relative">
          {/* Decorative corner flourishes */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-sacred-gold/60" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-sacred-gold/60" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-sacred-gold/60" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-sacred-gold/60" />

          <h1 className="text-4xl font-medieval text-ink-900 mb-2">
            Profile & Settings
          </h1>
          <p className="text-ink-700 font-serif text-lg">
            View and manage your spiritual profile
          </p>
        </div>

        {/* Profile Information Card */}
        <Card className="border-2 border-aged-bronze/40 bg-parchment-light">
          <CardHeader>
            <CardTitle className="font-medieval">Your Profile</CardTitle>
            <CardDescription className="font-serif">
              Your account information and spiritual identity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar and basic info */}
            <div className="flex items-start gap-6">
              <Avatar className="h-24 w-24 border-2 border-aged-bronze">
                <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
                <AvatarFallback className="bg-aged-bronze text-parchment-light font-medieval text-lg">
                  {userInitials}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4">
                <div>
                  <p className="text-sm text-ink-700 font-serif">Name</p>
                  <p className="text-2xl font-medieval text-ink-900">{user.name || "Not set"}</p>
                </div>

                <div>
                  <p className="text-sm text-ink-700 font-serif">Email</p>
                  <p className="text-lg font-serif text-ink-800">{user.email}</p>
                </div>

                <div className="flex gap-2">
                  <Badge
                    variant={userRole === "admin" ? "destructive" : "secondary"}
                    className={
                      userRole === "admin"
                        ? "bg-blood-moon-red text-parchment-light font-serif"
                        : "bg-aged-bronze/30 text-ink-900 font-serif"
                    }
                  >
                    {userRole === "admin" ? "Admin" : "User"}
                  </Badge>

                  {user.emailVerified && (
                    <Badge className="bg-enchanted-emerald text-parchment-light font-serif flex items-center gap-1">
                      <AiOutlineCheckCircle className="w-3 h-3" />
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Account details */}
            <div className="border-t border-aged-bronze/30 pt-6">
              <h3 className="font-medieval text-ink-900 mb-4">Account Details</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-aged-bronze/10 rounded p-4">
                  <p className="text-xs text-ink-700 font-serif uppercase tracking-wide">
                    Member Since
                  </p>
                  <p className="font-serif text-ink-900 mt-1">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Unknown"}
                  </p>
                </div>

                <div className="bg-aged-bronze/10 rounded p-4">
                  <p className="text-xs text-ink-700 font-serif uppercase tracking-wide">
                    Account Status
                  </p>
                  <p className="font-serif text-ink-900 mt-1">
                    {(user as Record<string, unknown>)?.isSuspended ? (
                      <span className="text-blood-moon-red">Suspended</span>
                    ) : (
                      <span className="text-enchanted-emerald">Active</span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Admin Section */}
            {userIsAdmin && (
              <div className="border-t border-aged-bronze/30 pt-6">
                <h3 className="font-medieval text-blood-moon-red mb-4">
                  Admin Privileges
                </h3>

                <Alert className="bg-blood-moon-red/10 border-blood-moon-red/50 mb-4">
                  <AlertDescription className="text-blood-moon-red font-serif">
                    You have administrative access to the admin dashboard. Use these privileges responsibly.
                  </AlertDescription>
                </Alert>

                <Link href="/admin">
                  <Button className="bg-blood-moon-red hover:bg-blood-moon-red/90 text-parchment-light font-serif">
                    Go to Admin Dashboard
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Spiritual Profile Card (Optional - for future implementation) */}
        <Card className="border-2 border-aged-bronze/40 bg-parchment-light">
          <CardHeader>
            <CardTitle className="font-medieval">Spiritual Profile</CardTitle>
            <CardDescription className="font-serif">
              Your spiritual journey and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-8 text-ink-600">
              <p className="font-serif">
                Your spiritual profile data will appear here as you engage with services.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security Card */}
        <Card className="border-2 border-aged-bronze/40 bg-parchment-light">
          <CardHeader>
            <CardTitle className="font-medieval">Privacy & Security</CardTitle>
            <CardDescription className="font-serif">
              Manage your account security
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full border-aged-bronze/40">
              Change Password
            </Button>
            <Button variant="outline" className="w-full border-aged-bronze/40">
              Manage Sessions
            </Button>
            <Button variant="outline" className="w-full border-aged-bronze/40">
              View Login History
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
