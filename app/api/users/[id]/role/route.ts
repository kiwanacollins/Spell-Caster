import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getDatabase } from "@/lib/db/mongodb";

/**
 * PUT /api/users/[id]/role
 * 
 * Update user role (admin only)
 * 
 * Request body:
 * {
 *   role: "user" | "admin"
 * }
 * 
 * Returns updated user with new role
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Check if current user is admin
    if (currentUser.role !== "admin") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { role } = body;

    // Validate role
    if (!role || !["user", "admin"].includes(role)) {
      return NextResponse.json(
        { error: "Invalid role. Must be 'user' or 'admin'" },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const usersCollection = db.collection("user");

    // Fetch the user to update (use id for BetterAuth compatibility)
    const targetUser = await usersCollection.findOne({ id: id });

    if (!targetUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Prevent demoting the last admin
    if (targetUser.role === "admin" && role === "user") {
      const adminCount = await usersCollection.countDocuments({ role: "admin" });
      if (adminCount <= 1) {
        return NextResponse.json(
          { error: "Cannot demote the last admin" },
          { status: 400 }
        );
      }
    }

    // Update user role
    const result = await usersCollection.findOneAndUpdate(
      { id: id },
      {
        $set: {
          role: role,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" }
    );

    if (!result || !result.value) {
      return NextResponse.json(
        { error: "Failed to update user role" },
        { status: 500 }
      );
    }

    // Return sanitized user data
    const userValue = result.value as any;
    const { password, ...safeUser } = userValue;
    return NextResponse.json({
      success: true,
      message: `User role updated to '${role}'`,
      user: {
        id: safeUser.id,
        name: safeUser.name,
        email: safeUser.email,
        role: safeUser.role,
        image: safeUser.image,
        createdAt: safeUser.createdAt,
        isActive: safeUser.isActive,
        isSuspended: safeUser.isSuspended,
      },
    });
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json(
      { error: "Failed to update user role" },
      { status: 500 }
    );
  }
}
