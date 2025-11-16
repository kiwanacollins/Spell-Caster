/**
 * API Route Protection Middleware
 * 
 * Utilities for protecting API routes with authentication and authorization checks.
 * All middleware functions use the role-based access control system.
 */

import { getSession, getCurrentUser, isAdmin } from "./session";
import type { NextRequest, NextResponse } from "next/server";

/**
 * Response helper for API errors
 */
function errorResponse(message: string, status: number) {
  return Response.json(
    {
      success: false,
      error: message,
    },
    { status }
  );
}

/**
 * Middleware to require authentication on API routes
 * 
 * Returns 401 if user is not authenticated
 * 
 * Usage in API route:
 * ```typescript
 * export async function GET(request: NextRequest) {
 *   const auth = await requireAuthMiddleware(request);
 *   if (auth instanceof Response) return auth; // Error response
 *   
 *   const { user, session } = auth;
 *   // user is guaranteed to be authenticated
 * }
 * ```
 */
export async function requireAuthMiddleware(request: NextRequest) {
  try {
    const session = await getSession();
    const user = await getCurrentUser();

    if (!session || !user) {
      return errorResponse("Unauthorized - Authentication required", 401);
    }

    return { user, session };
  } catch (error) {
    return errorResponse("Authentication error", 401);
  }
}

/**
 * Middleware to require admin role on API routes
 * 
 * Returns 401 if not authenticated
 * Returns 403 if authenticated but not admin
 * 
 * Usage in API route:
 * ```typescript
 * export async function POST(request: NextRequest) {
 *   const auth = await requireAdminMiddleware(request);
 *   if (auth instanceof Response) return auth; // Error response
 *   
 *   const { user, session } = auth;
 *   // user is guaranteed to be admin
 * }
 * ```
 */
export async function requireAdminMiddleware(request: NextRequest) {
  // First check authentication
  const authResult = await requireAuthMiddleware(request);
  
  if (authResult instanceof Response) {
    return authResult;
  }

  // Then check admin role
  try {
    const userIsAdmin = await isAdmin();

    if (!userIsAdmin) {
      return errorResponse("Forbidden - Admin access required", 403);
    }

    return authResult;
  } catch (error) {
    return errorResponse("Authorization error", 403);
  }
}

/**
 * Utility to check if a user object has admin role
 * Can be used without full session/request context
 * 
 * Usage:
 * ```typescript
 * const userData = { id: "123", role: "admin", email: "admin@example.com" };
 * const isUserAdmin = hasAdminRole(userData);
 * ```
 */
export function hasAdminRole(user: any): boolean {
  return user?.role === "admin";
}

/**
 * Utility to check if a user object has user role
 * Can be used without full session/request context
 * 
 * Usage:
 * ```typescript
 * const userIsRegular = hasUserRole(userData);
 * ```
 */
export function hasUserRole(user: any): boolean {
  const role = user?.role;
  return role === "user" || role === "admin"; // Admins are superusers
}

/**
 * Utility to get user's role from user object
 * Returns 'admin', 'user', or null
 * 
 * Usage:
 * ```typescript
 * const role = getUserRoleFromObject(userData);
 * ```
 */
export function getUserRoleFromObject(user: any): "admin" | "user" | null {
  if (!user) return null;
  
  const role = user.role;
  if (role === "admin" || role === "user") {
    return role;
  }
  
  // Default to user role if undefined
  return "user";
}

/**
 * Validate that user has the required role
 * 
 * Usage:
 * ```typescript
 * const isValid = validateUserRole(user, "admin");
 * if (!isValid) {
 *   return errorResponse("Insufficient permissions", 403);
 * }
 * ```
 */
export function validateUserRole(
  user: any,
  requiredRole: "admin" | "user"
): boolean {
  const userRole = getUserRoleFromObject(user);
  
  if (requiredRole === "admin") {
    return userRole === "admin";
  }
  
  return userRole !== null; // "user" role includes regular users and admins
}