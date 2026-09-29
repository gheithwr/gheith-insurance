import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Container } from "@/components/ui";
import { TeamAdminForm } from "@/components/admin/TeamAdminForm";

export default async function TeamAdmin() {
  const session = await requireAdmin();
  if (!session) redirect("/admin");
  const members = await prisma.teamMember.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <section className="py-12">
      <Container className="max-w-3xl">
        <h1 className="font-display text-3xl font-semibold text-navy">Team</h1>
        <p className="mt-2 text-sm text-slate-600">
          Add real people only. Unpublished profiles stay hidden. Do not invent employees.
        </p>
        <TeamAdminForm members={JSON.parse(JSON.stringify(members))} />
      </Container>
    </section>
  );
}
