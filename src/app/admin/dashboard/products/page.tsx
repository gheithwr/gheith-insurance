import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ensureSeed } from "@/lib/seed";
import { Container, Card } from "@/components/ui";

export default async function ProductsAdmin() {
  const session = await requireAdmin();
  if (!session) redirect("/admin");
  await ensureSeed();
  const products = await prisma.product.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <section className="py-12">
      <Container>
        <h1 className="font-display text-3xl font-semibold text-navy">Insurance products</h1>
        <p className="mt-2 text-sm text-slate-600">
          Product copy is stored in the database. Public pages currently use approved educational content.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {products.map((p) => (
            <Card key={p.id}>
              <p className="text-xs uppercase tracking-wider text-teal">{p.category}</p>
              <h2 className="font-semibold text-navy">{p.name}</h2>
              <p className="mt-2 text-sm text-slate-600">{p.shortDesc}</p>
              <p className="mt-2 text-xs text-slate-500">/{`insurance/${p.slug}`}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
