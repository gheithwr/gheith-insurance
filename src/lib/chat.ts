export const CHAT_GREETING =
  "Hi! Welcome to Gheith Insurance. How can we help you today?";

export const CHAT_QUICK_OPTIONS = [
  "Get a Quote",
  "Auto Insurance",
  "Home Insurance",
  "Business Insurance",
  "Policy Question",
  "Billing Question",
  "Claim Question",
  "Renewal Question",
  "Speak With an Agent",
  "WhatsApp Us",
];

const ESCALATION =
  "For security, I'll connect you with a Gheith Insurance representative who can review your policy information.";

const HUMAN_OFFER =
  "Would you like to continue by WhatsApp, call, message, or request a callback?";

type ChatReply = {
  text: string;
  escalate?: boolean;
  cta?: Array<"quote" | "whatsapp" | "call" | "contact" | "callback" | "claims" | "portal">;
};

function includesAny(text: string, words: string[]) {
  return words.some((w) => text.includes(w));
}

export function ruleBasedReply(raw: string): ChatReply {
  const text = raw.toLowerCase().trim();

  if (!text) {
    return { text: "Please tell me a little about what you need help with." };
  }

  if (includesAny(text, ["whatsapp", "whats app"])) {
    return {
      text: "You can message Gheith Insurance on WhatsApp when a number is configured in our settings. A representative can help with quotes and general questions.",
      cta: ["whatsapp", "callback"],
    };
  }

  if (includesAny(text, ["quote", "get a quote", "need insurance", "need car insurance", "need business insurance"])) {
    return {
      text: "I can help you start a free quote request. Choose the insurance type and share a few details. A Gheith Insurance representative will review your request and contact you.",
      cta: ["quote", "whatsapp"],
    };
  }

  if (includesAny(text, ["car insurance", "auto", "vehicle", "add a vehicle", "add a car"])) {
    return {
      text: "We can help with auto insurance conversations, including adding a vehicle. Start a quote or message us. We cannot look up an existing policy from this chat.",
      cta: ["quote", "whatsapp", "call"],
    };
  }

  if (includesAny(text, ["house", "home insurance", "homeowners", "bought a house", "condo", "renters", "landlord"])) {
    return {
      text: "Congratulations if you recently bought or moved into a home. We can help you request homeowners, renters, condo, or landlord quotes. A representative will follow up with next steps.",
      cta: ["quote", "contact"],
    };
  }

  if (includesAny(text, ["business", "llc", "general liability", "workers", "commercial auto", "bop"])) {
    return {
      text: "We help businesses explore coverage conversations such as general liability, BOP, commercial auto, and workers' compensation. Availability depends on operations and carrier guidelines.",
      cta: ["quote", "contact"],
    };
  }

  if (includesAny(text, ["claim", "accident", "file a claim"])) {
    return {
      text: "If you need claims assistance, we can help you start the conversation. Applicable insurance carriers make claim coverage and payment decisions. We cannot report claim status from this chat.",
      escalate: true,
      cta: ["claims", "whatsapp", "call", "callback"],
    };
  }

  if (includesAny(text, ["bill", "billing", "payment", "invoice"])) {
    return {
      text: `${ESCALATION} Billing details are handled with a representative or the insurance carrier, depending on the policy.`,
      escalate: true,
      cta: ["call", "whatsapp", "callback"],
    };
  }

  if (includesAny(text, ["renew", "expire", "expiration", "when does my policy", "policy expire"])) {
    return {
      text: `${ESCALATION} This chat cannot access renewal dates or policy expiration information.`,
      escalate: true,
      cta: ["call", "whatsapp", "portal", "callback"],
    };
  }

  if (includesAny(text, ["policy number", "premium", "deductible", "coverage limit", "my policy"])) {
    return {
      text: ESCALATION,
      escalate: true,
      cta: ["call", "whatsapp", "portal", "callback"],
    };
  }

  if (includesAny(text, ["call me", "callback", "speak", "agent", "representative", "human"])) {
    return {
      text: `A Gheith Insurance representative can help. ${HUMAN_OFFER}`,
      cta: ["callback", "call", "whatsapp", "contact"],
    };
  }

  if (includesAny(text, ["broker", "why use", "what do you do", "about"])) {
    return {
      text: "Gheith Insurance is an independent insurance broker/agency helping individuals, families, property owners, and businesses in New York and New Jersey explore insurance options. We combine personal service with digital quote requests, chat, and WhatsApp.",
      cta: ["quote", "contact"],
    };
  }

  return {
    text: `I can help with general insurance questions, quote requests, claims assistance, and connecting you with a representative. I never invent policy numbers, premiums, coverage, deductibles, renewal dates, or claim status. ${HUMAN_OFFER}`,
    cta: ["quote", "whatsapp", "callback", "contact"],
  };
}

export const WHATSAPP_AI_ARCHITECTURE = {
  flow: [
    "Customer WhatsApp",
    "WhatsApp Business Platform",
    "Secure Webhook",
    "Gheith Backend",
    "AI",
    "CRM/Policy System when authorized",
    "Customer",
  ],
  futureFunctions: [
    "Renewal questions",
    "Policy status",
    "Coverage questions",
    "Billing routing",
    "Claims assistance",
    "Document requests",
    "Policy-change requests",
    "Agent callbacks",
  ],
  safety:
    "Never disclose customer-specific information without appropriate authentication. Never fabricate policy data.",
};
