import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware to protect routes
 * 
 * Protected routes:
 * - /dashboard/* - requires authentication
 * - /admin/* - requires authentication + admin role
 * 
 * Note: This middleware runs on Edge runtime, so we check for session cookies
 * The actual session validation happens in the protected pages/API routes
 */
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if route requires protection
  const isProtectedRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/admin");
  
  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Check for session cookie (BetterAuth uses 'better-auth.session_token')
  const sessionToken = request.cookies.get("better-auth.session_token");

  // Redirect to login if no session token
  if (!sessionToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // For admin routes, we'll do the actual role check in the page/API route
  // since middleware runs on Edge runtime and can't easily verify user roles
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, textures, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|mp3|glb|webm)).*)",
  ],
};
