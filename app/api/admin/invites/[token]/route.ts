import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { revokeAdminInvite } from "@/lib/db/models/admin-invite-operations";

/**
 * DELETE /api/admin/invites/[token]
 * Revoke an admin invite (admin-only)
 *
 * Revokes a pending invite, preventing it from being accepted
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    // Check authentication and admin role
    const adminUser = await requireAdmin();
    if (!adminUser) {
      return NextResponse.json(
        { error: "Unauthorized - admin access required" },
        { status: 403 }
      );
    }

    const { token } = await params;

    if (!token) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 400 }
      );
    }

    // Revoke the invite
    const result = await revokeAdminInvite(token);

    if (!result) {
      return NextResponse.json(
        { error: "Invite not found or already accepted/expired" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Invite revoked successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error revoking admin invite:", error);
    return NextResponse.json(
      { error: "Failed to revoke invite" },
      { status: 500 }
    );
  }
}
