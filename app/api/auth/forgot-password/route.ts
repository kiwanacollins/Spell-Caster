import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getDatabase } from "@/lib/db/mongodb";

export const runtime = 'nodejs';

/**
 * Forgot Password API Endpoint
 * 
 * Generates a password reset token and sends it via email
 */
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const usersCollection = db.collection("user");

    // Find user by email
    const user = await usersCollection.findOne({ email: email.toLowerCase() });

    // Always return success to prevent email enumeration
    // (Don't reveal whether the email exists or not)
    if (!user) {
      return NextResponse.json({ 
        message: "If an account exists, a reset link has been sent" 
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Token expires in 1 hour
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000);

    // Save reset token to user document
    await usersCollection.updateOne(
      { _id: user._id },
      {
        $set: {
          resetPasswordToken: resetTokenHash,
          resetPasswordExpiry: resetTokenExpiry,
        },
      }
    );

    // Create reset URL
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

    // TODO: Send email with reset link
    // For now, just log it (in production, use an email service)
    console.log(`Password reset link for ${email}: ${resetUrl}`);
    console.log(`Token expires at: ${resetTokenExpiry.toISOString()}`);

    // In production, you would send an email here:
    /*
    await sendEmail({
      to: email,
      subject: "Reset Your Password - Your Spell Caster",
      html: `
        <h1>Reset Your Password</h1>
        <p>You requested a password reset for your Your Spell Caster account. Click the link below to create a new password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <p>Blessed be,<br/>Your Spell Caster Team</p>
      `,
    });
    */

    return NextResponse.json({ 
      message: "If an account exists, a reset link has been sent" 
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
