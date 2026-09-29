"use client";

import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/settings";

export function WhatsAppFloat({
  number,
  message,
}: {
  number: string;
  message: string;
}) {
  const href = whatsappLink(number, message);
  if (!href) {
    return (
      <a
        href="/contact"
        className="fixed bottom-5 left-5 z-40 inline-flex min-h-14 min-w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lift transition hover:scale-105 hover:bg-emerald-600"
        aria-label="Contact us about WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 left-5 z-40 inline-flex min-h-14 min-w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lift transition hover:scale-105 hover:bg-emerald-600"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
