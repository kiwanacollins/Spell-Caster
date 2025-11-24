"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUp, signIn } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

/**
 * Registration Page
 * 
 * Ancient themed registration page with:
 * - Mystical validation messages
 * - Ink-well style inputs
 * - Weathered parchment card
 * - Password strength indicator
 * - OAuth provider buttons (Google, Apple)
 */
export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Mystical validation messages
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Please enter your full name";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and numbers";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const result = await signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });

      if (result.error) {
        setErrors({ 
          general: "We couldn't complete your registration. This email may already be in use." 
        });
        setIsLoading(false);
        return;
      }

      // Redirect to dashboard on success (auto-signin is enabled)
      router.push("/dashboard");
    } catch (err) {
      setErrors({ 
        general: "Something went wrong. Please try again or contact us for help." 
      });
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleGoogleSignUp = async () => {
    setErrors({});
    setIsLoading(true);

    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/dashboard", // Will redirect to admin if user is admin
      });
    } catch (err) {
      setErrors({ 
        general: "Google sign-up failed. Please try again." 
      });
      setIsLoading(false);
    }
  };

  // Calculate password strength
  const getPasswordStrength = () => {
    const { password } = formData;
    if (!password) return { strength: 0, label: "" };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    const labels = ["Weak", "Fair", "Good", "Strong", "Very Strong"];
    return { strength, label: labels[Math.min(strength - 1, 4)] || "" };
  };

  const passwordStrength = getPasswordStrength();

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
            Begin Your Healing Journey
          </h1>
          <p className="font-serif text-ink-700 text-sm">
            Create an account to access personalized spiritual healing and guidance
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* General Error Message */}
          {errors.general && (
            <div className="bg-blood-moon-red/10 border-2 border-blood-moon-red/30 rounded-lg p-4">
              <p className="text-blood-moon-red text-sm font-serif text-center">
                ⚠ {errors.general}
              </p>
            </div>
          )}

          {/* Name Field */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-serif text-ink-800 font-medium">
              Full Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full"
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-blood-moon-red text-xs font-serif mt-1">✦ {errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-serif text-ink-800 font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-blood-moon-red text-xs font-serif mt-1">✦ {errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-serif text-ink-800 font-medium">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className="w-full pr-10"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-600 hover:text-ink-800 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="w-5 h-5" />
                ) : (
                  <AiOutlineEye className="w-5 h-5" />
                )}
              </button>
            </div>
            
            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        i < passwordStrength.strength
                          ? passwordStrength.strength <= 2
                            ? "bg-blood-moon-red"
                            : passwordStrength.strength <= 3
                            ? "bg-mystical-amber"
                            : "bg-enchanted-emerald"
                          : "bg-weathered-stone/30"
                      }`}
                    />
                  ))}
                </div>
                {passwordStrength.label && (
                  <p className="text-xs font-serif text-ink-600">
                    Strength: {passwordStrength.label}
                  </p>
                )}
              </div>
            )}
            
            {errors.password && (
              <p className="text-blood-moon-red text-xs font-serif mt-1">✦ {errors.password}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-serif text-ink-800 font-medium">
              Confirm Password
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                className="w-full pr-10"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-600 hover:text-ink-800 transition-colors"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible className="w-5 h-5" />
                ) : (
                  <AiOutlineEye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-blood-moon-red text-xs font-serif mt-1">✦ {errors.confirmPassword}</p>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="pt-2">
            <p className="text-xs font-serif text-ink-600 text-center">
              By joining, you agree to our{" "}
              <Link href="/terms" className="text-mystical-amber hover:text-sacred-gold">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-mystical-amber hover:text-sacred-gold">
                Privacy Policy
              </Link>
            </p>
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
                Setting up your healing account...
              </span>
            ) : (
              "Start Your Healing Journey"
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
          {/* Google Sign In */}
          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignUp}
            disabled={isLoading}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {isLoading ? "Creating account..." : "Continue with Google"}
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

        {/* Sign In Link */}
        <div className="mt-8 text-center">
          <p className="text-sm font-serif text-ink-700">
            Already have an account?{" "}
            <Link 
              href="/login" 
              className="text-mystical-amber hover:text-sacred-gold font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Floating mystical symbols */}
      <div className="absolute -top-8 -left-8 text-6xl text-sacred-gold/20 pointer-events-none animate-pulse" style={{ animationDuration: "3s" }}>
        ✧
      </div>
      <div className="absolute -bottom-8 -right-8 text-6xl text-mystical-amber/20 pointer-events-none animate-pulse" style={{ animationDuration: "4s", animationDelay: "1s" }}>
        ✦
      </div>
    </div>
  );
}
