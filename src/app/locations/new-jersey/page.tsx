import { PageHero } from "@/components/PageHero";
import { Container, Button } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "New Jersey Insurance Agency",
  description:
    "Gheith Insurance helps New Jersey individuals, families, property owners, and businesses explore insurance options where licensing and service availability are confirmed.",
  path: "/locations/new-jersey",
});

export default function NewJerseyPage() {
  return (
    <>
      <PageHero
        eyebrow="New Jersey"
        title="Insurance conversations for New Jersey"
        subtitle="Gheith Insurance serves New Jersey where licensing and service availability are confirmed. Specific towns and carrier markets are added only when verified."
        actions={<Button href="/quote" variant="gold">Get a Quote</Button>}
      />
      <section className="py-14">
        <Container className="max-w-3xl">
          <p className="text-sm leading-relaxed text-slate-600">
            Start a quote or message the agency. Coverage availability depends on licensing,
            underwriting, and the insurance carrier.
          </p>
        </Container>
      </section>
    </>
  );
}
