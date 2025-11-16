import { getMongoClient } from "../mongodb";
import {
  RefundRequest,
  RefundStatus,
  CreateRefundRequestInput,
  UpdateRefundRequestInput,
  REFUND_REQUEST_COLLECTION,
  createRefundRequest as buildRefundRequest,
} from "./refund-request";
import { ObjectId } from "mongodb";

/**
 * Get refund requests collection
 */
async function getRefundCollection() {
  const client = await getMongoClient();
  const db = client.db("spell_caster");
  return db.collection<RefundRequest>(REFUND_REQUEST_COLLECTION);
}

/**
 * Create a new refund request
 */
export async function createRefundRequest(
  userId: string,
  paymentIntentId: string,
  amount: number,
  serviceName: string,
  serviceType: string,
  reason: CreateRefundRequestInput["reason"],
  userMessage?: string
): Promise<RefundRequest> {
  const collection = await getRefundCollection();

  const refundDocument = buildRefundRequest(
    userId,
    paymentIntentId,
    amount,
    serviceName,
    serviceType,
    reason,
    userMessage
  );

  const result = await collection.insertOne({
    ...refundDocument,
    _id: new ObjectId(),
  });

  const created = await collection.findOne({ _id: result.insertedId });
  if (!created) throw new Error("Failed to create refund request");

  return created;
}

/**
 * Get refund request by ID
 */
export async function getRefundRequestById(
  refundId: string
): Promise<RefundRequest | null> {
  const collection = await getRefundCollection();

  try {
    return await collection.findOne({
      _id: new ObjectId(refundId),
    });
  } catch {
    return null;
  }
}

/**
 * Get refund requests for a user
 */
export async function getUserRefundRequests(
  userId: string,
  limit: number = 10
): Promise<RefundRequest[]> {
  const collection = await getRefundCollection();

  return collection
    .find({ userId })
    .sort({ requestedAt: -1 })
    .limit(limit)
    .toArray();
}

/**
 * Get all pending refund requests (for admin)
 */
export async function getPendingRefundRequests(
  limit: number = 50
): Promise<RefundRequest[]> {
  const collection = await getRefundCollection();

  return collection
    .find({ status: { $in: ["pending", "approved"] } })
    .sort({ requestedAt: 1 }) // Oldest first for admin review
    .limit(limit)
    .toArray();
}

/**
 * Get refund requests by status (for admin)
 */
export async function getRefundRequestsByStatus(
  status: RefundStatus,
  limit: number = 50
): Promise<RefundRequest[]> {
  const collection = await getRefundCollection();

  return collection
    .find({ status })
    .sort({ requestedAt: -1 })
    .limit(limit)
    .toArray();
}

/**
 * Update refund request status and admin notes
 * Called by admin when reviewing/processing refund
 */
export async function updateRefundRequest(
  refundId: string,
  adminId: string,
  updates: UpdateRefundRequestInput
): Promise<RefundRequest> {
  const collection = await getRefundCollection();

  const refundObjectId = new ObjectId(refundId);
  const now = new Date();

  // Build status history entry
  const historyEntry = {
    status: updates.status,
    timestamp: now,
    changedBy: adminId,
    reason: updates.adminNotes,
  };

  const result = await collection.findOneAndUpdate(
    { _id: refundObjectId },
    {
      $set: {
        status: updates.status,
        adminNotes: updates.adminNotes,
        adminId,
        refundMethod: updates.refundMethod || "original_payment_method",
        refundedAmount: updates.refundAmount,
        reviewedAt: now,
      },
      $push: {
        statusHistory: historyEntry,
      },
    },
    { returnDocument: "after" }
  );

  if (!result) throw new Error("Refund request not found");
  return result;
}

/**
 * Update refund request with Stripe refund information
 * Called after manual Stripe refund is initiated
 */
export async function updateRefundWithStripeInfo(
  refundId: string,
  stripeRefundId: string,
  adminId: string
): Promise<RefundRequest> {
  const collection = await getRefundCollection();

  const now = new Date();

  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(refundId) },
    {
      $set: {
        status: "processed",
        refundIntentId: stripeRefundId,
        processedAt: now,
        stripeRefundStatus: "pending",
      },
      $push: {
        statusHistory: {
          status: "processed",
          timestamp: now,
          changedBy: adminId,
          reason: `Stripe refund initiated: ${stripeRefundId}`,
        },
      },
    },
    { returnDocument: "after" }
  );

  if (!result) throw new Error("Refund request not found");
  return result;
}

/**
 * Update refund status based on Stripe webhook
 * Called when Stripe webhook confirms refund completion/failure
 */
export async function updateRefundFromStripeWebhook(
  stripeRefundId: string,
  status: "succeeded" | "failed",
  error?: string
): Promise<RefundRequest | null> {
  const collection = await getRefundCollection();

  const now = new Date();

  const result = await collection.findOneAndUpdate(
    { refundIntentId: stripeRefundId },
    {
      $set: {
        status: status === "succeeded" ? "processed" : "failed",
        stripeRefundStatus: status,
        stripeRefundError: error,
        completedAt: status === "succeeded" ? now : undefined,
      },
      $push: {
        statusHistory: {
          status: status === "succeeded" ? "processed" : "failed",
          timestamp: now,
          changedBy: "system",
          reason: `Stripe webhook: refund ${status}${error ? `: ${error}` : ""}`,
        },
      },
    },
    { returnDocument: "after" }
  );

  return result || null;
}

/**
 * Get refund request by Stripe refund ID
 */
export async function getRefundByStripeId(
  stripeRefundId: string
): Promise<RefundRequest | null> {
  const collection = await getRefundCollection();
  return collection.findOne({ refundIntentId: stripeRefundId });
}

/**
 * Get refund statistics for a period
 */
export async function getRefundStats(
  startDate: Date,
  endDate: Date
): Promise<{
  totalRequested: number;
  totalApproved: number;
  totalDenied: number;
  totalProcessed: number;
  totalFailed: number;
  totalAmount: number;
}> {
  const collection = await getRefundCollection();

  const pipeline = [
    {
      $match: {
        requestedAt: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $facet: {
        byStatus: [
          {
            $group: {
              _id: "$status",
              count: { $sum: 1 },
            },
          },
        ],
        totalAmount: [
          {
            $group: {
              _id: null,
              total: { $sum: "$amount" },
            },
          },
        ],
      },
    },
  ];

  const results = await collection.aggregate(pipeline).toArray();
  const facets = results[0] || { byStatus: [], totalAmount: [] };

  const statMap = new Map();
  facets.byStatus.forEach(
    (item: { _id: string; count: number }) => {
      statMap.set(item._id, item.count);
    }
  );

  return {
    totalRequested: statMap.get("pending") || 0 + statMap.get("approved") || 0 + statMap.get("processed") || 0 + statMap.get("denied") || 0 + statMap.get("failed") || 0,
    totalApproved: statMap.get("approved") || 0,
    totalDenied: statMap.get("denied") || 0,
    totalProcessed: statMap.get("processed") || 0,
    totalFailed: statMap.get("failed") || 0,
    totalAmount:
      facets.totalAmount[0]?.total || 0,
  };
}

/**
 * Delete a refund request (soft delete would be better in production)
 */
export async function deleteRefundRequest(refundId: string): Promise<boolean> {
  const collection = await getRefundCollection();

  const result = await collection.deleteOne({
    _id: new ObjectId(refundId),
  });

  return result.deletedCount === 1;
}
