import { getDatabase } from "@/lib/db/mongodb";
import { ObjectId } from "mongodb";

/**
 * Admin Dashboard Data Fetching Utilities
 * 
 * Server-side utilities for fetching aggregated admin metrics
 */

/**
 * Helper to get database instance
 */
async function getDb() {
  return getDatabase();
}

export interface AdminMetrics {
  totalUsers: number;
  newUsersThisMonth: number;
  adminUsers: number;
  activeSessionsCount: number;
  pendingServiceRequests: number;
  completedServicesThisMonth: number;
  totalRevenue: number;
  monthlyRevenue: number;
  averageServiceCompletion: number; // in hours
  satisfactionRate: number; // 0-100
}

export interface ActivityFeedItem {
  id: string;
  type: "service_request" | "payment" | "user_signup" | "admin_action";
  title: string;
  description: string;
  timestamp: Date;
  icon: string;
  color: string;
  userId?: string;
  userName?: string;
  userEmail?: string;
  amount?: number;
}

export interface QuickStat {
  label: string;
  value: string | number;
  subtext?: string;
  trend?: "up" | "down" | "neutral";
  color: string;
}

export interface RevenueBreakdown {
  serviceName: string;
  revenue: number;
  percentage: number;
  orderCount: number;
}

export interface PendingRequest {
  id: string;
  serviceName: string;
  userName: string;
  userEmail: string;
  requestedAt: Date;
  priority: "high" | "medium" | "low";
  status: string;
}

/**
 * Fetch overall admin metrics
 */
export async function getAdminMetrics(): Promise<AdminMetrics> {
  try {
    const db = getDb();
    if (!db) throw new Error("Database connection failed");

    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Fetch all metrics in parallel
    const [
      totalUsers,
      newUsersThisMonth,
      adminUsers,
      activeSessions,
      payments,
    ] = await Promise.all([
      db.collection("user").countDocuments(),
      db.collection("user").countDocuments({
        createdAt: { $gte: firstDayOfMonth },
      }),
      db.collection("user").countDocuments({ role: "admin" }),
      db.collection("loginHistory").countDocuments({
        loginAt: { $gte: thirtyDaysAgo },
        status: "success",
        logoutAt: null,
      }),
      db
        .collection("payment")
        .find({
          status: { $in: ["completed", "partially_paid"] },
          updatedAt: { $gte: firstDayOfMonth },
        })
        .toArray(),
    ]);

    const totalRevenue = payments.reduce((sum, p) => sum + p.amountPaid, 0);
    const monthlyRevenue = payments
      .filter((p) => new Date(p.updatedAt) >= firstDayOfMonth)
      .reduce((sum, p) => sum + p.amountPaid, 0);

    return {
      totalUsers,
      newUsersThisMonth,
      adminUsers,
      activeSessionsCount: activeSessions,
      pendingServiceRequests: 0, // Will be populated when service request model is available
      completedServicesThisMonth: 0, // Will be populated when service request model is available
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      monthlyRevenue: Math.round(monthlyRevenue * 100) / 100,
      averageServiceCompletion: 24, // Default value - will be calculated when service requests are tracked
      satisfactionRate: 95, // Default value - will be calculated from testimonials/reviews
    };
  } catch (error) {
    console.error("Error fetching admin metrics:", error);
    return {
      totalUsers: 0,
      newUsersThisMonth: 0,
      adminUsers: 0,
      activeSessionsCount: 0,
      pendingServiceRequests: 0,
      completedServicesThisMonth: 0,
      totalRevenue: 0,
      monthlyRevenue: 0,
      averageServiceCompletion: 0,
      satisfactionRate: 0,
    };
  }
}

/**
 * Fetch recent activity feed
 */
