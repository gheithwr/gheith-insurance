import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Container, Card } from "@/components/ui";

export default async function LeadsPage() {
  const session = await requireAdmin();
  if (!session) redirect("/admin");
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <section className="py-12">
      <Container>
        <h1 className="font-display text-3xl font-semibold text-navy">Quote requests & leads</h1>
        <Card className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-slate-500">
                <th className="py-2">Inquiry</th>
                <th>Name</th>
                <th>Type</th>
                <th>Status</th>
                <th>Source</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id} className="border-t border-navy/5">
                  <td className="py-2">
                    <Link className="font-semibold text-navy" href={`/admin/dashboard/leads/${l.id}`}>
                      {l.inquiryNumber}
                    </Link>
                  </td>
                  <td>{l.firstName} {l.lastName}</td>
                  <td>{l.insuranceType}</td>
                  <td>{l.status}</td>
                  <td>{l.source}</td>
                  <td>{l.createdAt.toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {leads.length === 0 ? <p className="mt-4 text-sm text-slate-500">No leads yet.</p> : null}
        </Card>
      </Container>
    </section>
  );
}
