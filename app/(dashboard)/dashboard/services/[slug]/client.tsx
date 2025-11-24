'use client';

import { useState } from "react";
import { useUser } from "@/lib/auth/hooks";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QuoteCreationDialog } from "@/components/admin/quote-creation-dialog";
import { 
  GiSpellBook, 
  GiMoon, 
  GiCandles, 
  GiCrystalBall,
  GiCheckeredDiamond,
  GiStarShuriken 
} from "react-icons/gi";
import { IoCheckmarkCircle, IoTimeOutline, IoShieldCheckmark } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { RiMessengerLine } from "react-icons/ri";

interface ServiceDetailClientProps {
  service: any;
}

export default function ServiceDetailClient({ service }: ServiceDetailClientProps) {
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);
  const { user } = useUser();

  // Contact handlers
  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(`Hi, I'm interested in the ${service.title} service. Could you provide more information?`);
    const phoneNumber = '1234567890'; // Replace with actual WhatsApp number
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleMessengerContact = () => {
    // Replace with actual Facebook page username
    window.open('https://m.me/yourusername', '_blank');
  };

  const energyColors: Record<string, string> = {
    "Low": "text-[#8B6F47]",
    "Medium": "text-[#CC8800]",
    "High": "text-[#B8860B]",
    "Very High": "text-[#8B0000]"
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] p-6 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Service Header */}
        <div className="relative">
          <Card className="bg-[#1A1A1A] border-[#B8860B] border-2 shadow-[0_4px_16px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex-1">
                  <Badge className="mb-4 bg-[#2C5530] text-[#F4E8D0] border-[#B8860B]">
                    {service.category}
                  </Badge>
                  <h1 className="text-4xl md:text-5xl font-['MedievalSharp'] text-[#F4E8D0] mb-4">
                    {service.title}
                  </h1>
                  <p className="text-xl font-['Crimson_Text'] text-[#E8DCC0] mb-6">
                    {service.shortDescription}
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <GiMoon className={`w-5 h-5 ${energyColors[service.energyLevel]}`} />
                      <span className="font-['Crimson_Text'] text-[#E8DCC0]">
                        {service.energyLevel} Energy
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{service.moonPhase}</span>
                      <span className="font-['Crimson_Text'] text-[#E8DCC0]">
                        {service.ritualDetails.lunarPhase}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="text-center mb-2">
                    <p className="font-['Crimson_Text'] text-[#E8DCC0] text-sm mb-3">
                      Contact to discuss this service
                    </p>
                  </div>
                  
                  <Button 
                    onClick={handleWhatsAppContact}
                    size="lg"
                    className="bg-[#25D366] hover:bg-[#20BA5A] text-white font-['MedievalSharp'] text-lg border-2 border-[#F4E8D0] shadow-[0_0_20px_rgba(37,211,102,0.3)]"
                  >
                    <FaWhatsapp className="w-5 h-5 mr-2" />
                    WhatsApp
                  </Button>

                  <Button 
                    onClick={handleMessengerContact}
                    size="lg"
                    className="bg-[#0084FF] hover:bg-[#0073E6] text-white font-['MedievalSharp'] text-lg border-2 border-[#F4E8D0] shadow-[0_0_20px_rgba(0,132,255,0.3)]"
                  >
                    <RiMessengerLine className="w-5 h-5 mr-2" />
                    Messenger
                  </Button>
                  
                  {/* Admin Quote Creation Button */}
                  {user && (user as any)?.role === 'admin' && (
                    <Button 
                      onClick={() => setQuoteDialogOpen(true)}
                      size="lg"
                      variant="outline"
                      className="border-2 border-[#B8860B] text-[#B8860B] hover:bg-[#2A2A2A] font-['MedievalSharp'] text-lg"
                    >
                      <FiPlus className="w-5 h-5 mr-2" />
                      Create Quote
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Admin Quote Creation Dialog */}
        <QuoteCreationDialog
          isOpen={quoteDialogOpen}
          onClose={() => setQuoteDialogOpen(false)}
          serviceId={service.id}
          serviceName={service.title}
          onQuoteCreated={(quoteId) => {
            console.debug('Quote created:', quoteId);
            // Optionally show success toast or redirect
          }}
        />

        {/* Service Overview */}
        <Card className="bg-[#1A1A1A] border-[#B8860B] border-2 shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
          <div className="p-8">
            <h2 className="text-2xl md:text-3xl font-['MedievalSharp'] text-[#F4E8D0] mb-6 flex items-center gap-3">
              <GiSpellBook className="w-8 h-8 text-[#B8860B]" />
              Sacred Overview
            </h2>
            <p className="font-['Crimson_Text'] text-lg text-[#E8DCC0] mb-8 leading-relaxed">
              {service.fullDescription}
            </p>

            <h3 className="text-xl font-['MedievalSharp'] text-[#F4E8D0] mb-4">
              Spiritual Benefits
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {service.benefits.map((benefit: string, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <IoCheckmarkCircle className="w-6 h-6 text-[#B8860B] shrink-0 mt-1" />
                  <span className="font-['Crimson_Text'] text-[#E8DCC0]">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Ritual Details */}
        <Card className="bg-[#1A1A1A] border-[#B8860B] border-2 shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
          <div className="p-8">
            <h2 className="text-2xl md:text-3xl font-['MedievalSharp'] text-[#F4E8D0] mb-6 flex items-center gap-3">
              <GiCandles className="w-8 h-8 text-[#B8860B]" />
              Ritual Details
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-['MedievalSharp'] text-[#F4E8D0] mb-4 flex items-center gap-2">
                  <IoTimeOutline className="w-6 h-6 text-[#B8860B]" />
                  Duration
                </h3>
                <p className="font-['Crimson_Text'] text-[#E8DCC0] mb-6">
                  {service.ritualDetails.duration}
                </p>

                <h3 className="text-xl font-['MedievalSharp'] text-[#F4E8D0] mb-4">
                  Sacred Materials
                </h3>
                <ul className="space-y-2">
                  {service.ritualDetails.materials.map((material: string, index: number) => (
                    <li key={index} className="flex items-center gap-2">
                      <GiStarShuriken className="w-4 h-4 text-[#B8860B]" />
                      <span className="font-['Crimson_Text'] text-[#E8DCC0]">
                        {material}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-['MedievalSharp'] text-[#F4E8D0] mb-4">
                  Lunar Phase
                </h3>
                <p className="font-['Crimson_Text'] text-[#E8DCC0] mb-6">
                  {service.ritualDetails.lunarPhase}
                </p>

                <h3 className="text-xl font-['MedievalSharp'] text-[#F4E8D0] mb-4">
                  Optimal Timing
                </h3>
                <p className="font-['Crimson_Text'] text-[#E8DCC0]">
                  {service.ritualDetails.timing}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* What to Expect */}
        <Card className="bg-[#1A1A1A] border-[#B8860B] border-2 shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
          <div className="p-8">
            <h2 className="text-2xl md:text-3xl font-['MedievalSharp'] text-[#F4E8D0] mb-6 flex items-center gap-3">
              <GiCrystalBall className="w-8 h-8 text-[#B8860B]" />
              What to Expect
            </h2>

            <div className="mb-8">
              <h3 className="text-xl font-['MedievalSharp'] text-[#F4E8D0] mb-3 flex items-center gap-2">
                <IoTimeOutline className="w-6 h-6 text-[#B8860B]" />
                Timeline
              </h3>
              <p className="font-['Crimson_Text'] text-[#E8DCC0]">
                {service.whatToExpect.timeline}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-['MedievalSharp'] text-[#F4E8D0] mb-4">
                  The Process
                </h3>
                <ol className="space-y-3">
                  {service.whatToExpect.process.map((step: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="font-['MedievalSharp'] text-[#B8860B] shrink-0">
                        {index + 1}.
                      </span>
                      <span className="font-['Crimson_Text'] text-[#E8DCC0]">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-['MedievalSharp'] text-[#F4E8D0] mb-4">
                  Expected Outcomes
                </h3>
                <ul className="space-y-3">
                  {service.whatToExpect.outcomes.map((outcome: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <IoCheckmarkCircle className="w-6 h-6 text-[#B8860B] shrink-0 mt-0.5" />
                      <span className="font-['Crimson_Text'] text-[#E8DCC0]">
                        {outcome}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Preparation */}
        <Card className="bg-[#1A1A1A] border-[#B8860B] border-2 shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
          <div className="p-8">
            <h2 className="text-2xl md:text-3xl font-['MedievalSharp'] text-[#F4E8D0] mb-6 flex items-center gap-3">
              <IoShieldCheckmark className="w-8 h-8 text-[#B8860B]" />
              How to Prepare
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {service.preparation.map((item: string, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <GiCheckeredDiamond className="w-5 h-5 text-[#B8860B] shrink-0 mt-1" />
                  <span className="font-['Crimson_Text'] text-[#E8DCC0]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Consultation Card */}
        <Card className="bg-[#1A1A1A] border-[#B8860B] border-2 shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
          <div className="p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-['MedievalSharp'] text-[#F4E8D0] mb-6">
              Ready to Begin Your Journey?
            </h2>
            <p className="font-['Crimson_Text'] text-lg text-[#E8DCC0] mb-8 max-w-2xl mx-auto">
              Contact us to discuss this sacred service and receive a personalized consultation. We'll guide you through the process and answer any questions you may have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={handleWhatsAppContact}
                size="lg"
                className="bg-[#25D366] hover:bg-[#20BA5A] text-white font-['MedievalSharp'] text-lg border-2 border-[#F4E8D0] shadow-[0_0_20px_rgba(37,211,102,0.3)] min-w-[200px]"
              >
                <FaWhatsapp className="w-5 h-5 mr-2" />
                Contact via WhatsApp
              </Button>
              <Button 
                onClick={handleMessengerContact}
                size="lg"
                className="bg-[#0084FF] hover:bg-[#0073E6] text-white font-['MedievalSharp'] text-lg border-2 border-[#F4E8D0] shadow-[0_0_20px_rgba(0,132,255,0.3)] min-w-[200px]"
              >
                <RiMessengerLine className="w-5 h-5 mr-2" />
                Contact via Messenger
              </Button>
            </div>
          </div>
        </Card>

        {/* Trust Footer */}
        <div className="text-center py-8">
          <div className="flex items-center justify-center gap-6 mb-4">
            <IoShieldCheckmark className="w-8 h-8 text-[#B8860B]" />
            <span className="font-['Crimson_Text'] text-[#E8DCC0]">
              Safe & Confidential
            </span>
            <span className="text-[#B8860B]">•</span>
            <span className="font-['Crimson_Text'] text-[#E8DCC0]">
              15+ Years Experience
            </span>
            <span className="text-[#B8860B]">•</span>
            <span className="font-['Crimson_Text'] text-[#E8DCC0]">
              Pure White Light Magic
            </span>
          </div>
          <p className="font-['Crimson_Text'] text-sm text-[#8B6F47] max-w-2xl mx-auto">
            This service is performed with pure intention and white light energy. Results may vary based on individual circumstances and spiritual readiness.
          </p>
        </div>

      </div>
    </div>
  );
}
