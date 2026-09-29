import { PageHero } from "@/components/PageHero";
import { Container, Button, Card } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { prisma } from "@/lib/db";
import { ensureSeed } from "@/lib/seed";

export const metadata = pageMetadata({
  title: "Team",
  description: "Meet the Gheith Insurance team. Profiles are published from the admin dashboard.",
  path: "/team",
});

export default async function TeamPage() {
  await ensureSeed();
  const members = await prisma.teamMember.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <>
      <PageHero
        eyebrow="Team"
        title="People you can reach when it matters"
        subtitle="Team profiles are managed in the admin dashboard. Until profiles are published, this page shows editable placeholders rather than fictional employees."
      />
      <section className="py-16">
        <Container>
          {members.length === 0 ? (
            <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-navy/20 bg-white p-10 text-center">
              <h2 className="font-display text-2xl font-semibold text-navy">Team profiles coming soon</h2>
              <p className="mt-3 text-sm text-slate-600">
                Photo, name, title, biography, and contact fields are ready. Publish a team member
                from the admin dashboard when you have real information to share.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <Button href="/contact">Contact the agency</Button>
                <Button href="/admin" variant="secondary">
                  Admin sign in
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((m) => (
                <Card key={m.id}>
                  <div className="mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-sky-100 text-xl font-bold text-navy">
                    {m.photoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={m.photoUrl} alt={m.name} className="h-full w-full object-cover" />
                    ) : (
                      m.name.slice(0, 1)
                    )}
                  </div>
                  <h2 className="font-display text-xl font-semibold text-navy">{m.name}</h2>
                  <p className="text-sm text-teal">{m.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{m.biography}</p>
                  <div className="mt-4 space-y-1 text-sm">
                    {m.email ? (
                      <a href={`mailto:${m.email}`} className="block text-navy hover:underline">
                        {m.email}
                      </a>
                    ) : null}
                    {m.phone ? (
                      <a href={`tel:${m.phone}`} className="block text-navy hover:underline">
                        {m.phone}
                      </a>
                    ) : null}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
