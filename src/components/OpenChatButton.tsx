"use client";

import { MessageCircle } from "lucide-react";

export function OpenChatButton({
  className = "",
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-chat"))}
      className={`inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 ${className}`}
    >
      <MessageCircle className="h-4 w-4" />
      {children || "Chat With Us"}
    </button>
  );
}
