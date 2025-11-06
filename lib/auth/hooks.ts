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
 */
export function useIsAdmin() {
  const { user, isLoading } = useUser();
  
  // Check if user email is in admin list
  // Note: This should ideally check a role field in the user object
  // For now, we check the email against the admin emails list
  const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",").map(e => e.trim()) || [];
  const isAdmin = user ? adminEmails.includes(user.email) : false;

  return {
    isAdmin,
    isLoading,
  };
}
