import { requireAdmin } from "@/lib/auth";
import {
  getServiceRequestAnalytics,
  getPendingRequestsByPriority,
} from "@/lib/db/models";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/service-requests/analytics/metrics
 * 
 * Admin only: Get service request analytics
 */
export async function GET(request: NextRequest) {
  try {
    await requireAdmin();

    const searchParams = request.nextUrl.searchParams;
    const timeframeParam = searchParams.get("timeframe");
    const timeframeHours = timeframeParam ? parseInt(timeframeParam) : 30 * 24;

    const [analytics, pendingByPriority] = await Promise.all([
      getServiceRequestAnalytics(timeframeHours),
      getPendingRequestsByPriority(),
    ]);

    return NextResponse.json({
      ...analytics,
      pendingByPriority,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);

    if (error instanceof Error && error.message === "Not authenticated as admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
