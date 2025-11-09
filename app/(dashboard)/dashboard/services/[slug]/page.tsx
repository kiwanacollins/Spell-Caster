import { notFound } from "next/navigation";
import { getServiceBySlug, getAllServiceSlugs } from "@/lib/services/service-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  GiSpellBook, 
  GiMoon, 
  GiCandles, 
  GiCrystalBall,
  GiCheckeredDiamond,
  GiStarShuriken 
} from "react-icons/gi";
import { IoCheckmarkCircle, IoTimeOutline, IoShieldCheckmark } from "react-icons/io5";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Generate static params for all services
 */
export async function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  
  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.title} - Spiritual Healing Services`,
    description: service.shortDescription,
  };
}

/**
 * Service Detail Page
 */
export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const energyColors = {
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
                  <Button 
                    size="lg"
                    className="bg-[#B8860B] hover:bg-[#CC8800] text-[#1A1A1A] font-['MedievalSharp'] text-lg border-2 border-[#F4E8D0] shadow-[0_0_20px_rgba(184,134,11,0.3)]"
                  >
                    <GiCrystalBall className="w-5 h-5 mr-2" />
                    Request This Service
                  </Button>
                  <p className="text-center font-['Crimson_Text'] text-[#E8DCC0]">
                    From ${service.pricing.basePrice}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

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
              {service.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <IoCheckmarkCircle className="w-6 h-6 text-[#B8860B] flex-shrink-0 mt-1" />
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
                  {service.ritualDetails.materials.map((material, index) => (
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
                  {service.whatToExpect.process.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="font-['MedievalSharp'] text-[#B8860B] flex-shrink-0">
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
                  {service.whatToExpect.outcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <IoCheckmarkCircle className="w-6 h-6 text-[#B8860B] flex-shrink-0 mt-0.5" />
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
              {service.preparation.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <GiCheckeredDiamond className="w-5 h-5 text-[#B8860B] flex-shrink-0 mt-1" />
                  <span className="font-['Crimson_Text'] text-[#E8DCC0]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Pricing Card */}
        <Card className="bg-[#1A1A1A] border-[#B8860B] border-2 shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
          <div className="p-8">
            <h2 className="text-2xl md:text-3xl font-['MedievalSharp'] text-[#F4E8D0] mb-6 text-center">
              Sacred Investment
            </h2>
            
            {service.pricing.tiers ? (
              <div className="grid md:grid-cols-3 gap-6">
                {service.pricing.tiers.map((tier, index) => (
                  <div 
                    key={index}
                    className="bg-[#2C2416] border-2 border-[#B8860B] rounded-lg p-6 hover:shadow-[0_0_30px_rgba(184,134,11,0.3)] transition-all duration-300"
                  >
                    <h3 className="text-xl font-['MedievalSharp'] text-[#F4E8D0] mb-2">
                      {tier.name}
                    </h3>
                    <p className="text-3xl font-['MedievalSharp'] text-[#B8860B] mb-4">
                      ${tier.price}
                    </p>
                    <p className="font-['Crimson_Text'] text-[#E8DCC0] mb-6">
                      {tier.description}
                    </p>
                    <Button 
                      className="w-full bg-[#B8860B] hover:bg-[#CC8800] text-[#1A1A1A] font-['MedievalSharp']"
                    >
                      Select Tier
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center max-w-md mx-auto">
                <p className="text-5xl font-['MedievalSharp'] text-[#B8860B] mb-4">
                  ${service.pricing.basePrice}
                </p>
                <p className="font-['Crimson_Text'] text-[#E8DCC0] mb-8">
                  One-time sacred investment for this powerful spiritual service
                </p>
                <Button 
                  size="lg"
                  className="bg-[#B8860B] hover:bg-[#CC8800] text-[#1A1A1A] font-['MedievalSharp'] text-lg border-2 border-[#F4E8D0] shadow-[0_0_20px_rgba(184,134,11,0.3)]"
                >
                  <GiCrystalBall className="w-5 h-5 mr-2" />
                  Request This Service
                </Button>
              </div>
            )}
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
