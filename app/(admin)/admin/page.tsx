import { getCurrentUser, isAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  getAdminMetrics,
  getActivityFeed,
  getQuickStats,
  getRevenueBreakdown,
  getPendingRequests,
} from "@/lib/admin/dashboard-data";
import { AdminQuickStats } from "@/components/admin/admin-quick-stats";
import { AdminActivityFeed } from "@/components/admin/admin-activity-feed";
import { AdminRevenueBreakdown } from "@/components/admin/admin-revenue-breakdown";
import { AdminPendingRequests } from "@/components/admin/admin-pending-requests";

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const userIsAdmin = await isAdmin();

  if (!userIsAdmin) {
    redirect("/dashboard");
  }

  // Fetch all dashboard data in parallel
  const [_metrics, activityFeed, quickStats, revenueBreakdown, pendingRequests] =
    await Promise.all([
      getAdminMetrics(),
      getActivityFeed(10),
      getQuickStats(),
      getRevenueBreakdown(),
      getPendingRequests(10),
    ]);

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="space-y-8">
        {/* Ancient parchment header */}
        <div className="bg-[#F4E8D0] border-4 border-[#8B6F47] rounded-sm p-6 md:p-8 relative">
          {/* Sacred admin symbol */}
          <div className="absolute top-3 right-3 md:top-4 md:right-4 w-10 h-10 md:w-12 md:h-12">
            <svg viewBox="0 0 100 100" className="text-[#B8860B]">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path d="M50 15 L65 45 L95 45 L70 65 L80 95 L50 75 L20 95 L30 65 L5 45 L35 45 Z" fill="currentColor" />
            </svg>
          </div>

          <h1 className="text-3xl md:text-4xl font-['MedievalSharp'] text-[#1A1A1A] mb-2">
            Admin Portal
          </h1>
          <p className="text-[#4A4A4A] font-['Crimson_Text'] text-lg">
            Guardian of the Sacred Temple
          </p>
        </div>

        {/* Quick Stats */}
        <AdminQuickStats stats={quickStats} />

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Activity Feed */}
          <div className="lg:col-span-2">
            <AdminActivityFeed activities={activityFeed} />
          </div>

          {/* Right column - Pending Requests */}
          <div>
            <AdminPendingRequests requests={pendingRequests} />
          </div>
        </div>

        {/* Revenue Breakdown */}
        <AdminRevenueBreakdown breakdown={revenueBreakdown} />

        {/* Quick action links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <Link href="/admin/users" className="group">
            <div className="bg-[#F4E8D0] border-2 border-[#8B6F47] rounded-sm p-4 md:p-6 hover:border-[#CC8800] transition-colors cursor-pointer h-full">
              <h3 className="text-lg md:text-xl font-['MedievalSharp'] text-[#1A1A1A] mb-2 group-hover:text-[#CC8800]">
                Manage Users
              </h3>
              <p className="text-sm md:text-base text-[#4A4A4A] font-['Crimson_Text']">
                Manage users and assign admin roles
              </p>
            </div>
          </Link>

          <Link href="/admin/invites" className="group">
            <div className="bg-[#F4E8D0] border-2 border-[#8B6F47] rounded-sm p-6 hover:border-[#CC8800] transition-colors cursor-pointer h-full">
              <h3 className="text-xl font-['MedievalSharp'] text-[#1A1A1A] mb-2 group-hover:text-[#CC8800]">
                Admin Invites
              </h3>
              <p className="text-[#4A4A4A] font-['Crimson_Text']">
                Send invitations to new admins
              </p>
            </div>
          </Link>

          <Link href="/admin/requests" className="group">
            <div className="bg-[#F4E8D0] border-2 border-[#8B6F47] rounded-sm p-6 hover:border-[#CC8800] transition-colors cursor-pointer h-full">
              <h3 className="text-xl font-['MedievalSharp'] text-[#1A1A1A] mb-2 group-hover:text-[#CC8800]">
                Manage Spell Queue
              </h3>
              <p className="text-[#4A4A4A] font-['Crimson_Text']">
                Review and process spell requests
              </p>
            </div>
          </Link>

          <div className="bg-[#F4E8D0] border-2 border-[#8B6F47] rounded-sm p-6 opacity-50">
            <h3 className="text-xl font-['MedievalSharp'] text-[#1A1A1A] mb-2">
              Multi-Channel Inbox
            </h3>
            <p className="text-[#4A4A4A] font-['Crimson_Text']">
              WhatsApp, Messenger & In-app messages
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}