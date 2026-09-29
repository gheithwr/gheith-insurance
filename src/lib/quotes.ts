export type QuoteType =
  | "auto"
  | "home"
  | "renters"
  | "condo"
  | "landlord"
  | "business"
  | "commercial-auto"
  | "life"
  | "other";

export const QUOTE_TYPES: { id: QuoteType; label: string; description: string }[] = [
  { id: "auto", label: "Auto", description: "Personal vehicle coverage" },
  { id: "home", label: "Home", description: "Owner-occupied home" },
  { id: "renters", label: "Renters", description: "Apartment or rental home" },
  { id: "condo", label: "Condo", description: "Condominium unit" },
  { id: "landlord", label: "Landlord", description: "Rental property" },
  { id: "business", label: "Business", description: "Business coverage options" },
  { id: "commercial-auto", label: "Commercial Auto", description: "Business vehicles" },
  { id: "life", label: "Life", description: "Life insurance conversation" },
  { id: "other", label: "Other", description: "Something else" },
];

export type FieldDef = {
  name: string;
  label: string;
  type: "text" | "select" | "textarea" | "tel" | "email" | "number";
  required?: boolean;
  options?: string[];
  placeholder?: string;
  hint?: string;
};

export function quoteFields(type: QuoteType): FieldDef[] {
  const zip: FieldDef = {
    name: "zipCode",
    label: "ZIP code",
    type: "text",
    required: true,
    placeholder: "10001",
  };

  const common: FieldDef[] = [];

  if (type === "auto") {
    common.push(
      zip,
      {
        name: "vehicleYear",
        label: "Vehicle year",
        type: "text",
        required: true,
        placeholder: "2020",
      },
      {
        name: "vehicleMake",
        label: "Make",
        type: "text",
        required: true,
        placeholder: "Toyota",
      },
      {
        name: "vehicleModel",
        label: "Model",
        type: "text",
        required: true,
        placeholder: "Camry",
      },
      {
        name: "driversCount",
        label: "Number of drivers",
        type: "select",
        required: true,
        options: ["1", "2", "3", "4+"],
      },
      {
        name: "currentInsurance",
        label: "Currently insured?",
        type: "select",
        required: true,
        options: ["Yes", "No", "Prefer not to say"],
      }
    );
  }

  if (type === "home" || type === "condo" || type === "landlord") {
    common.push(
      zip,
      {
        name: "propertyType",
        label: "Property type",
        type: "select",
        required: true,
        options:
          type === "condo"
            ? ["Condo", "Townhouse", "Other"]
            : type === "landlord"
              ? ["Single family", "Multi-family", "Condo", "Other"]
              : ["Single family", "Townhouse", "Other"],
      },
      {
        name: "yearBuilt",
        label: "Year built (approximate)",
        type: "text",
        placeholder: "1998",
      },
      {
        name: "occupancy",
        label: "Occupancy",
        type: "select",
        required: true,
        options:
          type === "landlord"
            ? ["Rented to others", "Vacant", "Owner occupied part of year"]
            : ["Primary residence", "Secondary / seasonal", "Other"],
      }
    );
  }

  if (type === "renters") {
    common.push(
      zip,
      {
        name: "dwellingType",
        label: "Residence type",
        type: "select",
        required: true,
        options: ["Apartment", "House", "Condo", "Other"],
      },
      {
        name: "personalProperty",
        label: "Personal property estimate",
        type: "select",
        options: ["Under $10,000", "$10,000–$25,000", "$25,000–$50,000", "Over $50,000", "Not sure"],
      }
    );
  }

  if (type === "business") {
    common.push(
      zip,
      {
        name: "businessName",
        label: "Business name",
        type: "text",
        required: true,
      },
      {
        name: "industry",
        label: "Type of business",
        type: "text",
        required: true,
        placeholder: "Retail, contractor, professional services...",
      },
      {
        name: "employees",
        label: "Number of employees",
        type: "select",
        required: true,
        options: ["Just me", "2–5", "6–20", "21–50", "50+"],
      },
      {
        name: "coverageInterest",
        label: "Coverage of interest",
        type: "select",
        required: true,
        options: [
          "General Liability",
          "BOP",
          "Workers' Compensation",
          "Commercial Auto",
          "Not sure / multiple",
        ],
      }
    );
  }

  if (type === "commercial-auto") {
    common.push(
      zip,
      {
        name: "businessName",
        label: "Business name",
        type: "text",
        required: true,
      },
      {
        name: "vehicleCount",
        label: "Number of vehicles",
        type: "select",
        required: true,
        options: ["1", "2–5", "6–10", "11+"],
      },
      {
        name: "vehicleUse",
        label: "Primary vehicle use",
        type: "select",
        required: true,
        options: ["Service", "Delivery", "Sales", "Contractor", "Other"],
      }
    );
  }

  if (type === "life") {
    common.push(
      zip,
      {
        name: "coverageGoal",
        label: "What would you like to discuss?",
        type: "select",
        required: true,
        options: [
          "Income replacement",
          "Family protection",
          "Mortgage / debt",
          "Not sure yet",
        ],
      },
      {
        name: "ageRange",
        label: "Age range",
        type: "select",
        options: ["18–29", "30–39", "40–49", "50–59", "60+", "Prefer not to say"],
      }
    );
  }

  if (type === "other") {
    common.push(
      zip,
      {
        name: "otherType",
        label: "What would you like help with?",
        type: "text",
        required: true,
      }
    );
  }

  common.push({
    name: "notes",
    label: "Anything else we should know?",
    type: "textarea",
    placeholder: "Optional details. Do not include SSN, payment information, or driver's license numbers.",
  });

  return common;
}

export const CONTACT_FIELDS: FieldDef[] = [
  { name: "firstName", label: "First name", type: "text", required: true },
  { name: "lastName", label: "Last name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "tel", required: true },
  {
    name: "preferredContact",
    label: "Preferred contact method",
    type: "select",
    required: true,
    options: ["Phone", "Email", "WhatsApp", "Text"],
  },
];
