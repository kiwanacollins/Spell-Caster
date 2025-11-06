import { ProtectedRoute } from "@/components/auth/protected-route";
import { DashboardSidebar } from "@/components/navigation/dashboard-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-cover bg-center relative">
          {/* Background texture */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
            style={{
              backgroundImage: "url('/textures/parchment-dark.webp')",
            }}
          />
          {/* Overlay for better readability */}
          <div className="absolute inset-0 bg-[#1A1A1A]/90 pointer-events-none" />

          {/* Sidebar Navigation */}
          <DashboardSidebar />

          {/* Main Content Area */}
          <SidebarInset className="relative z-10 flex-1">
            {/* Mobile menu trigger */}
            <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b-2 border-[#8B6F47] bg-[#1A1A1A]/95 backdrop-blur-sm px-6">
              <SidebarTrigger className="text-[#CC8800] hover:text-[#B8860B] hover:bg-[#8B6F47]/20 transition-colors" />
              <Separator orientation="vertical" className="h-6 bg-[#8B6F47]" />
              <h1 className="font-['MedievalSharp'] text-xl text-[#F4E8D0]">
                Your Mystical Dashboard
              </h1>
            </header>

            {/* Page Content */}
            <main className="flex-1 p-6 md:p-8">
              {children}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
