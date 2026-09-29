import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Container } from "@/components/ui";
import { FaqAdmin } from "@/components/admin/FaqAdmin";

export default async function FaqAdminPage() {
  const session = await requireAdmin();
  if (!session) redirect("/admin");
  const faqs = await prisma.faq.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <section className="py-12">
      <Container className="max-w-3xl">
        <h1 className="font-display text-3xl font-semibold text-navy">FAQ</h1>
        <FaqAdmin faqs={JSON.parse(JSON.stringify(faqs))} />
      </Container>
    </section>
  );
}
