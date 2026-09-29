import { notFound, redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Container } from "@/components/ui";
import { LeadEditor } from "@/components/admin/LeadEditor";

export default async function LeadDetail({ params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin();
  if (!session) redirect("/admin");
  const { id } = await params;
  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) notFound();
  return (
    <section className="py-12">
      <Container className="max-w-3xl">
        <LeadEditor lead={JSON.parse(JSON.stringify(lead))} />
      </Container>
    </section>
  );
}
