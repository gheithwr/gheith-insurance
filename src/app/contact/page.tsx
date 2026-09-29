import { PageHero } from "@/components/PageHero";
import { Container, Button } from "@/components/ui";
import { ContactForms } from "@/components/ContactForms";
import { pageMetadata } from "@/lib/seo";
import { getSettingsMap } from "@/lib/seed";
import { formatPhoneDisplay, hasConfiguredAddress, whatsappLink } from "@/lib/settings";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Contact Gheith Insurance by phone, email, WhatsApp, or request a callback.",
  path: "/contact",
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const settings = await getSettingsMap();
  const wa = whatsappLink(settings.whatsappNumber, settings.whatsappMessage);
  const showAddress = hasConfiguredAddress(settings);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk with Gheith Insurance"
        subtitle="Choose phone, email, WhatsApp, or text. You can also request a morning, afternoon, or evening callback."
        actions={
          <>
            {settings.phone ? (
              <Button href={`tel:${settings.phone}`} variant="gold">
                Call {formatPhoneDisplay(settings.phone)}
              </Button>
            ) : null}
            {wa ? (
              <Button href={wa} variant="whatsapp" external>
                WhatsApp
              </Button>
            ) : null}
            <Button href="/quote" variant="secondary" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
              Get a Quote
            </Button>
          </>
        }
      />
      <section className="py-14">
        <Container>
          <div className="mb-10 grid gap-4 rounded-2xl bg-white p-6 shadow-card sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-wider text-teal">Phone</p>
              <p className="mt-1 text-sm text-navy">
                {settings.phone ? formatPhoneDisplay(settings.phone) : "Add a phone number in admin settings."}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-teal">Email</p>
              <p className="mt-1 text-sm text-navy">
                {settings.email || "Add an email address in admin settings."}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-teal">Address</p>
              <p className="mt-1 text-sm text-navy">
                {showAddress
                  ? `${settings.address}, ${settings.city}, ${settings.state} ${settings.zip}`
                  : "An office map and address will display after a real address is configured."}
              </p>
            </div>
          </div>
          <ContactForms
            initialType={type}
            whatsappNumber={settings.whatsappNumber}
            whatsappMessage={settings.whatsappMessage}
            smsConsent={settings.smsConsent}
          />
        </Container>
      </section>
    </>
  );
}
