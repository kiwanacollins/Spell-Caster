"use client";

import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { GiMoon, GiSpellBook, GiCheckedShield } from "react-icons/gi";
import { IoCheckmarkCircle } from "react-icons/io5";

export function TrustAuthenticitySection() {
  return (
    <div className="space-y-6">
      {/* Trust Header */}
      <div className="space-y-2">
        <h2 className="font-['MedievalSharp'] text-2xl text-[#F4E8D0]">
          Trust & Authenticity
        </h2>
        <p className="font-['Crimson_Text'] text-sm text-[#E8DCC0]">
          Verified spiritual guide • Committed to your wellbeing
        </p>
      </div>

      {/* Credibility Badges */}
      <Card className="border-2 border-[#B8860B] bg-[#1A1A1A] p-6 shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 font-['Crimson_Text'] text-lg font-semibold text-[#F4E8D0]">
            <GiCheckedShield className="h-5 w-5 text-[#B8860B]" />
            Verified Credentials
          </h3>
          <div className="flex flex-wrap gap-3">
            <Badge className="border-2 border-[#2C5530] bg-[#2C5530]/10 px-3 py-1.5 font-['Crimson_Text'] text-xs font-semibold text-[#2C5530] hover:bg-[#2C5530]/20">
              <IoCheckmarkCircle className="mr-1.5 h-4 w-4" />
              15+ Years Experience
            </Badge>
            <Badge className="border-2 border-[#8B6F47] bg-[#8B6F47]/10 px-3 py-1.5 font-['Crimson_Text'] text-xs font-semibold text-[#8B6F47] hover:bg-[#8B6F47]/20">
              <IoCheckmarkCircle className="mr-1.5 h-4 w-4" />
              Safe Practices
            </Badge>
            <Badge className="border-2 border-[#B8860B] bg-[#B8860B]/10 px-3 py-1.5 font-['Crimson_Text'] text-xs font-semibold text-[#B8860B] hover:bg-[#B8860B]/20">
              <IoCheckmarkCircle className="mr-1.5 h-4 w-4" />
              Privacy Guaranteed
            </Badge>
          </div>
        </div>
      </Card>

      {/* Spiritual Practice Statement */}
      <Card className="border-2 border-[#B8860B] bg-[#1A1A1A] p-6 shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <GiSpellBook className="mt-1 h-6 w-6 flex-shrink-0 text-[#B8860B]" />
            <div className="space-y-3">
              <h3 className="font-['Crimson_Text'] text-lg font-semibold text-[#F4E8D0]">
                Our Sacred Practice
              </h3>
              <p className="font-['Crimson_Text'] text-sm leading-relaxed text-[#E8DCC0]">
                With <span className="font-semibold text-[#F4E8D0]">ancestral spell work</span> and{" "}
                <span className="font-semibold text-[#F4E8D0]">energy healing</span>, I channel ancient wisdom to guide your transformation. Every ritual honors the spiritual lineage passed down through generations.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Pure White Light Energy */}
      <Card className="border-2 border-[#2C5530] bg-[#1A1A1A] p-6 shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
        <div className="flex items-start gap-4">
          <GiMoon className="mt-1 h-6 w-6 flex-shrink-0 text-[#B8860B]" />
          <div className="space-y-2">
            <h3 className="font-['Crimson_Text'] text-lg font-semibold text-[#F4E8D0]">
              Pure White Light Energy
            </h3>
            <p className="font-['Crimson_Text'] text-sm text-[#E8DCC0]">
              All work is conducted with the highest spiritual integrity, channeling pure white light energy for your protection and empowerment. Your wellbeing is sacred.
            </p>
          </div>
        </div>
      </Card>

      {/* Disclaimers */}
      <Alert className="border-2 border-[#CC8800] bg-[#1A1A1A]">
        <IoCheckmarkCircle className="h-5 w-5 text-[#CC8800]" />
        <AlertTitle className="font-['Crimson_Text'] font-semibold text-[#F4E8D0]">
          Important Disclaimer
        </AlertTitle>
        <AlertDescription className="font-['Crimson_Text'] text-sm text-[#E8DCC0] mt-2">
          All services are <span className="font-semibold text-[#F4E8D0]">for spiritual and empowerment purposes only</span>. These services do not replace professional medical, legal, or financial advice. Always consult qualified professionals for healthcare, legal, or financial matters.
        </AlertDescription>
      </Alert>

      {/* Security & Trust Seals */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-2 border-[#B8860B] bg-[#1A1A1A] p-4 text-center shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col items-center gap-2">
            <GiCheckedShield className="h-8 w-8 text-[#B8860B]" />
            <p className="font-['Crimson_Text'] text-xs font-semibold text-[#F4E8D0]">
              Verified Provider
            </p>
          </div>
        </Card>

        <Card className="border-2 border-[#B8860B] bg-[#1A1A1A] p-4 text-center shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col items-center gap-2">
            <IoCheckmarkCircle className="h-8 w-8 text-[#2C5530]" />
            <p className="font-['Crimson_Text'] text-xs font-semibold text-[#F4E8D0]">
              Customer Approved
            </p>
          </div>
        </Card>

        <Card className="border-2 border-[#B8860B] bg-[#1A1A1A] p-4 text-center shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col items-center gap-2">
            <GiMoon className="h-8 w-8 text-[#B8860B]" />
            <p className="font-['Crimson_Text'] text-xs font-semibold text-[#F4E8D0]">
              Secure & Private
            </p>
          </div>
        </Card>
      </div>

      {/* Trust Message */}
      <Card className="border-2 border-[#B8860B] bg-[#1A1A1A] p-4">
        <p className="font-['Crimson_Text'] text-sm text-[#E8DCC0]">
          <span className="font-semibold text-[#F4E8D0]">Your trust matters to us.</span> We&apos;re committed to maintaining the highest standards of integrity, confidentiality, and spiritual excellence. Your journey is protected within our sacred circle.
        </p>
      </Card>
    </div>
  );
}
