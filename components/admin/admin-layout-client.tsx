"use client";

import { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

interface AdminLayoutClientProps {
  children: ReactNode;
  userName?: string;
  userEmail?: string;
}

/**
 * Client-side admin layout component
 * Provides sidebar navigation and main content area
 */
export function AdminLayoutClient({
  children,
  userName,
  userEmail,
}: AdminLayoutClientProps) {
  return (
    <div className="flex min-h-screen bg-[#1A1A1A]">
      {/* Sidebar */}
      <AdminSidebar userName={userName} userEmail={userEmail} />

      {/* Main content */}
      <main className="flex-1 ml-64">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
