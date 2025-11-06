import { ProtectedRoute } from "@/components/auth/protected-route";
import { DashboardSidebar } from "@/components/navigation/dashboard-sidebar";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { getCurrentUser } from "@/lib/auth";
import { ReactNode } from "react";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();
  
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#1A1A1A]">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <DashboardSidebar 
            userName={user?.name}
            userEmail={user?.email}
            energyAlignment={0} // Will be connected to Zustand store
          />
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <MobileNav 
            userName={user?.name}
            energyAlignment={0} // Will be connected to Zustand store
          />
        </div>

        {/* Main Content Area */}
        <main className="lg:ml-64 min-h-screen">
          {/* Mobile top padding for fixed header */}
          <div className="lg:hidden h-16" />
          
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
