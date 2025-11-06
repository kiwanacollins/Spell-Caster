import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/auth/dashboard-header";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard header with logout button */}
        <DashboardHeader userName={user.name} />

        {/* Placeholder for dashboard content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick stats cards - to be implemented in task 4.4 */}
          <div className="bg-[#F4E8D0] border-2 border-[#8B6F47] rounded-sm p-6">
            <h3 className="text-xl font-['MedievalSharp'] text-[#1A1A1A] mb-2">
              Active Spells
            </h3>
            <p className="text-3xl font-bold text-[#CC8800]">0</p>
          </div>

          <div className="bg-[#F4E8D0] border-2 border-[#8B6F47] rounded-sm p-6">
            <h3 className="text-xl font-['MedievalSharp'] text-[#1A1A1A] mb-2">
              Upcoming Consultations
            </h3>
            <p className="text-3xl font-bold text-[#CC8800]">0</p>
          </div>

          <div className="bg-[#F4E8D0] border-2 border-[#8B6F47] rounded-sm p-6">
            <h3 className="text-xl font-['MedievalSharp'] text-[#1A1A1A] mb-2">
              Unread Messages
            </h3>
            <p className="text-3xl font-bold text-[#CC8800]">0</p>
          </div>
        </div>

        {/* Coming soon notice */}
        <div className="mt-8 text-center">
          <p className="text-[#C0C0C0] font-['Crimson_Text'] text-sm">
            Full dashboard features coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}
