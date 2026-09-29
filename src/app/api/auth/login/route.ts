import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ensureSeed } from "@/lib/seed";
import { createSession, verifyPassword } from "@/lib/auth";
import { rateLimit, sanitizeText } from "@/lib/leads";

export async function POST(req: NextRequest) {
  await ensureSeed();
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!(await rateLimit(`login:${ip}`, 8, 15 * 60 * 1000))) {
    return NextResponse.json({ error: "Too many attempts. Please wait." }, { status: 429 });
  }
  const body = await req.json();
  const identifier = sanitizeText(body.email || body.username, 120).toLowerCase();
  const password = typeof body.password === "string" ? body.password : "";
  const portal = body.portal === "admin" ? "admin" : "client";
  if (!identifier || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: identifier }, { username: identifier }],
      role: portal,
    },
  });
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  await createSession({
    sub: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  });
  return NextResponse.json({ ok: true, role: user.role });
}
