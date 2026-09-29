import { prisma } from "./db";

export const LEAD_STATUSES = [
  "New",
  "Contacted",
  "Quoted",
  "Follow-Up",
  "Converted",
  "Closed",
] as const;

export const LEAD_SOURCES = [
  "Google",
  "Organic",
  "Facebook",
  "Instagram",
  "WhatsApp",
  "Chat",
  "Direct",
  "Referral",
  "Advertising",
  "Quote",
  "Contact",
  "Callback",
] as const;

export function generateInquiryNumber(prefix = "GI") {
  const now = new Date();
  const y = now.getFullYear().toString().slice(-2);
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${y}${m}${d}-${rand}`;
}

export function mapUtmToSource(utm?: {
  utmSource?: string | null;
  utmMedium?: string | null;
  source?: string | null;
}) {
  const source = (utm?.source || utm?.utmSource || "").toLowerCase();
  const medium = (utm?.utmMedium || "").toLowerCase();
  if (source.includes("whatsapp")) return "WhatsApp";
  if (source.includes("chat")) return "Chat";
  if (source.includes("facebook") || source.includes("fb")) return "Facebook";
  if (source.includes("instagram") || source.includes("ig")) return "Instagram";
  if (source.includes("google") && (medium.includes("cpc") || medium.includes("paid") || medium.includes("ads"))) {
    return "Advertising";
  }
  if (source.includes("google")) return "Google";
  if (medium.includes("organic")) return "Organic";
  if (source.includes("referral") || medium.includes("referral")) return "Referral";
  if (medium.includes("cpc") || medium.includes("paid") || source.includes("ad")) return "Advertising";
  if (source) return "Direct";
  return "Direct";
}

export async function rateLimit(key: string, limit = 8, windowMs = 10 * 60 * 1000) {
  const since = new Date(Date.now() - windowMs);
  const count = await prisma.rateLimitHit.count({
    where: { key, createdAt: { gte: since } },
  });
  if (count >= limit) return false;
  await prisma.rateLimitHit.create({ data: { key } });
  return true;
}

export function sanitizeText(value: unknown, max = 2000) {
  if (typeof value !== "string") return "";
  return value.replace(/[<>]/g, "").trim().slice(0, max);
}

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}
