import { PageHero } from "@/components/PageHero";
import { Container, Button, Card, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { getSettingsMap } from "@/lib/seed";
import { whatsappLink } from "@/lib/settings";

export const metadata = pageMetadata({
  title: "Claims Assistance",
  description:
    "Need to file a claim? Gheith Insurance can help you start the conversation. Applicable insurance carriers make claim coverage and payment decisions.",
  path: "/claims",
});

const TYPES = [
  "Auto",
  "Homeowners",
  "Renters",
  "Condo",
  "Landlord",
  "Business",
  "Commercial Auto",
  "Other",
];

export default async function ClaimsPage() {
  const settings = await getSettingsMap();
  const wa = whatsappLink(settings.whatsappNumber, settings.whatsappMessage);

  return (
    <>
      <PageHero
        eyebrow="Claims"
        title="Need to File a Claim? We're Here to Help."
        subtitle="Gheith Insurance can help you start a claims conversation, request a callback, or connect by phone or WhatsApp. Applicable insurance carriers make claim coverage and payment decisions."
        actions={
          <>
            <Button href="/contact#callback" variant="gold">
              Request Callback
            </Button>
            {wa ? (
              <Button href={wa} variant="whatsapp" external>
                WhatsApp
              </Button>
            ) : (
              <Button href="/contact" variant="secondary" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
                Contact Agency
              </Button>
            )}
          </>
        }
      />
      <section className="py-16">
        <Container>
          <SectionHeading
            title="Start with the insurance type"
            subtitle="Select a category to begin a callback or message. This website cannot report claim status or promise an outcome."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TYPES.map((t) => (
              <a
                key={t}
                href={`/contact?type=${encodeURIComponent(t)}#callback`}
                className="rounded-2xl border border-navy/8 bg-white p-5 text-center font-semibold text-navy shadow-card hover:shadow-lift"
              >
                {t}
              </a>
            ))}
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <Card>
              <h3 className="font-display text-lg font-semibold text-navy">General next steps</h3>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-600">
                <li>Make sure everyone is safe and follow any applicable emergency guidance.</li>
                <li>Document what you can without putting yourself at risk.</li>
                <li>Contact Gheith Insurance or the insurance carrier as directed on your documents.</li>
                <li>A representative can help you understand typical next steps.</li>
              </ol>
            </Card>
            <Card>
              <h3 className="font-display text-lg font-semibold text-navy">Contact the agency</h3>
              <p className="mt-3 text-sm text-slate-600">
                Use WhatsApp, phone, chat, or the contact form. For security, we cannot look up claim
                status from public chat.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <Button href="/contact">Contact Agency</Button>
                <Button href="/contact#callback" variant="secondary">
                  Request Callback
                </Button>
              </div>
            </Card>
            <Card>
              <h3 className="font-display text-lg font-semibold text-navy">Important notice</h3>
              <p className="mt-3 text-sm text-slate-600">
                Applicable insurance carriers make claim coverage and payment decisions. Gheith
                Insurance does not invent claim outcomes, reserves, or payment amounts.
              </p>
            </Card>
          </div>
        </Container>
      </section>
    </>
  );
}
