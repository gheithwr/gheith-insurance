import Link from "next/link";
import {
  Handshake,
  Layers3,
  Sparkles,
  ListChecks,
  MapPin,
  ShieldCheck,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Container, Button, SectionHeading } from "@/components/ui";
import { ProductCard } from "@/components/ProductCard";
import { OpenChatButton } from "@/components/OpenChatButton";
import { QuoteCta } from "@/components/QuoteCta";
import { Logo } from "@/components/Logo";
import { PRODUCTS } from "@/lib/products";
import { pageMetadata } from "@/lib/seo";
import { getSettingsMap } from "@/lib/seed";
import { whatsappLink } from "@/lib/settings";

export const metadata = pageMetadata({
  title: "Gheith Insurance | Independent Insurance Broker in New York & New Jersey",
  description:
    "Gheith Insurance helps individuals, families, property owners and businesses find insurance solutions that fit their needs.",
  path: "/",
});

const WHY = [
  {
    title: "Personal Service",
    text: "Real people when customers need help.",
    icon: Handshake,
  },
  {
    title: "Multiple Insurance Solutions",
    text: "Help customers explore appropriate coverage.",
    icon: Layers3,
  },
  {
    title: "Technology + Human Support",
    text: "Web, AI chat, WhatsApp, phone and agent support.",
    icon: Sparkles,
  },
  {
    title: "Simple Quote Process",
    text: "Easy online quote requests.",
    icon: ListChecks,
  },
  {
    title: "Local Service",
    text: "NY/NJ positioning only where licensing and service availability are confirmed.",
    icon: MapPin,
  },
];

export default async function HomePage() {
  const settings = await getSettingsMap().catch(() => null);
  const wa = settings
    ? whatsappLink(settings.whatsappNumber, settings.whatsappMessage)
    : "";

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-[#123057] to-teal text-white">
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute -left-10 top-10 h-64 w-64 rounded-full bg-gold/30 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-teal/40 blur-3xl" />
        </div>
        <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <div className="mb-6 inline-flex rounded-2xl bg-white/95 p-2 shadow-card">
              <Logo href={null} height={72} />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Independent insurance agency
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Insurance Made Simple. Protection Made Personal.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-blue-100/90 sm:text-lg">
              Gheith Insurance helps individuals, families, property owners and businesses
              find insurance solutions that fit their needs.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/quote" variant="gold" className="tracking-wide">
                GET A QUOTE
              </Button>
              <Button href="/insurance" variant="secondary" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
                Explore Insurance
              </Button>
              <OpenChatButton />
            </div>
            <p className="mt-6 text-sm text-blue-100/70">
              Serving New York and New Jersey. Coverage availability depends on licensing
              and insurance carrier guidelines.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Personal coverage",
                text: "Auto, home, renters, condo, landlord, life, and umbrella conversations.",
              },
              {
                title: "Business coverage",
                text: "General liability, BOP, commercial auto, and workers' compensation discussions.",
              },
              {
                title: "Digital convenience",
                text: "Online quotes, AI-assisted chat, WhatsApp, and a client portal architecture.",
              },
              {
                title: "Human follow-up",
                text: "A representative reviews requests. We never invent policy details.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/8 p-5 backdrop-blur-sm"
              >
                <p className="font-semibold">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-blue-100/80">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Coverage conversations"
            title="Explore insurance options"
            subtitle="Each card opens a dedicated page with educational information and a quote request. Availability depends on licensing, underwriting, and the insurance carrier."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Why choose us"
            title="Personal service with modern tools"
            subtitle="Gheith Insurance is built around understandable conversations, not paperwork-first processes."
            align="center"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {WHY.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-navy/8 bg-gradient-to-br from-white to-sky-50 p-6 shadow-card"
              >
                <item.icon className="h-7 w-7 text-teal" aria-hidden />
                <h3 className="mt-4 font-display text-xl font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="How we work"
              title="A modern agency with human follow-through"
              subtitle="Start online, continue on WhatsApp, or speak with a representative. AI chat can answer general questions using approved agency content and will escalate anything that requires policy-specific information."
            />
            <ul className="mt-6 space-y-3 text-sm text-slate-700">
              <li className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 text-teal" />
                We do not invent licenses, carrier partnerships, awards, or policy data.
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 text-teal" />
                Phone, email, WhatsApp, and callback options stay configurable in one place.
              </li>
              <li className="flex gap-3">
                <MessageCircle className="mt-0.5 h-5 w-5 text-teal" />
                Chat and WhatsApp are designed so CRM and policy APIs can be connected later.
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/about">About the agency</Button>
              <Button href="/contact" variant="secondary">
                Contact
              </Button>
              {wa ? (
                <Button href={wa} variant="whatsapp" external>
                  WhatsApp
                </Button>
              ) : null}
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-navy/10 bg-navy p-8 text-white shadow-lift">
            <p className="text-sm uppercase tracking-[0.18em] text-gold">Start today</p>
            <h3 className="mt-3 font-display text-3xl font-semibold">
              Request a quote in a few guided steps.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-blue-100/85">
              Tell us what you would like to insure. Questions change based on insurance type.
              A representative reviews every request.
            </p>
            <Link
              href="/quote"
              className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-gold px-5 text-sm font-bold tracking-wide text-navy hover:bg-gold-dark"
            >
              GET A QUOTE
            </Link>
          </div>
        </Container>
      </section>
      <QuoteCta
        eyebrow="Request Your Quote"
        title="Ready to Find the Right Coverage?"
        subtitle="Tell us what you need to protect, and our team will help you explore insurance options that fit your needs."
      />
    </>
  );
}
