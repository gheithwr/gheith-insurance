import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ensureSeed } from "@/lib/seed";
import {
  generateInquiryNumber,
  isEmail,
  isPhone,
  mapUtmToSource,
  rateLimit,
  sanitizeText,
} from "@/lib/leads";
import { QUOTE_TYPES } from "@/lib/quotes";

export async function POST(req: NextRequest) {
  try {
    await ensureSeed();
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!(await rateLimit(`quote:${ip}`, 6))) {
      return NextResponse.json({ error: "Please wait before submitting another request." }, { status: 429 });
    }

    const body = await req.json();
    if (sanitizeText(body.company, 80)) {
      return NextResponse.json({ inquiryNumber: generateInquiryNumber("GI") });
    }

    const insuranceType = sanitizeText(body.insuranceType, 40);
    if (!QUOTE_TYPES.some((t) => t.id === insuranceType)) {
      return NextResponse.json({ error: "Please choose an insurance type." }, { status: 400 });
    }

    const firstName = sanitizeText(body.firstName, 80);
    const lastName = sanitizeText(body.lastName, 80);
    const email = sanitizeText(body.email, 120).toLowerCase();
    const phone = sanitizeText(body.phone, 30);
    const preferredContact = sanitizeText(body.preferredContact, 20);
    const zipCode = sanitizeText(body.zipCode, 12);

    if (!firstName || !lastName) {
      return NextResponse.json({ error: "Please provide your name." }, { status: 400 });
    }
    if (!isEmail(email)) {
      return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });
    }
    if (!isPhone(phone)) {
      return NextResponse.json({ error: "Please provide a valid phone number." }, { status: 400 });
    }

    const inquiryNumber = generateInquiryNumber("GI");
    const source = mapUtmToSource({
      utmSource: body.utm_source,
      utmMedium: body.utm_medium,
      source: body.source || "Quote",
    });

    const payload = { ...body };
    delete payload.company;

    await prisma.lead.create({
      data: {
        inquiryNumber,
        type: "quote",
        status: "New",
        source,
        insuranceType,
        firstName,
        lastName,
        email,
        phone,
        preferredContact: preferredContact || "Phone",
        zipCode,
        payload: JSON.stringify(payload),
        utmSource: sanitizeText(body.utm_source, 80) || null,
        utmMedium: sanitizeText(body.utm_medium, 80) || null,
        utmCampaign: sanitizeText(body.utm_campaign, 80) || null,
        utmContent: sanitizeText(body.utm_content, 80) || null,
        utmTerm: sanitizeText(body.utm_term, 80) || null,
      },
    });

    return NextResponse.json({ inquiryNumber });
  } catch {
    return NextResponse.json({ error: "Unable to save your request." }, { status: 500 });
  }
}
