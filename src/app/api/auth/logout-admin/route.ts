import { NextResponse } from "next/server";
import { clearSession } from "@/lib/auth";

export async function GET() {
  await clearSession("admin");
  return NextResponse.redirect(new URL("/admin", process.env.SITE_URL || "http://localhost:3000"));
}
