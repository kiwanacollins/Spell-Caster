"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { IoLogoWhatsapp, IoLogoFacebook } from "react-icons/io5";
import { GiCandles } from "react-icons/gi";

interface ContactSupportSectionProps {
  userName?: string;
  isAvailable?: boolean;
  officeHours?: {
    weekday: string;
    weekend: string;
  };
}

export function ContactSupportSection({
  userName = "Seeker",
  isAvailable = true,
  officeHours = {
    weekday: "Mon - Fri: 10 AM - 6 PM EST",
    weekend: "Sat - Sun: 12 PM - 5 PM EST",
  },
}: ContactSupportSectionProps) {
  const handleWhatsAppClick = () => {
    const message = `Hello! I'm interested in learning more about your spiritual services. I'm seeking guidance for my spiritual journey.`;
    const encodedMessage = encodeURIComponent(message);
    // WhatsApp link format: https://wa.me/[phone_number]?text=[message]
    // Using a placeholder number that would be configured in production
    window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
  };

  const handleMessengerClick = () => {
    const message = `Hello! I'm interested in learning more about your spiritual services. I'm seeking guidance for my spiritual journey.`;
    const encodedMessage = encodeURIComponent(message);
    // Messenger link format for page: https://m.me/[page_id]?text=[message]
    // Using a generic messenger link - would be configured with actual page ID in production
    window.open(`https://m.me/?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Contact Header */}
      <div className="space-y-2">
        <h2 className="font-['MedievalSharp'] text-2xl text-white">
          Connect with the Healer
        </h2>
        <p className="font-['Crimson_Text'] text-sm text-white">
          Reach out through your preferred channel • Always here to guide you
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Contact Methods Card */}
        <Card className="border-2 border-[#8B6F47] bg-[#F4E8D0] p-6 shadow-[inset_0_0_12px_rgba(0,0,0,0.08)]">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <GiCandles className="h-5 w-5 text-[#B8860B]" />
              <h3 className="font-['Crimson_Text'] text-lg font-semibold text-[#1A1A1A]">
                Preferred Channel
              </h3>
            </div>

            {/* WhatsApp Button */}
            <Button
              onClick={handleWhatsAppClick}
              className="w-full border-2 border-[#2C5530] bg-[#2C5530] py-6 font-['Crimson_Text'] text-sm font-semibold text-[#F4E8D0] transition-all duration-200 hover:border-[#2C5530] hover:bg-[#1A4D1A] hover:shadow-[0_0_12px_rgba(44,85,48,0.4)]"
            >
              <IoLogoWhatsapp className="mr-2 h-5 w-5" />
              Continue on WhatsApp
            </Button>

            {/* Messenger Button */}
            <Button
              onClick={handleMessengerClick}
              className="w-full border-2 border-[#0A66C2] bg-[#0A66C2] py-6 font-['Crimson_Text'] text-sm font-semibold text-white transition-all duration-200 hover:border-[#0A66C2] hover:bg-[#084298] hover:shadow-[0_0_12px_rgba(10,102,194,0.4)]"
            >
              <IoLogoFacebook className="mr-2 h-5 w-5" />
              Chat on Messenger
            </Button>

            {/* Quick Note */}
            <div className="rounded-sm border border-[#8B6F47]/30 bg-[#1A1A1A]/5 p-3">
              <p className="font-['Crimson_Text'] text-xs text-[#2C2416]">
                ✨ <span className="font-semibold">Tip:</span> WhatsApp offers the fastest response times for urgent matters
              </p>
            </div>
          </div>
        </Card>

        {/* Availability & Hours Card */}
        <Card className="border-2 border-[#8B6F47] bg-[#F4E8D0] p-6 shadow-[inset_0_0_12px_rgba(0,0,0,0.08)]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GiCandles className="h-5 w-5 text-[#B8860B]" />
                <h3 className="font-['Crimson_Text'] text-lg font-semibold text-[#1A1A1A]">
                  Office Hours
                </h3>
              </div>
              <Badge
                className={`border-none font-['Crimson_Text'] text-xs font-semibold ${
                  isAvailable
                    ? "animate-pulse bg-[#2C5530] text-[#F4E8D0]"
                    : "bg-[#4A4A4A] text-[#F4E8D0]"
                }`}
              >
                <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-current" />
                {isAvailable ? "Available Now" : "Offline"}
              </Badge>
            </div>

            {/* Hours Display */}
            <div className="space-y-3">
              <div className="rounded-sm border border-[#8B6F47]/30 bg-[#1A1A1A]/5 p-3">
                <p className="font-['Crimson_Text'] text-xs font-semibold uppercase text-[#2C2416]">
                  Weekdays
                </p>
                <p className="font-['Crimson_Text'] text-sm text-[#1A1A1A]">
                  {officeHours.weekday}
                </p>
              </div>
              <div className="rounded-sm border border-[#8B6F47]/30 bg-[#1A1A1A]/5 p-3">
                <p className="font-['Crimson_Text'] text-xs font-semibold uppercase text-[#2C2416]">
                  Weekends
                </p>
                <p className="font-['Crimson_Text'] text-sm text-[#1A1A1A]">
                  {officeHours.weekend}
                </p>
              </div>
            </div>

            {/* Healer Info */}
            <div className="flex items-center gap-3 rounded-sm border border-[#8B6F47]/30 bg-[#1A1A1A]/5 p-3">
              <Avatar className="h-10 w-10 border-2 border-[#8B6F47]">
                <AvatarImage src="/images/healer-portrait.webp" alt={userName} />
                <AvatarFallback className="bg-[#8B6F47] font-['Crimson_Text'] text-[#F4E8D0]">
                  {userName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate font-['Crimson_Text'] text-sm font-semibold text-[#1A1A1A]">
                  {/* {userName} */}
                </p>
                <p className="truncate font-['Crimson_Text'] text-xs text-[#2C2416]">
                  Spiritual Healer
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Additional Support Info */}
      <Card className="border-2 border-[#8B6F47] bg-[#F4E8D0] p-4">
        <p className="font-['Crimson_Text'] text-sm text-[#2C2416]">
          <span className="font-semibold text-[#1A1A1A]">Questions?</span> Our spiritual advisors typically respond within 1-2 hours during office hours. For urgent matters, WhatsApp is your fastest path to guidance.
        </p>
      </Card>
    </div>
  );
}
