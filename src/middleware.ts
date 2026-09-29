import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/admin/dashboard")) {
    const token = request.cookies.get("gi_admin")?.value;
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
  }
  if (pathname.startsWith("/portal/dashboard")) {
    const token = request.cookies.get("gi_session")?.value;
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = "/portal";
      return NextResponse.redirect(url);
    }
  }
  return response;
}

export const config = {
  matcher: ["/admin/dashboard/:path*", "/portal/dashboard/:path*"],
};
