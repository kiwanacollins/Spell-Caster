"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { AiOutlineLogout } from "react-icons/ai";

interface LogoutButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  showIcon?: boolean;
  className?: string;
}

/**
 * Logout Button Component
 * 
 * Handles user logout with loading state and mystical feedback
 * Can be used in dashboard, navigation, or anywhere authentication is needed
 */
export function LogoutButton({ 
  variant = "outline", 
  size = "default",
  showIcon = true,
  className 
}: LogoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      
      // Call BetterAuth signOut
      await signOut();
      
      // Redirect to login page
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      // Still redirect even if there's an error
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={isLoading}
      variant={variant}
      size={size}
      className={className}
    >
      {showIcon && <AiOutlineLogout className="mr-2 h-4 w-4" />}
      {isLoading ? "Departing the Circle..." : "Logout"}
    </Button>
  );
}
