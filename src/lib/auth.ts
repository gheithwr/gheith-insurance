import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "./db";

const COOKIE_NAME = "gi_session";
const ADMIN_COOKIE = "gi_admin";

function secret() {
  const value = process.env.AUTH_SECRET || "dev-only-change-me";
  return new TextEncoder().encode(value);
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createSession(payload: {
  sub: string;
  email: string;
  role: string;
  name: string;
}) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());
  const cookieStore = await cookies();
  const name = payload.role === "admin" ? ADMIN_COOKIE : COOKIE_NAME;
  cookieStore.set(name, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSession(role: "admin" | "client" = "client") {
  const cookieStore = await cookies();
  cookieStore.delete(role === "admin" ? ADMIN_COOKIE : COOKIE_NAME);
}

export async function readSession(kind: "admin" | "client" = "client") {
  const cookieStore = await cookies();
  const token = cookieStore.get(kind === "admin" ? ADMIN_COOKIE : COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    return {
      id: String(payload.sub || ""),
      email: String(payload.email || ""),
      role: String(payload.role || ""),
      name: String(payload.name || ""),
    };
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const session = await readSession("admin");
  if (!session || session.role !== "admin") return null;
  return session;
}

export async function requireClient() {
  const session = await readSession("client");
  if (!session || session.role !== "client") return null;
  return session;
}

export async function ensureAdminUser() {
  const email = (process.env.ADMIN_EMAIL || "admin@example.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "ChangeMeNow!";
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return existing;
  return prisma.user.create({
    data: {
      email,
      username: "admin",
      name: "Agency Administrator",
      role: "admin",
      passwordHash: await hashPassword(password),
    },
  });
}
