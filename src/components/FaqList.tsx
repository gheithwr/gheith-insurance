"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FaqList({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question} className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-card">
            <button
              type="button"
              className="flex w-full min-h-14 cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="font-semibold text-navy">{item.question}</span>
              <ChevronDown className={`h-5 w-5 shrink-0 text-teal transition ${isOpen ? "rotate-180" : ""}`} />
            </button>
            {isOpen ? (
              <div className="border-t border-navy/5 px-5 py-4 text-sm leading-relaxed text-slate-600">
                {item.answer}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
