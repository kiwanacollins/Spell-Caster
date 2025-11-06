import { ObjectId } from "mongodb";
import { getDatabase } from "../mongodb";
import {
  LoginHistoryEntry,
  ActiveSession,
  SessionDevice,
  SessionLocation,
  LOGIN_HISTORY_COLLECTION,
  ACTIVE_SESSIONS_COLLECTION,
  parseUserAgent,
  getLocationFromIP,
  detectSuspiciousActivity,
  calculateTrustScore,
} from "./session";

/**
 * Session Management Operations
 * 
 * Functions for tracking login history and managing active sessions
 */

/**
 * Record a login attempt
 */
export async function recordLoginAttempt(
  userId: string,
  status: "success" | "failed" | "blocked",
  userAgent: string,
  ip: string,
  failureReason?: string
): Promise<LoginHistoryEntry> {
  const db = await getDatabase();

  const device = parseUserAgent(userAgent);
  const location = await getLocationFromIP(ip);

  // Get recent login history for suspicious activity detection
  const recentLogins = await getLoginHistory(userId, 10);

  const suspiciousAnalysis = detectSuspiciousActivity(userId, device, location, recentLogins);

  const loginEntry: Omit<LoginHistoryEntry, "_id"> = {
    userId,
    loginAt: new Date(),
    status,
    failureReason,
    device,
    location,
    isSuspicious: suspiciousAnalysis.isSuspicious,
    suspiciousReasons: suspiciousAnalysis.reasons,
  };

  const result = await db
    .collection<LoginHistoryEntry>(LOGIN_HISTORY_COLLECTION)
    .insertOne(loginEntry as LoginHistoryEntry);

  return {
    _id: result.insertedId,
    ...loginEntry,
  } as LoginHistoryEntry;
}

/**
 * Get login history for a user
 */
export async function getLoginHistory(
  userId: string,
  limit: number = 50
): Promise<LoginHistoryEntry[]> {
  const db = await getDatabase();

  const history = await db
    .collection<LoginHistoryEntry>(LOGIN_HISTORY_COLLECTION)
    .find({ userId })
    .sort({ loginAt: -1 })
    .limit(limit)
    .toArray();

  return history;
}

/**
 * Create an active session
 */
export async function createActiveSession(
  userId: string,
  sessionId: string,
  userAgent: string,
  ip: string,
  expiresAt: Date
): Promise<ActiveSession> {
  const db = await getDatabase();

  const device = parseUserAgent(userAgent);
  const location = await getLocationFromIP(ip);
  const recentLogins = await getLoginHistory(userId, 10);
  const trustScore = calculateTrustScore(device, location, recentLogins);

  const session: Omit<ActiveSession, "_id"> = {
    userId,
    sessionId,
    createdAt: new Date(),
    lastActivityAt: new Date(),
    expiresAt,
    device,
    location,
    isActive: true,
    trustScore,
  };

  const result = await db
    .collection<ActiveSession>(ACTIVE_SESSIONS_COLLECTION)
    .insertOne(session as ActiveSession);

  return {
    _id: result.insertedId,
    ...session,
  } as ActiveSession;
}

/**
 * Get all active sessions for a user
 */
export async function getActiveSessions(userId: string): Promise<ActiveSession[]> {
  const db = await getDatabase();

  const sessions = await db
    .collection<ActiveSession>(ACTIVE_SESSIONS_COLLECTION)
    .find({
      userId,
      isActive: true,
      expiresAt: { $gt: new Date() },
    })
    .sort({ lastActivityAt: -1 })
    .toArray();

  return sessions;
}

/**
 * Update session activity timestamp
 */
export async function updateSessionActivity(sessionId: string): Promise<boolean> {
  const db = await getDatabase();

  const result = await db
    .collection<ActiveSession>(ACTIVE_SESSIONS_COLLECTION)
    .updateOne(
      { sessionId, isActive: true },
      {
        $set: {
          lastActivityAt: new Date(),
        },
      }
    );

  return result.modifiedCount > 0;
}

/**
 * Revoke a specific session
 */
