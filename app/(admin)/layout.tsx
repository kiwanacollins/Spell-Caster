import { AdminRoute } from "@/components/auth/admin-route";
import { getCurrentUser } from "@/lib/auth";
import { AdminLayoutClient } from "@/components/admin/admin-layout-client";
import { ReactNode } from "react";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();

  return (
    <AdminRoute>
      <AdminLayoutClient userName={user?.name} userEmail={user?.email}>
        {children}
      </AdminLayoutClient>
    </AdminRoute>
  );
}
