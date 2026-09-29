import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ensureSeed } from "@/lib/seed";
import { ruleBasedReply } from "@/lib/chat";
import { sanitizeText } from "@/lib/leads";

export async function GET(req: NextRequest) {
  const mode = req.nextUrl.searchParams.get("hub.mode");
  const token = req.nextUrl.searchParams.get("hub.verify_token");
  const challenge = req.nextUrl.searchParams.get("hub.challenge");
  const expected = process.env.WHATSAPP_VERIFY_TOKEN;
  if (mode === "subscribe" && expected && token === expected && challenge) {
    return new NextResponse(challenge, { status: 200 });
  }
  return NextResponse.json({ error: "Verification is not configured." }, { status: 403 });
}

export async function POST(req: NextRequest) {
  await ensureSeed();
  const secret = process.env.WHATSAPP_APP_SECRET;
  if (!secret) {
    return NextResponse.json({
      ok: false,
      message: "WhatsApp webhook is scaffolded. Configure WHATSAPP_APP_SECRET before production use.",
    });
  }
  const body = await req.json().catch(() => ({}));
  const text = sanitizeText(
    body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.text?.body || "",
    1000
  );
  if (!text) return NextResponse.json({ ok: true });
  const reply = ruleBasedReply(text);
  await prisma.chatConversation.create({
    data: {
      sessionId: `wa-${Date.now()}`,
      status: "whatsapp",
      messages: {
        create: [
          { role: "user", content: text },
          { role: "assistant", content: reply.text },
        ],
      },
    },
  });
  return NextResponse.json({
    ok: true,
    note: "Message stored. Outbound WhatsApp sending requires WhatsApp Business Platform credentials.",
  });
}
