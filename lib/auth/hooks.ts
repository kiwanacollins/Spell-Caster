"use client";

import { useSession } from "./client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Client-side hook to get current user
 * Returns user object or null if not authenticated
 */
export function useUser() {
  const { data: session, isPending } = useSession();
  return {
    user: session?.user ?? null,
    isLoading: isPending,
    isAuthenticated: !!session?.user,
  };
}

/**
 * Client-side hook to require authentication
 * Redirects to login if not authenticated
 */
export function useRequireAuth(redirectTo: string = "/login") {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(`${redirectTo}?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
    }
  }, [user, isLoading, router, redirectTo]);

  return { user, isLoading };
}

/**
 * Client-side hook to check if user is admin
 * 
 * Checks the user's role field from the session.
 * Returns true if role is 'admin', false otherwise.
 */
export function useIsAdmin() {
  const { user, isLoading } = useUser();
  
  // Check the role field from user object (set from database via BetterAuth)
  const userRole = (user as any)?.role as string | undefined;
  const isAdmin = userRole === "admin";

  return {
    isAdmin,
    isLoading,
  };
}

/**
 * Client-side hook to get user's role
 * 
 * Returns the user's role: 'user' | 'admin' | null
 */
export function useUserRole() {
  const { user, isLoading } = useUser();
  
  const userRole = (user as any)?.role as string | undefined;
  const role = (userRole === "admin" || userRole === "user" ? userRole : "user") as "user" | "admin" | null;

  return {
    role: user ? role : null,
    isLoading,
  };
}
