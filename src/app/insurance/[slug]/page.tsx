import { notFound } from "next/navigation";
import { PRODUCTS, getProduct } from "@/lib/products";
import { PageHero } from "@/components/PageHero";
import { Container, Button, Card } from "@/components/ui";
import { ProductIcon } from "@/components/Icon";
import { QuoteCta } from "@/components/QuoteCta";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return pageMetadata({
    title: product.name,
    description: product.shortDesc,
    path: `/insurance/${product.slug}`,
  });
}

function quoteType(slug: string) {
  if (slug === "homeowners") return "home";
  if (slug === "general-liability" || slug === "bop" || slug === "workers-compensation") {
    return "business";
  }
  if (slug === "umbrella") return "other";
  return slug;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <PageHero
        eyebrow={product.category === "business" ? "Business insurance" : "Personal insurance"}
        title={product.name}
        subtitle={product.shortDesc}
        actions={
          <>
            <Button href={`/quote?type=${quoteType(product.slug)}`} variant="gold" className="tracking-wide">
              GET A QUOTE
            </Button>
            <Button href="/contact" variant="secondary" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
              Talk With Us
            </Button>
          </>
        }
      />
      <section className="py-16">
        <Container className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-navy to-teal text-white">
              <ProductIcon name={product.icon} className="h-7 w-7" />
            </div>
            <h2 className="font-display text-3xl font-semibold text-navy">How we can help</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">{product.longDesc}</p>
            <ul className="mt-8 space-y-3">
              {product.highlights.map((h) => (
                <li key={h} className="rounded-xl border border-navy/8 bg-white px-4 py-3 text-sm text-navy shadow-card">
                  {h}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-slate-500">
              This page is educational. It does not describe a specific policy, premium, deductible,
              or carrier offering. Coverage decisions are made by the insurance carrier.
            </p>
          </div>
          <aside>
            <Card>
              <h3 className="font-display text-xl font-semibold text-navy">Request a quote</h3>
              <p className="mt-2 text-sm text-slate-600">
                Share a few details. A Gheith Insurance representative will review your request.
              </p>
              <div className="mt-5 flex flex-col gap-2">
                <Button href={`/quote?type=${quoteType(product.slug)}`} variant="gold" className="tracking-wide">
                  GET A QUOTE
                </Button>
                <Button href="/contact" variant="secondary">
                  Contact
                </Button>
                <Button href="/claims" variant="ghost">
                  Claims assistance
                </Button>
              </div>
            </Card>
          </aside>
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
