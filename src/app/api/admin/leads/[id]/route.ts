import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { LEAD_STATUSES, sanitizeText } from "@/lib/leads";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const status = sanitizeText(body.status, 20);
  const notes = sanitizeText(body.notes, 5000);
  if (!LEAD_STATUSES.includes(status as (typeof LEAD_STATUSES)[number])) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }
  await prisma.lead.update({ where: { id }, data: { status, notes } });
  return NextResponse.json({ ok: true });
}
