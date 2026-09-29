import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { DEFAULT_SETTINGS } from "@/lib/settings";

export const metadata = pageMetadata({
  title: "Communications Consent",
  description: "Phone, SMS, and WhatsApp communication consent placeholder for Gheith Insurance.",
  path: "/legal/communications",
});

export default function CommunicationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Communication and SMS consent"
        subtitle="Placeholder language for phone, text, and WhatsApp contact related to your inquiry."
      />
      <section className="py-14">
        <Container className="max-w-3xl space-y-4 text-sm leading-relaxed text-slate-700">
          <p>{DEFAULT_SETTINGS.smsConsent}</p>
          <p>
            Consent is not a condition of purchasing insurance. You may opt out of texts by following
            the instructions provided in messages once messaging is configured.
          </p>
        </Container>
      </section>
    </>
  );
}
