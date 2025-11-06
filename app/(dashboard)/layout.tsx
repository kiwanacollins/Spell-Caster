import { ProtectedRoute } from "@/components/auth/protected-route";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#1A1A1A]">
        {/* Dashboard wrapper - actual layout will be added in dashboard implementation tasks */}
        {children}
      </div>
    </ProtectedRoute>
  );
}
