"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setErrors({ general: "Invalid or missing reset token" });
    }
  }, [token]);

  // Password validation
  const validatePassword = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and numbers";
    }

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

    if (!validatePassword() || !token) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to reset password");
      }

      setSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err: any) {
      setErrors({ 
        general: err.message || "Something went wrong. The reset link may have expired." 
      });
    } finally {
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

  if (success) {
    return (
      <div className="relative">
        <div 
          className="relative bg-parchment-light/95 backdrop-blur-sm rounded-lg shadow-2xl border-4 border-aged-bronze/40 p-8"
          style={{
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          }}
        >
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-sacred-gold/60 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-sacred-gold/60 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-sacred-gold/60 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-sacred-gold/60 rounded-br-lg" />

          <div className="text-center py-8">
            <div className="mb-6 text-6xl">✓</div>
            <h1 className="font-medieval text-3xl text-ink-900 mb-4">
              Password Reset Successful
            </h1>
            <p className="font-serif text-ink-700 mb-6">
              Your password has been successfully reset.
            </p>
            <p className="font-serif text-ink-600 text-sm mb-8">
              Redirecting you to sign in...
            </p>
            <Link href="/login">
              <Button className="w-full">
                Sign In Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div 
        className="relative bg-parchment-light/95 backdrop-blur-sm rounded-lg shadow-2xl border-4 border-aged-bronze/40 p-8"
        style={{
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-sacred-gold/60 rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-sacred-gold/60 rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-sacred-gold/60 rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-sacred-gold/60 rounded-br-lg" />

        <div className="text-center mb-8">
          <h1 className="font-medieval text-4xl text-ink-900 mb-2">
            Create New Password
          </h1>
          <p className="font-serif text-ink-700 text-sm">
            Enter your new password below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {errors.general && (
            <div className="bg-blood-moon-red/10 border-2 border-blood-moon-red/30 rounded-lg p-4">
              <p className="text-blood-moon-red text-sm font-serif text-center">
                ⚠ {errors.general}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-serif text-ink-800 font-medium">
              New Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className="w-full pr-10"
                disabled={isLoading || !token}
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
                disabled={isLoading || !token}
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

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !token}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">✦</span>
                Resetting password...
              </span>
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link 
            href="/login" 
            className="text-sm font-serif text-mystical-amber hover:text-sacred-gold transition-colors"
          >
            ← Back to Sign In
          </Link>
        </div>
      </div>

      <div className="absolute -top-8 -left-8 text-6xl text-sacred-gold/20 pointer-events-none animate-pulse" style={{ animationDuration: "3s" }}>
        ✧
      </div>
      <div className="absolute -bottom-8 -right-8 text-6xl text-mystical-amber/20 pointer-events-none animate-pulse" style={{ animationDuration: "4s", animationDelay: "1s" }}>
        ✦
      </div>
    </div>
  );
}

/**
 * Reset Password Page
 * 
 * Allows users to set a new password using a reset token
 */
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="text-center py-8">
        <div className="animate-spin text-4xl mb-4">✦</div>
        <p className="font-serif text-ink-700">Loading...</p>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
