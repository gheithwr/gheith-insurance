export type ProductCard = {
  slug: string;
  name: string;
  category: "personal" | "business" | "specialty";
  shortDesc: string;
  longDesc: string;
  highlights: string[];
  icon: string;
};

export const PRODUCTS: ProductCard[] = [
  {
    slug: "auto",
    name: "Auto Insurance",
    category: "personal",
    icon: "car",
    shortDesc: "Help protecting the vehicles you rely on every day.",
    longDesc:
      "Gheith Insurance helps individuals and families explore auto insurance options that may fit how they drive and what they need to protect. Coverage availability, eligibility, and pricing depend on the insurance carrier and underwriting guidelines.",
    highlights: [
      "Personal auto quote requests",
      "Help comparing coverage options",
      "Support when your driving needs change",
    ],
  },
  {
    slug: "homeowners",
    name: "Homeowners Insurance",
    category: "personal",
    icon: "home",
    shortDesc: "Coverage conversations for the place you call home.",
    longDesc:
      "Homeowners insurance needs vary by property, location, and personal circumstances. We help you review common coverage questions and request quotes so you can discuss options with a licensed representative.",
    highlights: [
      "Dwelling and personal property discussions",
      "Help preparing quote information",
      "Guidance on next steps after a quote",
    ],
  },
  {
    slug: "renters",
    name: "Renters Insurance",
    category: "personal",
    icon: "key",
    shortDesc: "Options that may help protect personal belongings while renting.",
    longDesc:
      "Renters insurance can help address personal property and liability questions for people who lease a home or apartment. We help you request quotes and understand typical coverage categories, without promising specific policy terms.",
    highlights: [
      "Personal property conversations",
      "Liability questions for renters",
      "Simple online quote requests",
    ],
  },
  {
    slug: "condo",
    name: "Condo Insurance",
    category: "personal",
    icon: "building",
    shortDesc: "Help exploring coverage that may complement condo association policies.",
    longDesc:
      "Condominium insurance needs often differ from traditional homeowners coverage. We help you gather information and request quotes so a representative can discuss how personal condo coverage may work with association policies.",
    highlights: [
      "Unit interior and personal property questions",
      "Association policy coordination discussions",
      "Quote support for condo owners",
    ],
  },
  {
    slug: "landlord",
    name: "Landlord Insurance",
    category: "personal",
    icon: "landmark",
    shortDesc: "Coverage conversations for rental property owners.",
    longDesc:
      "Property owners who rent to tenants often have different insurance questions than owner-occupied households. We help landlords request quotes and discuss typical coverage categories with a representative.",
    highlights: [
      "Rental dwelling discussions",
      "Liability questions for property owners",
      "Help assembling quote details",
    ],
  },
  {
    slug: "business",
    name: "Business Insurance",
    category: "business",
    icon: "briefcase",
    shortDesc: "Help exploring insurance options for small and growing businesses.",
    longDesc:
      "Business insurance needs depend on operations, location, employees, and contracts. Gheith Insurance helps business owners request quotes and discuss coverage categories that may be relevant to their work.",
    highlights: [
      "Business quote intake",
      "Coverage category discussions",
      "Follow-up with a representative",
    ],
  },
  {
    slug: "general-liability",
    name: "General Liability",
    category: "business",
    icon: "shield",
    shortDesc: "A common starting point for many business insurance conversations.",
    longDesc:
      "General liability insurance is often discussed when businesses want to explore protection related to third-party bodily injury, property damage, and similar claims. Actual coverage is determined by the insurance carrier and policy language.",
    highlights: [
      "Third-party liability conversations",
      "Certificate request workflow",
      "Business intake support",
    ],
  },
  {
    slug: "bop",
    name: "Business Owners Policy (BOP)",
    category: "business",
    icon: "layers",
    shortDesc: "A package that may combine several business coverages.",
    longDesc:
      "A Business Owners Policy (BOP) may package certain property and liability coverages for eligible businesses. Eligibility and included coverages vary by carrier. We help you request information so a representative can review options.",
    highlights: [
      "Package coverage conversations",
      "Property and liability questions",
      "Help preparing business details",
    ],
  },
  {
    slug: "commercial-auto",
    name: "Commercial Auto",
    category: "business",
    icon: "truck",
    shortDesc: "Insurance conversations for vehicles used in a business.",
    longDesc:
      "Vehicles used for business may need different coverage than personal autos. We help businesses request commercial auto quotes and discuss typical information carriers may need.",
    highlights: [
      "Business vehicle intake",
      "Fleet and usage questions",
      "Representative follow-up",
    ],
  },
  {
    slug: "workers-compensation",
    name: "Workers' Compensation",
    category: "business",
    icon: "hardhat",
    shortDesc: "Help exploring coverage related to workplace injuries.",
    longDesc:
      "Workers' compensation requirements vary by state, industry, and payroll. We can help you start a conversation and request information, but coverage decisions and legal requirements are determined by applicable law and the insurance carrier.",
    highlights: [
      "Payroll and class-code intake",
      "State requirement discussions",
      "Quote request support",
    ],
  },
  {
    slug: "life",
    name: "Life Insurance",
    category: "specialty",
    icon: "heart",
    shortDesc: "Conversations about life insurance options for individuals and families.",
    longDesc:
      "Life insurance needs are personal and depend on family, financial, and planning circumstances. Gheith Insurance can help you request information and speak with a representative. We do not provide legal, tax, or financial-planning advice.",
    highlights: [
      "Term and permanent product discussions",
      "Needs-based conversations",
      "Follow-up with a licensed representative",
    ],
  },
  {
    slug: "umbrella",
    name: "Umbrella Insurance",
    category: "specialty",
    icon: "umbrella",
    shortDesc: "Additional liability conversations beyond underlying policies.",
    longDesc:
      "Umbrella insurance is often discussed when someone wants to explore additional liability limits above underlying auto, home, or other policies. Availability depends on underlying coverage and carrier guidelines.",
    highlights: [
      "Higher-limit liability conversations",
      "Underlying policy coordination questions",
      "Quote request support",
    ],
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function personalProducts() {
  return PRODUCTS.filter((p) => p.category === "personal" || p.category === "specialty");
}

export function businessProducts() {
  return PRODUCTS.filter((p) => p.category === "business");
}
