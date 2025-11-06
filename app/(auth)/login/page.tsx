"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * Login Page
 * 
 * Ancient themed authentication page with:
 * - Ink-well style inputs
 * - Weathered parchment card
 * - Mystical validation messages
 * - OAuth provider buttons (Google, Apple)
 */
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn.email({
        email,
        password,
      });

      if (result.error) {
        setError("Invalid email or password. Please try again.");
        setIsLoading(false);
        return;
      }

      // Redirect to dashboard on success
      router.push("/dashboard");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

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
            Welcome Back
          </h1>
          <p className="font-serif text-ink-700 text-sm">
            Sign in to continue your healing journey
          </p>
        </div>

        {/* Login Form */}
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

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-serif text-ink-800 font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
              disabled={isLoading}
            />
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link 
              href="/forgot-password" 
              className="text-sm font-serif text-mystical-amber hover:text-sacred-gold transition-colors"
            >
              Forgot your password?
            </Link>
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
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-aged-bronze/30" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-parchment-light text-ink-600 font-serif">
              Or continue with
            </span>
          </div>
        </div>

        {/* OAuth Providers */}
        <div className="space-y-3">
          {/* Google Sign In - Disabled until configured */}
          <Button
            variant="outline"
            className="w-full"
            disabled
            title="Google sign-in will be available soon"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google (Coming Soon)
          </Button>

          {/* Apple Sign In - Disabled until configured */}
          <Button
            variant="outline"
            className="w-full"
            disabled
            title="Apple sign-in will be available soon"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            Continue with Apple (Coming Soon)
          </Button>
        </div>

        {/* Sign Up Link */}
        <div className="mt-8 text-center">
          <p className="text-sm font-serif text-ink-700">
            New here?{" "}
            <Link 
              href="/register" 
              className="text-mystical-amber hover:text-sacred-gold font-medium transition-colors"
            >
              Create an account
            </Link>
          </p>
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
