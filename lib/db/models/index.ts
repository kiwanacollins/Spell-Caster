/**
 * User Model Exports
 * 
 * Central export for all user-related types and database operations
 */

// Types and interfaces
export type {
  UserDocument,
  SpiritualProfile,
  UserPreferences,
  UserLocation,
  UserStats,
  CreateUserInput,
  UpdateUserProfileInput,
} from "./user";

// Constants
export { USER_COLLECTION } from "./user";

// Helper functions
export {
  initializeSpiritualProfile,
  initializeUserStats,
  initializeUserPreferences,
} from "./user";

// Database operations
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
