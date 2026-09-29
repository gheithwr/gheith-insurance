import { PageHero } from "@/components/PageHero";
import { Container, Button } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "New York Insurance Agency",
  description:
    "Gheith Insurance helps New York individuals, families, property owners, and businesses explore insurance options where licensing and service availability are confirmed.",
  path: "/locations/new-york",
});

export default function NewYorkPage() {
  return (
    <>
      <PageHero
        eyebrow="New York"
        title="Insurance conversations for New York"
        subtitle="Gheith Insurance serves New York where licensing and service availability are confirmed. This page does not list cities, offices, or carrier appointments that have not been verified."
        actions={<Button href="/quote" variant="gold">Get a Quote</Button>}
      />
      <section className="py-14">
        <Container className="max-w-3xl">
          <p className="text-sm leading-relaxed text-slate-600">
            If you are in New York and want help with auto, home, renters, business, or other coverage
            conversations, start a quote or contact the agency. A representative will confirm whether
            a product can be discussed for your location.
          </p>
        </Container>
      </section>
    </>
  );
}
