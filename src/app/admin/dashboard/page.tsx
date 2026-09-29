import { redirect } from "next/navigation";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ensureSeed } from "@/lib/seed";
import { Container, Card } from "@/components/ui";

export default async function AdminDashboard() {
  const session = await requireAdmin();
  if (!session) redirect("/admin");
  await ensureSeed();

  const [leads, contacts, callbacks, chats, quotesByType, sources] = await Promise.all([
    prisma.lead.count(),
    prisma.contactMessage.count(),
    prisma.callbackRequest.count(),
    prisma.chatConversation.count(),
    prisma.lead.groupBy({ by: ["insuranceType"], _count: true }),
    prisma.lead.groupBy({ by: ["source"], _count: true }),
  ]);

  const recentLeads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: 8,
  });

  const tiles = [
    { label: "Quote requests", value: leads, href: "/admin/dashboard/leads" },
    { label: "Messages", value: contacts, href: "/admin/dashboard/contacts" },
    { label: "Callbacks", value: callbacks, href: "/admin/dashboard/callbacks" },
    { label: "Chat conversations", value: chats, href: "/admin/dashboard/chats" },
  ];

  return (
    <section className="py-12">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-teal">Admin</p>
            <h1 className="mt-2 font-display text-3xl font-semibold text-navy">Dashboard</h1>
          </div>
          <Link href="/api/auth/logout-admin" className="text-sm font-semibold text-navy">
            Sign out
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((t) => (
            <Link key={t.label} href={t.href}>
              <Card>
                <p className="text-sm text-slate-500">{t.label}</p>
                <p className="mt-2 font-display text-3xl font-semibold text-navy">{t.value}</p>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <h2 className="font-display text-xl font-semibold text-navy">Recent quote requests</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-slate-500">
                    <th className="py-2">Inquiry</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Source</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLeads.map((l) => (
                    <tr key={l.id} className="border-t border-navy/5">
                      <td className="py-2">
                        <Link href={`/admin/dashboard/leads/${l.id}`} className="font-semibold text-navy">
                          {l.inquiryNumber}
                        </Link>
                      </td>
                      <td>
                        {l.firstName} {l.lastName}
                      </td>
                      <td>{l.insuranceType}</td>
                      <td>{l.status}</td>
                      <td>{l.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {recentLeads.length === 0 ? (
                <p className="mt-4 text-sm text-slate-500">No quote requests yet.</p>
              ) : null}
            </div>
          </Card>
          <div className="space-y-6">
            <Card>
              <h2 className="font-display text-lg font-semibold text-navy">Requested products</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {quotesByType.map((q) => (
                  <li key={q.insuranceType} className="flex justify-between">
                    <span>{q.insuranceType}</span>
                    <span className="font-semibold">{q._count}</span>
                  </li>
                ))}
                {quotesByType.length === 0 ? <li className="text-slate-500">No data yet.</li> : null}
              </ul>
            </Card>
            <Card>
              <h2 className="font-display text-lg font-semibold text-navy">Lead sources</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {sources.map((q) => (
                  <li key={q.source} className="flex justify-between">
                    <span>{q.source}</span>
                    <span className="font-semibold">{q._count}</span>
                  </li>
                ))}
                {sources.length === 0 ? <li className="text-slate-500">No data yet.</li> : null}
              </ul>
            </Card>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
          {[
            ["/admin/dashboard/leads", "Leads"],
            ["/admin/dashboard/contacts", "Contacts"],
            ["/admin/dashboard/callbacks", "Callbacks"],
            ["/admin/dashboard/chats", "Chat leads"],
            ["/admin/dashboard/products", "Products"],
            ["/admin/dashboard/faq", "FAQ"],
            ["/admin/dashboard/blog", "Blog"],
            ["/admin/dashboard/team", "Team"],
            ["/admin/dashboard/settings", "Website & WhatsApp"],
          ].map(([href, label]) => (
            <Link key={href} href={href} className="rounded-xl bg-white px-4 py-2 shadow-card hover:shadow-lift">
              {label}
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
