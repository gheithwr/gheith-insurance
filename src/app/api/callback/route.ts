import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ensureSeed } from "@/lib/seed";
import { generateInquiryNumber, isPhone, rateLimit, sanitizeText } from "@/lib/leads";

export async function POST(req: NextRequest) {
  try {
    await ensureSeed();
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!(await rateLimit(`callback:${ip}`, 6))) {
      return NextResponse.json({ error: "Please wait before requesting another callback." }, { status: 429 });
    }
    const body = await req.json();
    if (sanitizeText(body.company, 80)) {
      return NextResponse.json({ inquiryNumber: generateInquiryNumber("CB") });
    }
    const name = sanitizeText(body.name, 120);
    const phone = sanitizeText(body.phone, 30);
    const email = sanitizeText(body.email, 120).toLowerCase();
    const preferredTime = sanitizeText(body.preferredTime, 20);
    const insuranceType = sanitizeText(body.insuranceType, 40);
    const message = sanitizeText(body.message, 2000);

    if (!name) return NextResponse.json({ error: "Name is required." }, { status: 400 });
    if (!isPhone(phone)) {
      return NextResponse.json({ error: "Please provide a valid phone number." }, { status: 400 });
    }
    if (!["Morning", "Afternoon", "Evening"].includes(preferredTime)) {
      return NextResponse.json({ error: "Please choose Morning, Afternoon, or Evening." }, { status: 400 });
    }

    const inquiryNumber = generateInquiryNumber("CB");
    await prisma.callbackRequest.create({
      data: {
        inquiryNumber,
        name,
        phone,
        email: email || null,
        preferredTime,
        insuranceType: insuranceType || null,
        message: message || null,
        source: "Callback",
      },
    });
    return NextResponse.json({ inquiryNumber });
  } catch {
    return NextResponse.json({ error: "Unable to request a callback." }, { status: 500 });
  }
}
