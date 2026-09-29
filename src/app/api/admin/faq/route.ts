import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { sanitizeText } from "@/lib/leads";

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const question = sanitizeText(body.question, 300);
  const answer = sanitizeText(body.answer, 4000);
  if (!question || !answer) {
    return NextResponse.json({ error: "Question and answer are required." }, { status: 400 });
  }
  const faq = await prisma.faq.create({
    data: { question, answer, published: true },
  });
  return NextResponse.json({ faq });
}
