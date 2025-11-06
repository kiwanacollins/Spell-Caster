import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import {
  getUserById,
  updateUserProfile,
  updateLastActivity,
  generateReferralCode,
  UpdateUserProfileInput,
} from "@/lib/db/models";

/**
 * GET /api/users/me
 * 
 * Get the current authenticated user's profile
 */
export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Update last activity
    await updateLastActivity(currentUser.id);

    // Get full user profile from database
    const user = await getUserById(currentUser.id);

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Return full profile (user viewing their own data)
    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        image: user.image,
        phone: user.phone,
        location: user.location,
        spiritualProfile: user.spiritualProfile,
        preferences: user.preferences,
        stats: user.stats,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error fetching current user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user profile" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/users/me
 * 
 * Update the current user's profile
 */
export async function PATCH(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { action, ...updates } = body;

    // Handle special actions
    if (action) {
      switch (action) {
        case "generate-referral-code":
          const referralCode = await generateReferralCode(currentUser.id);
          return NextResponse.json({
            success: true,
            referralCode,
            message: "Referral code generated",
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

    if (updates.name !== undefined) profileUpdates.name = updates.name;
    if (updates.phone !== undefined) profileUpdates.phone = updates.phone;
    if (updates.birthDate) profileUpdates.birthDate = new Date(updates.birthDate);
    if (updates.birthTime !== undefined) profileUpdates.birthTime = updates.birthTime;
    if (updates.birthPlace) profileUpdates.birthPlace = updates.birthPlace;
    if (updates.location) profileUpdates.location = updates.location;
    if (updates.spiritualInterests) profileUpdates.spiritualInterests = updates.spiritualInterests;
    if (updates.primaryIntentions) profileUpdates.primaryIntentions = updates.primaryIntentions;
    if (updates.preferences) profileUpdates.preferences = updates.preferences;

    const updatedUser = await updateUserProfile(currentUser.id, profileUpdates);

    if (!updatedUser) {
      return NextResponse.json(
        { error: "Failed to update profile" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        location: updatedUser.location,
        spiritualProfile: updatedUser.spiritualProfile,
        preferences: updatedUser.preferences,
        updatedAt: updatedUser.updatedAt,
      },
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Error updating current user:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
