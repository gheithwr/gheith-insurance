import { PageHero } from "@/components/PageHero";
import { Container, Card } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { WHATSAPP_AI_ARCHITECTURE } from "@/lib/chat";

export const metadata = pageMetadata({
  title: "WhatsApp AI Architecture",
  description:
    "Future WhatsApp Business Platform architecture for Gheith Insurance, including secure webhooks and human escalation.",
  path: "/whatsapp-ai",
});

export default function WhatsAppAiPage() {
  return (
    <>
      <PageHero
        eyebrow="Architecture"
        title="WhatsApp AI is designed for a later connection"
        subtitle="Customer WhatsApp messages can flow through the WhatsApp Business Platform into a secure webhook, the Gheith backend, modular AI, and authorized CRM or policy systems."
      />
      <section className="py-14">
        <Container>
          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {WHATSAPP_AI_ARCHITECTURE.flow.map((step, i) => (
              <li key={step} className="rounded-2xl bg-white p-5 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-wider text-gold">Step {i + 1}</p>
                <p className="mt-2 font-semibold text-navy">{step}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Card>
              <h2 className="font-display text-xl font-semibold text-navy">Future functions</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {WHATSAPP_AI_ARCHITECTURE.futureFunctions.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </Card>
            <Card>
              <h2 className="font-display text-xl font-semibold text-navy">Safety</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                {WHATSAPP_AI_ARCHITECTURE.safety} The AI provider is modular and will never fabricate
                policy numbers, premiums, coverage, deductibles, renewal dates, claim status, or
                carrier decisions.
              </p>
            </Card>
          </div>
        </Container>
      </section>
    </>
  );
}
