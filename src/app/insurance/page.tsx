import { Container, Button, SectionHeading } from "@/components/ui";
import { ProductCard } from "@/components/ProductCard";
import { PageHero } from "@/components/PageHero";
import { QuoteCta } from "@/components/QuoteCta";
import { PRODUCTS } from "@/lib/products";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Insurance",
  description:
    "Explore personal and business insurance conversations with Gheith Insurance, an independent agency serving New York and New Jersey.",
  path: "/insurance",
});

export default function InsurancePage() {
  return (
    <>
      <PageHero
        eyebrow="Insurance"
        title="Coverage conversations that start with your needs"
        subtitle="Gheith Insurance helps individuals, families, property owners, and businesses explore insurance options. Availability depends on licensing, underwriting, and the insurance carrier."
        actions={
          <>
            <Button href="/quote" variant="gold" className="tracking-wide">
              GET A QUOTE
            </Button>
            <Button href="/business-insurance" variant="secondary" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
              Business Insurance
            </Button>
          </>
        }
      />
      <section className="py-16">
        <Container>
          <SectionHeading title="Personal and specialty" subtitle="Educational pages for common coverage conversations. These are not offers of insurance." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.filter((p) => p.category !== "business").map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <div className="mt-16">
            <SectionHeading title="Business" subtitle="Start a conversation about coverages that may be relevant to how you operate." />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {PRODUCTS.filter((p) => p.category === "business").map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </Container>
      </section>
      <QuoteCta
        eyebrow="Explore Your Coverage Options"
        title="Ready to Find the Right Coverage?"
        subtitle="Tell us what you need to protect, and our team will help you explore insurance options that fit your needs."
      />
    </>
  );
}
