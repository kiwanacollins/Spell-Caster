import { AdminRoute } from "@/components/auth/admin-route";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminRoute>
      <div className="min-h-screen bg-[#1A1A1A]">
        {/* Admin dashboard wrapper - actual layout will be added in admin implementation tasks */}
        {children}
      </div>
    </AdminRoute>
  );
}
