import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import {
  getActiveSessions,
  revokeSession,
  revokeAllSessionsExcept,
  getLoginHistory,
  getLoginStatistics,
} from "@/lib/db/models";

/**
 * GET /api/sessions
 * 
 * Get current user's active sessions and login history
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

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "active"; // 'active' or 'history'

    if (type === "history") {
      const limit = parseInt(searchParams.get("limit") || "50");
      const history = await getLoginHistory(currentUser.id, limit);

      return NextResponse.json({
        history: history.map((h) => ({
          id: h._id.toString(),
          loginAt: h.loginAt,
          logoutAt: h.logoutAt,
          status: h.status,
          device: h.device,
          location: {
            city: h.location.city,
            country: h.location.country,
            countryCode: h.location.countryCode,
          },
          isSuspicious: h.isSuspicious,
          suspiciousReasons: h.suspiciousReasons,
        })),
      });
    }

    if (type === "stats") {
      const stats = await getLoginStatistics(currentUser.id);
      return NextResponse.json({ stats });
    }

    // Default: return active sessions
    const sessions = await getActiveSessions(currentUser.id);

    return NextResponse.json({
      sessions: sessions.map((s) => ({
        id: s._id.toString(),
        sessionId: s.sessionId,
        createdAt: s.createdAt,
        lastActivityAt: s.lastActivityAt,
        expiresAt: s.expiresAt,
        device: s.device,
        location: {
          city: s.location.city,
          country: s.location.country,
          countryCode: s.location.countryCode,
        },
        isCurrent: s.isCurrent,
        trustScore: s.trustScore,
      })),
    });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return NextResponse.json(
      { error: "Failed to fetch sessions" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/sessions
 * 
 * Revoke sessions
 * - Revoke specific session by sessionId
 * - Revoke all sessions except current
 */
export async function DELETE(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { sessionId, action } = body;

    if (action === "revoke-all-except-current") {
      // Get current session ID from BetterAuth
      // Note: This would need to be passed from the client or extracted from cookies
      const currentSessionId = body.currentSessionId;

      if (!currentSessionId) {
        return NextResponse.json(
          { error: "Current session ID required" },
          { status: 400 }
        );
      }

      const revokedCount = await revokeAllSessionsExcept(
        currentUser.id,
        currentSessionId
      );

      return NextResponse.json({
        success: true,
        revokedCount,
        message: `${revokedCount} session(s) revoked`,
      });
    }

    if (sessionId) {
      // Revoke specific session
      const success = await revokeSession(sessionId, currentUser.id);

      return NextResponse.json({
        success,
        message: success ? "Session revoked" : "Session not found",
      });
    }

    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error revoking sessions:", error);
    return NextResponse.json(
      { error: "Failed to revoke session" },
      { status: 500 }
    );
  }
}
