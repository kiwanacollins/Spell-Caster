'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { QuoteCreationDialog } from '@/components/admin/quote-creation-dialog';
import { FiPlus, FiSearch } from 'react-icons/fi';

interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  category: string;
  energyLevel: 'Low' | 'Medium' | 'High' | 'Very High';
}

// Service data - same as in service-data.ts
const SERVICES: Service[] = [
  {
    id: 'get_back_lost_items',
    slug: 'get-back-lost-items',
    title: 'Get Back Lost Items',
    shortDescription: 'Recover what has been lost through powerful retrieval magic',
    category: 'Manifestation & Recovery',
    energyLevel: 'Medium',
  },
  {
    id: 'land_solving_spell',
    slug: 'land-solving-spell',
    title: 'Land Solving Spell',
    shortDescription: 'Navigate property disputes and land ownership challenges',
    category: 'Justice & Legal',
    energyLevel: 'High',
  },
  {
    id: 'obsession_spell',
    slug: 'obsession-spell',
    title: 'Obsession Spell',
    shortDescription: 'Capture attention and devotion through mystical attraction',
    category: 'Love & Relationships',
    energyLevel: 'Very High',
  },
  {
    id: 'stop_cheating_spell',
    slug: 'stop-cheating-spell',
    title: 'Stop Cheating Spell',
    shortDescription: 'Ensure faithfulness and prevent infidelity in relationships',
    category: 'Love & Relationships',
    energyLevel: 'High',
  },
  {
    id: 'binding_spell',
    slug: 'binding-spell',
    title: 'Binding Spell',
    shortDescription: 'Create unbreakable spiritual bonds and commitments',
    category: 'Love & Relationships',
    energyLevel: 'Very High',
  },
  {
    id: 'gay_lesbian_spell',
    slug: 'gay-lesbian-spell',
    title: 'Gay & Lesbian Spell',
    shortDescription: 'Attract same-sex love and authentic connections',
    category: 'Love & Relationships',
    energyLevel: 'High',
  },
  {
    id: 'winning_court_case',
    slug: 'winning-court-case',
    title: 'Winning a Court Case',
    shortDescription: 'Influence justice outcomes and court decisions',
    category: 'Justice & Legal',
    energyLevel: 'Very High',
  },
  {
    id: 'business_boost_spells',
    slug: 'business-boost-spells',
    title: 'Business Boost Spells',
    shortDescription: 'Accelerate business growth and entrepreneurial success',
    category: 'Wealth & Business',
    energyLevel: 'High',
  },
  {
    id: 'cleansing_rituals',
    slug: 'cleansing-rituals',
    title: 'Cleansing Rituals',
    shortDescription: 'Purify spaces and auras from negative energy',
    category: 'Protection & Healing',
    energyLevel: 'Medium',
  },
  {
    id: 'divorce_spell',
    slug: 'divorce-spell',
    title: 'Divorce Spell',
    shortDescription: 'Facilitate smooth separation and relationship endings',
    category: 'Life Changes',
    energyLevel: 'High',
  },
  {
    id: 'marriage_commitment',
    slug: 'marriage-commitment',
    title: 'Marriage & Commitment',
    shortDescription: 'Strengthen bonds and manifest lasting partnerships',
    category: 'Love & Relationships',
    energyLevel: 'High',
  },
  {
    id: 'magic_wallet',
    slug: 'magic-wallet',
    shortDescription: 'Attract wealth and abundance into your life',
    title: 'Magic Wallet',
    category: 'Wealth & Business',
    energyLevel: 'Medium',
  },
  {
    id: 'financial_issues',
    slug: 'financial-issues',
    title: 'Financial Issues',
    shortDescription: 'Resolve money problems and improve financial stability',
    category: 'Wealth & Business',
    energyLevel: 'High',
  },
  {
    id: 'protection_shielding',
    slug: 'protection-shielding',
    title: 'Protection & Shielding',
    shortDescription: 'Create spiritual shields against negative forces',
    category: 'Protection & Healing',
    energyLevel: 'High',
  },
  {
    id: 'magic_rings',
    slug: 'magic-rings',
    title: 'Magic Rings',
    shortDescription: 'Channel mystical power through enchanted rings',
    category: 'Artifacts & Tools',
    energyLevel: 'Very High',
  },
];

