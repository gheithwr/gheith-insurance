import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui";
import { QuoteForm } from "@/components/QuoteForm";
import { pageMetadata } from "@/lib/seo";
import { getSettingsMap } from "@/lib/seed";

export const metadata = pageMetadata({
  title: "Get a Quote",
  description:
    "Request an insurance quote from Gheith Insurance. Questions change based on insurance type. A representative will follow up.",
  path: "/quote",
});

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const settings = await getSettingsMap();
  return (
    <>
      <PageHero
        eyebrow="Quote request"
        title="Get a Free Quote"
        subtitle="First tell us what you would like to insure. We collect only preliminary information. A Gheith Insurance representative will review your request."
      />
      <section className="py-14">
        <Container>
          <QuoteForm
            initialType={type}
            whatsappNumber={settings.whatsappNumber}
            whatsappMessage={settings.whatsappMessage}
          />
        </Container>
      </section>
    </>
  );
}
