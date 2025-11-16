import { headers } from "next/headers";
import { cache } from "react";

// Lazy load auth config to prevent Edge runtime issues
async function getAuth() {
  const { auth } = await import("./auth.config");
  return auth;
}

/**
 * Get the current session (cached per request)
 * Use this in Server Components and Server Actions
 */
export const getSession = cache(async () => {
  const auth = await getAuth();
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });
  
  return session;
});

/**
 * Get the current user (cached per request)
 * Returns null if not authenticated
 */
export const getCurrentUser = cache(async () => {
  const session = await getSession();
  return session?.user ?? null;
});

/**
 * Require authentication - throws error if not authenticated
 * Use this in protected routes and Server Actions
 */
export async function requireAuth() {
  const session = await getSession();
  
  if (!session?.user) {
    throw new Error("Unauthorized - Authentication required");
  }
  
  return { session, user: session.user };
}

/**
 * Check if user has admin role
 * 
 * Checks the user's role field from the database.
 * Role values: 'user' | 'admin'
 */
export async function isAdmin() {
  const user = await getCurrentUser();
  
  if (!user) {
    return false;
  }

  // Check role field from user model
  // The role field is set in BetterAuth config and stored in MongoDB
  const userRole = (user as any).role as string | undefined;
  return userRole === "admin";
}

/**
 * Get user's role
 * 
 * Returns the user's role from the database.
 * Possible values: 'user' | 'admin'
 */
export async function getUserRole(): Promise<"user" | "admin" | null> {
  const user = await getCurrentUser();
  
  if (!user) {
    return null;
  }

  const userRole = (user as any).role as string | undefined;
  return (userRole === "admin" || userRole === "user" ? userRole : "user") as "user" | "admin";
}

/**
 * Require admin role - throws error if not admin
 * 
 * Use this in protected API routes and Server Actions that require admin access.
 * 
 * Example:
 *   const { user } = await requireAdmin();
 *   // user is guaranteed to be authenticated with admin role
 */
export async function requireAdmin() {
  const { user } = await requireAuth();
  const adminCheck = await isAdmin();
  
  if (!adminCheck) {
    throw new Error("Forbidden - Admin access required");
  }
  
  return { user };
}

/**
 * Sign out helper (for Server Actions)
 */
export async function signOut() {
  const auth = await getAuth();
  const headersList = await headers();
  await auth.api.signOut({
    headers: headersList,
  });
}
