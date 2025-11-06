import { getCurrentUser, isAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface ServerAdminRouteProps {
  children: ReactNode;
}

/**
 * Server Component wrapper for admin-only routes
 * Use this when you need server-side data fetching with admin verification
 * 
 * Usage:
 * ```tsx
 * import { ServerAdminRoute } from "@/components/auth/server-admin-route";
 * 
 * export default async function AdminPage() {
 *   return (
 *     <ServerAdminRoute>
 *       <AdminContent />
 *     </ServerAdminRoute>
 *   );
 * }
 * ```
 */
export async function ServerAdminRoute({ children }: ServerAdminRouteProps) {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/login");
  }

  const userIsAdmin = await isAdmin();
  
  if (!userIsAdmin) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