export async function revokeSession(sessionId: string, userId: string): Promise<boolean> {
  const db = await getDatabase();

  const result = await db
    .collection<ActiveSession>(ACTIVE_SESSIONS_COLLECTION)
    .updateOne(
      { sessionId, userId },
      {
        $set: {
          isActive: false,
        },
      }
    );

  return result.modifiedCount > 0;
}

/**
 * Revoke all sessions except current
 */
export async function revokeAllSessionsExcept(
  userId: string,
  currentSessionId: string
): Promise<number> {
  const db = await getDatabase();

  const result = await db
    .collection<ActiveSession>(ACTIVE_SESSIONS_COLLECTION)
    .updateMany(
      {
        userId,
        sessionId: { $ne: currentSessionId },
        isActive: true,
      },
      {
        $set: {
          isActive: false,
        },
      }
    );

  return result.modifiedCount;
}

/**
 * Revoke all sessions for a user (e.g., password reset, security breach)
 */
export async function revokeAllSessions(userId: string): Promise<number> {
  const db = await getDatabase();

  const result = await db
    .collection<ActiveSession>(ACTIVE_SESSIONS_COLLECTION)
    .updateMany(
      {
        userId,
        isActive: true,
      },
      {
        $set: {
          isActive: false,
        },
      }
    );

  return result.modifiedCount;
}

/**
 * Clean up expired sessions
 */
export async function cleanupExpiredSessions(): Promise<number> {
  const db = await getDatabase();

  const result = await db
    .collection<ActiveSession>(ACTIVE_SESSIONS_COLLECTION)
    .updateMany(
      {
        isActive: true,
        expiresAt: { $lt: new Date() },
      },
      {
        $set: {
          isActive: false,
        },
      }
    );

  return result.modifiedCount;
}

/**
 * Get session by ID
 */
export async function getSessionById(sessionId: string): Promise<ActiveSession | null> {
  const db = await getDatabase();

  const session = await db
    .collection<ActiveSession>(ACTIVE_SESSIONS_COLLECTION)
    .findOne({ sessionId });

  return session;
}

/**
 * Mark current session
 */
export async function markCurrentSession(
  sessionId: string,
  userId: string
): Promise<boolean> {
  const db = await getDatabase();

  // First, unmark all other sessions
  await db.collection<ActiveSession>(ACTIVE_SESSIONS_COLLECTION).updateMany(
    { userId },
    { $unset: { isCurrent: "" } }
  );

  // Mark the current session
  const result = await db
    .collection<ActiveSession>(ACTIVE_SESSIONS_COLLECTION)
    .updateOne(
      { sessionId, userId },
      { $set: { isCurrent: true } }
    );

  return result.modifiedCount > 0;
}

/**
 * Get login statistics
 */
export async function getLoginStatistics(userId: string): Promise<{
  totalLogins: number;
  successfulLogins: number;
  failedLogins: number;
  suspiciousAttempts: number;
  lastLogin?: Date;
  uniqueDevices: number;
  uniqueLocations: number;
}> {
  const db = await getDatabase();

  const history = await getLoginHistory(userId, 100);

  const stats = {
    totalLogins: history.length,
    successfulLogins: history.filter((h) => h.status === "success").length,
    failedLogins: history.filter((h) => h.status === "failed").length,
    suspiciousAttempts: history.filter((h) => h.isSuspicious).length,
    lastLogin: history[0]?.loginAt,
    uniqueDevices: new Set(history.map((h) => `${h.device.browser}-${h.device.os}`)).size,
    uniqueLocations: new Set(history.map((h) => h.location.countryCode)).size,
  };

  return stats;
}

/**
 * Record logout
 */
export async function recordLogout(sessionId: string): Promise<boolean> {
  const db = await getDatabase();

  // Get session to calculate duration
  const session = await getSessionById(sessionId);
  
  if (!session) return false;

  const sessionDuration = Math.floor(
    (Date.now() - session.createdAt.getTime()) / 1000
  );

  // Update login history with logout time
  await db.collection<LoginHistoryEntry>(LOGIN_HISTORY_COLLECTION).updateOne(
    { 
      userId: session.userId,
      sessionId: sessionId,
      logoutAt: { $exists: false }
    },
    {
      $set: {
        logoutAt: new Date(),
        sessionDuration,
      },
    }
  );

  // Deactivate session
  await revokeSession(sessionId, session.userId);

  return true;
}
