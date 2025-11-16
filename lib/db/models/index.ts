/**
 * User Model Exports
 * 
 * Central export for all user-related types and database operations
 */

// User types and interfaces
export type {
  UserDocument,
  SpiritualProfile,
  UserPreferences,
  UserLocation,
  UserStats,
  CreateUserInput,
  UpdateUserProfileInput,
} from "./user";

// User constants
export { USER_COLLECTION } from "./user";

// User helper functions
export {
  initializeSpiritualProfile,
  initializeUserStats,
  initializeUserPreferences,
} from "./user";

// User database operations
export {
  getUserById,
  getUserByEmail,
  updateUserProfile,
  initializeUserSpiritualProfile,
  updateEnergyAlignment,
  awardSpiritualPoints,
  addBadge,
  updateUserStats,
  updateLastActivity,
  generateReferralCode,
  getAllUsers,
  searchUsers,
  suspendUser,
  reactivateUser,
} from "./user-operations";

// Session types and interfaces
export type {
  LoginHistoryEntry,
  ActiveSession,
  SessionDevice,
  SessionLocation,
} from "./session";

// Session constants
export {
  LOGIN_HISTORY_COLLECTION,
  ACTIVE_SESSIONS_COLLECTION,
} from "./session";

// Session helper functions
export {
  parseUserAgent,
  getLocationFromIP,
  detectSuspiciousActivity,
  calculateTrustScore,
} from "./session";

// Session database operations
export {
  recordLoginAttempt,
  getLoginHistory,
  createActiveSession,
  getActiveSessions,
  updateSessionActivity,
  revokeSession,
  revokeAllSessionsExcept,
  revokeAllSessions,
  cleanupExpiredSessions,
  getSessionById,
  markCurrentSession,
  getLoginStatistics,
  recordLogout,
} from "./session-operations";

// Refund Request types and interfaces
export type {
  RefundRequest,
  CreateRefundRequestInput,
  UpdateRefundRequestInput,
  RefundStatus,
  RefundReason,
} from "./refund-request";

// Refund Request constants
export {
  REFUND_REQUEST_COLLECTION,
  REFUND_REASON_LABELS,
  REFUND_STATUS_LABELS,
  REFUND_STATUS_COLORS,
} from "./refund-request";

// Refund Request database operations
export {
  createRefundRequest,
  getRefundRequestById,
  getUserRefundRequests,
  getPendingRefundRequests,
  getRefundRequestsByStatus,
  updateRefundRequest,
  updateRefundWithStripeInfo,
  updateRefundFromStripeWebhook,
  getRefundByStripeId,
  getRefundStats,
  deleteRefundRequest,
} from "./refund-operations";
