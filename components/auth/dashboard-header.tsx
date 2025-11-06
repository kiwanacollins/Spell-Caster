"use client";

import { LogoutButton } from "@/components/auth/logout-button";

interface DashboardHeaderProps {
  userName: string;
  subtitle?: string;
}

/**
 * Dashboard Header Component
 * 
 * Displays user welcome message and logout button
 * Ancient parchment styled header for dashboard pages
 */
export function DashboardHeader({ userName, subtitle = "Your spiritual journey continues..." }: DashboardHeaderProps) {
  return (
    <div className="bg-[#F4E8D0] border-4 border-[#8B6F47] rounded-sm p-6 md:p-8 mb-8 relative">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-gothic text-[#1A1A1A] mb-2">
            Welcome Back, {userName}
          </h1>
          <p className="text-[#4A4A4A] font-serif text-base md:text-lg">
            {subtitle}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <LogoutButton 
            variant="outline" 
            className="border-2 border-[#8B6F47] text-[#1A1A1A] hover:bg-[#8B6F47]/10 font-serif"
          />
        </div>
      </div>
    </div>
  );
}
