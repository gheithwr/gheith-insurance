import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { sanitizeText } from "@/lib/leads";

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const name = sanitizeText(body.name, 120);
  const title = sanitizeText(body.title, 120);
  if (!name || !title) return NextResponse.json({ error: "Name and title are required." }, { status: 400 });
  const member = await prisma.teamMember.create({
    data: {
      name,
      title,
      biography: sanitizeText(body.biography, 2000),
      email: sanitizeText(body.email, 120) || null,
      phone: sanitizeText(body.phone, 30) || null,
      photoUrl: sanitizeText(body.photoUrl, 400) || null,
      published: Boolean(body.published),
    },
  });
  return NextResponse.json({ member });
}
