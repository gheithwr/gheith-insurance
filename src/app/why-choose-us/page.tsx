import { PageHero } from "@/components/PageHero";
import { Container, Button } from "@/components/ui";
import { QuoteCta } from "@/components/QuoteCta";
import { pageMetadata } from "@/lib/seo";
import { Handshake, Layers3, Sparkles, ListChecks, MapPin } from "lucide-react";

export const metadata = pageMetadata({
  title: "Why Choose Us",
  description:
    "Gheith Insurance combines personal service, multiple insurance solutions, technology, and local NY/NJ support.",
  path: "/why-choose-us",
});

const WHY = [
  { title: "Personal Service", text: "Real people when customers need help.", icon: Handshake },
  { title: "Multiple Insurance Solutions", text: "Help customers explore appropriate coverage.", icon: Layers3 },
  { title: "Technology + Human Support", text: "Web, AI chat, WhatsApp, phone and agent support.", icon: Sparkles },
  { title: "Simple Quote Process", text: "Easy online quote requests.", icon: ListChecks },
  { title: "Local Service", text: "NY/NJ positioning only where licensing and service availability are confirmed.", icon: MapPin },
];

export default function WhyChoosePage() {
  return (
    <>
      <PageHero
        eyebrow="Why choose us"
        title="Personal service, digital convenience, and human follow-through"
        subtitle="Gheith Insurance is a modern independent agency. We do not promise lowest prices or guaranteed savings."
        actions={<Button href="/quote" variant="gold" className="tracking-wide">GET A QUOTE</Button>}
      />
      <section className="py-16">
        <Container>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {WHY.map((item) => (
              <div key={item.title} className="rounded-2xl border border-navy/8 bg-white p-6 shadow-card">
                <item.icon className="h-7 w-7 text-teal" />
                <h2 className="mt-4 font-display text-xl font-semibold text-navy">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <QuoteCta />
    </>
  );
}
