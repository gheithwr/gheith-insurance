import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { ensureSeed } from "@/lib/seed";
import { ruleBasedReply } from "@/lib/chat";
import { rateLimit, sanitizeText } from "@/lib/leads";

export async function POST(req: NextRequest) {
  try {
    await ensureSeed();
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!(await rateLimit(`chat:${ip}`, 30, 15 * 60 * 1000))) {
      return NextResponse.json({
        text: "Please wait a moment before sending more messages, or contact the agency by phone or form.",
        cta: ["contact", "callback"],
      });
    }

    const body = await req.json();
    const message = sanitizeText(body.message, 1000);
    if (!message) {
      return NextResponse.json({ text: "Please enter a question." });
    }

    const cookieStore = await cookies();
    let sessionId = cookieStore.get("gi_chat")?.value;
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      cookieStore.set("gi_chat", sessionId, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24,
      });
    }

    let conversation = await prisma.chatConversation.findFirst({
      where: { sessionId },
      orderBy: { createdAt: "desc" },
    });
    if (!conversation) {
      conversation = await prisma.chatConversation.create({ data: { sessionId } });
    }

    await prisma.chatMessage.create({
      data: { conversationId: conversation.id, role: "user", content: message },
    });

    let reply = ruleBasedReply(message);

    if (process.env.AI_PROVIDER === "openai" && process.env.USER_LLM_API_KEY && process.env.USER_LLM_BASE_URL) {
      try {
        const history = await prisma.chatMessage.findMany({
          where: { conversationId: conversation.id },
          orderBy: { createdAt: "asc" },
          take: 12,
        });
        const ai = await fetch(`${process.env.USER_LLM_BASE_URL.replace(/\/$/, "")}/chat/completions`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.USER_LLM_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: process.env.USER_LLM_MODEL || "gpt-4o-mini",
            temperature: 0.2,
            messages: [
              {
                role: "system",
                content:
                  "You are a website assistant for Gheith Insurance, an independent insurance broker serving New York and New Jersey. Answer only with approved general information. NEVER invent policy numbers, premiums, coverage, deductibles, renewal dates, claim status, carrier decisions, licenses, awards, or employee names. If customer-specific information is requested, say: For security, I'll connect you with a Gheith Insurance representative who can review your policy information.",
              },
              ...history.map((h) => ({ role: h.role, content: h.content })),
            ],
          }),
        });
        if (ai.ok) {
          const data = await ai.json();
          const text = data?.choices?.[0]?.message?.content;
          if (typeof text === "string" && text.trim()) {
            reply = { ...reply, text: text.trim() };
          }
        }
      } catch {
        // Keep rule-based reply.
      }
    }

    await prisma.chatMessage.create({
      data: { conversationId: conversation.id, role: "assistant", content: reply.text },
    });

    return NextResponse.json(reply);
  } catch {
    return NextResponse.json({
      text: "I could not process that just now. Please use WhatsApp, call, or the contact form.",
      cta: ["whatsapp", "contact", "callback"],
    });
  }
}