export async function getActivityFeed(
  limit: number = 10
): Promise<ActivityFeedItem[]> {
  try {
    const db = getDb();
    if (!db) throw new Error("Database connection failed");

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    // Fetch recent users
    const recentUsers = await db
      .collection("user")
      .find({
        createdAt: { $gte: thirtyDaysAgo },
      })
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    // Fetch recent payments
    const recentPayments = await db
      .collection("payment")
      .find({
        updatedAt: { $gte: thirtyDaysAgo },
        status: "completed",
      })
      .sort({ updatedAt: -1 })
      .limit(5)
      .toArray();

    const activity: ActivityFeedItem[] = [];

    // Add user signups
    for (const user of recentUsers) {
      activity.push({
        id: user._id?.toString() || "",
        type: "user_signup",
        title: "New Member Joined",
        description: `${user.name || "New member"} joined the circle`,
        timestamp: new Date(user.createdAt),
        icon: "👤",
        color: "#2C5530",
        userName: user.name,
        userEmail: user.email,
      });
    }

    // Add payments
    for (const payment of recentPayments) {
      activity.push({
        id: payment._id?.toString() || "",
        type: "payment",
        title: "Payment Completed",
        description: `${payment.serviceName} - $${payment.amountPaid}`,
        timestamp: new Date(payment.updatedAt),
        icon: "💰",
        color: "#B8860B",
        amount: payment.amountPaid,
      });
    }

    // Sort by timestamp and return top limit items
    return activity.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, limit);
  } catch (error) {
    console.error("Error fetching activity feed:", error);
    return [];
  }
}

/**
 * Fetch revenue breakdown by service
 */
export async function getRevenueBreakdown(): Promise<RevenueBreakdown[]> {
  try {
    const db = getDb();
    if (!db) throw new Error("Database connection failed");

    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const result = await db
      .collection("payment")
      .aggregate([
        {
          $match: {
            status: { $in: ["completed", "partially_paid"] },
            updatedAt: { $gte: firstDayOfMonth },
          },
        },
        {
          $group: {
            _id: "$serviceName",
            revenue: { $sum: "$amountPaid" },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { revenue: -1 },
        },
      ])
      .toArray();

    const totalRevenue = result.reduce((sum, item) => sum + item.revenue, 0);

    return result.map((item) => ({
      serviceName: item._id || "Unknown Service",
      revenue: Math.round(item.revenue * 100) / 100,
      percentage: totalRevenue > 0 ? Math.round((item.revenue / totalRevenue) * 100) : 0,
      orderCount: item.count,
    }));
  } catch (error) {
    console.error("Error fetching revenue breakdown:", error);
    return [];
  }
}

/**
 * Fetch quick stats for dashboard
 */
export async function getQuickStats(): Promise<QuickStat[]> {
  try {
    const metrics = await getAdminMetrics();
    const breakdown = await getRevenueBreakdown();

    const topService = breakdown[0];

    return [
      {
        label: "Total Users",
        value: metrics.totalUsers,
        subtext: `${metrics.newUsersThisMonth} new this month`,
        trend: metrics.newUsersThisMonth > 0 ? "up" : "neutral",
        color: "#2C5530",
      },
      {
        label: "Monthly Revenue",
        value: `$${metrics.monthlyRevenue.toFixed(2)}`,
        subtext: topService
          ? `Top: ${topService.serviceName}`
          : "No services this month",
        trend: metrics.monthlyRevenue > 0 ? "up" : "neutral",
        color: "#B8860B",
      },
      {
        label: "Completion Rate",
        value: `${metrics.averageServiceCompletion}h avg`,
        subtext: "Average service time",
        trend: "neutral",
        color: "#CC8800",
      },
      {
        label: "Satisfaction",
        value: `${metrics.satisfactionRate}%`,
        subtext: "Client satisfaction",
        trend: metrics.satisfactionRate >= 90 ? "up" : "neutral",
        color: "#8B0000",
      },
    ];
  } catch (error) {
    console.error("Error fetching quick stats:", error);
    return [];
  }
}

/**
 * Fetch pending service requests (placeholder)
 */
export async function getPendingRequests(
  limit: number = 10
): Promise<PendingRequest[]> {
  try {
    const db = getDb();
    if (!db) throw new Error("Database connection failed");

    // This is a placeholder - service requests model will be created in 5.4
    // For now, return empty array
    return [];
  } catch (error) {
    console.error("Error fetching pending requests:", error);
    return [];
  }
}
