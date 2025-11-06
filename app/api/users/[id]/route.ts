import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import {
  getUserById,
  updateUserProfile,
  updateEnergyAlignment,
  awardSpiritualPoints,
  addBadge,
  updateUserStats,
  suspendUser,
  reactivateUser,
  UpdateUserProfileInput,
} from "@/lib/db/models";

/**
 * GET /api/users/[id]
 * 
 * Get user profile by ID
 * Users can only view their own profile unless they're admin
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { id } = params;

    // Users can only view their own profile unless admin
    if (currentUser.role !== "admin" && currentUser.id !== id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    const user = await getUserById(id);

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Remove sensitive fields for non-admin users viewing their own profile
    const sanitizedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      phone: user.phone,
      location: user.location,
      spiritualProfile: user.spiritualProfile,
      preferences: user.preferences,
      stats: user.stats,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      // Admin-only fields
      ...(currentUser.role === "admin" && {
        role: user.role,
        isActive: user.isActive,
        isSuspended: user.isSuspended,
        suspensionReason: user.suspensionReason,
        adminNotes: user.adminNotes,
      }),
    };

    return NextResponse.json({ user: sanitizedUser });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/users/[id]
 * 
 * Update user profile
 * Users can update their own profile
 * Admins can update any profile and perform special actions
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { id } = params;

    // Users can only update their own profile unless admin
    if (currentUser.role !== "admin" && currentUser.id !== id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { action, ...updates } = body;

    // Handle special admin actions
    if (action && currentUser.role === "admin") {
      switch (action) {
        case "update-energy":
          const success = await updateEnergyAlignment(id, updates.alignment);
          return NextResponse.json({
            success,
            message: "Energy alignment updated",
          });

        case "award-points":
          const newPoints = await awardSpiritualPoints(id, updates.points);
          return NextResponse.json({
            success: true,
            spiritualPoints: newPoints,
            message: `Awarded ${updates.points} spiritual points`,
          });

        case "add-badge":
          const badgeAdded = await addBadge(id, updates.badgeId);
          return NextResponse.json({
            success: badgeAdded,
            message: badgeAdded ? "Badge awarded" : "Badge already exists",
          });

        case "update-stats":
          const statsUpdated = await updateUserStats(id, updates.stats);
          return NextResponse.json({
            success: statsUpdated,
            message: "Stats updated",
          });

        case "suspend":
          const suspended = await suspendUser(id, updates.reason);
          return NextResponse.json({
            success: suspended,
            message: "User suspended",
          });

        case "reactivate":
          const reactivated = await reactivateUser(id);
          return NextResponse.json({
            success: reactivated,
            message: "User reactivated",
          });

        default:
          return NextResponse.json(
            { error: "Invalid action" },
            { status: 400 }
          );
      }
    }

    // Regular profile update
    const profileUpdates: UpdateUserProfileInput = {};

    if (updates.name) profileUpdates.name = updates.name;
    if (updates.phone) profileUpdates.phone = updates.phone;
    if (updates.birthDate) profileUpdates.birthDate = new Date(updates.birthDate);
    if (updates.birthTime) profileUpdates.birthTime = updates.birthTime;
    if (updates.birthPlace) profileUpdates.birthPlace = updates.birthPlace;
    if (updates.location) profileUpdates.location = updates.location;
    if (updates.spiritualInterests) profileUpdates.spiritualInterests = updates.spiritualInterests;
    if (updates.primaryIntentions) profileUpdates.primaryIntentions = updates.primaryIntentions;
    if (updates.preferences) profileUpdates.preferences = updates.preferences;

    const updatedUser = await updateUserProfile(id, profileUpdates);

    if (!updatedUser) {
      return NextResponse.json(
        { error: "Failed to update profile" },
        { status: 500 }
      );
    }

    // Sanitize response
    const sanitizedUser = {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      location: updatedUser.location,
      spiritualProfile: updatedUser.spiritualProfile,
      preferences: updatedUser.preferences,
      updatedAt: updatedUser.updatedAt,
    };

    return NextResponse.json({
      user: sanitizedUser,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/users/[id]
 * 
 * Delete user account (admin only)
 * For now, we'll just mark as inactive rather than hard delete
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Only admins can delete users
    if (currentUser.role !== "admin") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    const { id } = params;

    // Soft delete by suspending the account
    const success = await suspendUser(id, "Account deleted by admin");

    return NextResponse.json({
      success,
      message: success ? "User account deactivated" : "Failed to deactivate user",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
