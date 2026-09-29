import { NextRequest, NextResponse } from "next/server";
import { clearSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  await clearSession(body.portal === "admin" ? "admin" : "client");
  return NextResponse.json({ ok: true });
}
