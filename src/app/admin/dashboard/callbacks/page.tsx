import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Container, Card } from "@/components/ui";

export default async function CallbacksAdmin() {
  const session = await requireAdmin();
  if (!session) redirect("/admin");
  const rows = await prisma.callbackRequest.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <section className="py-12">
      <Container>
        <h1 className="font-display text-3xl font-semibold text-navy">Callback requests</h1>
        <div className="mt-6 grid gap-4">
          {rows.map((r) => (
            <Card key={r.id}>
              <p className="text-xs text-teal">{r.inquiryNumber} · {r.preferredTime} · {r.status}</p>
              <h2 className="font-semibold text-navy">{r.name}</h2>
              <p className="text-sm">{r.phone} {r.email ? `· ${r.email}` : ""}</p>
              <p className="mt-2 text-sm text-slate-600">{r.message}</p>
            </Card>
          ))}
          {rows.length === 0 ? <p className="text-sm text-slate-500">No callbacks yet.</p> : null}
        </div>
      </Container>
    </section>
  );
}
