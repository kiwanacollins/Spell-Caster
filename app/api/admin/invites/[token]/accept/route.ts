import { NextRequest, NextResponse } from "next/server";
import { getInviteByToken, acceptAdminInvite } from "@/lib/db/models/admin-invite-operations";
import { getDatabase } from "@/lib/db/mongodb";
import { createDefaultUserDocument } from "@/lib/db/models/user";
import { promoteToAdmin } from "@/lib/db/models/user-operations";

/**
 * POST /api/admin/invites/[token]/accept
 * Accept an admin invite and create/update user account (public endpoint)
 *
 * Request body:
 * {
 *   email: string (required - must match invite email)
 *   password: string (required, min 8 chars)
 *   name: string (required)
 * }
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    if (!token) {
      return NextResponse.json(
        { error: "Invalid invite token" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { email, password, name } = body;

    // Validate required fields
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Missing required fields: email, password, name" },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
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

    // Retrieve the invite by token
    const invite = await getInviteByToken(token);

    if (!invite) {
      return NextResponse.json(
        { error: "Invalid or expired invite token" },
        { status: 404 }
      );
    }

    // Verify email matches
    if (invite.email.toLowerCase() !== email.toLowerCase()) {
      return NextResponse.json(
        { error: "Email does not match invite" },
        { status: 400 }
      );
    }

    // Get database connection
    const db = await getDatabase();
    const usersCollection = db.collection("users");

    // Check if user already exists
    const existingUser = await usersCollection.findOne({
      email: email.toLowerCase(),
    });

    let userId: string;

    if (existingUser) {
      // User exists - update to admin role if invite is for admin
      userId = existingUser._id?.toString() || "";

      if (invite.role === "admin") {
        await promoteToAdmin(userId);
      }
    } else {
      // Create new user with default role, then promote if needed
      const { randomUUID } = await import("crypto");
      const newId = randomUUID();
      const defaultDoc = createDefaultUserDocument(
        newId,
        email.toLowerCase(),
        name
      );

      const result = await usersCollection.insertOne(defaultDoc);
      userId = result.insertedId.toString();

      // Promote to admin if the invite was for admin role
      if (invite.role === "admin") {
        await promoteToAdmin(userId);
      }
    }

    // Mark invite as accepted
    await acceptAdminInvite(token, userId);

    return NextResponse.json(
      {
        success: true,
        message: "Invite accepted successfully",
        user: {
          id: userId,
          email,
          name,
          role: invite.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error accepting admin invite:", error);
    return NextResponse.json(
      { error: "Failed to accept invite" },
      { status: 500 }
    );
  }
}
