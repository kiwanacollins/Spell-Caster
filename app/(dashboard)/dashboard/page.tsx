import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Section */}
      <div className="bg-[#F4E8D0] border-2 border-[#8B6F47] rounded-sm p-6 shadow-lg relative overflow-hidden">
        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#CC8800] opacity-30" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[#CC8800] opacity-30" />
        
        <h1 className="font-['UnifrakturMaguntia'] text-3xl md:text-4xl text-[#1A1A1A] mb-2">
          Welcome Back, {user.name}
        </h1>
        <p className="font-['Crimson_Text'] text-lg text-[#4A4A4A]">
          The ancient energies await your presence
        </p>
      </div>

      {/* Quick stats cards - to be enhanced in task 4.4 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[#F4E8D0] border-2 border-[#8B6F47] rounded-sm p-6 hover:shadow-lg transition-shadow relative overflow-hidden group">
          {/* Corner decoration */}
          <div className="absolute top-2 right-2 text-[#CC8800]/20 group-hover:text-[#CC8800]/40 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </div>
          
          <h3 className="text-xl font-['MedievalSharp'] text-[#1A1A1A] mb-2">
            Active Spells
          </h3>
          <p className="text-4xl font-bold text-[#CC8800] mb-2">0</p>
          <p className="font-['Crimson_Text'] text-sm text-[#4A4A4A]">
            Rituals in progress
          </p>
        </div>

        <div className="bg-[#F4E8D0] border-2 border-[#8B6F47] rounded-sm p-6 hover:shadow-lg transition-shadow relative overflow-hidden group">
          {/* Corner decoration */}
          <div className="absolute top-2 right-2 text-[#CC8800]/20 group-hover:text-[#CC8800]/40 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </div>
          
          <h3 className="text-xl font-['MedievalSharp'] text-[#1A1A1A] mb-2">
            Upcoming Consultations
          </h3>
          <p className="text-4xl font-bold text-[#CC8800] mb-2">0</p>
          <p className="font-['Crimson_Text'] text-sm text-[#4A4A4A]">
            Guidance sessions scheduled
          </p>
        </div>

        <div className="bg-[#F4E8D0] border-2 border-[#8B6F47] rounded-sm p-6 hover:shadow-lg transition-shadow relative overflow-hidden group">
          {/* Corner decoration */}
          <div className="absolute top-2 right-2 text-[#CC8800]/20 group-hover:text-[#CC8800]/40 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </div>
          
          <h3 className="text-xl font-['MedievalSharp'] text-[#1A1A1A] mb-2">
            Unread Messages
          </h3>
          <p className="text-4xl font-bold text-[#CC8800] mb-2">0</p>
          <p className="font-['Crimson_Text'] text-sm text-[#4A4A4A]">
            Sacred communications
          </p>
        </div>
      </div>

      {/* Coming soon notice */}
      <div className="mt-8 text-center bg-[#8B6F47]/10 border-2 border-[#8B6F47] rounded-sm p-6">
        <p className="text-[#C0C0C0] font-['Crimson_Text'] text-sm italic">
          ✦ The ancient wisdom is being inscribed into the grimoire ✦
        </p>
        <p className="text-[#8B6F47] font-['Crimson_Text'] text-xs mt-2">
          Full dashboard features manifesting soon...
        </p>
      </div>
    </div>
  );
}
