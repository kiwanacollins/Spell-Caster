"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  GiCrystalBall,
  GiSpellBook,
  GiScrollUnfurled,
  GiChatBubble,
  GiCalendar,
  GiProgression,
  GiCoinsPile,
  GiPerson,
  GiMoon,
  GiPentacle,
  GiBookmarklet,
} from "react-icons/gi";
import { LogoutButton } from "@/components/auth/logout-button";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

const navItems: NavItem[] = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: GiCrystalBall,
  },
  {
    title: "Services",
    href: "/services",
    icon: GiBookmarklet,
  },
  {
    title: "My Spells",
    href: "/dashboard/spells",
    icon: GiSpellBook,
  },
  {
    title: "Messages",
    href: "/dashboard/messages",
    icon: GiChatBubble,
  },
  {
    title: "Consultations",
    href: "/dashboard/consultations",
    icon: GiCalendar,
  },
  {
    title: "Spiritual Journal",
    href: "/dashboard/journal",
    icon: GiScrollUnfurled,
  },
  {
    title: "Progress",
    href: "/dashboard/progress",
    icon: GiProgression,
  },
  {
    title: "Payments",
    href: "/dashboard/payments",
    icon: GiCoinsPile,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: GiPerson,
  },
];

interface DashboardSidebarProps {
  userName?: string;
  userEmail?: string;
  energyAlignment?: number;
}

export function DashboardSidebar({ 
  userName = "Seeker",
  userEmail,
  energyAlignment = 0 
}: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r-4 border-[#8B6F47] bg-[#F4E8D0] shadow-[4px_0_12px_rgba(0,0,0,0.3)]">
      {/* Header - Ancient Tome Title */}
      <div className="border-b-4 border-[#8B6F47] bg-[#1A1A1A] p-6">
        <Link href="/dashboard" className="group block">
          <div className="flex items-center gap-3">
            <GiPentacle className="h-8 w-8 text-[#B8860B] transition-transform group-hover:rotate-180 duration-700" />
            <div>
              <h1 className="font-['MedievalSharp'] text-xl text-[#F4E8D0] leading-tight">
                Mystical Portal
              </h1>
              <p className="font-['Crimson_Text'] text-xs text-[#C0C0C0]">
                Your Sacred Space
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* User Info Card */}
      <div className="border-b-2 border-[#8B6F47] bg-linear-to-b from-[#1A1A1A]/10 to-transparent p-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#8B6F47] bg-[#1A1A1A] text-[#B8860B]">
              <GiMoon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-['Crimson_Text'] text-sm font-semibold text-[#1A1A1A] truncate">
                {userName}
              </p>
              {userEmail && (
                <p className="font-['Crimson_Text'] text-xs text-[#4A4A4A] truncate">
                  {userEmail}
                </p>
              )}
            </div>
          </div>

          {/* Energy Alignment Mini Widget */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="font-['Crimson_Text'] text-[#4A4A4A]">Energy</span>
              <span className="font-['Crimson_Text'] font-semibold text-[#2C5530]">
                {energyAlignment}%
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full border border-[#8B6F47] bg-[#1A1A1A]/20">
              <div
                className="h-full bg-linear-to-r from-[#2C5530] to-[#B8860B] transition-all duration-500"
                style={{ width: `${energyAlignment}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3" style={{ maxHeight: 'calc(100vh - 340px)' }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-sm border-2 px-3 py-2.5 font-['Crimson_Text'] text-sm font-medium transition-all duration-200",
                isActive
                  ? "border-[#8B6F47] bg-[#1A1A1A] text-[#F4E8D0] shadow-[inset_0_0_12px_rgba(184,134,11,0.3)]"
                  : "border-transparent text-[#1A1A1A] hover:border-[#8B6F47] hover:bg-[#1A1A1A]/5 hover:text-[#8B6F47]"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 transition-all duration-200",
                  isActive
                    ? "text-[#B8860B] drop-shadow-[0_0_8px_rgba(184,134,11,0.6)]"
                    : "text-[#4A4A4A] group-hover:text-[#B8860B]"
                )}
              />
              <span className="flex-1">{item.title}</span>
              {item.badge && item.badge > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#8B6F47] bg-[#8B0000] font-['Crimson_Text'] text-xs font-bold text-[#F4E8D0]">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer - Logout */}
      <div className="border-t-4 border-[#8B6F47] bg-linear-to-t from-[#1A1A1A]/10 to-transparent p-4">
        <LogoutButton
          variant="outline"
          className="w-full border-2 border-[#8B6F47] bg-transparent font-['Crimson_Text'] text-[#1A1A1A] hover:bg-[#8B6F47] hover:text-[#F4E8D0]"
        />
      </div>
    </aside>
  );
}
