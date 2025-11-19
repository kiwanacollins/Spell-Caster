'use client';

import { ReactNode, useState } from 'react';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { Button } from '@/components/ui/button';
import { FiMenu, FiX } from 'react-icons/fi';

interface AdminLayoutClientProps {
  children: ReactNode;
  userName?: string;
  userEmail?: string;
}

/**
 * Client-side admin layout component
 * Provides sidebar navigation and main content area with mobile responsiveness
 */
export function AdminLayoutClient({
  children,
  userName,
  userEmail,
}: AdminLayoutClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#1A1A1A]">
      {/* Sidebar - Hidden on mobile, fixed on desktop */}
      <div className="hidden md:block md:fixed md:left-0 md:top-0 md:h-screen md:w-64 md:overflow-y-auto">
        <AdminSidebar userName={userName} userEmail={userEmail} />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar drawer */}
      <div
        className={`fixed left-0 top-0 h-screen w-64 z-50 transform transition-transform duration-300 md:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <AdminSidebar userName={userName} userEmail={userEmail} />
      </div>

      {/* Main content */}
      <main className="flex-1 md:ml-64">
        {/* Mobile header with menu button */}
        <div className="md:hidden bg-[#1A1A1A] border-b-2 border-[#8B6F47] px-4 py-3 flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="border-[#8B6F47] text-[#F4E8D0] hover:bg-[#2A2A2A]"
          >
            {sidebarOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
          </Button>
          <h1 className="text-[#F4E8D0] font-['MedievalSharp'] text-lg">Admin Portal</h1>
        </div>

        {/* Content area with responsive padding */}
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
