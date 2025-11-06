"use client";

import { useIsAdmin, useRequireAuth } from "@/lib/auth/hooks";
import { MysticalLoader } from "@/components/ui/mystical-loader";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AdminRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Component wrapper for admin-only routes
 * Redirects to login if not authenticated
 * Shows forbidden message if authenticated but not admin
 * 
 * Usage:
 * ```tsx
 * <AdminRoute>
 *   <AdminDashboard />
 * </AdminRoute>
 * ```
 */
export function AdminRoute({ 
  children, 
  fallback = <AdminRouteFallback />
}: AdminRouteProps) {
  const { user, isLoading: authLoading } = useRequireAuth();
  const { isAdmin, isLoading: adminLoading } = useIsAdmin();

  if (authLoading || adminLoading) {
    return <>{fallback}</>;
  }

  if (!user) {
    return null; // Will redirect via useRequireAuth
  }

  if (!isAdmin) {
    return <AdminForbidden />;
  }

  return <>{children}</>;
}

/**
 * Default loading fallback for admin routes
 */
function AdminRouteFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-[#1A1A1A] to-[#2C2416]">
      <div className="text-center">
        {/* Mystical loading spinner */}
        <div className="mb-6">
          <MysticalLoader size={60} className="mx-auto" />
        </div>
        
        <p className="text-[#F4E8D0] font-['Crimson_Text'] text-lg">
          Verifying sacred permissions...
        </p>
      </div>
    </div>
  );
}

/**
 * Forbidden message for non-admin users
 */
function AdminForbidden() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard after 3 seconds
    const timeout = setTimeout(() => {
      router.push("/dashboard");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-[#1A1A1A] to-[#2C2416]">
      <div className="max-w-md w-full mx-4">
        <div className="bg-[#F4E8D0] border-4 border-[#8B6F47] rounded-sm p-8 text-center relative">
          {/* Ancient forbidden symbol */}
          <div className="w-20 h-20 mx-auto mb-6 relative">
            <svg viewBox="0 0 100 100" className="text-[#8B0000]">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="4"/>
              <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="6"/>
            </svg>
          </div>

          <h1 className="text-2xl font-['MedievalSharp'] text-[#1A1A1A] mb-4">
            Access Forbidden
          </h1>
          
          <p className="text-[#4A4A4A] font-['Crimson_Text'] mb-6">
            This sacred chamber is reserved for the temple guardians. You do not have the necessary permissions to enter this realm.
          </p>

          <p className="text-sm text-[#8B6F47] font-['Crimson_Text']">
            Redirecting you to your sanctuary...
          </p>
        </div>
      </div>
    </div>
  );
}
