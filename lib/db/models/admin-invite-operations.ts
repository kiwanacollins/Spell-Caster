import { getDatabase } from "../mongodb";
import { randomBytes } from "crypto";
import { ObjectId } from "mongodb";
import type { AdminInvite } from "./admin-invite";

/**
 * Generate a secure random token for invite links
 */
function generateInviteToken(): string {
  return randomBytes(32).toString("hex");
}

/**
 * Create a new admin invite
 * 
 * Returns the invite with token (token should be used in invite link)
 */
export async function createAdminInvite(
  email: string,
  role: "user" | "admin",
  createdById: string,
  customMessage?: string,
  expiresIn: number = 7 * 24 * 60 * 60 * 1000 // 7 days default
): Promise<AdminInvite> {
  const db = await getDatabase();
  const collection = db.collection("admin_invites");

  const token = generateInviteToken();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + expiresIn);

  const invite: AdminInvite = {
    email: email.toLowerCase(),
    token,
    role,
    createdBy: createdById,
    createdAt: now,
    expiresAt,
    status: "pending",
    metadata: {
      customMessage,
      inviteSource: "manual",
    },
  };

  const result = await collection.insertOne(invite);

  return {
    ...invite,
    _id: result.insertedId,
  } as AdminInvite;
}

/**
 * Get a pending invite by token
 */
export async function getInviteByToken(token: string): Promise<AdminInvite | null> {
  const db = await getDatabase();
  const collection = db.collection("admin_invites");

  const invite = await collection.findOne({
    token,
    status: "pending",
    expiresAt: { $gt: new Date() }, // Not expired
  });

  if (!invite) {
    return null;
  }

  return invite as AdminInvite;
}

/**
 * Accept an admin invite (mark as accepted and update status)
 */
export async function acceptAdminInvite(
  token: string,
  userId: string
): Promise<AdminInvite | null> {
  const db = await getDatabase();
  const collection = db.collection("admin_invites");

  const result = await collection.findOneAndUpdate(
    {
      token,
      status: "pending",
      expiresAt: { $gt: new Date() }, // Not expired
    },
    {
      $set: {
        status: "accepted",
        acceptedAt: new Date(),
        acceptedBy: userId,
      },
    },
    { returnDocument: "after" }
  );

  if (result === null || !result.value) {
    return null;
  }

  return result.value as AdminInvite;
}

/**
 * Get all pending invites for admin
 */
export async function getPendingInvites(limit: number = 50, skip: number = 0) {
  const db = await getDatabase();
  const collection = db.collection("admin_invites");

  const invites = await collection
    .find({
      status: "pending",
      expiresAt: { $gt: new Date() },
    })
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .toArray();

  return invites.map((invite) => {
    const inviteDoc = invite as AdminInvite & { _id: ObjectId };
    return {
      ...inviteDoc,
      id: inviteDoc._id.toString(),
    };
  });
}

/**
 * Get all invites (pending, accepted, expired)
 */
export async function getAllInvites(
  status?: "pending" | "accepted" | "expired",
  limit: number = 50,
  skip: number = 0
) {
  const db = await getDatabase();
  const collection = db.collection("admin_invites");

  const query: Record<string, string> = {};
  if (status) {
    query.status = status;
  }

  const invites = await collection
    .find(query)
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .toArray();

  return invites as AdminInvite[];
}

/**
 * Revoke an invite (mark as expired)
 */
export async function revokeAdminInvite(token: string): Promise<boolean> {
  const db = await getDatabase();
  const collection = db.collection("admin_invites");

  const result = await collection.updateOne(
    { token, status: "pending" },
    {
      $set: {
        status: "expired",
        expiresAt: new Date(), // Mark as immediately expired
      },
    }
  );

  return result.modifiedCount > 0;
}

/**
 * Get invite count by status
 */
export async function getInviteStats() {
  const db = await getDatabase();
  const collection = db.collection("admin_invites");

  const stats = await collection.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]).toArray();

  const result = {
    pending: 0,
    accepted: 0,
    expired: 0,
  };

  for (const stat of stats) {
    if (stat._id in result) {
      result[stat._id as keyof typeof result] = stat.count;
    }
  }

  return result;
}

/**
 * Clean up expired invites (older than 30 days)
 */
export async function cleanupExpiredInvites(daysOld: number = 30): Promise<number> {
  const db = await getDatabase();
  const collection = db.collection("admin_invites");

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysOld);

  const result = await collection.deleteMany({
    status: "expired",
    createdAt: { $lt: cutoffDate },
  });

  return result.deletedCount;
}
