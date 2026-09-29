import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Container, Button } from "@/components/ui";
import { prisma } from "@/lib/db";
import { ensureSeed } from "@/lib/seed";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  await ensureSeed();
  const { slug } = await params;
  const article = await prisma.article.findUnique({ where: { slug } });
  if (!article || article.status !== "published") return {};
  return pageMetadata({
    title: article.seoTitle || article.title,
    description: article.seoDesc || article.excerpt,
    path: `/resources/${article.slug}`,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await ensureSeed();
  const { slug } = await params;
  const article = await prisma.article.findUnique({ where: { slug } });
  if (!article || article.status !== "published") notFound();

  return (
    <>
      <PageHero eyebrow={article.category} title={article.title} subtitle={article.excerpt} />
      <section className="py-14">
        <Container className="max-w-3xl">
          <article className="rounded-2xl bg-white p-8 shadow-card">
            {article.content.split("\n\n").map((p, i) => (
              <p key={i} className="mb-4 text-base leading-relaxed text-slate-700">
                {p}
              </p>
            ))}
            <p className="mt-8 text-sm text-slate-500">
              This article is educational and does not describe a specific policy, premium, or claim outcome.
            </p>
            <div className="mt-6 flex gap-3">
              <Button href="/quote">Get a Quote</Button>
              <Button href="/resources" variant="secondary">
                More resources
              </Button>
            </div>
          </article>
        </Container>
      </section>
    </>
  );
}
