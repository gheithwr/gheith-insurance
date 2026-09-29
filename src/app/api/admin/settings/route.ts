import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { DEFAULT_SETTINGS, type AgencySettings } from "@/lib/settings";
import { sanitizeText } from "@/lib/leads";

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = (await req.json()) as Partial<AgencySettings>;
  const entries = Object.keys(DEFAULT_SETTINGS) as Array<keyof AgencySettings>;
  for (const key of entries) {
    if (typeof body[key] !== "string") continue;
    const value = sanitizeText(body[key], key === "smsConsent" || key === "seoDescription" ? 2000 : 400);
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }
  return NextResponse.json({ ok: true });
}
