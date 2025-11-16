import { ObjectId } from "mongodb";
import { getDatabase } from "../mongodb";
import {
  UserDocument,
  UpdateUserProfileInput,
  USER_COLLECTION,
  initializeSpiritualProfile,
  initializeUserStats,
  initializeUserPreferences,
} from "./user";

/**
 * User Database Operations
 * 
 * Utility functions for interacting with user documents in MongoDB.
 * These extend BetterAuth's built-in user management with spiritual profile features.
 */

/**
 * Get user by ID
 */
export async function getUserById(userId: string): Promise<UserDocument | null> {
  const db = await getDatabase();
  const user = await db.collection<UserDocument>(USER_COLLECTION).findOne({
    id: userId,
  });
  return user;
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string): Promise<UserDocument | null> {
  const db = await getDatabase();
  const user = await db.collection<UserDocument>(USER_COLLECTION).findOne({
    email: email.toLowerCase(),
  });
  return user;
}

/**
 * Update user profile
 * 
 * Updates user information including spiritual profile data
 */
export async function updateUserProfile(
  userId: string,
  updates: UpdateUserProfileInput
): Promise<UserDocument | null> {
  const db = await getDatabase();
  
  const updateDoc: any = {
    updatedAt: new Date(),
  };

  // Map updates to database fields
  if (updates.name) updateDoc.name = updates.name;
  if (updates.phone) updateDoc.phone = updates.phone;
  if (updates.location) updateDoc.location = updates.location;

  // Spiritual profile updates
  if (updates.birthDate) {
    updateDoc["spiritualProfile.birthDate"] = updates.birthDate;
  }
  if (updates.birthTime) {
    updateDoc["spiritualProfile.birthTime"] = updates.birthTime;
  }
  if (updates.birthPlace) {
    updateDoc["spiritualProfile.birthPlace"] = updates.birthPlace;
  }
  if (updates.spiritualInterests) {
    updateDoc["spiritualProfile.spiritualInterests"] = updates.spiritualInterests;
  }
  if (updates.primaryIntentions) {
    updateDoc["spiritualProfile.primaryIntentions"] = updates.primaryIntentions;
  }

  // Preferences updates
  if (updates.preferences) {
    updateDoc.preferences = updates.preferences;
  }

  const result = await db.collection<UserDocument>(USER_COLLECTION).findOneAndUpdate(
    { id: userId },
    { $set: updateDoc },
    { returnDocument: "after" }
  );

  return result || null;
}

/**
 * Initialize spiritual profile for existing user
 * 
 * Adds spiritual profile fields to users who registered before this feature
 */
export async function initializeUserSpiritualProfile(userId: string): Promise<boolean> {
  const db = await getDatabase();
  
  const result = await db.collection<UserDocument>(USER_COLLECTION).updateOne(
    { id: userId, spiritualProfile: { $exists: false } },
    {
      $set: {
        spiritualProfile: initializeSpiritualProfile(),
        stats: initializeUserStats(),
        preferences: initializeUserPreferences(),
        updatedAt: new Date(),
      },
    }
  );

  return result.modifiedCount > 0;
}

/**
 * Update energy alignment
 */
export async function updateEnergyAlignment(
  userId: string,
  alignment: number
): Promise<boolean> {
  const db = await getDatabase();
  
  const result = await db.collection<UserDocument>(USER_COLLECTION).updateOne(
    { id: userId },
    {
      $set: {
        "spiritualProfile.energyAlignment": Math.max(0, Math.min(100, alignment)),
        "spiritualProfile.lastEnergyReading": new Date(),
        updatedAt: new Date(),
      },
    }
  );

  return result.modifiedCount > 0;
}

/**
 * Award spiritual points
 */
export async function awardSpiritualPoints(
  userId: string,
  points: number
): Promise<number> {
  const db = await getDatabase();
  
  const result = await db.collection<UserDocument>(USER_COLLECTION).findOneAndUpdate(
    { id: userId },
    {
      $inc: { "spiritualProfile.spiritualPoints": points },
      $set: { updatedAt: new Date() },
    },
    { returnDocument: "after" }
  );

  return result?.spiritualProfile?.spiritualPoints || 0;
}

/**
 * Add achievement badge
 */
export async function addBadge(userId: string, badgeId: string): Promise<boolean> {
  const db = await getDatabase();
  
  const result = await db.collection<UserDocument>(USER_COLLECTION).updateOne(
    { id: userId },
    {
      $addToSet: { "spiritualProfile.badges": badgeId },
      $set: { updatedAt: new Date() },
    }
  );

  return result.modifiedCount > 0;
}

/**
 * Update user stats
 */
export async function updateUserStats(
  userId: string,
  stats: Record<string, any>
): Promise<boolean> {
  const db = await getDatabase();
  
  const updateDoc: any = { updatedAt: new Date() };
  
  Object.entries(stats).forEach(([key, value]) => {
    updateDoc[`stats.${key}`] = value;
  });

  const result = await db.collection<UserDocument>(USER_COLLECTION).updateOne(
    { id: userId },
    { $set: updateDoc }
  );

  return result.modifiedCount > 0;
}

