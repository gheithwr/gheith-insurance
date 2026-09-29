import { PageHero } from "@/components/PageHero";
import { Container, Button, SectionHeading } from "@/components/ui";
import { ProductCard } from "@/components/ProductCard";
import { QuoteCta } from "@/components/QuoteCta";
import { businessProducts } from "@/lib/products";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Business Insurance",
  description:
    "Explore business insurance conversations including general liability, BOP, commercial auto, and workers' compensation with Gheith Insurance.",
  path: "/business-insurance",
});

export default function BusinessInsurancePage() {
  return (
    <>
      <PageHero
        eyebrow="Business"
        title="Insurance conversations for New York and New Jersey businesses"
        subtitle="Gheith Insurance helps business owners evaluate insurance options that may fit how they operate. We do not promise the lowest price or guaranteed savings."
        actions={
          <>
            <Button href="/quote?type=business" variant="gold" className="tracking-wide">
              GET A QUOTE
            </Button>
            <Button href="/contact" variant="secondary" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
              Request a Callback
            </Button>
          </>
        }
      />
      <section className="py-16">
        <Container>
          <SectionHeading
            title="Common business coverage conversations"
            subtitle="Eligibility and available products depend on operations, location, and carrier guidelines."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {businessProducts().map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
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
