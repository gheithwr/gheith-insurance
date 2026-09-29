import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui";
import { FaqList } from "@/components/FaqList";
import { pageMetadata } from "@/lib/seo";
import { prisma } from "@/lib/db";
import { ensureSeed } from "@/lib/seed";
import { FAQ_ITEMS } from "@/lib/faq";

export const metadata = pageMetadata({
  title: "FAQ",
  description: "Answers to common questions about working with Gheith Insurance.",
  path: "/faq",
});

export default async function FaqPage() {
  await ensureSeed();
  const dbFaqs = await prisma.faq.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });
  const items = dbFaqs.length ? dbFaqs : FAQ_ITEMS;

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Questions we hear often"
        subtitle="These answers describe how the agency works. They do not describe a specific policy or premium."
      />
      <section className="py-14">
        <Container className="max-w-3xl">
          <FaqList items={items} />
        </Container>
      </section>
    </>
  );
}
