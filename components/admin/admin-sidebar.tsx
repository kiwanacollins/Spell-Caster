"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  GiPentacle,
  GiSpellBook,
  GiHearts,
  GiGavel,
  GiReceiveMoney,
  GiVideoCamera,
} from "react-icons/gi";
import { FiChevronDown, FiUsers, FiMail, FiSettings, FiBarChart, FiFolder } from "react-icons/fi";
import { LogoutButton } from "@/components/auth/logout-button";
import { useState } from "react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  children?: NavItem[];
}

const adminNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: GiPentacle,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: FiUsers,
    children: [
      { title: "All Users", href: "/admin/users", icon: FiUsers },
      { title: "Admin Invites", href: "/admin/invites", icon: FiMail },
    ],
  },
  {
    title: "Service Requests",
    href: "/admin/requests",
    icon: GiSpellBook,
    children: [
      { title: "Queue", href: "/admin/requests", icon: GiSpellBook },
      { title: "Completed", href: "/admin/requests/completed", icon: GiHearts },
    ],
  },
  {
    title: "Testimonials",
    href: "/admin/testimonials",
    icon: GiVideoCamera,
  },
  {
    title: "Payments",
    href: "/admin/payments",
    icon: GiReceiveMoney,
    children: [
      { title: "Transactions", href: "/admin/payments", icon: GiReceiveMoney },
      { title: "Refunds", href: "/admin/payments/refunds", icon: GiGavel },
      { title: "Pricing", href: "/admin/payments/pricing", icon: FiBarChart },
      { title: "Services", href: "/admin/services", icon: GiSpellBook },
    ],
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: FiBarChart,
  },
  {
    title: "Content",
    href: "/admin/content",
    icon: FiFolder,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: FiSettings,
  },
];

interface AdminSidebarProps {
  userName?: string;
  userEmail?: string;
}

export function AdminSidebar({ userName, userEmail }: AdminSidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <div className="w-full h-full bg-[#1A1A1A] border-r-2 border-[#8B6F47] overflow-y-auto flex flex-col">
      {/* Header */}
      <div className="p-4 md:p-6 border-b-2 border-[#8B6F47]">
        <div className="flex items-center gap-2 md:gap-3 mb-4">
          <GiPentacle className="text-[#B8860B] text-xl md:text-2xl" />
          <h2 className="text-[#F4E8D0] font-['MedievalSharp'] text-base md:text-xl">
            Admin Portal
          </h2>
        </div>
        <div className="text-xs text-[#C0C0C0]">
          <p className="truncate">{userName || "Administrator"}</p>
          <p className="truncate text-[#8B6F47]">{userEmail || "admin@example.com"}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 md:p-4 space-y-1 md:space-y-2">
        {adminNavItems.map((item) => (
          <div key={item.title}>
            {/* Parent item */}
            <div className="flex items-center gap-0">
              <Link
                href={item.href}
                className={cn(
                  "flex-1 flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-sm text-xs md:text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-[#8B6F47] text-[#1A1A1A]"
                    : "text-[#C0C0C0] hover:bg-[#2A2A2A] hover:text-[#F4E8D0]"
                )}
              >
                <item.icon className="h-4 w-4 md:h-5 md:w-5 shrink-0" />
                <span className="flex-1">{item.title}</span>
                {item.badge && (
                  <span className="ml-2 px-2 py-0.5 bg-[#8B0000] text-[#F4E8D0] text-xs rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>

              {/* Expand button */}
              {item.children && (
                <button
                  onClick={() => toggleExpand(item.title)}
                  className="px-2 py-2 md:py-3 text-[#C0C0C0] hover:text-[#F4E8D0]"
                >
                  <FiChevronDown
                    className={cn(
                      "h-3 w-3 md:h-4 md:w-4 transition-transform",
                      expandedItems.includes(item.title) && "rotate-180"
                    )}
                  />
                </button>
              )}
            </div>

            {/* Child items */}
            {item.children && expandedItems.includes(item.title) && (
              <div className="ml-4 mt-1 space-y-1 border-l-2 border-[#8B6F47]">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={cn(
                      "flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1.5 md:py-2 rounded-sm text-xs md:text-sm transition-colors",
                      isActive(child.href)
                        ? "bg-[#8B6F47] text-[#1A1A1A]"
                        : "text-[#8B6F47] hover:bg-[#2A2A2A] hover:text-[#F4E8D0]"
                    )}
                  >
                    <child.icon className="h-3 w-3 md:h-4 md:w-4 shrink-0" />
                    <span>{child.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 md:p-4 border-t-2 border-[#8B6F47]">
        <LogoutButton className="w-full text-xs md:text-sm" />
      </div>
    </div>
  );
}
