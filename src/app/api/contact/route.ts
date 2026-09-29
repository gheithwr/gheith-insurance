import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ensureSeed } from "@/lib/seed";
import {
  generateInquiryNumber,
  isEmail,
  isPhone,
  rateLimit,
  sanitizeText,
} from "@/lib/leads";

export async function POST(req: NextRequest) {
  try {
    await ensureSeed();
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!(await rateLimit(`contact:${ip}`, 6))) {
      return NextResponse.json({ error: "Please wait before submitting another message." }, { status: 429 });
    }
    const body = await req.json();
    if (sanitizeText(body.company, 80)) {
      return NextResponse.json({ inquiryNumber: generateInquiryNumber("CT") });
    }
    const name = sanitizeText(body.name, 120);
    const email = sanitizeText(body.email, 120).toLowerCase();
    const phone = sanitizeText(body.phone, 30);
    const insuranceType = sanitizeText(body.insuranceType, 40) || "Other";
    const message = sanitizeText(body.message, 3000);
    const preferredContact = sanitizeText(body.preferredContact, 20) || "Phone";

    if (!name || !message) {
      return NextResponse.json({ error: "Name and message are required." }, { status: 400 });
    }
    if (!isEmail(email)) {
      return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });
    }
    if (!isPhone(phone)) {
      return NextResponse.json({ error: "Please provide a valid phone number." }, { status: 400 });
    }

    const inquiryNumber = generateInquiryNumber("CT");
    await prisma.contactMessage.create({
      data: {
        inquiryNumber,
        name,
        email,
        phone,
        insuranceType,
        message,
        preferredContact,
        source: "Contact",
      },
    });
    return NextResponse.json({ inquiryNumber });
  } catch {
    return NextResponse.json({ error: "Unable to send your message." }, { status: 500 });
  }
}
