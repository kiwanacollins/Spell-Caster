// Session management utilities (server-side)
export {
  getSession,
  getCurrentUser,
  requireAuth,
  requireAdmin,
  isAdmin,
  getUserRole,
  signOut,
} from "./session";

// API route middleware (for NextJS API routes)
export {
  requireAuthMiddleware,
  requireAdminMiddleware,
  hasAdminRole,
  hasUserRole,
  getUserRoleFromObject,
  validateUserRole,
} from "./middleware";

// Client-side auth helpers
export {
  authClient,
  signIn,
  signUp,
  useSession,
} from "./client";

// Client-side hooks
export {
  useUser,
  useRequireAuth,
  useIsAdmin,
  useUserRole,
} from "./hooks";
