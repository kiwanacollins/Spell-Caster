/**
 * Service Data Structure
 * Contains all spiritual services offered with detailed information
 */

export interface Service {
  id: string;
  slug: string;
  title: string;
  category: "Love & Relationships" | "Wealth & Business" | "Protection & Cleansing" | "Justice & Legal";
  shortDescription: string;
  fullDescription: string;
  energyLevel: "Low" | "Medium" | "High" | "Very High";
  moonPhase: string;
  benefits: string[];
  ritualDetails: {
    duration: string;
    materials: string[];
    lunarPhase: string;
    timing: string;
  };
  whatToExpect: {
    timeline: string;
    process: string[];
    outcomes: string[];
  };
  preparation: string[];
  pricing: {
    basePrice: number;
    tiers?: {
      name: string;
      price: number;
      description: string;
    }[];
  };
  testimonials?: {
    name: string;
    rating: number;
    text: string;
    service: string;
  }[];
}

export const services: Service[] = [
  {
    id: "1",
    slug: "get-back-lost-items",
    title: "Get Back Lost Items",
    category: "Protection & Cleansing",
    shortDescription: "Retrieve lost or stolen possessions through spiritual tracking and manifestation",
    fullDescription: "Harness ancient retrieval magic to locate and return lost items through spiritual tracking, energy alignment, and manifestation rituals. This powerful spell works on personal belongings, documents, and valuables.",
    energyLevel: "Medium",
    moonPhase: "🌓",
    benefits: [
      "Spiritual tracking of lost items",
      "Energy alignment to draw items back",
      "Protection against future loss",
      "Peace of mind and closure"
    ],
    ritualDetails: {
      duration: "3-7 days",
      materials: ["White candles", "Rose quartz crystal", "Personal item photo", "Sage"],
      lunarPhase: "Waxing Moon (for drawing things back)",
      timing: "Best performed on Wednesdays or Sundays"
    },
    whatToExpect: {
      timeline: "Results typically manifest within 1-2 weeks",
      process: [
        "Initial energy reading and item location tracking",
        "Manifestation ritual during waxing moon",
        "Daily affirmations and visualization exercises",
        "Protection spell to prevent future loss"
      ],
      outcomes: [
        "Increased likelihood of item recovery",
        "Enhanced awareness of item's location",
        "Spiritual closure if item cannot be recovered",
        "Protection charm for valuables"
      ]
    },
    preparation: [
      "Provide photo or description of lost item",
      "Recall last known location",
      "Prepare clear intention for retrieval",
      "Be open to signs and synchronicities"
    ],
    pricing: {
      basePrice: 150
    }
  },
  {
    id: "2",
    slug: "land-solving-spell",
    title: "Land Solving Spell",
    category: "Wealth & Business",
    shortDescription: "Resolve property disputes and clear land-related obstacles",
    fullDescription: "Ancient land blessing and dispute resolution magic to clear property obstacles, resolve ownership conflicts, and ensure smooth real estate transactions through ancestral land spirits.",
    energyLevel: "High",
    moonPhase: "🌕",
    benefits: [
      "Clear property disputes and legal blocks",
      "Bless land for prosperity",
      "Remove negative energy from property",
      "Ensure successful real estate transactions"
    ],
    ritualDetails: {
      duration: "7-14 days",
      materials: ["Earth from the property", "Green candles", "Salt", "Blessed water"],
      lunarPhase: "Full Moon (for maximum power)",
      timing: "Best performed at sunrise"
    },
    whatToExpect: {
      timeline: "Legal progress within 2-4 weeks",
      process: [
        "Land energy assessment and clearing",
        "Ancestral spirits consultation",
        "Boundary blessing ritual",
        "Prosperity and protection charm placement"
      ],
      outcomes: [
        "Resolution of property disputes",
        "Cleared legal obstacles",
        "Protected and blessed land",
        "Favorable transaction outcomes"
      ]
    },
    preparation: [
      "Bring soil or photo of the property",
      "Provide property details and disputes",
      "Clear intention for resolution",
      "Be patient with legal processes"
    ],
    pricing: {
      basePrice: 300
    }
  },
  {
    id: "3",
    slug: "obsession-spell",
    title: "Obsession Spell",
    category: "Love & Relationships",
    shortDescription: "Create deep attraction and lasting romantic connection",
    fullDescription: "Powerful attraction magic designed to create deep romantic interest and lasting connection. This spell works on the heart chakra to magnetize your desired partner's attention and affection.",
    energyLevel: "Very High",
    moonPhase: "🌕",
    benefits: [
      "Intense romantic attraction",
      "Constant thoughts from target",
      "Deep emotional connection",
      "Long-lasting bond creation"
    ],
    ritualDetails: {
      duration: "9-21 days",
      materials: ["Red candles", "Rose petals", "Personal photos", "Honey", "Cinnamon"],
      lunarPhase: "Full Moon to New Moon cycle",
      timing: "Friday evenings (Venus day)"
    },
    whatToExpect: {
      timeline: "Initial signs within 3-7 days, full effects in 3-6 weeks",
      process: [
        "Heart chakra opening ceremony",
        "Photo binding ritual",
        "Daily attraction chants",
        "Love magnet charm creation"
      ],
      outcomes: [
        "Target thinks of you constantly",
        "Increased communication and contact",
        "Deep romantic feelings develop",
        "Relationship potential strengthened"
      ]
    },
    preparation: [
      "Provide clear photo of target person",
      "Write down your intentions clearly",
      "Be certain of your desires",
      "Understand ethical implications"
    ],
    pricing: {
      basePrice: 250
    }
  },
  {
    id: "4",
    slug: "stop-cheating-spell",
    title: "Stop Cheating Spell",
    category: "Love & Relationships",
    shortDescription: "End infidelity and restore relationship fidelity",
    fullDescription: "Powerful fidelity magic to stop cheating behavior, break third-party interference, and restore loyalty and trust in your relationship through binding and cleansing rituals.",
    energyLevel: "High",
    moonPhase: "🌘",
    benefits: [
      "End current infidelity",
      "Break third-party connections",
      "Restore partner's loyalty",
      "Rebuild trust and commitment"
    ],
    ritualDetails: {
      duration: "7-14 days",
      materials: ["Black candles", "White sage", "Separation herbs", "Binding cord"],
      lunarPhase: "Waning Moon (for banishing)",
      timing: "Saturday nights (Saturn day for binding)"
    },
    whatToExpect: {
      timeline: "Noticeable changes within 1-3 weeks",
      process: [
        "Third-party separation ritual",
        "Loyalty binding spell",
        "Trust restoration ceremony",
        "Protection charm for relationship"
      ],
      outcomes: [
        "Affair ends naturally",
        "Partner's focus returns to relationship",
        "Third party loses interest",
        "Renewed commitment and fidelity"
      ]
    },
    preparation: [
      "Provide partner's photo",
      "Details about the situation (confidential)",
      "Be ready for relationship healing work",
      "Commitment to rebuilding trust"
    ],
    pricing: {
      basePrice: 275
    }
  },
  {
    id: "5",
    slug: "binding-spell",
    title: "Binding Spell",
    category: "Love & Relationships",
    shortDescription: "Create unbreakable commitment and lasting union",
    fullDescription: "Sacred binding magic to create permanent spiritual connection between partners, ensuring lasting commitment, unwavering loyalty, and soul-deep union through ancient handfasting rituals.",
    energyLevel: "Very High",
    moonPhase: "🌕",
    benefits: [
      "Permanent spiritual connection",
      "Unbreakable commitment bond",
      "Deep soul-level union",
      "Lifelong partnership protection"
    ],
    ritualDetails: {
      duration: "14-21 days",
      materials: ["Red and white candles", "Binding cords", "Commitment tokens", "Rose quartz"],
      lunarPhase: "Full Moon ceremony",
      timing: "Performed on couple's significant dates"
    },
    whatToExpect: {
      timeline: "Immediate energetic bond, full integration in 6-8 weeks",
      process: [
        "Soul compatibility assessment",
        "Handfasting ceremony (spiritual marriage)",
        "Eternal bond sealing ritual",
        "Protection charm creation for union"
      ],
      outcomes: [
        "Unbreakable spiritual bond",
        "Deepened commitment and loyalty",
        "Protected relationship",
        "Soul-mate level connection"
      ]
    },
    preparation: [
      "Both partners' consent ideal (but not required)",
      "Photos of both individuals",
      "Clear commitment intentions",
      "Understanding of binding permanence"
    ],
    pricing: {
      basePrice: 350
    }
  },
  {
    id: "6",
    slug: "gay-lesbian-spell",
    title: "Gay & Lesbian Love Spell",
    category: "Love & Relationships",
    shortDescription: "LGBTQ+ love magic for same-sex attraction and relationships",
    fullDescription: "Inclusive love magic specifically designed for LGBTQ+ individuals seeking same-sex romantic connections. This spell honors all forms of love and creates authentic, passionate same-sex relationships.",
    energyLevel: "High",
    moonPhase: "🌔",
    benefits: [
      "Attract same-sex partner",
      "Deepen existing LGBTQ+ relationship",
      "Create authentic connection",
      "Celebrate queer love magic"
    ],
    ritualDetails: {
      duration: "7-14 days",
      materials: ["Rainbow candles", "Lavender", "Rose quartz", "Amethyst"],
      lunarPhase: "Waxing Gibbous Moon",
      timing: "Any evening with pink or purple twilight"
    },
    whatToExpect: {
      timeline: "New connections within 2-4 weeks",
      process: [
        "LGBTQ+ affirming energy work",
        "Same-sex attraction ritual",
        "Authentic love manifestation",
        "Queer community blessing"
      ],
      outcomes: [
        "Authentic same-sex romantic connection",
        "Increased visibility in LGBTQ+ spaces",
        "Deepened current relationship",
        "Self-love and pride enhancement"
      ]
    },
    preparation: [
      "Embrace your authentic self",
      "Clear intentions for love",
      "Photo if targeting specific person",
      "Openness to queer magic traditions"
    ],
    pricing: {
      basePrice: 200
    }
  },
  {
    id: "7",
    slug: "winning-court-case",
    title: "Winning a Court Case",
    category: "Justice & Legal",
    shortDescription: "Legal victory magic and justice manifestation",
    fullDescription: "Powerful justice magic to influence legal outcomes, ensure fair hearings, and manifest favorable court decisions through spiritual advocacy and truth-revealing rituals.",
    energyLevel: "Very High",
    moonPhase: "🌕",
    benefits: [
      "Favorable court rulings",
      "Judge and jury influence",
      "Truth revelation",
      "Legal protection and success"
    ],
    ritualDetails: {
      duration: "Until court date",
      materials: ["Purple candles", "Courthouse dirt", "Court documents", "Scales charm"],
      lunarPhase: "Full Moon for justice",
      timing: "Sundays (day of success)"
    },
    whatToExpect: {
      timeline: "Ongoing until legal resolution",
      process: [
        "Justice invocation ritual",
        "Truth-revealing spell work",
        "Court influence energy work",
        "Victory manifestation ceremony"
      ],
      outcomes: [
        "Favorable legal decisions",
        "Clear communication in court",
        "Protected legal standing",
        "Justice served in your favor"
      ]
    },
    preparation: [
      "Provide court documents and case details",
      "Clear truthful position",
      "Faith in justice",
      "Ongoing legal counsel (spell is supplementary)"
    ],
    pricing: {
      basePrice: 400
    }
  },
  {
    id: "8",
    slug: "business-boost-spells",
    title: "Business Boost Spells",
    category: "Wealth & Business",
    shortDescription: "Prosperity magic for business growth and success",
    fullDescription: "Comprehensive business prosperity magic including customer attraction, revenue increase, competition protection, and success manifestation for entrepreneurs and business owners.",
    energyLevel: "High",
    moonPhase: "🌔",
    benefits: [
      "Increased customer traffic",
      "Revenue and profit growth",
      "Protection from competition",
      "Business success and expansion"
    ],
    ritualDetails: {
      duration: "21-30 days (full moon cycle)",
      materials: ["Green candles", "Coins", "Business cards", "Basil", "Cinnamon"],
      lunarPhase: "Waxing Moon for growth",
      timing: "Thursdays (Jupiter's day of expansion)"
    },
    whatToExpect: {
      timeline: "Initial results in 2-3 weeks, peak in 2-3 months",
      process: [
        "Business energy assessment",
        "Prosperity altar creation",
        "Customer attraction spell",
        "Success charm for business location"
      ],
      outcomes: [
        "Increased sales and revenue",
        "More customer inquiries",
        "Protected from competition",
        "Sustained business growth"
      ]
    },
    preparation: [
      "Business details and goals",
      "Logo or business card",
      "Clear financial intentions",
      "Ongoing business efforts (magic enhances action)"
    ],
    pricing: {
      basePrice: 350
    }
  },
  {
    id: "9",
    slug: "cleansing-rituals",
    title: "Cleansing Rituals",
    category: "Protection & Cleansing",
    shortDescription: "Remove negative energy, curses, and spiritual blockages",
    fullDescription: "Comprehensive spiritual cleansing to remove hexes, curses, evil eye, negative attachments, and energy blockages. Restore spiritual purity and energetic balance.",
    energyLevel: "Medium",
    moonPhase: "🌑",
    benefits: [
      "Remove curses and hexes",
      "Clear negative energy",
      "Break evil eye",
      "Restore spiritual balance"
    ],
    ritualDetails: {
      duration: "3-7 days",
      materials: ["White sage", "Florida water", "Sea salt", "White candles"],
      lunarPhase: "New Moon (fresh start)",
      timing: "Saturday for banishing"
    },
    whatToExpect: {
      timeline: "Immediate relief, complete clearing in 1-2 weeks",
      process: [
        "Spiritual diagnosis and assessment",
        "Deep energy cleansing bath ritual",
        "Curse/hex breaking ceremony",
        "Protection shield installation"
      ],
      outcomes: [
        "Lifted heaviness and negativity",
        "Restored energy and vitality",
        "Cleared spiritual path",
        "Protected from future attacks"
      ]
    },
    preparation: [
      "Describe symptoms and experiences",
      "Recent photo of yourself",
      "Openness to cleansing process",
      "Follow post-ritual instructions"
    ],
    pricing: {
      basePrice: 175
    }
  },
  {
    id: "10",
    slug: "divorce-spell",
    title: "Divorce Spell",
    category: "Love & Relationships",
    shortDescription: "Peaceful separation and relationship dissolution magic",
    fullDescription: "Gentle separation magic to facilitate peaceful divorce, break unhealthy bonds, and create space for new beginnings. Helps both parties move forward with clarity and closure.",
    energyLevel: "High",
    moonPhase: "🌘",
    benefits: [
      "Peaceful separation process",
      "Break emotional bonds",
      "Fair settlement outcomes",
      "Closure and new beginnings"
    ],
    ritualDetails: {
      duration: "14-21 days",
      materials: ["Black candles", "Separation herbs", "Cutting ritual tools", "White sage"],
      lunarPhase: "Waning Moon (releasing)",
      timing: "Saturday nights"
    },
    whatToExpect: {
      timeline: "Emotional shift in 1-2 weeks, legal process varies",
      process: [
        "Cord-cutting ceremony",
        "Emotional release ritual",
        "Fair settlement energy work",
        "New beginning blessing"
      ],
      outcomes: [
        "Peaceful divorce proceedings",
        "Emotional release and freedom",
        "Fair legal settlements",
        "Readiness for new chapter"
      ]
    },
    preparation: [
      "Clear intention for separation",
      "Both partners' photos",
      "Legal divorce proceedings underway",
      "Emotional readiness for change"
    ],
    pricing: {
      basePrice: 250
    }
  },
  {
    id: "11",
    slug: "marriage-commitment",
    title: "Marriage & Commitment",
    category: "Love & Relationships",
    shortDescription: "Manifest marriage proposal and lasting commitment",
    fullDescription: "Powerful commitment magic to inspire marriage proposals, deepen partnership bonds, and manifest wedding ceremonies. Ideal for those seeking to take relationships to the next level.",
    energyLevel: "Very High",
    moonPhase: "🌕",
    benefits: [
      "Inspire marriage proposal",
      "Deepen commitment desires",
      "Clear path to marriage",
      "Lasting union manifestation"
    ],
    ritualDetails: {
      duration: "21-40 days",
      materials: ["White and gold candles", "Diamond/ring charm", "Rose quartz", "Commitment vows"],
      lunarPhase: "Full Moon ceremony",
      timing: "Fridays (Venus day of love)"
    },
    whatToExpect: {
      timeline: "Proposal within 3-6 months typically",
      process: [
        "Commitment readiness assessment",
        "Marriage manifestation ritual",
        "Partner's intention influence",
        "Wedding blessing in advance"
      ],
      outcomes: [
        "Marriage proposal received",
        "Deepened relationship commitment",
        "Clear wedding timeline",
        "Blessed future union"
      ]
    },
    preparation: [
      "Relationship readiness for marriage",
      "Both partners' photos",
      "Clear marriage intentions",
      "Patience with divine timing"
    ],
    pricing: {
      basePrice: 300
    }
  },
  {
    id: "12",
    slug: "magic-wallet",
    title: "Magic Wallet",
    category: "Wealth & Business",
    shortDescription: "Enchanted wealth artifact for continuous money flow",
    fullDescription: "Sacred money artifact that continuously attracts wealth, prevents financial loss, and multiplies abundance. This enchanted wallet becomes a permanent money magnet.",
    energyLevel: "Very High",
    moonPhase: "🌕",
    benefits: [
      "Continuous money attraction",
      "Multiplied wealth",
      "Protected finances",
      "Never empty wallet magic"
    ],
    ritualDetails: {
      duration: "Permanent enchantment",
      materials: ["Your personal wallet", "Gold/silver coins", "Cinnamon", "Basil", "Lodestone"],
      lunarPhase: "Full Moon charging",
      timing: "Thursday (Jupiter prosperity day)"
    },
    whatToExpect: {
      timeline: "Immediate activation, growing power over time",
      process: [
        "Wallet cleansing and consecration",
        "Money magnet spell casting",
        "Abundance enchantment ritual",
        "Prosperity maintenance instructions"
      ],
      outcomes: [
        "Unexpected money arrives",
        "Bills always covered",
        "Increased income opportunities",
        "Protected from financial loss"
      ]
    },
    preparation: [
      "Bring your actual wallet",
      "Clear financial goals",
      "Gratitude for current wealth",
      "Commitment to wallet care"
    ],
    pricing: {
      basePrice: 450
    }
  },
  {
    id: "13",
    slug: "financial-issues",
    title: "Financial Issues Resolution",
    category: "Wealth & Business",
    shortDescription: "Debt relief, money problems, and financial breakthrough magic",
    fullDescription: "Comprehensive financial healing magic addressing debt, money blocks, poverty consciousness, and financial crises. Opens pathways to abundance and resolves money problems.",
    energyLevel: "High",
    moonPhase: "🌓",
    benefits: [
      "Debt reduction and relief",
      "Money block removal",
      "Financial breakthrough",
      "Abundance consciousness shift"
    ],
    ritualDetails: {
      duration: "30 days minimum",
      materials: ["Green candles", "Prosperity herbs", "Bills/debt papers", "Gold coins"],
      lunarPhase: "New Moon to Full Moon (growth cycle)",
      timing: "Ongoing throughout moon cycle"
    },
    whatToExpect: {
      timeline: "Relief within 2-4 weeks, full resolution varies",
      process: [
        "Financial blockage diagnosis",
        "Debt reduction ritual",
        "Money consciousness reprogramming",
        "Abundance pathway opening"
      ],
      outcomes: [
        "Unexpected money arrives for bills",
        "Debt settlement opportunities",
        "Increased income streams",
        "Financial stress relief"
      ]
    },
    preparation: [
      "List all debts and financial issues",
      "Honest assessment of situation",
      "Willingness to change money mindset",
      "Active job/income seeking (magic enhances effort)"
    ],
    pricing: {
      basePrice: 325
    }
  },
  {
    id: "14",
    slug: "protection-shielding",
    title: "Protection & Shielding",
    category: "Protection & Cleansing",
    shortDescription: "Comprehensive spiritual protection and psychic defense",
    fullDescription: "Powerful protection magic creating spiritual shields against negative energy, psychic attacks, evil intentions, and harmful magic. Includes home, personal, and family protection.",
    energyLevel: "High",
    moonPhase: "🌕",
    benefits: [
      "Psychic attack protection",
      "Negative energy shielding",
      "Home and family protection",
      "Evil eye deflection"
    ],
    ritualDetails: {
      duration: "Ongoing (shields last 3-6 months)",
      materials: ["Black tourmaline", "Protective herbs", "Salt", "Mirrors", "Your photo"],
      lunarPhase: "Full Moon for maximum power",
      timing: "Saturdays (protection day)"
    },
    whatToExpect: {
      timeline: "Immediate protection, strengthens over 2 weeks",
      process: [
        "Vulnerability assessment",
        "Multi-layered shield creation",
        "Home protection ward installation",
        "Personal protection amulet charging"
      ],
      outcomes: [
        "Protected from psychic attacks",
        "Negative energy bounces back",
        "Safe and peaceful home",
        "Family members shielded"
      ]
    },
    preparation: [
      "Recent photo of yourself",
      "Home layout or photos",
      "List of protection concerns",
      "Openness to protective guidance"
    ],
    pricing: {
      basePrice: 275
    }
  },
  {
    id: "15",
    slug: "magic-rings",
    title: "Magic Rings",
    category: "Wealth & Business",
    shortDescription: "Enchanted power rings for wealth, love, and protection",
    fullDescription: "Sacred power rings enchanted for specific purposes: wealth attraction, love magnetism, protection, or spiritual power. Permanent wearable magic that continuously works for you.",
    energyLevel: "Very High",
    moonPhase: "🌕",
    benefits: [
      "Continuous magical power",
      "Purpose-specific enchantment",
      "Wearable protection",
      "Lifetime magical artifact"
    ],
    ritualDetails: {
      duration: "Permanent enchantment ceremony",
      materials: ["Silver or gold ring", "Gemstones (purpose-specific)", "Ritual oils", "Incantations"],
      lunarPhase: "Full Moon empowerment",
      timing: "Midnight hour ceremony"
    },
    whatToExpect: {
      timeline: "Immediate activation, power grows with wearing",
      process: [
        "Ring purpose selection (wealth/love/protection/power)",
        "Deep enchantment ritual",
        "Personal energy bonding",
        "Activation and care instructions"
      ],
      outcomes: [
        "Constant magical influence in chosen area",
        "Protected energetic field",
        "Enhanced manifestation power",
        "Spiritual authority and confidence"
      ]
    },
    preparation: [
      "Choose ring purpose (wealth, love, protection, or power)",
      "Provide ring (or we source one)",
      "Clear intention for ring's work",
      "Commitment to wearing it regularly"
    ],
    pricing: {
      basePrice: 500,
      tiers: [
        {
          name: "Basic Enchantment",
          price: 500,
          description: "Single-purpose ring with standard enchantment"
        },
        {
          name: "Premium Power Ring",
          price: 800,
          description: "Multi-purpose ring with rare gemstones and advanced rituals"
        },
        {
          name: "Master Ring of Power",
          price: 1200,
          description: "Ultimate power ring with all benefits, custom design, and lifetime recharging"
        }
      ]
    }
  }
];

/**
 * Get service by slug
 */
export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(service => service.slug === slug);
}

/**
 * Get all services by category
 */
export function getServicesByCategory(category: Service["category"]): Service[] {
  return services.filter(service => service.category === category);
}

/**
 * Get all service slugs for static generation
 */
export function getAllServiceSlugs(): string[] {
  return services.map(service => service.slug);
}
