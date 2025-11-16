"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GiPentacle, GiCheckMark } from "react-icons/gi";
import { FiAlertCircle, FiLoader, FiEye, FiEyeOff } from "react-icons/fi";

export default function InviteAcceptancePage() {
  const router = useRouter();
  const params = useParams();
  const token = params.token as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [inviteValid, setInviteValid] = useState(false);
  const [inviteEmail, setInviteEmail] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  // Verify invite token on mount
  useEffect(() => {
    const verifyInvite = async () => {
      if (!token) {
        setError("Invalid invite link");
        setLoading(false);
        return;
      }

      try {
        // We'll verify the invite by attempting to get its details
        // For now, we'll assume the token is valid if it's provided
        // The actual validation happens on accept
        setInviteValid(true);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to verify invite");
        setLoading(false);
      }
    };

    verifyInvite();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    // Validate form
    if (!formData.email || !formData.password || !formData.name) {
      setError("Please fill in all required fields");
      setSubmitting(false);
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      setSubmitting(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`/api/admin/invites/${token}/accept`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to accept invite");
      }

      // Success - redirect to login
      router.push("/login?message=Welcome%20to%20the%20admin%20portal");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to accept invite");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center">
        <Card className="w-full max-w-md border-[#8B6F47] bg-[#2A2A2A]">
          <CardContent className="pt-8 text-center">
            <FiLoader className="h-8 w-8 animate-spin text-[#B8860B] mx-auto mb-4" />
            <p className="text-[#C0C0C0]">Verifying invitation...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!inviteValid) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-[#8B0000] bg-[#2A2A2A]">
          <CardHeader>
            <CardTitle className="text-[#F4E8D0] flex items-center gap-2">
              <FiAlertCircle className="text-[#8B0000]" />
              Invalid Invitation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#C0C0C0]">
              This invitation link is invalid or has expired. Please request a new invitation from an administrator.
            </p>
            <Button
              onClick={() => router.push("/")}
              className="w-full mt-4 bg-[#B8860B] hover:bg-[#8B6F47] text-[#1A1A1A]"
            >
              Return Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-[#8B6F47] bg-[#2A2A2A]">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <GiPentacle className="h-12 w-12 text-[#B8860B]" />
          </div>
          <CardTitle className="text-[#F4E8D0] text-2xl">Join the Sacred Circle</CardTitle>
          <CardDescription className="text-[#C0C0C0] mt-2">
            Complete your account setup to enter the admin portal
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4 border-[#8B0000] bg-[#3A2A2A]">
              <FiAlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-[#F4E8D0] text-sm font-medium">Email Address *</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                required
                disabled={submitting}
                className="bg-[#1A1A1A] border-[#8B6F47] text-[#F4E8D0] placeholder-[#4A4A4A] mt-1"
              />
            </div>

            {/* Name */}
            <div>
              <label className="text-[#F4E8D0] text-sm font-medium">Display Name *</label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your Name"
                required
                disabled={submitting}
                className="bg-[#1A1A1A] border-[#8B6F47] text-[#F4E8D0] placeholder-[#4A4A4A] mt-1"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-[#F4E8D0] text-sm font-medium">Password (min 8 characters) *</label>
              <div className="relative mt-1">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter your password"
                  required
                  disabled={submitting}
                  className="bg-[#1A1A1A] border-[#8B6F47] text-[#F4E8D0] placeholder-[#4A4A4A]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C0C0C0] hover:text-[#F4E8D0]"
                >
                  {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-[#C0C0C0] mt-1">Use a mix of letters, numbers, and symbols for security</p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-[#F4E8D0] text-sm font-medium">Confirm Password *</label>
              <Input
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Confirm your password"
                required
                disabled={submitting}
                className="bg-[#1A1A1A] border-[#8B6F47] text-[#F4E8D0] placeholder-[#4A4A4A] mt-1"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#B8860B] hover:bg-[#8B6F47] text-[#1A1A1A] mt-6"
            >
              {submitting ? (
                <>
                  <FiLoader className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <GiCheckMark className="mr-2 h-4 w-4" />
                  Activate Account
                </>
              )}
            </Button>

            {/* Terms notice */}
            <p className="text-xs text-[#C0C0C0] text-center mt-4">
              By creating an account, you agree to the terms of service and privacy policy
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
