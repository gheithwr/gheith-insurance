"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import Link from "next/link";
import { CHAT_GREETING, CHAT_QUICK_OPTIONS } from "@/lib/chat";
import { whatsappLink } from "@/lib/settings";

type Msg = { role: "assistant" | "user"; content: string; cta?: string[] };

const CTA_MAP: Record<string, { href: string; label: string; external?: boolean }> = {
  quote: { href: "/quote", label: "Get a Quote" },
  contact: { href: "/contact", label: "Message" },
  callback: { href: "/contact#callback", label: "Request Callback" },
  claims: { href: "/claims", label: "Claims Assistance" },
  portal: { href: "/portal", label: "Client Portal" },
  call: { href: "/contact", label: "Call" },
  whatsapp: { href: "/contact", label: "WhatsApp" },
};

export function ChatWidget({
  whatsappNumber,
  whatsappMessage,
  phone,
}: {
  whatsappNumber: string;
  whatsappMessage: string;
  phone: string;
}) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: CHAT_GREETING, cta: ["quote", "whatsapp", "callback"] },
  ]);
  const endRef = useRef<HTMLDivElement>(null);
  const wa = whatsappLink(whatsappNumber, whatsappMessage);

  useEffect(() => {
    const openChat = () => setOpen(true);
    window.addEventListener("open-chat", openChat);
    return () => window.removeEventListener("open-chat", openChat);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: trimmed }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: data.text || "A representative can help with that.",
          cta: data.cta,
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "I could not send that just now. Please try WhatsApp, call, or the contact form.",
          cta: ["whatsapp", "contact", "callback"],
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function ctaHref(key: string) {
    if (key === "whatsapp" && wa) return { href: wa, label: "WhatsApp", external: true };
    if (key === "call" && phone) return { href: `tel:${phone}`, label: "Call", external: true };
    return CTA_MAP[key];
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 inline-flex min-h-14 min-w-14 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-navy to-teal text-white shadow-lift transition hover:scale-105"
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
      {open ? (
        <div
          role="dialog"
          aria-label="Gheith Insurance chat"
          className="fixed bottom-24 right-4 z-50 flex h-[min(560px,70vh)] w-[min(380px,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-lift"
        >
          <div className="flex items-center justify-between bg-gradient-to-r from-navy to-teal px-4 py-3 text-white">
            <div>
              <p className="font-semibold">Gheith Insurance</p>
              <p className="text-xs text-blue-100">AI-assisted support</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex min-h-10 min-w-10 cursor-pointer items-center justify-center rounded-lg hover:bg-white/10"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto bg-sky-50/60 p-4">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                <div
                  className={`inline-block max-w-[90%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-navy text-white"
                      : "bg-white text-slate-800 shadow-sm"
                  }`}
                >
                  {m.content}
                </div>
                {m.cta?.length ? (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {m.cta.map((c) => {
                      const item = ctaHref(c);
                      if (!item) return null;
                      if (item.external) {
                        return (
                          <a
                            key={c}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-navy shadow-sm hover:bg-gold"
                          >
                            {item.label}
                          </a>
                        );
                      }
                      return (
                        <Link
                          key={c}
                          href={item.href}
                          className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-navy shadow-sm hover:bg-gold"
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            ))}
            {loading ? (
              <p className="text-xs text-slate-500">Gheith Insurance is typing...</p>
            ) : null}
            <div ref={endRef} />
          </div>
          <div className="border-t border-navy/10 bg-white p-3">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {CHAT_QUICK_OPTIONS.slice(0, 6).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => send(opt)}
                  className="cursor-pointer rounded-full border border-navy/10 px-2.5 py-1 text-[11px] font-medium text-navy hover:bg-sky-50"
                >
                  {opt}
                </button>
              ))}
            </div>
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <label htmlFor="chat-input" className="sr-only">
                Message
              </label>
              <input
                id="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="min-h-11 flex-1 rounded-xl border border-navy/15 px-3 text-sm outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-xl bg-navy text-white hover:bg-navy-light disabled:opacity-50"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
