import { getDatabase } from "@/lib/db/mongodb";
import { ObjectId } from "mongodb";
import {
  ServiceRequest,
  ServiceRequestStatus,
  PriorityLevel,
  RequestStatusUpdate,
  createServiceRequest,
} from "./service-request";

/**
 * Service Request Database Operations
 */

/**
 * Create a new service request
 */
export async function createServiceRequestOp(
  userId: string,
  serviceName: string,
  serviceType: string,
  description: string,
  clientNotes?: string,
  paymentIntentId?: string
): Promise<ServiceRequest> {
  const db = await getDatabase();
  const request = createServiceRequest(
    userId,
    serviceName,
    serviceType,
    description,
    clientNotes
  );

  if (paymentIntentId) {
    request.paymentIntentId = paymentIntentId;
  }

  const result = await db.collection("serviceRequest").insertOne(request as any);
  return { ...request, _id: result.insertedId };
}

/**
 * Get service request by ID
 */
export async function getServiceRequest(
  requestId: string
): Promise<ServiceRequest | null> {
  const db = await getDatabase();
  return (await db.collection("serviceRequest").findOne({
    _id: new ObjectId(requestId),
  })) as ServiceRequest | null;
}

/**
 * Get all service requests for a user
 */
export async function getUserServiceRequests(
  userId: string,
  limit: number = 50,
  skip: number = 0
): Promise<ServiceRequest[]> {
  const db = await getDatabase();
  return (await db
    .collection("serviceRequest")
    .find({ userId })
    .sort({ requestedAt: -1 })
    .limit(limit)
    .skip(skip)
    .toArray()) as ServiceRequest[];
}

/**
 * Get all service requests for admin (with filtering)
 */
export async function getAdminServiceRequests(
  filters?: {
    status?: ServiceRequestStatus;
    serviceType?: string;
    assignedTo?: string;
    priority?: PriorityLevel;
    search?: string; // Search in description or client notes
  },
  limit: number = 50,
  skip: number = 0
): Promise<ServiceRequest[]> {
  const db = await getDatabase();

  const query: any = {};

  if (filters?.status) {
    query.status = filters.status;
  }

  if (filters?.serviceType) {
    query.serviceType = filters.serviceType;
  }

  if (filters?.assignedTo) {
    query.assignedTo = filters.assignedTo;
  }

  if (filters?.priority) {
    query.priority = filters.priority;
  }

  if (filters?.search) {
    query.$or = [
      { description: { $regex: filters.search, $options: "i" } },
      { clientNotes: { $regex: filters.search, $options: "i" } },
      { serviceName: { $regex: filters.search, $options: "i" } },
    ];
  }

  return (await db
    .collection("serviceRequest")
    .find(query)
    .sort({ priority: -1, requestedAt: -1 })
    .limit(limit)
    .skip(skip)
    .toArray()) as ServiceRequest[];
}

/**
 * Get service request count
 */
export async function getServiceRequestCount(
  userId?: string
): Promise<number> {
  const db = await getDatabase();
  const query = userId ? { userId } : {};
  return db.collection("serviceRequest").countDocuments(query);
}

/**
 * Update service request status
 */
export async function updateServiceRequestStatus(
  requestId: string,
  newStatus: ServiceRequestStatus,
  adminId: string,
  notes?: string
): Promise<ServiceRequest | null> {
  const db = await getDatabase();

  const statusUpdate: RequestStatusUpdate = {
    status: newStatus,
    updatedBy: adminId,
    updatedAt: new Date(),
    notes,
  };

  const updateData: any = {
    status: newStatus,
    updatedAt: new Date(),
    $push: { statusHistory: statusUpdate },
  };

  // Set additional fields based on status
  if (newStatus === "in_progress") {
    updateData.startedAt = new Date();
  } else if (newStatus === "completed") {
    updateData.completedAt = new Date();
  }

  const result = await db.collection("serviceRequest").findOneAndUpdate(
    { _id: new ObjectId(requestId) },
    { $set: updateData },
    { returnDocument: "after" }
  );

  return result.value as ServiceRequest | null;
}

