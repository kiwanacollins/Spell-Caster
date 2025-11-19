/**
 * Dynamic Pricing Configuration for All 15 Spiritual Services
 * Users communicate their needs and discuss pricing directly with admin via WhatsApp/Messenger
 * No predefined prices - admin provides custom quotes based on user's situation
 */

import { ObjectId } from 'mongodb';

export type ServiceType =
  | 'get_back_lost_items'
  | 'land_solving'
  | 'obsession_spell'
  | 'stop_cheating'
  | 'binding_spell'
  | 'gay_lesbian_spell'
  | 'court_case'
  | 'business_boost'
  | 'cleansing_rituals'
  | 'divorce_spell'
  | 'marriage_commitment'
  | 'magic_wallet'
  | 'financial_issues'
  | 'protection_shielding'
  | 'magic_rings';

/**
 * Price Quote from Admin
 * Created after user contacts admin and discusses their needs
 * Admin sends quote via WhatsApp/Messenger or within app
 */
export interface PriceQuote {
  _id?: ObjectId;
  userId: string; // User who received the quote
  serviceId: ServiceType;
  serviceName: string;
  quotedPrice: number; // USD - Price admin quoted for this user's specific situation
  currency: string; // 'usd'
  notes?: string; // Admin's notes about why this price (e.g., "Complex case, requires extended ritual")
  validUntil?: Date; // Quote expiration (e.g., 7 days from creation)
  accepted: boolean; // Whether user accepted and is ready to pay
  acceptedAt?: Date;
  rejectedAt?: Date;
  rejectionReason?: string; // Why user declined
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Service Catalog (No Prices)
 * Information about services for display on website
 * Prices are NOT shown - users contact admin for quotes
 */
export interface ServiceInfo {
  serviceId: ServiceType;
  name: string;
  description: string;
  category: 'love' | 'protection' | 'wealth' | 'justice' | 'artifacts';
  duration: string; // e.g., "3-7 days", "21 days"
  whatToExpect: string; // What happens during the ritual
  preparation?: string; // What user needs to prepare
  installmentEligible: boolean; // Can be paid in installments after admin approves
  maxInstallments?: number; // Max installments if approved by admin
}

/**
 * Service catalog - NO predefined prices
 * Users see service descriptions and contact admin to discuss pricing
 */
const SERVICES_CATALOG: Record<ServiceType, ServiceInfo> = {
  get_back_lost_items: {
    serviceId: 'get_back_lost_items',
    name: 'Get Back Lost Items',
    description: 'Retrieval spell to recover lost or stolen items',
    category: 'justice',
    duration: '3-7 days',
    whatToExpect: 'Spiritual ritual to locate and return your lost belongings',
    preparation: 'Provide details about the lost item and when it was lost',
    installmentEligible: false,
  },
  land_solving: {
    serviceId: 'land_solving',
    name: 'Land Solving Spell',
    description: 'Property resolution and land dispute resolution magic',
    category: 'justice',
    duration: '7-14 days',
    whatToExpect: 'Ancient land-solving rituals to resolve property conflicts',
    preparation: 'Details of the property dispute and all parties involved',
    installmentEligible: true,
    maxInstallments: 3,
  },
  obsession_spell: {
    serviceId: 'obsession_spell',
    name: 'Obsession Spell',
    description: 'Create powerful attraction and romantic obsession',
    category: 'love',
    duration: '7-21 days',
    whatToExpect: 'Powerful attraction ritual to capture someone\'s attention and affection',
    preparation: 'Name, birth date, and photo of the target (if possible)',
    installmentEligible: true,
    maxInstallments: 3,
  },
  stop_cheating: {
    serviceId: 'stop_cheating',
    name: 'Stop Cheating Spell',
    description: 'Loyalty binding and infidelity prevention',
    category: 'love',
    duration: '5-10 days',
    whatToExpect: 'Binding ritual to seal your partner\'s loyalty and prevent cheating',
    preparation: 'Your partner\'s name and birth date',
    installmentEligible: false,
  },
  binding_spell: {
    serviceId: 'binding_spell',
    name: 'Binding Spell',
    description: 'Commitment and relationship binding magic',
    category: 'love',
    duration: '7-14 days',
    whatToExpect: 'Ritual to deepen commitment and bind two souls together',
    preparation: 'Both people\'s names and birth dates',
    installmentEligible: true,
    maxInstallments: 3,
  },
  gay_lesbian_spell: {
    serviceId: 'gay_lesbian_spell',
    name: 'Gay & Lesbian Spell',
    description: 'Love magic for LGBTQ+ relationships and attraction',
    category: 'love',
    duration: '7-14 days',
    whatToExpect: 'Inclusive love magic tailored to LGBTQ+ relationships',
    preparation: 'Partner or crush\'s name and birth date',
    installmentEligible: true,
    maxInstallments: 3,
  },
  court_case: {
    serviceId: 'court_case',
    name: 'Winning a Court Case',
    description: 'Justice magic for favorable court outcomes',
    category: 'justice',
    duration: '14-30 days',
    whatToExpect: 'Powerful justice ritual to influence court proceedings in your favor',
    preparation: 'Details of the case and court date',
    installmentEligible: true,
    maxInstallments: 4,
  },
  business_boost: {
    serviceId: 'business_boost',
    name: 'Business Boost Spells',
    description: 'Prosperity magic for business growth and success',
    category: 'wealth',
    duration: '14-21 days',
    whatToExpect: 'Ritual to attract more customers, sales, and business opportunities',
    preparation: 'Business name, type, and your goals for growth',
    installmentEligible: true,
    maxInstallments: 4,
  },
  cleansing_rituals: {
    serviceId: 'cleansing_rituals',
    name: 'Cleansing Rituals',
    description: 'Spiritual purification and negative energy removal',
    category: 'protection',
    duration: '3-7 days',
    whatToExpect: 'Deep cleansing to remove negative energy and spiritual blocks',
    preparation: 'Description of negative energy or blockages you\'re experiencing',
    installmentEligible: false,
  },
  divorce_spell: {
    serviceId: 'divorce_spell',
    name: 'Divorce Spell',
    description: 'Separation and relationship dissolution magic',
    category: 'love',
    duration: '14-30 days',
    whatToExpect: 'Ritual to facilitate peaceful or swift separation/divorce',
    preparation: 'Both people\'s names, birth dates, and marriage details',
    installmentEligible: true,
    maxInstallments: 4,
  },
  marriage_commitment: {
    serviceId: 'marriage_commitment',
    name: 'Marriage & Commitment',
    description: 'Union blessing and commitment strengthening',
    category: 'love',
    duration: '7-14 days',
    whatToExpect: 'Ritual to bless your union and strengthen commitment between partners',
    preparation: 'Both people\'s names and birth dates',
    installmentEligible: true,
    maxInstallments: 3,
  },
  magic_wallet: {
    serviceId: 'magic_wallet',
    name: 'Magic Wallet',
    description: 'Enchanted artifact for wealth attraction',
    category: 'artifacts',
    duration: '3-5 days',
    whatToExpect: 'An enchanted wallet artifact to attract money and wealth',
    preparation: 'None required - artifact is created and blessed',
    installmentEligible: false,
  },
  financial_issues: {
    serviceId: 'financial_issues',
    name: 'Financial Issues',
    description: 'Abundance magic for financial problem resolution',
    category: 'wealth',
    duration: '7-14 days',
    whatToExpect: 'Ritual to overcome financial hardship and attract abundance',
    preparation: 'Details of your financial situation and goals',
    installmentEligible: true,
    maxInstallments: 3,
  },
  protection_shielding: {
    serviceId: 'protection_shielding',
    name: 'Protection & Shielding',
    description: 'Defensive magic and spiritual protection',
    category: 'protection',
    duration: '5-7 days',
    whatToExpect: 'Protective shield against negative intentions and spiritual harm',
    preparation: 'Description of threats or negative energy you\'re protecting against',
    installmentEligible: false,
  },
  magic_rings: {
    serviceId: 'magic_rings',
    name: 'Magic Rings',
    description: 'Enchanted ring artifacts with magical properties',
    category: 'artifacts',
    duration: '3-7 days',
    whatToExpect: 'Personalized enchanted ring with specific magical properties',
    preparation: 'Your birth date and intention for the ring',
    installmentEligible: false,
  },
};

/**
 * Get service configuration (no prices)
 */
export function getServiceConfig(serviceId: ServiceType): ServiceInfo {
  const config = SERVICES_CATALOG[serviceId];
  if (!config) {
    throw new Error(`Service configuration not found for: ${serviceId}`);
  }
  return config;
}

/**
 * Get all services catalog
 */
export function getAllServicesCatalog(): ServiceInfo[] {
  return Object.values(SERVICES_CATALOG);
}

/**
 * Get services by category
 */
export function getServicesByCategory(
  category: ServiceInfo['category']
): ServiceInfo[] {
  return Object.values(SERVICES_CATALOG).filter((s) => s.category === category);
}

/**
 * Calculate installment amount from quoted price
 */
export function calculateInstallmentAmount(
  quotedPrice: number,
  numberOfInstallments: number
): number {
  if (numberOfInstallments <= 0) {
    throw new Error('Number of installments must be greater than 0');
  }

  const installmentAmount = Math.round((quotedPrice / numberOfInstallments) * 100) / 100;
  return installmentAmount;
}

/**
 * Get all installment options for a quoted price
 */
export function getInstallmentOptions(
  serviceId: ServiceType,
  quotedPrice: number
): Array<{
  numberOfInstallments: number;
  installmentAmount: number;
  totalCost: number;
}> {
  const config = getServiceConfig(serviceId);

  if (!config.installmentEligible || !config.maxInstallments) {
    return [];
  }

  const options = [];

  for (let i = 2; i <= config.maxInstallments; i++) {
    const installmentAmount = calculateInstallmentAmount(quotedPrice, i);
    options.push({
      numberOfInstallments: i,
      installmentAmount,
      totalCost: quotedPrice, // Total stays the same, just divided
    });
  }

  return options;
}

/**
 * Format price for display
 */
export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

/**
 * Check if service qualifies for installment plans
 */
export function isInstallmentEligible(serviceId: ServiceType): boolean {
  return getServiceConfig(serviceId).installmentEligible;
}

/**
 * Get service by name
 */
export function getServiceByName(name: string): ServiceInfo | undefined {
  return Object.values(SERVICES_CATALOG).find(
    (s) => s.name.toLowerCase() === name.toLowerCase()
  );
}

/**
 * Get price quote for a user
 * Users contact admin via WhatsApp/Messenger to get quoted
 */
export async function getUserPriceQuote(
  _userId: string,
  _serviceId: ServiceType
): Promise<PriceQuote | null> {
  // This will be implemented in pricing-operations.ts
  // Returns the quote if admin has sent one to this user
  return null; // Placeholder
}

export default SERVICES_CATALOG;
