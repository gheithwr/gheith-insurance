import Link from "next/link";
import { redirect } from "next/navigation";
import { requireClient } from "@/lib/auth";
import { Container, Card, Button } from "@/components/ui";
import {
  FolderOpen,
  FileText,
  RefreshCw,
  LifeBuoy,
  PenSquare,
  BadgeCheck,
  UserRound,
  MessagesSquare,
} from "lucide-react";

const TILES = [
  { href: "/portal/dashboard/policies", title: "My Policies", text: "Placeholder until a policy API is connected.", icon: FolderOpen },
  { href: "/portal/dashboard/documents", title: "Documents", text: "ID cards and documents will appear here when available.", icon: FileText },
  { href: "/portal/dashboard/renewals", title: "Renewals", text: "Renewal dates are never invented by this website.", icon: RefreshCw },
  { href: "/portal/dashboard/claims", title: "Claims Assistance", text: "Start a claims conversation with the agency.", icon: LifeBuoy },
  { href: "/portal/dashboard/changes", title: "Request Policy Change", text: "Ask a representative to review a change.", icon: PenSquare },
  { href: "/portal/dashboard/certificate", title: "Request Certificate", text: "Certificate of insurance requests go to the agency.", icon: BadgeCheck },
  { href: "/contact", title: "Contact My Agent", text: "Phone, email, WhatsApp, or callback.", icon: UserRound },
  { href: "/portal/dashboard/messages", title: "Messages", text: "Secure messages after APIs are connected.", icon: MessagesSquare },
];

export default async function PortalDashboard() {
  const session = await requireClient();
  if (!session) redirect("/portal");

  return (
    <section className="py-12">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-teal">Client Portal</p>
            <h1 className="mt-2 font-display text-3xl font-semibold text-navy">
              Welcome{session.name ? `, ${session.name}` : ""}
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Policy records, documents, and messages stay empty until authorized systems are connected.
              This portal will not fabricate customer or policy information.
            </p>
          </div>
          <form action="/api/auth/logout" method="post">
            <LogoutButton />
          </form>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TILES.map((t) => (
            <Link key={t.title} href={t.href} className="block h-full">
              <Card className="h-full transition hover:-translate-y-0.5 hover:shadow-lift">
                <t.icon className="h-6 w-6 text-teal" />
                <h2 className="mt-4 font-display text-lg font-semibold text-navy">{t.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{t.text}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

function LogoutButton() {
  return (
    <Button href="/api/auth/logout-client" variant="secondary">
      Sign out
    </Button>
  );
}