/**
 * Assign service request to admin
 */
export async function assignServiceRequest(
  requestId: string,
  adminId: string
): Promise<ServiceRequest | null> {
  const db = await getDatabase();

  const result = await db.collection("serviceRequest").findOneAndUpdate(
    { _id: new ObjectId(requestId) },
    {
      $set: {
        assignedTo: adminId,
        assignedAt: new Date(),
        updatedAt: new Date(),
      },
    },
    { returnDocument: "after" }
  );

  return result.value as ServiceRequest | null;
}

/**
 * Update priority
 */
export async function updateRequestPriority(
  requestId: string,
  priority: PriorityLevel
): Promise<ServiceRequest | null> {
  const db = await getDatabase();

  const result = await db.collection("serviceRequest").findOneAndUpdate(
    { _id: new ObjectId(requestId) },
    {
      $set: {
        priority,
        updatedAt: new Date(),
      },
    },
    { returnDocument: "after" }
  );

  return result.value as ServiceRequest | null;
}

/**
 * Add admin notes
 */
export async function addAdminNotes(
  requestId: string,
  notes: string
): Promise<ServiceRequest | null> {
  const db = await getDatabase();

  const result = await db.collection("serviceRequest").findOneAndUpdate(
    { _id: new ObjectId(requestId) },
    {
      $set: {
        adminNotes: notes,
        updatedAt: new Date(),
      },
    },
    { returnDocument: "after" }
  );

  return result.value as ServiceRequest | null;
}

/**
 * Get service request analytics
 */
export async function getServiceRequestAnalytics(timeframeHours: number = 30 * 24) {
  const db = await getDatabase();

  const cutoffDate = new Date(Date.now() - timeframeHours * 60 * 60 * 1000);

  const [
    totalRequests,
    completedRequests,
    averageCompletionTime,
    revenueByService,
    requestsByStatus,
  ] = await Promise.all([
    db.collection("serviceRequest").countDocuments({
      requestedAt: { $gte: cutoffDate },
    }),

    db.collection("serviceRequest").countDocuments({
      status: "completed",
      completedAt: { $gte: cutoffDate },
    }),

    db
      .collection("serviceRequest")
      .aggregate([
        {
          $match: {
            status: "completed",
            completedAt: { $gte: cutoffDate },
          },
        },
        {
          $project: {
            completionTime: {
              $subtract: ["$completedAt", "$startedAt"],
            },
          },
        },
        {
          $group: {
            _id: null,
            avgTime: { $avg: "$completionTime" },
          },
        },
      ])
      .toArray(),

    db
      .collection("serviceRequest")
      .aggregate([
        {
          $match: {
            requestedAt: { $gte: cutoffDate },
          },
        },
        {
          $group: {
            _id: "$serviceName",
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
      ])
      .toArray(),

    db
      .collection("serviceRequest")
      .aggregate([
        {
          $match: {
            requestedAt: { $gte: cutoffDate },
          },
        },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ])
      .toArray(),
  ]);

  const completionRate =
    totalRequests > 0
      ? Math.round((completedRequests / totalRequests) * 100)
      : 0;
  const avgCompletionTime = averageCompletionTime[0]?.avgTime || 0;

  return {
    totalRequests,
    completedRequests,
    completionRate,
    averageCompletionTimeMs: avgCompletionTime,
    averageCompletionTimeHours: Math.round(avgCompletionTime / (1000 * 60 * 60)),
    revenueByService,
    requestsByStatus,
  };
}

/**
 * Get pending requests count by priority
 */
export async function getPendingRequestsByPriority(): Promise<
  Record<string, number>
> {
  const db = await getDatabase();

  const results = await db
    .collection("serviceRequest")
    .aggregate([
      {
        $match: { status: "pending" },
      },
      {
        $group: {
          _id: "$priority",
          count: { $sum: 1 },
        },
      },
    ])
    .toArray();

  const priorityCounts: Record<string, number> = {
    urgent: 0,
    high: 0,
    medium: 0,
    low: 0,
  };

  for (const result of results) {
    priorityCounts[result._id] = result.count;
  }

  return priorityCounts;
}
