"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Sparkles,
  MessageSquare,
  Calendar,
  BookOpen,
  TrendingUp,
  CreditCard,
  User,
  Scroll,
  Star,
  Users,
} from "lucide-react";
import { DashboardUserMenu } from "./dashboard-user-menu";
import { useUser } from "@/lib/auth/hooks";

const navigationItems = [
  {
    title: "The Circle",
    items: [
      {
        title: "Overview",
        href: "/dashboard",
        icon: LayoutDashboard,
        description: "Your mystical sanctuary",
      },
      {
        title: "My Spells",
        href: "/dashboard/spells",
        icon: Sparkles,
        description: "Active rituals & enchantments",
      },
      {
        title: "Messages",
        href: "/dashboard/messages",
        icon: MessageSquare,
        description: "Sacred communications",
      },
      {
        title: "Consultations",
        href: "/dashboard/consultations",
        icon: Calendar,
        description: "Spiritual guidance sessions",
      },
    ],
  },
  {
    title: "Spiritual Journey",
    items: [
      {
        title: "Journal",
        href: "/dashboard/journal",
        icon: BookOpen,
        description: "Manifestations & dreams",
      },
      {
        title: "Progress",
        href: "/dashboard/progress",
        icon: TrendingUp,
        description: "Energy alignment & growth",
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        title: "Payments",
        href: "/dashboard/payments",
        icon: CreditCard,
        description: "Offerings & transactions",
      },
      {
        title: "Profile",
        href: "/dashboard/profile",
        icon: User,
        description: "Sacred settings",
      },
    ],
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <Sidebar
      className="border-r-2 border-[#8B6F47] bg-cover bg-center"
      style={{
        backgroundImage: "url('/textures/parchment-dark.webp')",
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-[#1A1A1A]/80 pointer-events-none" />

      <SidebarHeader className="relative z-10 border-b-2 border-[#8B6F47] p-6">
        <Link href="/dashboard" className="flex items-center gap-3 group mb-4">
          <div className="relative">
            {/* Ancient tome icon */}
            <Scroll className="w-10 h-10 text-[#CC8800] transition-all duration-300 group-hover:text-[#B8860B] group-hover:rotate-12" />
            <Star className="w-4 h-4 text-[#B8860B] absolute -top-1 -right-1 animate-pulse" />
          </div>
          <div>
            <h2 className="font-['UnifrakturMaguntia'] text-2xl text-[#F4E8D0] leading-tight">
              The Grimoire
            </h2>
            <p className="font-['Crimson_Text'] text-xs text-[#C0C0C0] italic">
              Your Mystical Portal
            </p>
          </div>
        </Link>

        {/* User Menu */}
        {user && (
          <DashboardUserMenu
            userName={user.name}
            userEmail={user.email}
            userImage={user.image || undefined}
          />
        )}
      </SidebarHeader>

      <SidebarContent className="relative z-10">
        {navigationItems.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel className="font-['MedievalSharp'] text-[#CC8800] text-sm px-4 py-3 flex items-center gap-2">
              <div className="w-4 h-[2px] bg-[#8B6F47]" />
              {section.title}
              <div className="flex-1 h-[2px] bg-[#8B6F47]" />
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={`
                          group relative font-['Crimson_Text'] text-base
                          transition-all duration-300
                          ${
                            isActive
                              ? "bg-[#CC8800]/20 text-[#F4E8D0] border-l-4 border-[#B8860B] shadow-[0_0_15px_rgba(204,136,0,0.3)]"
                              : "text-[#C0C0C0] hover:text-[#F4E8D0] hover:bg-[#8B6F47]/10 border-l-4 border-transparent"
                          }
                        `}
                      >
                        <Link href={item.href} className="flex items-center gap-3 px-4 py-3">
                          <item.icon
                            className={`
                              w-5 h-5 transition-all duration-300
                              ${
                                isActive
                                  ? "text-[#B8860B] animate-pulse"
                                  : "text-[#8B6F47] group-hover:text-[#CC8800] group-hover:scale-110"
                              }
                            `}
                          />
                          <div className="flex-1">
                            <div className="font-semibold">{item.title}</div>
                            <div className="text-xs text-[#8B6F47] group-hover:text-[#CC8800]/70">
                              {item.description}
                            </div>
                          </div>
                          {isActive && (
                            <div className="w-2 h-2 rounded-full bg-[#B8860B] animate-pulse" />
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="relative z-10 border-t-2 border-[#8B6F47] p-4">
        <div className="bg-[#8B6F47]/20 border-2 border-[#8B6F47] rounded-sm p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-[#B8860B]" />
            <span className="font-['MedievalSharp'] text-sm text-[#F4E8D0]">
              Spiritual Level
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-[#1A1A1A] rounded-full overflow-hidden border border-[#8B6F47]">
              <div className="h-full w-[40%] bg-gradient-to-r from-[#CC8800] to-[#B8860B] rounded-full shadow-[0_0_10px_rgba(204,136,0,0.5)]" />
            </div>
            <span className="font-['Crimson_Text'] text-xs text-[#C0C0C0]">Novice</span>
          </div>
          <p className="font-['Crimson_Text'] text-xs text-[#8B6F47] italic">
            Continue your journey to unlock mystical powers
          </p>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

