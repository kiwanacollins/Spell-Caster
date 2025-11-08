"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  GiCrystalBall,
  GiSpellBook,
  GiScrollUnfurled,
  GiCoinsPile,
  GiHamburgerMenu,
  GiCancel,
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
} from "react-icons/gi";
import { IoChevronDown, IoChevronForward } from "react-icons/io5";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { LogoutButton } from "@/components/auth/logout-button";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
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
    title: "Get Back Lost Items",
    href: "/services/get-back-lost-items",
    icon: GiOpenTreasureChest,
    category: "Spells",
  },
  {
    title: "Land Solving Spell",
    href: "/services/land-solving-spell",
    icon: GiLandMine,
    category: "Spells",
  },
  {
    title: "Obsession Spell",
    href: "/services/obsession-spell",
    icon: GiHearts,
    category: "Spells",
  },
  {
    title: "Stop Cheating Spell",
    href: "/services/stop-cheating-spell",
    icon: GiHeartShield,
    category: "Spells",
  },
  {
    title: "Binding Spell",
    href: "/services/binding-spell",
    icon: GiChainedHeart,
    category: "Spells",
  },
  {
    title: "Gay & Lesbian Spell",
    href: "/services/gay-lesbian-spell",
    icon: GiHearts,
    category: "Spells",
  },
  {
    title: "Winning a Court Case",
    href: "/services/winning-court-case",
    icon: GiGavel,
    category: "Spells",
  },
  {
    title: "Business Boost Spells",
    href: "/services/business-boost-spells",
    icon: GiBriefcase,
    category: "Spells",
  },
  {
    title: "Cleansing Rituals",
    href: "/services/cleansing-rituals",
    icon: GiMagicSwirl,
    category: "Rituals",
  },
  {
    title: "Divorce Spell",
    href: "/services/divorce-spell",
    icon: GiSpellBook,
    category: "Spells",
  },
  {
    title: "Marriage & Commitment",
    href: "/services/marriage-commitment",
    icon: GiDiamondRing,
    category: "Spells",
  },
  {
    title: "Magic Wallet",
    href: "/services/magic-wallet",
    icon: GiWallet,
    category: "Artifacts",
  },
  {
    title: "Financial Issues",
    href: "/services/financial-issues",
    icon: GiReceiveMoney,
    category: "Spells",
  },
  {
    title: "Protection & Shielding",
    href: "/services/protection-shielding",
    icon: GiShieldEchoes,
    category: "Spells",
  },
  {
    title: "Magic Rings",
    href: "/services/magic-rings",
    icon: GiDiamondRing,
    category: "Artifacts",
  },
];

interface MobileNavProps {
  userName?: string;
  energyAlignment?: number;
}

export function MobileNav({ userName = "Seeker", energyAlignment = 0 }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b-4 border-[#8B6F47] bg-[#F4E8D0] px-4 py-3 shadow-lg lg:hidden">
        <Link href="/dashboard" className="flex items-center gap-2">
          <GiPentacle className="h-7 w-7 text-[#B8860B]" />
          <span className="font-['MedievalSharp'] text-lg text-[#1A1A1A]">
            Mystical Portal
          </span>
        </Link>

        <button
          onClick={() => setIsOpen(true)}
          className="rounded-sm border-2 border-[#8B6F47] bg-[#1A1A1A] p-2 text-[#F4E8D0] transition-colors hover:bg-[#8B6F47]"
          aria-label="Open menu"
        >
          <GiHamburgerMenu className="h-6 w-6" />
        </button>
      </header>

      {/* Mobile Sheet (Ancient Scroll) */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent 
          side="right" 
          className="w-80 border-l-4 border-[#8B6F47] bg-[#F4E8D0] p-0"
        >
          <SheetHeader className="border-b-4 border-[#8B6F47] bg-[#1A1A1A] p-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-start gap-1">
                <SheetTitle className="flex items-center gap-3 text-[#F4E8D0]">
                  <GiScrollUnfurled className="h-7 w-7 text-[#B8860B]" />
                  <span className="font-['MedievalSharp'] text-xl">Sacred Menu</span>
                </SheetTitle>
                <SheetDescription className="font-['Crimson_Text'] text-sm text-[#C0C0C0]">
                  Navigate your spiritual journey
                </SheetDescription>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#F4E8D0] transition-colors hover:text-[#B8860B]"
                aria-label="Close menu"
              >
                <GiCancel className="h-6 w-6" />
              </button>
            </div>
          </SheetHeader>

          {/* User Info */}
          <div className="border-b-2 border-[#8B6F47] bg-linear-to-b from-[#1A1A1A]/10 to-transparent p-4">
            <div className="space-y-2">
              <p className="font-['Crimson_Text'] text-sm font-semibold text-[#1A1A1A]">
                Welcome, {userName}
              </p>

              {/* Energy Alignment */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-['Crimson_Text'] text-[#4A4A4A]">
                    Energy Alignment
                  </span>
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

          {/* Navigation */}
          <nav className="flex-1 space-y-1 overflow-y-auto p-3" style={{ maxHeight: 'calc(100vh - 280px)' }}>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "group flex items-center gap-3 rounded-sm border-2 px-3 py-3 font-['Crimson_Text'] text-sm font-medium transition-all duration-200",
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
                </Link>
              );
            })}

            {/* Sacred Services Section */}
            <div className="pt-2">
              <button
                onClick={() => setServicesExpanded(!servicesExpanded)}
                className={cn(
                  "group w-full flex items-center gap-3 rounded-sm border-2 px-3 py-3 font-['Crimson_Text'] text-sm font-medium transition-all duration-200",
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
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "group flex items-center gap-2 rounded-sm border-l-2 px-3 py-2 font-['Crimson_Text'] text-xs transition-all duration-200",
                          isActive
                            ? "border-[#B8860B] bg-[#1A1A1A]/10 text-[#8B6F47]"
                            : "border-transparent text-[#4A4A4A] hover:border-[#8B6F47] hover:bg-[#1A1A1A]/5 hover:text-[#8B6F47]"
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
              onClick={() => setIsOpen(false)}
              className={cn(
                "group flex items-center gap-3 rounded-sm border-2 px-3 py-3 font-['Crimson_Text'] text-sm font-medium transition-all duration-200",
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
          </nav>          {/* Footer - Logout */}
          <div className="border-t-4 border-[#8B6F47] bg-linear-to-t from-[#1A1A1A]/10 to-transparent p-4">
            <LogoutButton
              variant="outline"
              className="w-full border-2 border-[#8B6F47] bg-transparent font-['Crimson_Text'] text-[#1A1A1A] hover:bg-[#8B6F47] hover:text-[#F4E8D0]"
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
