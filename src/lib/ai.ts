export type AiProvider = "rules" | "openai";

export function getAiProvider(): AiProvider {
  const value = (process.env.AI_PROVIDER || "rules").toLowerCase();
  if (value === "openai" && process.env.USER_LLM_API_KEY && process.env.USER_LLM_BASE_URL) {
    return "openai";
  }
  return "rules";
}

export const AI_SAFETY_PROMPT = `You are a website assistant for Gheith Insurance, an independent insurance broker serving New York and New Jersey.
Answer only with approved general information from the agency website.
NEVER invent policy numbers, premiums, coverage, deductibles, renewal dates, claim status, carrier decisions, licenses, awards, reviews, addresses, or employee names.
If customer-specific information is unavailable, say: For security, I'll connect you with a Gheith Insurance representative who can review your policy information.
Offer WhatsApp, Call, Message, or Request Callback when escalation is needed.`;