/**
 * Update last activity timestamp
 */
export async function updateLastActivity(userId: string): Promise<boolean> {
  const db = await getDatabase();
  
  const result = await db.collection<UserDocument>(USER_COLLECTION).updateOne(
    { id: userId },
    {
      $set: {
        "stats.lastActivityAt": new Date(),
        updatedAt: new Date(),
      },
    }
  );

  return result.modifiedCount > 0;
}

/**
 * Generate unique referral code
 */
export async function generateReferralCode(userId: string): Promise<string> {
  const db = await getDatabase();
  
  // Create a unique referral code (e.g., first 3 letters of name + random string)
  const user = await getUserById(userId);
  if (!user) throw new Error("User not found");

  const namePrefix = user.name.substring(0, 3).toUpperCase();
  const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
  const referralCode = `${namePrefix}${randomSuffix}`;

  await db.collection<UserDocument>(USER_COLLECTION).updateOne(
    { id: userId },
    {
      $set: {
        "stats.referralCode": referralCode,
        updatedAt: new Date(),
      },
    }
  );

  return referralCode;
}

/**
 * Get all users (admin only)
 */
export async function getAllUsers(
  filter: any = {},
  limit: number = 50,
  skip: number = 0
): Promise<UserDocument[]> {
  const db = await getDatabase();
  
  const users = await db
    .collection<UserDocument>(USER_COLLECTION)
    .find(filter)
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 })
    .toArray();

  return users;
}

/**
 * Search users by name or email (admin only)
 */
export async function searchUsers(query: string): Promise<UserDocument[]> {
  const db = await getDatabase();
  
  const users = await db
    .collection<UserDocument>(USER_COLLECTION)
    .find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    })
    .limit(20)
    .toArray();

  return users;
}

/**
 * Suspend user account (admin only)
 */
export async function suspendUser(
  userId: string,
  reason: string
): Promise<boolean> {
  const db = await getDatabase();
  
  const result = await db.collection<UserDocument>(USER_COLLECTION).updateOne(
    { id: userId },
    {
      $set: {
        isSuspended: true,
        suspensionReason: reason,
        isActive: false,
        updatedAt: new Date(),
      },
    }
  );

  return result.modifiedCount > 0;
}

/**
 * Reactivate user account (admin only)
 */
export async function reactivateUser(userId: string): Promise<boolean> {
  const db = await getDatabase();
  
  const result = await db.collection<UserDocument>(USER_COLLECTION).updateOne(
    { id: userId },
    {
      $set: {
        isSuspended: false,
        suspensionReason: undefined,
        isActive: true,
        updatedAt: new Date(),
      },
    }
  );

  return result.modifiedCount > 0;
}

/**
 * Promote user to admin role (admin only)
 * 
 * Updates user role from 'user' to 'admin'
 */
export async function promoteToAdmin(userId: string): Promise<boolean> {
  const db = await getDatabase();
  
  const result = await db.collection<UserDocument>(USER_COLLECTION).updateOne(
    { id: userId },
    {
      $set: {
        role: "admin",
        updatedAt: new Date(),
      },
    }
  );

  return result.modifiedCount > 0;
}

/**
 * Demote admin to user role (admin only)
 * 
 * Updates user role from 'admin' to 'user'
 */
export async function demoteFromAdmin(userId: string): Promise<boolean> {
  const db = await getDatabase();
  
  const result = await db.collection<UserDocument>(USER_COLLECTION).updateOne(
    { id: userId },
    {
      $set: {
        role: "user",
        updatedAt: new Date(),
      },
    }
  );

  return result.modifiedCount > 0;
}

/**
 * Get all admin users (admin only)
 */
export async function getAdminUsers(): Promise<UserDocument[]> {
  const db = await getDatabase();
  
  const admins = await db
    .collection<UserDocument>(USER_COLLECTION)
    .find({ role: "admin" })
    .sort({ createdAt: -1 })
    .toArray();

  return admins;
}

/**
 * Get users by role
 */
export async function getUsersByRole(
  role: "user" | "admin",
  limit: number = 50,
  skip: number = 0
): Promise<UserDocument[]> {
  const db = await getDatabase();
  
  const users = await db
    .collection<UserDocument>(USER_COLLECTION)
    .find({ role })
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 })
    .toArray();

  return users;
}

/**
 * Check if user is admin
 */
export async function isUserAdmin(userId: string): Promise<boolean> {
  const db = await getDatabase();
  
  const user = await db.collection<UserDocument>(USER_COLLECTION).findOne({
    id: userId,
    role: "admin",
  });

  return user !== null;
}

/**
 * Count admin users
 */
export async function countAdminUsers(): Promise<number> {
  const db = await getDatabase();
  
  const count = await db
    .collection<UserDocument>(USER_COLLECTION)
    .countDocuments({ role: "admin" });

  return count;
}
