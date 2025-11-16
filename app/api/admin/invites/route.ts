import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import {
  createAdminInvite,
  getPendingInvites,
  getInviteStats,
} from "@/lib/db/models/admin-invite-operations";

/**
 * POST /api/admin/invites
 * Create a new admin invite (admin-only)
 *
 * Request body:
 * {
 *   email: string (required)
 *   role: "user" | "admin" (required)
 *   customMessage?: string (optional)
 *   expiresIn?: number (milliseconds, default: 7 days)
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication and admin role
    const adminUser = await requireAdmin();
    if (!adminUser) {
      return NextResponse.json(
        { error: "Unauthorized - admin access required" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { email, role, customMessage, expiresIn } = body;

    // Validate required fields
    if (!email || !role) {
      return NextResponse.json(
        { error: "Missing required fields: email, role" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate role
    if (role !== "user" && role !== "admin") {
      return NextResponse.json(
        { error: "Invalid role - must be 'user' or 'admin'" },
        { status: 400 }
      );
    }

    // Create the invite
    const invite = await createAdminInvite(
      email,
      role,
      adminUser.user.id,
      customMessage,
      expiresIn
    );

    // Return invite details (excluding token for security in list views, but including it here for immediate use)
    return NextResponse.json(
      {
        success: true,
        message: "Invite created successfully",
        invite: {
          id: invite._id?.toString(),
          email: invite.email,
          role: invite.role,
          token: invite.token,
          expiresAt: invite.expiresAt,
          createdAt: invite.createdAt,
          inviteLink: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/admin/invite/${invite.token}`,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating admin invite:", error);
    return NextResponse.json(
      { error: "Failed to create invite" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/invites
 * Get all pending invites for admin management (admin-only)
 *
 * Query parameters:
 * ?status=pending|accepted|expired
 * ?page=0 (default)
 * ?limit=50 (default)
 */
export async function GET(request: NextRequest) {
  try {
    // Check authentication and admin role
    const adminUser = await requireAdmin();
    if (!adminUser) {
      return NextResponse.json(
        { error: "Unauthorized - admin access required" },
        { status: 403 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    // status filter available for future use
    // const status = searchParams.get("status") as "pending" | "accepted" | "expired" | null;
    const page = parseInt(searchParams.get("page") || "0", 10);
    const limit = parseInt(searchParams.get("limit") || "50", 10);

    const skip = page * limit;

    // Get pending invites
    const invites = await getPendingInvites(limit, skip);

    // Get stats
    const stats = await getInviteStats();

    return NextResponse.json(
      {
        success: true,
        data: invites.map((invite) => ({
          id: invite._id?.toString(),
          email: invite.email,
          role: invite.role,
          status: invite.status,
          createdAt: invite.createdAt,
          expiresAt: invite.expiresAt,
          acceptedAt: invite.acceptedAt,
          createdBy: invite.createdBy,
        })),
        pagination: {
          page,
          limit,
          skip,
        },
        stats,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching admin invites:", error);
    return NextResponse.json(
      { error: "Failed to fetch invites" },
      { status: 500 }
    );
  }
}
