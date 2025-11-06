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
 */
export async function isAdmin() {
  const user = await getCurrentUser();
  
  // In BetterAuth, you can add custom fields to the user model
  // For now, we'll check if the user email matches admin email from env
  const adminEmails = (process.env.ADMIN_EMAILS || "").split(",").map(e => e.trim());
  
  return user ? adminEmails.includes(user.email) : false;
}

/**
 * Require admin role - throws error if not admin
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
