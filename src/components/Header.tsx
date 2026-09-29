"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  Phone,
  MessageCircle,
  FileText,
  ChevronDown,
} from "lucide-react";
import type { AgencySettings } from "@/lib/settings";
import { formatPhoneDisplay, whatsappLink } from "@/lib/settings";
import { PRODUCTS } from "@/lib/products";
import { Logo } from "@/components/Logo";

export function Header({ settings }: { settings: AgencySettings }) {
  const [open, setOpen] = useState(false);
  const [insOpen, setInsOpen] = useState(false);
  const wa = whatsappLink(settings.whatsappNumber, settings.whatsappMessage);
  const phone = settings.phone;

  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-white/90 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded-lg focus:bg-navy focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      <div className="border-b border-navy/5 bg-navy text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs sm:px-6 lg:px-8">
          <p className="font-medium tracking-wide">
            Independent insurance broker serving {settings.markets}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/quote"
              className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-gold px-3 font-semibold tracking-wide text-navy hover:bg-gold-dark"
            >
              <FileText className="h-3.5 w-3.5" />
              GET A QUOTE
            </Link>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("open-chat"))}
              className="inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-lg bg-white/10 px-3 font-semibold hover:bg-white/20"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Chat
            </button>
            {wa ? (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-whatsapp px-3 font-semibold hover:bg-emerald-600"
              >
                WhatsApp
              </a>
            ) : (
              <Link
                href="/contact"
                className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-whatsapp/80 px-3 font-semibold"
              >
                WhatsApp
              </Link>
            )}
            {phone ? (
              <a
                href={`tel:${phone}`}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-teal px-3 font-semibold hover:bg-teal-dark"
              >
                <Phone className="h-3.5 w-3.5" />
                Call {formatPhoneDisplay(phone)}
              </a>
            ) : (
              <Link
                href="/contact"
                className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-teal px-3 font-semibold hover:bg-teal-dark"
              >
                <Phone className="h-3.5 w-3.5" />
                Call
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Logo href="/" height={58} priority />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          <NavLink href="/">Home</NavLink>
          <div
            className="relative"
            onMouseEnter={() => setInsOpen(true)}
            onMouseLeave={() => setInsOpen(false)}
          >
            <Link
              href="/insurance"
              className="inline-flex min-h-11 items-center gap-1 rounded-lg px-3 text-sm font-medium text-navy hover:bg-sky-50"
            >
              Insurance <ChevronDown className="h-4 w-4" />
            </Link>
            {insOpen ? (
              <div className="absolute left-0 top-full z-40 w-72 rounded-2xl border border-navy/10 bg-white p-3 shadow-lift">
                {PRODUCTS.slice(0, 8).map((p) => (
                  <Link
                    key={p.slug}
                    href={`/insurance/${p.slug}`}
                    className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-sky-50 hover:text-navy"
                  >
                    {p.name}
                  </Link>
                ))}
                <Link
                  href="/insurance"
                  className="mt-1 block rounded-lg px-3 py-2 text-sm font-semibold text-teal"
                >
                  View all coverage
                </Link>
              </div>
            ) : null}
          </div>
          <NavLink href="/business-insurance">Business Insurance</NavLink>
          <NavLink href="/claims">Claims</NavLink>
          <NavLink href="/resources">Resources</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          <NavLink href="/portal">Client Portal</NavLink>
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          {wa ? (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-xl bg-whatsapp px-4 text-sm font-semibold text-white hover:bg-emerald-600"
            >
              WhatsApp
            </a>
          ) : null}
          <Link
            href="/quote"
            className="inline-flex min-h-11 items-center rounded-xl bg-gold px-5 text-sm font-bold tracking-wide text-navy shadow-gold hover:bg-gold-dark"
          >
            GET A QUOTE
          </Link>
        </div>
        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-xl border border-navy/15 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-navy/10 bg-white px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {[
              ["/", "Home"],
              ["/insurance", "Insurance"],
              ["/business-insurance", "Business Insurance"],
              ["/claims", "Claims"],
              ["/resources", "Resources"],
              ["/about", "About"],
              ["/contact", "Contact"],
              ["/portal", "Client Portal"],
              ["/faq", "FAQ"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-navy hover:bg-sky-50"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/quote"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex min-h-12 items-center justify-center rounded-xl bg-gold px-4 text-base font-bold tracking-wide text-navy"
            >
              GET A QUOTE
            </Link>
            {wa ? (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg px-3 py-3 text-base font-semibold text-whatsapp"
              >
                WhatsApp
              </a>
            ) : (
              <Link href="/contact" className="rounded-lg px-3 py-3 text-base font-semibold text-whatsapp">
                WhatsApp
              </Link>
            )}
            {phone ? (
              <a href={`tel:${phone}`} className="rounded-lg px-3 py-3 text-base font-medium text-navy">
                Call {formatPhoneDisplay(phone)}
              </a>
            ) : null}
            <button
              type="button"
              className="rounded-lg px-3 py-3 text-left text-base font-medium text-navy"
              onClick={() => {
                setOpen(false);
                window.dispatchEvent(new Event("open-chat"));
              }}
            >
              Chat
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-navy hover:bg-sky-50"
    >
      {children}
    </Link>
  );
}
