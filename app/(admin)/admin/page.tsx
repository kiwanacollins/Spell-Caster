import { getCurrentUser, isAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/login");
  }

  const userIsAdmin = await isAdmin();
  
  if (!userIsAdmin) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Ancient parchment header */}
        <div className="bg-[#F4E8D0] border-4 border-[#8B6F47] rounded-sm p-8 mb-8 relative">
          {/* Sacred admin symbol */}
          <div className="absolute top-4 right-4 w-12 h-12">
            <svg viewBox="0 0 100 100" className="text-[#B8860B]">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3"/>
              <path d="M50 15 L65 45 L95 45 L70 65 L80 95 L50 75 L20 95 L30 65 L5 45 L35 45 Z" fill="currentColor"/>
            </svg>
          </div>

          <h1 className="text-4xl font-['MedievalSharp'] text-[#1A1A1A] mb-2">
            Admin Portal
          </h1>
          <p className="text-[#4A4A4A] font-['Crimson_Text'] text-lg">
            Guardian of the Sacred Temple
          </p>
        </div>

        {/* Admin stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* User stats */}
          <div className="bg-[#F4E8D0] border-2 border-[#8B6F47] rounded-sm p-6">
            <h3 className="text-lg font-['MedievalSharp'] text-[#1A1A1A] mb-2">
              Total Users
            </h3>
            <p className="text-3xl font-bold text-[#2C5530]">0</p>
          </div>

          {/* Spell requests */}
          <div className="bg-[#F4E8D0] border-2 border-[#8B6F47] rounded-sm p-6">
            <h3 className="text-lg font-['MedievalSharp'] text-[#1A1A1A] mb-2">
              Pending Spells
            </h3>
            <p className="text-3xl font-bold text-[#CC8800]">0</p>
          </div>

          {/* Consultations */}
          <div className="bg-[#F4E8D0] border-2 border-[#8B6F47] rounded-sm p-6">
            <h3 className="text-lg font-['MedievalSharp'] text-[#1A1A1A] mb-2">
              Today's Consultations
            </h3>
            <p className="text-3xl font-bold text-[#8B0000]">0</p>
          </div>

          {/* Revenue */}
          <div className="bg-[#F4E8D0] border-2 border-[#8B6F47] rounded-sm p-6">
            <h3 className="text-lg font-['MedievalSharp'] text-[#1A1A1A] mb-2">
              Monthly Revenue
            </h3>
            <p className="text-3xl font-bold text-[#B8860B]">$0</p>
          </div>
        </div>

        {/* Quick actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#F4E8D0] border-2 border-[#8B6F47] rounded-sm p-6 hover:border-[#CC8800] transition-colors cursor-pointer">
            <h3 className="text-xl font-['MedievalSharp'] text-[#1A1A1A] mb-2">
              Manage Spell Queue
            </h3>
            <p className="text-[#4A4A4A] font-['Crimson_Text']">
              Review and process spell requests
            </p>
          </div>

          <div className="bg-[#F4E8D0] border-2 border-[#8B6F47] rounded-sm p-6 hover:border-[#CC8800] transition-colors cursor-pointer">
            <h3 className="text-xl font-['MedievalSharp'] text-[#1A1A1A] mb-2">
              Multi-Channel Inbox
            </h3>
            <p className="text-[#4A4A4A] font-['Crimson_Text']">
              WhatsApp, Messenger & In-app messages
            </p>
          </div>

          <div className="bg-[#F4E8D0] border-2 border-[#8B6F47] rounded-sm p-6 hover:border-[#CC8800] transition-colors cursor-pointer">
            <h3 className="text-xl font-['MedievalSharp'] text-[#1A1A1A] mb-2">
              AI Response Generator
            </h3>
            <p className="text-[#4A4A4A] font-['Crimson_Text']">
              Generate mystical responses with AI
            </p>
          </div>
        </div>

        {/* Coming soon notice */}
        <div className="mt-8 text-center">
          <p className="text-[#C0C0C0] font-['Crimson_Text'] text-sm">
            Full admin portal features coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}
