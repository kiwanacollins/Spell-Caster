"use client";

import { useRequireAuth } from "@/lib/auth/hooks";
import { MysticalLoader } from "@/components/ui/mystical-loader";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
  redirectTo?: string;
}

/**
 * Component wrapper for protected routes
 * Automatically redirects to login if not authenticated
 * 
 * Usage:
 * ```tsx
 * <ProtectedRoute>
 *   <DashboardContent />
 * </ProtectedRoute>
 * ```
 */
export function ProtectedRoute({ 
  children, 
  fallback = <ProtectedRouteFallback />,
  redirectTo = "/login"
}: ProtectedRouteProps) {
  const { user, isLoading } = useRequireAuth(redirectTo);

  if (isLoading) {
    return <>{fallback}</>;
  }

  if (!user) {
    return null; // Will redirect via useRequireAuth
  }

  return <>{children}</>;
}

/** Default loading fallback for protected routes
 */
function ProtectedRouteFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-[#1A1A1A] to-[#2C2416]">
      <div className="text-center">
        {/* Mystical loading spinner */}
        <div className="mb-6">
          <MysticalLoader size={60} className="mx-auto" />
        </div>
        
        <p className="text-[#F4E8D0] font-['Crimson_Text'] text-lg">
          {/* Consulting the ancient texts... */}
        </p>
      </div>
    </div>
  );
}
