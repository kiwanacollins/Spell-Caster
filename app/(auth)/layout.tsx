import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - Spell Caster",
  description: "Sign in or create an account to access spiritual healing services",
};

/**
 * Authentication Layout
 * 
 * Provides a mystical, centered layout for login and registration pages
 * with ancient parchment background and candlelit atmosphere
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Ancient parchment background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/textures/parchment-light.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      {/* Dark overlay for depth */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-ink-900/30 via-transparent to-ink-900/40" />
      
      {/* Mystical particle effects (subtle) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-mystical-amber/10 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: "4s" }} 
        />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-mystical-purple/10 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: "6s", animationDelay: "2s" }} 
        />
      </div>

      {/* Content container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
