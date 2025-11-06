"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Settings, LogOut, CreditCard } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DashboardUserMenuProps {
  userName: string;
  userEmail: string;
  userImage?: string;
}

export function DashboardUserMenu({ userName, userEmail, userImage }: DashboardUserMenuProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  };

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 w-full p-3 rounded-sm hover:bg-[#8B6F47]/20 transition-colors group">
        <Avatar className="w-10 h-10 border-2 border-[#8B6F47] group-hover:border-[#CC8800] transition-colors">
          <AvatarImage src={userImage} alt={userName} />
          <AvatarFallback className="bg-[#CC8800] text-[#1A1A1A] font-['MedievalSharp']">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 text-left">
          <p className="font-['MedievalSharp'] text-sm text-[#F4E8D0] group-hover:text-[#CC8800] transition-colors">
            {userName}
          </p>
          <p className="font-['Crimson_Text'] text-xs text-[#8B6F47]">{userEmail}</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56 bg-[#F4E8D0] border-2 border-[#8B6F47] shadow-lg"
        align="end"
      >
        <DropdownMenuLabel className="font-['MedievalSharp'] text-[#1A1A1A]">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-[#8B6F47]" />
        
        <DropdownMenuItem asChild className="font-['Crimson_Text'] cursor-pointer hover:bg-[#CC8800]/20">
          <Link href="/dashboard/profile" className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#8B6F47]" />
            Profile & Settings
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild className="font-['Crimson_Text'] cursor-pointer hover:bg-[#CC8800]/20">
          <Link href="/dashboard/payments" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#8B6F47]" />
            Payments & Billing
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-[#8B6F47]" />
        
        <DropdownMenuItem
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="font-['Crimson_Text'] cursor-pointer hover:bg-[#8B0000]/20 text-[#8B0000] focus:text-[#8B0000]"
        >
          <LogOut className="w-4 h-4 mr-2" />
          {isLoggingOut ? "Departing..." : "Leave the Circle"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
