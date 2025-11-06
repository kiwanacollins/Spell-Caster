"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * Forgot Password Page
 * 
 * Allows users to request a password reset link via email
 */
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send reset email");
      }

      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="relative">
        <div 
          className="relative bg-parchment-light/95 backdrop-blur-sm rounded-lg shadow-2xl border-4 border-aged-bronze/40 p-8"
          style={{
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* Decorative corner flourishes */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-sacred-gold/60 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-sacred-gold/60 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-sacred-gold/60 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-sacred-gold/60 rounded-br-lg" />

          {/* Success Message */}
          <div className="text-center py-8">
            <div className="mb-6 text-6xl">📧</div>
            <h1 className="font-medieval text-3xl text-ink-900 mb-4">
              Check Your Email
            </h1>
            <p className="font-serif text-ink-700 mb-6">
              If an account exists with <strong>{email}</strong>, you will receive a password reset link shortly.
            </p>
            <p className="font-serif text-ink-600 text-sm mb-8">
              Please check your inbox and spam folder. The link will expire in 1 hour.
            </p>
            <Link href="/login">
              <Button className="w-full">
                Return to Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Ancient grimoire card */}
      <div 
        className="relative bg-parchment-light/95 backdrop-blur-sm rounded-lg shadow-2xl border-4 border-aged-bronze/40 p-8"
        style={{
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Decorative corner flourishes */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-sacred-gold/60 rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-sacred-gold/60 rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-sacred-gold/60 rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-sacred-gold/60 rounded-br-lg" />

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-medieval text-4xl text-ink-900 mb-2">
            Reset Your Password
          </h1>
          <p className="font-serif text-ink-700 text-sm">
            Enter your email address and we'll send you a reset link
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-blood-moon-red/10 border-2 border-blood-moon-red/30 rounded-lg p-4">
              <p className="text-blood-moon-red text-sm font-serif text-center">
                ⚠ {error}
              </p>
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-serif text-ink-800 font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
              disabled={isLoading}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">✦</span>
                Sending reset link...
              </span>
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </form>

        {/* Back to Login Link */}
        <div className="mt-6 text-center">
          <Link 
            href="/login" 
            className="text-sm font-serif text-mystical-amber hover:text-sacred-gold transition-colors"
          >
            ← Back to Sign In
          </Link>
        </div>
      </div>

      {/* Floating mystical symbols */}
      <div className="absolute -top-8 -left-8 text-6xl text-sacred-gold/20 pointer-events-none animate-pulse" style={{ animationDuration: "3s" }}>
        ✦
      </div>
      <div className="absolute -bottom-8 -right-8 text-6xl text-mystical-amber/20 pointer-events-none animate-pulse" style={{ animationDuration: "4s", animationDelay: "1s" }}>
        ✧
      </div>
    </div>
  );
}
