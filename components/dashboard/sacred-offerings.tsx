'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GiCrystalize, GiCandles, GiLightBulb } from "react-icons/gi";
import { IoHeart, IoWallet, IoShieldCheckmark, IoScale } from "react-icons/io5";

interface ServiceCardData {
  slug: string;
  title: string;
  description: string;
  category: 'love' | 'wealth' | 'protection' | 'justice';
  energyLevel: 'low' | 'medium' | 'high';
  icon: React.ComponentType<{ className?: string }>;
  moonPhase: '🌒' | '🌓' | '🌔' | '🌕';
}

/**
 * Sacred Offerings (Service Summary) Section Component
 * Displays service cards organized by category with energy levels and mystical styling
 * 
 * Subtasks:
 * 4.2.2.1 - Service category tabs (Love & Relationships, Wealth & Business, Protection & Cleansing, Justice & Legal)
 * 4.2.2.2 - Service cards with title, description, Energy Level indicator (moon phases)
 * 4.2.2.3 - Mystical visuals (crystals, candles, light energy icons)
 * 4.2.2.4 - Request Spell / Learn More buttons with ancient styling
 * 4.2.2.5 - Energy level badges (Full Moon Energy / Medium / Strong)
 */
export function SacredOfferingsSection() {
  const [selectedTab, setSelectedTab] = useState('love');

  // Sample service data organized by category
  const services: ServiceCardData[] = [
    // Love & Relationships
    {
      slug: 'obsession-spell',
      title: 'Obsession Spell',
      description: 'Draw romantic attraction and create an irresistible magnetic connection',
      category: 'love',
      energyLevel: 'high',
      icon: GiCrystalize,
      moonPhase: '🌕',
    },
    {
      slug: 'stop-cheating-spell',
      title: 'Stop Cheating Spell',
      description: 'Bind loyalty and prevent infidelity in relationships',
      category: 'love',
      energyLevel: 'medium',
      icon: GiCandles,
      moonPhase: '🌔',
    },
    {
      slug: 'binding-spell',
      title: 'Binding Spell',
      description: 'Create powerful spiritual bonds and commitment',
      category: 'love',
      energyLevel: 'high',
      icon: GiLightBulb,
      moonPhase: '🌕',
    },
    {
      slug: 'gay-lesbian-spell',
      title: 'Gay & Lesbian Love Spell',
      description: 'Authentic love magic for LGBTQ+ connections',
      category: 'love',
      energyLevel: 'high',
      icon: GiCrystalize,
      moonPhase: '🌕',
    },
    {
      slug: 'marriage-commitment',
      title: 'Marriage & Commitment',
      description: 'Manifest lasting union and sacred vows',
      category: 'love',
      energyLevel: 'high',
      icon: GiCandles,
      moonPhase: '🌕',
    },
    {
      slug: 'divorce-spell',
      title: 'Divorce Spell',
      description: 'Navigate separation with grace and favorable terms',
      category: 'love',
      energyLevel: 'medium',
      icon: GiLightBulb,
      moonPhase: '🌔',
    },
    // Wealth & Business
    {
      slug: 'magic-wallet',
      title: 'Magic Wallet',
      description: 'Attract wealth and abundance into your life',
      category: 'wealth',
      energyLevel: 'high',
      icon: GiLightBulb,
      moonPhase: '🌕',
    },
    {
      slug: 'business-boost-spells',
      title: 'Business Boost Spells',
      description: 'Accelerate success and prosperity in your enterprise',
      category: 'wealth',
      energyLevel: 'high',
      icon: GiCrystalize,
      moonPhase: '🌕',
    },
    {
      slug: 'financial-issues',
      title: 'Financial Issues Resolution',
      description: 'Resolve debt and financial hardship with mystical intervention',
      category: 'wealth',
      energyLevel: 'medium',
      icon: GiCandles,
      moonPhase: '🌔',
    },
    {
      slug: 'land-solving-spell',
      title: 'Land Solving Spell',
      description: 'Resolve property disputes and real estate matters',
      category: 'wealth',
      energyLevel: 'medium',
      icon: GiLightBulb,
      moonPhase: '🌓',
    },
    // Protection & Cleansing
    {
      slug: 'protection-shielding',
      title: 'Protection & Shielding',
      description: 'Guard yourself from negativity and harmful energy',
      category: 'protection',
      energyLevel: 'high',
      icon: GiCrystalize,
      moonPhase: '🌕',
    },
    {
      slug: 'cleansing-rituals',
      title: 'Cleansing Rituals',
      description: 'Purify your space and spirit from dark influences',
      category: 'protection',
      energyLevel: 'medium',
      icon: GiCandles,
      moonPhase: '🌔',
    },
    {
      slug: 'get-back-lost-items',
      title: 'Get Back Lost Items',
      description: 'Locate and retrieve precious items mysteriously lost',
      category: 'protection',
      energyLevel: 'low',
      icon: GiLightBulb,
      moonPhase: '🌒',
    },
    {
      slug: 'magic-rings',
      title: 'Magic Rings',
      description: 'Channel protective and transformative energy',
      category: 'protection',
      energyLevel: 'medium',
      icon: GiCandles,
      moonPhase: '🌓',
    },
    // Justice & Legal
    {
      slug: 'revenge-spell',
      title: 'Revenge Spell',
      description: 'Karmic justice and spiritual retribution for wrongdoers',
      category: 'justice',
      energyLevel: 'high',
      icon: GiCrystalize,
      moonPhase: '🌑',
    },
    {
      slug: 'winning-court-case',
      title: 'Winning a Court Case',
      description: 'Manifest justice and favorable legal outcomes',
      category: 'justice',
      energyLevel: 'high',
      icon: GiCrystalize,
      moonPhase: '🌕',
    },
  ];

  // Filter services by category
  const getServicesByCategory = (category: string) => {
    return services.filter(s => s.category === category);
  };

  // Get energy level color and label
  const getEnergyInfo = (level: string) => {
    switch (level) {
      case 'low':
        return { label: '🌒 Low Moon Energy', color: 'bg-[#4A4A4A] text-[#F4E8D0]' };
      case 'medium':
        return { label: '🌓 Medium Energy', color: 'bg-[#CC8800] text-[#1A1A1A]' };
      case 'high':
        return { label: '🌕 Full Moon Energy', color: 'bg-[#B8860B] text-[#1A1A1A]' };
      default:
        return { label: 'Unknown', color: 'bg-gray-500' };
    }
  };

  const ServiceCard = ({ service }: { service: ServiceCardData }) => {
    const energyInfo = getEnergyInfo(service.energyLevel);
    const IconComponent = service.icon;

    return (
      <Card className="border-4 border-[#8B6F47] bg-[#F4E8D0] shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.4)] transition-all duration-300 overflow-hidden relative group">
        {/* Corner decoration */}
        <div className="absolute top-2 right-2 opacity-20 text-[#8B6F47] text-2xl">✦</div>

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <CardTitle className="font-['MedievalSharp'] text-lg text-[#1A1A1A] mb-1">
                {service.title}
              </CardTitle>
              <CardDescription className="font-['Crimson_Text'] text-[#4A4A4A]">
                {service.description}
              </CardDescription>
            </div>
            <IconComponent className="h-8 w-8 text-[#B8860B] shrink-0 drop-shadow-[0_0_4px_rgba(184,134,11,0.4)]" />
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* Energy Level and Moon Phase */}
          <div className="flex flex-wrap gap-2 items-center">
            <Badge className={`font-['Crimson_Text'] text-xs px-2 py-1 border border-[#8B6F47]/50 ${energyInfo.color}`}>
              {energyInfo.label}
            </Badge>
            <span className="text-2xl">{service.moonPhase}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Link href={`/dashboard/services/${service.slug}`} className="flex-1">
              <Button
                className="w-full bg-[#8B6F47] hover:bg-[#6B4F27] text-[#F4E8D0] font-['Cinzel'] text-sm border-2 border-[#5B3F17] shadow-md hover:shadow-lg transition-all duration-300"
              >
                Request Spell
              </Button>
            </Link>
            <Link href={`/dashboard/services/${service.slug}`} className="flex-1">
              <Button
                variant="outline"
                className="w-full border-2 border-[#8B6F47] text-[#8B6F47] hover:bg-[#8B6F47]/10 font-['Cinzel'] text-sm"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="text-center space-y-2">
        <h2 className="font-['MedievalSharp'] text-3xl text-[#F4E8D0]">✦ Sacred Offerings ✦</h2>
        <p className="font-['Crimson_Text'] text-[#C0C0C0] text-lg">
          Explore our mystical services organized by spiritual purpose
        </p>
      </div>

      {/* 4.2.2.1 - Service Category Tabs */}
      <Tabs 
        defaultValue="love" 
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="w-full"
      >
        {/* Tab Navigation */}
        <TabsList className="grid w-full grid-cols-4 bg-[#2C2416] border-2 border-[#8B6F47] p-1 rounded-lg shadow-lg">
          <TabsTrigger
            value="love"
            className="font-['Cinzel'] text-sm data-[state=active]:bg-[#8B6F47] data-[state=active]:text-[#F4E8D0] data-[state=inactive]:text-[#C0C0C0] hover:text-[#F4E8D0] transition-colors duration-300"
          >
            <IoHeart className="inline-block mr-1" /> Love
          </TabsTrigger>
          <TabsTrigger
            value="wealth"
            className="font-['Cinzel'] text-sm data-[state=active]:bg-[#B8860B] data-[state=active]:text-[#1A1A1A] data-[state=inactive]:text-[#C0C0C0] hover:text-[#F4E8D0] transition-colors duration-300"
          >
            <IoWallet className="inline-block mr-1" /> Wealth
          </TabsTrigger>
          <TabsTrigger
            value="protection"
            className="font-['Cinzel'] text-sm data-[state=active]:bg-[#2C5530] data-[state=active]:text-[#F4E8D0] data-[state=inactive]:text-[#C0C0C0] hover:text-[#F4E8D0] transition-colors duration-300"
          >
            <IoShieldCheckmark className="inline-block mr-1" /> Protection
          </TabsTrigger>
          <TabsTrigger
            value="justice"
            className="font-['Cinzel'] text-sm data-[state=active]:bg-[#8B0000] data-[state=active]:text-[#F4E8D0] data-[state=inactive]:text-[#C0C0C0] hover:text-[#F4E8D0] transition-colors duration-300"
          >
            <IoScale className="inline-block mr-1" /> Justice
          </TabsTrigger>
        </TabsList>

        {/* Tab Content - Love & Relationships */}
        <TabsContent value="love" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getServicesByCategory('love').map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </TabsContent>

        {/* Tab Content - Wealth & Business */}
        <TabsContent value="wealth" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getServicesByCategory('wealth').map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </TabsContent>

        {/* Tab Content - Protection & Cleansing */}
        <TabsContent value="protection" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getServicesByCategory('protection').map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </TabsContent>

        {/* Tab Content - Justice & Legal */}
        <TabsContent value="justice" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getServicesByCategory('justice').map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Mystical Divider */}
      <div className="flex items-center justify-center gap-4 py-4">
        <div className="h-px w-24 bg-linear-to-r from-transparent to-[#8B6F47]" />
        <span className="text-[#8B6F47] text-xl">✦</span>
        <div className="h-px w-24 bg-linear-to-l from-transparent to-[#8B6F47]" />
      </div>

      {/* Call to Action Footer */}
      <div className="text-center space-y-3 pt-4">
        <p className="font-['IM_Fell_English'] text-[#C0C0C0] text-base italic">
          Each service is crafted with ancient wisdom and modern spiritual practice
        </p>
        <p className="font-['Crimson_Text'] text-[#4A4A4A] text-sm">
          Unable to find what you need? Contact us through WhatsApp or Messenger for custom services
        </p>
      </div>
    </div>
  );
}
