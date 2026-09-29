import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Container, Card } from "@/components/ui";

export default async function ChatsAdmin() {
  const session = await requireAdmin();
  if (!session) redirect("/admin");
  const rows = await prisma.chatConversation.findMany({
    orderBy: { createdAt: "desc" },
    include: { messages: { orderBy: { createdAt: "asc" } } },
    take: 50,
  });
  return (
    <section className="py-12">
      <Container>
        <h1 className="font-display text-3xl font-semibold text-navy">Chat leads</h1>
        <div className="mt-6 grid gap-4">
          {rows.map((c) => (
            <Card key={c.id}>
              <p className="text-xs text-teal">{c.createdAt.toLocaleString()} · {c.status}</p>
              <div className="mt-3 space-y-2 text-sm">
                {c.messages.map((m) => (
                  <p key={m.id}>
                    <span className="font-semibold">{m.role}:</span> {m.content}
                  </p>
                ))}
              </div>
            </Card>
          ))}
          {rows.length === 0 ? <p className="text-sm text-slate-500">No chats yet.</p> : null}
        </div>
      </Container>
    </section>
  );
}
