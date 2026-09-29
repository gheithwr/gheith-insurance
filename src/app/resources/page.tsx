import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { prisma } from "@/lib/db";
import { ensureSeed } from "@/lib/seed";

export const metadata = pageMetadata({
  title: "Resources",
  description:
    "Educational insurance articles from Gheith Insurance covering auto, home, business, life, claims, and NY/NJ tips.",
  path: "/resources",
});

const CATEGORIES = [
  "Auto",
  "Home",
  "Business",
  "Life",
  "Claims",
  "Insurance Tips",
  "New York",
  "New Jersey",
];

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  await ensureSeed();
  const articles = await prisma.article.findMany({
    where: {
      status: "published",
      ...(category ? { category } : {}),
    },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Insurance articles and practical guidance"
        subtitle="Educational content only. AI-generated drafts require approval before they appear here."
      />
      <section className="py-14">
        <Container>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/resources"
              className={`rounded-full px-4 py-2 text-sm font-semibold ${!category ? "bg-navy text-white" : "bg-white text-navy"}`}
            >
              All
            </Link>
            {CATEGORIES.map((c) => (
              <Link
                key={c}
                href={`/resources?category=${encodeURIComponent(c)}`}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${category === c ? "bg-navy text-white" : "bg-white text-navy"}`}
              >
                {c}
              </Link>
            ))}
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {articles.length === 0 ? (
              <p className="text-sm text-slate-600">
                No published articles in this category yet. Drafts can be approved in the admin dashboard.
              </p>
            ) : (
              articles.map((a) => (
                <article key={a.id} className="rounded-2xl border border-navy/8 bg-white p-6 shadow-card">
                  <p className="text-xs font-semibold uppercase tracking-wider text-teal">{a.category}</p>
                  <h2 className="mt-2 font-display text-xl font-semibold text-navy">
                    <Link href={`/resources/${a.slug}`} className="hover:text-teal">
                      {a.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{a.excerpt}</p>
                  <Link href={`/resources/${a.slug}`} className="mt-4 inline-block text-sm font-semibold text-navy">
                    Read article
                  </Link>
                </article>
              ))
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