const CATEGORIES = Array.from(new Set(SERVICES.map((s) => s.category)));

const ENERGY_COLORS: Record<string, string> = {
  Low: 'bg-[#8B6F47]',
  Medium: 'bg-[#CC8800]',
  High: 'bg-[#B8860B]',
  'Very High': 'bg-[#8B0000]',
};

export function AdminServicesBrowserClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);

  const filteredServices = SERVICES.filter((service) => {
    const matchesSearch = service.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
      service.shortDescription
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesCategory = !selectedCategory || service.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleCreateQuote = (service: Service) => {
    setSelectedService(service);
    setQuoteDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-['MedievalSharp'] text-[#F4E8D0]">
            Sacred Services
          </h1>
          <p className="font-['Crimson_Text'] text-lg text-[#E8DCC0] max-w-2xl">
            Browse all spiritual services and create personalized quotes for clients
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="bg-[#1A1A1A] border-[#B8860B] border-2">
          <CardContent className="p-6 space-y-4">
            {/* Search */}
            <div className="relative">
              <FiSearch className="absolute left-3 top-3 w-5 h-5 text-[#8B6F47]" />
              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#2A2A2A] border-[#8B6F47] text-[#E8DCC0] placeholder-[#6B5C3D]"
              />
            </div>

            {/* Category Filter */}
            <div className="space-y-3">
              <p className="font-['Crimson_Text'] text-[#E8DCC0] text-sm">Filter by Category:</p>
              <div className="flex flex-wrap gap-2">
                <Badge
                  onClick={() => setSelectedCategory(null)}
                  className={`cursor-pointer transition-colors ${
                    !selectedCategory
                      ? 'bg-[#B8860B] text-[#1A1A1A]'
                      : 'bg-[#2A2A2A] text-[#E8DCC0] border border-[#8B6F47]'
                  }`}
                >
                  All Services
                </Badge>
                {CATEGORIES.map((category) => (
                  <Badge
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`cursor-pointer transition-colors ${
                      selectedCategory === category
                        ? 'bg-[#B8860B] text-[#1A1A1A]'
                        : 'bg-[#2A2A2A] text-[#E8DCC0] border border-[#8B6F47]'
                    }`}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card
              key={service.id}
              className="bg-[#1A1A1A] border-[#8B6F47] border hover:border-[#B8860B] transition-colors"
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <CardTitle className="font-['MedievalSharp'] text-[#F4E8D0] text-xl">
                      {service.title}
                    </CardTitle>
                  </div>
                  <Badge
                    className={`${ENERGY_COLORS[service.energyLevel]} text-white text-xs`}
                  >
                    {service.energyLevel}
                  </Badge>
                </div>
                <CardDescription className="font-['Crimson_Text'] text-[#E8DCC0]">
                  {service.shortDescription}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {/* Category Badge */}
                  <div>
                    <Badge
                      variant="outline"
                      className="border-[#8B6F47] text-[#B8860B] font-['Crimson_Text']"
                    >
                      {service.category}
                    </Badge>
                  </div>

                  {/* Quick Quote Button */}
                  <Button
                    onClick={() => handleCreateQuote(service)}
                    size="sm"
                    className="w-full bg-[#B8860B] hover:bg-[#CC8800] text-[#1A1A1A] font-['MedievalSharp'] border border-[#F4E8D0]"
                  >
                    <FiPlus className="w-4 h-4 mr-2" />
                    Create Quote
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredServices.length === 0 && (
          <Card className="bg-[#1A1A1A] border-[#8B6F47] border-2">
            <CardContent className="p-12 text-center">
              <p className="font-['Crimson_Text'] text-[#E8DCC0]">
                No services found matching your search criteria
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Quote Creation Dialog */}
      <QuoteCreationDialog
        isOpen={quoteDialogOpen}
        onClose={() => setQuoteDialogOpen(false)}
        serviceId={selectedService?.id}
        serviceName={selectedService?.title}
        onQuoteCreated={(quoteId) => {
          console.debug('Quote created:', quoteId);
          setQuoteDialogOpen(false);
          // Optionally show success toast
        }}
      />
    </div>
  );
}
