import { getCurrentUser, requireAdmin } from "@/lib/auth";
import {
  createServiceRequestOp,
  getUserServiceRequests,
  getAdminServiceRequests,
  getServiceRequestCount,
  type ServiceRequestStatus,
  type PriorityLevel,
} from "@/lib/db/models";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/service-requests
 * 
 * Admin: Get all service requests with filtering
 * User: Get their own service requests
 */
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);
    const skip = parseInt(searchParams.get("skip") || "0");

    // Check if user is admin
    const adminData = await requireAdmin().catch(() => null);
    const isAdmin = !!adminData;

    if (isAdmin) {
      // Admin: Get all requests with filtering
      const filters: {
        status?: ServiceRequestStatus;
        serviceType?: string;
        priority?: PriorityLevel;
        search?: string;
      } = {};

      if (searchParams.has("status")) {
        const status = searchParams.get("status");
        if (status) filters.status = status as ServiceRequestStatus;
      }

      if (searchParams.has("serviceType")) {
        const serviceType = searchParams.get("serviceType");
        if (serviceType) filters.serviceType = serviceType;
      }

      if (searchParams.has("priority")) {
        const priority = searchParams.get("priority");
        if (priority) filters.priority = priority as PriorityLevel;
      }

      if (searchParams.has("search")) {
        const search = searchParams.get("search");
        if (search) filters.search = search;
      }

      const requests = await getAdminServiceRequests(filters, limit, skip);
      const total = await getServiceRequestCount();

      return NextResponse.json({
        data: requests,
        pagination: { limit, skip, total },
      });
    } else {
      // User: Get only their requests
      const requests = await getUserServiceRequests(user.id, limit, skip);
      const total = await getServiceRequestCount(user.id);

      return NextResponse.json({
        data: requests,
        pagination: { limit, skip, total },
      });
    }
  } catch (error) {
    console.error("Error fetching service requests:", error);
    return NextResponse.json(
      { error: "Failed to fetch service requests" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/service-requests
 * 
 * Create a new service request
 */
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { serviceName, serviceType, description, clientNotes, paymentIntentId } =
      body;

    if (!serviceName || !serviceType || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const serviceRequest = await createServiceRequestOp(
      user.id,
      serviceName,
      serviceType,
      description,
      clientNotes,
      paymentIntentId
    );

    return NextResponse.json(serviceRequest, { status: 201 });
  } catch (error) {
    console.error("Error creating service request:", error);
    return NextResponse.json(
      { error: "Failed to create service request" },
      { status: 500 }
    );
  }
}
