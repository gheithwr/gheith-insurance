import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { sanitizeText } from "@/lib/leads";

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const title = sanitizeText(body.title, 200);
  const slug = sanitizeText(body.slug, 200).toLowerCase().replace(/[^a-z0-9-]/g, "-");
  if (!title || !slug) return NextResponse.json({ error: "Title and slug are required." }, { status: 400 });
  const status = body.status === "published" ? "published" : "draft";
  const article = await prisma.article.create({
    data: {
      title,
      slug,
      excerpt: sanitizeText(body.excerpt, 400),
      content: sanitizeText(body.content, 20000),
      category: sanitizeText(body.category, 40) || "Insurance Tips",
      status,
      seoTitle: title,
      seoDesc: sanitizeText(body.excerpt, 160),
      publishedAt: status === "published" ? new Date() : null,
    },
  });
  return NextResponse.json({ article });
}

export async function PATCH(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const status = body.status === "published" ? "published" : "draft";
  await prisma.article.update({
    where: { id: body.id },
    data: { status, publishedAt: status === "published" ? new Date() : null },
  });
  return NextResponse.json({ ok: true });
}
