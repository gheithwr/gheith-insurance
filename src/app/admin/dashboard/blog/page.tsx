import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Container } from "@/components/ui";
import { BlogAdmin } from "@/components/admin/BlogAdmin";

export default async function BlogAdminPage() {
  const session = await requireAdmin();
  if (!session) redirect("/admin");
  const articles = await prisma.article.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <section className="py-12">
      <Container className="max-w-3xl">
        <h1 className="font-display text-3xl font-semibold text-navy">Resources / blog</h1>
        <p className="mt-2 text-sm text-slate-600">
          AI-generated articles stay in draft until approved. Only published articles appear on the public site.
        </p>
        <BlogAdmin articles={JSON.parse(JSON.stringify(articles))} />
      </Container>
    </section>
  );
}
