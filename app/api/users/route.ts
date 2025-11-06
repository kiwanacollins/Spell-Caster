import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import {
  getAllUsers,
  searchUsers,
  initializeUserSpiritualProfile,
} from "@/lib/db/models";

/**
 * GET /api/users
 * 
 * Get all users (admin only) or search users
 * Query params:
 * - search: string - Search by name or email
 * - limit: number - Results per page (default 50)
 * - skip: number - Pagination offset
 */
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Check if user is admin
    if (user.role !== "admin") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get("search");
    const limit = parseInt(searchParams.get("limit") || "50");
    const skip = parseInt(searchParams.get("skip") || "0");

    let users;

    if (searchQuery) {
      // Search users by name or email
      users = await searchUsers(searchQuery);
    } else {
      // Get all users with pagination
      users = await getAllUsers({}, limit, skip);
    }

    // Remove sensitive fields before sending
    const sanitizedUsers = users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      image: u.image,
      createdAt: u.createdAt,
      role: u.role,
      isActive: u.isActive,
      isSuspended: u.isSuspended,
      spiritualProfile: {
        spiritualLevel: u.spiritualProfile?.spiritualLevel,
        spiritualPoints: u.spiritualProfile?.spiritualPoints,
        energyAlignment: u.spiritualProfile?.energyAlignment,
        experienceLevel: u.spiritualProfile?.experienceLevel,
      },
      stats: u.stats,
    }));

    return NextResponse.json({
      users: sanitizedUsers,
      total: users.length,
      limit,
      skip,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/users
 * 
 * Initialize spiritual profile for existing users
 * This is a utility endpoint for migration purposes
 */
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { action, userId } = body;

    if (action === "initialize-spiritual-profile") {
      // Admin can initialize any user's profile
      if (user.role !== "admin" && user.id !== userId) {
        return NextResponse.json(
          { error: "Unauthorized" },
          { status: 403 }
        );
      }

      const success = await initializeUserSpiritualProfile(userId || user.id);

      return NextResponse.json({
        success,
        message: success
          ? "Spiritual profile initialized"
          : "Profile already exists or user not found",
      });
    }

    return NextResponse.json(
      { error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error in user operation:", error);
    return NextResponse.json(
      { error: "Operation failed" },
      { status: 500 }
    );
  }
}
