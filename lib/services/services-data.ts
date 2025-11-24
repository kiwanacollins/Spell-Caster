/**
 * Services Data
 * Shared service definitions used across the application
 */

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
}

export const services: Service[] = [
  {
    id: 'revenge-spell',
    name: 'Revenge Spell',
    description:
      'Karmic justice magic to return negative energy to those who wronged you, ensuring wrongdoers face consequences through universal law.',
    icon: '/icons/services/revenge-spell.svg',
    category: 'Spells',
  },
  {
    id: 'get-back-lost-items',
    name: 'Get Back Lost Items',
    description:
      'Powerful rituals to recover lost possessions, retrieve stolen items, and restore what rightfully belongs to you through ancient tracking magic.',
    icon: '/icons/services/get-back-lost-items.png',
    category: 'Spells',
  },
  {
    id: 'land-solving-spell',
    name: 'Land Solving Spell',
    description:
      'Resolve property disputes, clear land titles, and manifest rightful ownership through sacred land blessing rituals.',
    icon: '/icons/services/land-solving-spell.png',
    category: 'Spells',
  },
  {
    id: 'obsession-spell',
    name: 'Obsession Spell',
    description:
      'Create powerful magnetic attraction and deep emotional connection, making someone unable to stop thinking about you.',
    icon: '/icons/services/obsession-spell.png',
    category: 'Spells',
  },
  {
    id: 'stop-cheating-spell',
    name: 'Stop Cheating Spell',
    description:
      'End infidelity and restore loyalty in relationships through powerful binding and truth-revealing rituals.',
    icon: '/icons/services/stop-cheating-spell.png',
    category: 'Spells',
  },
  {
    id: 'binding-spell',
    name: 'Binding Spell',
    description:
      'Create unbreakable bonds, prevent separation, and secure lasting commitment through ancient binding rituals.',
    icon: '/icons/services/bonding-spell.png',
    category: 'Spells',
  },
  {
    id: 'gay-lesbian-spell',
    name: 'Gay & Lesbian Spell',
    description:
      'Specialized love spells for LGBTQ+ relationships, attracting compatible partners and strengthening same-sex bonds.',
    icon: '/icons/services/gay-and-lesibian-spell.png',
    category: 'Spells',
  },
  {
    id: 'winning-court-case',
    name: 'Winning a Court Case',
    description:
      'Gain favor in legal matters, influence judges and juries, and ensure justice prevails in your favor.',
    icon: '/icons/services/winning-a-court-case.png',
    category: 'Spells',
  },
  {
    id: 'business-boost-spells',
    name: 'Business Boost Spells',
    description:
      'Attract customers, increase profits, overcome competition, and manifest unprecedented business success.',
    icon: '/icons/services/business-boost-spell.png',
    category: 'Spells',
  },
  {
    id: 'cleansing-rituals',
    name: 'Cleansing Rituals and Spells',
    description:
      'Remove negative energy, break curses, cleanse your aura, and purify your space from all harmful influences.',
    icon: '/icons/services/Chakra-Meditation.svg',
    category: 'Rituals',
  },
  {
    id: 'divorce-spell',
    name: 'Divorce Spell',
    description:
      'Facilitate peaceful separation, speed up divorce proceedings, and help both parties move on to new beginnings.',
    icon: '/icons/services/divorce-spell.png',
    category: 'Spells',
  },
  {
    id: 'marriage-commitment',
    name: 'Marriage and Commitment',
    description:
      'Manifest marriage proposals, strengthen commitment, and create lasting unions blessed by ancient spirits.',
    icon: '/icons/services/marriage-and-commitment.png',
    category: 'Spells',
  },
  {
    id: 'magic-wallet',
    name: 'Magic Wallet',
    description:
      'Enchanted wallets that continuously attract money, multiply wealth, and ensure your pockets never run empty.',
    icon: '/icons/services/magic-wallet.png',
    category: 'Artifacts',
  },
  {
    id: 'financial-issues',
    name: 'Financial Issues',
    description:
      'Overcome debt, attract financial opportunities, break poverty cycles, and manifest abundance and prosperity.',
    icon: '/icons/services/financial-issues.png',
    category: 'Spells',
  },
  {
    id: 'protection-spells',
    name: 'Protection & Shielding',
    description:
      'Ward off negative energies, break curses, and create sacred barriers against harm and malicious forces.',
    icon: '/icons/services/Shield_005_SPenguin.svg',
    category: 'Spells',
  },
  {
    id: 'magic-rings',
    name: 'Magic Rings',
    description:
      'Channel mystical energies through sacred rings infused with ancient power to protect, attract, and transform your destiny.',
    icon: '/icons/services/magic-rings.svg',
    category: 'Artifacts',
  },
];
