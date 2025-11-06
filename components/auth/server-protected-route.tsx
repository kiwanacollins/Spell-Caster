import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface ServerProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

/**
 * Server Component wrapper for protected routes
 * Use this when you need server-side data fetching with authentication
 * 
 * Usage:
 * ```tsx
 * import { ServerProtectedRoute } from "@/components/auth/server-protected-route";
 * 
 * export default async function MyPage() {
 *   return (
 *     <ServerProtectedRoute>
 *       <PageContent />
 *     </ServerProtectedRoute>
 *   );
 * }
 * ```
 */
export async function ServerProtectedRoute({ 
  children, 
  redirectTo = "/login" 
}: ServerProtectedRouteProps) {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect(redirectTo);
  }

  return <>{children}</>;
}
