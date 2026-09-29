import { NextResponse } from "next/server";
import { clearSession } from "@/lib/auth";

export async function GET() {
  await clearSession("client");
  return NextResponse.redirect(new URL("/portal", process.env.SITE_URL || "http://localhost:3000"));
}

export async function POST() {
  await clearSession("client");
  return NextResponse.redirect(new URL("/portal", process.env.SITE_URL || "http://localhost:3000"));
}
