"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  GiCrystalBall,
  GiSpellBook,
  GiCoinsPile,
  GiMoon,
  GiPentacle,
  GiBookmarklet,
  GiTwoCoins,
  GiLandMine,
  GiHearts,
  GiHeartShield,
  GiChainedHeart,
  GiGavel,
  GiReceiveMoney,
  GiShieldEchoes,
  GiDiamondRing,
  GiOpenTreasureChest,
  GiMagicSwirl,
  GiWallet,
  GiBriefcase,
  GiLightningBow,
} from "react-icons/gi";
import { IoChevronDown, IoChevronForward } from "react-icons/io5";
import { LogoutButton } from "@/components/auth/logout-button";
import { useState } from "react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

interface ServiceItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  category: "Spells" | "Rituals" | "Artifacts";
}

const navItems: NavItem[] = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: GiCrystalBall,
  },
];

const serviceItems: ServiceItem[] = [
  {
    title: "Revenge Spell",
    href: "/dashboard/services/revenge-spell",
    icon: GiLightningBow,
    category: "Spells",
  },
  {
    title: "Get Back Lost Items",
    href: "/dashboard/services/get-back-lost-items",
    icon: GiOpenTreasureChest,
    category: "Spells",
  },
  {
    title: "Land Solving Spell",
    href: "/dashboard/services/land-solving-spell",
    icon: GiLandMine,
    category: "Spells",
  },
  {
    title: "Obsession Spell",
    href: "/dashboard/services/obsession-spell",
    icon: GiHearts,
    category: "Spells",
  },
  {
    title: "Stop Cheating Spell",
    href: "/dashboard/services/stop-cheating-spell",
    icon: GiHeartShield,
    category: "Spells",
  },
  {
    title: "Binding Spell",
    href: "/dashboard/services/binding-spell",
    icon: GiChainedHeart,
    category: "Spells",
  },
  {
    title: "Gay & Lesbian Spell",
    href: "/dashboard/services/gay-lesbian-spell",
    icon: GiHearts,
    category: "Spells",
  },
  {
    title: "Winning a Court Case",
    href: "/dashboard/services/winning-court-case",
    icon: GiGavel,
    category: "Spells",
  },
  {
    title: "Business Boost Spells",
    href: "/dashboard/services/business-boost-spells",
    icon: GiBriefcase,
    category: "Spells",
  },
  {
    title: "Cleansing Rituals",
    href: "/dashboard/services/cleansing-rituals",
    icon: GiMagicSwirl,
    category: "Rituals",
  },
  {
    title: "Divorce Spell",
    href: "/dashboard/services/divorce-spell",
    icon: GiSpellBook,
    category: "Spells",
  },
  {
    title: "Marriage & Commitment",
    href: "/dashboard/services/marriage-commitment",
    icon: GiDiamondRing,
    category: "Spells",
  },
  {
    title: "Magic Wallet",
    href: "/dashboard/services/magic-wallet",
    icon: GiWallet,
    category: "Artifacts",
  },
  {
    title: "Financial Issues",
    href: "/dashboard/services/financial-issues",
    icon: GiReceiveMoney,
    category: "Spells",
  },
  {
    title: "Protection & Shielding",
    href: "/dashboard/services/protection-shielding",
    icon: GiShieldEchoes,
    category: "Spells",
  },
  {
    title: "Magic Rings",
    href: "/dashboard/services/magic-rings",
    icon: GiDiamondRing,
    category: "Artifacts",
  },
];

interface DashboardSidebarProps {
  userName?: string;
  userEmail?: string;
}

export function DashboardSidebar({ 
  userName = "Seeker",
  userEmail
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const [servicesExpanded, setServicesExpanded] = useState(false);

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

        {/* Sacred Services Section */}
        <div className="pt-2">
          <button
            onClick={() => setServicesExpanded(!servicesExpanded)}
            className={cn(
              "group w-full flex items-center gap-3 rounded-sm border-2 px-3 py-2.5 font-['Crimson_Text'] text-sm font-medium transition-all duration-200",
              "border-transparent text-[#1A1A1A] hover:border-[#8B6F47] hover:bg-[#1A1A1A]/5 hover:text-[#8B6F47]"
            )}
          >
            <GiBookmarklet
              className="h-5 w-5 text-[#4A4A4A] transition-all duration-200 group-hover:text-[#B8860B]"
            />
            <span className="flex-1 text-left">Sacred Services</span>
            {servicesExpanded ? (
              <IoChevronDown className="h-4 w-4 transition-transform" />
            ) : (
              <IoChevronForward className="h-4 w-4 transition-transform" />
            )}
          </button>

          {/* Services Submenu */}
          {servicesExpanded && (
            <div className="mt-1 space-y-1 pl-4">
              {serviceItems.map((service) => {
                const isActive = pathname === service.href;
                const Icon = service.icon;

                return (
                  <Link
                    key={service.href}
                    href={service.href}
                    className={cn(
                      "group flex items-center gap-2 rounded-sm px-3 py-2 font-['Crimson_Text'] text-xs transition-all duration-200",
                      isActive
                        ? "bg-[#1A1A1A]/10 text-[#8B6F47]"
                        : "text-[#4A4A4A] hover:bg-[#1A1A1A]/5 hover:text-[#8B6F47]"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 transition-all duration-200",
                        isActive
                          ? "text-[#B8860B]"
                          : "text-[#4A4A4A] group-hover:text-[#B8860B]"
                      )}
                    />
                    <span className="flex-1">{service.title}</span>
                    <span className={cn(
                      "text-[10px] opacity-60",
                      isActive ? "text-[#8B6F47]" : "text-[#4A4A4A]"
          )}>
            ❋
          </span>
        </Link>
      );
    })}
  </div>
)}
</div>

        {/* Payments - Last Item */}
        <Link
          href="/dashboard/payments"
          className={cn(
            "group flex items-center gap-3 rounded-sm border-2 px-3 py-2.5 font-['Crimson_Text'] text-sm font-medium transition-all duration-200",
            pathname === "/dashboard/payments"
              ? "border-[#8B6F47] bg-[#1A1A1A] text-[#F4E8D0] shadow-[inset_0_0_12px_rgba(184,134,11,0.3)]"
              : "border-transparent text-[#1A1A1A] hover:border-[#8B6F47] hover:bg-[#1A1A1A]/5 hover:text-[#8B6F47]"
          )}
        >
          <GiCoinsPile
            className={cn(
              "h-5 w-5 transition-all duration-200",
              pathname === "/dashboard/payments"
                ? "text-[#B8860B] drop-shadow-[0_0_8px_rgba(184,134,11,0.6)]"
                : "text-[#4A4A4A] group-hover:text-[#B8860B]"
            )}
          />
          <span className="flex-1">Payments</span>
        </Link>
      </nav>      {/* Footer - Logout */}
      <div className="border-t-4 border-[#8B6F47] bg-linear-to-t from-[#1A1A1A]/10 to-transparent p-4">
        <LogoutButton
          variant="outline"
          className="w-full border-2 border-[#8B6F47] bg-transparent font-['Crimson_Text'] text-[#1A1A1A] hover:bg-[#8B6F47] hover:text-[#F4E8D0]"
        />
      </div>
    </aside>
  );
}
