import { getCurrentUser, requireAdmin } from "@/lib/auth";
import {
  getServiceRequest,
  updateServiceRequestStatus,
  assignServiceRequest,
  updateRequestPriority,
  addAdminNotes,
} from "@/lib/db/models";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/service-requests/[id]
 * 
 * Get a specific service request
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const serviceRequest = await getServiceRequest(id);

    if (!serviceRequest) {
      return NextResponse.json(
        { error: "Service request not found" },
        { status: 404 }
      );
    }

    // Check if user owns this request or is admin
    const isAdmin = await requireAdmin().catch(() => null);
    if (serviceRequest.userId !== user.id && !isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(serviceRequest);
  } catch (error) {
    console.error("Error fetching service request:", error);
    return NextResponse.json(
      { error: "Failed to fetch service request" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/service-requests/[id]
 * 
 * Admin only: Update service request
 */
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    await requireAdmin();

    const { id } = await params;
    const body = await request.json();

    let updatedRequest = await getServiceRequest(id);

    if (!updatedRequest) {
      return NextResponse.json(
        { error: "Service request not found" },
        { status: 404 }
      );
    }

    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Update status
    if (body.status) {
      const statusUpdate = body.statusUpdate || undefined;
      updatedRequest = await updateServiceRequestStatus(
        id,
        body.status,
        user.id,
        statusUpdate
      );
    }

    // Update priority
    if (body.priority) {
      updatedRequest = await updateRequestPriority(id, body.priority);
    }

    // Update admin notes
    if (body.adminNotes !== undefined) {
      updatedRequest = await addAdminNotes(id, body.adminNotes);
    }

    // Assign to admin
    if (body.assignedTo) {
      updatedRequest = await assignServiceRequest(id, body.assignedTo);
    }

    return NextResponse.json(updatedRequest);
  } catch (error) {
    console.error("Error updating service request:", error);

    if (error instanceof Error && error.message === "Not authenticated as admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(
      { error: "Failed to update service request" },
      { status: 500 }
    );
  }
}
