import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ensureSeed } from "@/lib/seed";
import { rateLimit, sanitizeText } from "@/lib/leads";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  await ensureSeed();
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!(await rateLimit(`forgot:${ip}`, 5, 15 * 60 * 1000))) {
    return NextResponse.json({ ok: true });
  }
  const body = await req.json();
  const email = sanitizeText(body.email, 120).toLowerCase();
  const user = await prisma.user.findUnique({ where: { email } });
  if (user && user.role === "client") {
    const token = crypto.randomBytes(24).toString("hex");
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: token,
        resetExpires: new Date(Date.now() + 60 * 60 * 1000),
      },
    });
  }
  return NextResponse.json({
    ok: true,
    message:
      "If an account exists for that email, a representative can help complete a password reset. Email delivery can be connected through SMTP settings.",
  });
}
