import { redirect, notFound } from "next/navigation";
import { requireClient } from "@/lib/auth";
import { Container, Card, Button } from "@/components/ui";

const SECTIONS: Record<string, { title: string; body: string }> = {
  policies: {
    title: "My Policies",
    body: "No policy records are shown here yet. When a CRM or policy system is authorized, this page can list real policies. This website will never invent policy numbers, premiums, or coverage.",
  },
  documents: {
    title: "Documents",
    body: "Documents such as ID cards will appear after a document API is connected. Request copies through Contact My Agent if you need help now.",
  },
  renewals: {
    title: "Renewals",
    body: "Renewal timing is determined by the insurance carrier and the policy. For security, I'll connect you with a Gheith Insurance representative who can review your policy information.",
  },
  claims: {
    title: "Claims Assistance",
    body: "Use the Claims page or contact the agency. Applicable insurance carriers make claim coverage and payment decisions.",
  },
  changes: {
    title: "Request Policy Change",
    body: "Describe the change you need using the contact form or WhatsApp. A representative will follow up. Do not send SSN or payment information here.",
  },
  certificate: {
    title: "Request Certificate",
    body: "Certificate of insurance requests are handled by a representative. This portal does not generate official proof documents.",
  },
  messages: {
    title: "Messages",
    body: "Secure messaging is architected and ready for a CRM connection. Until then, use contact, chat, or WhatsApp.",
  },
};

export default async function PortalSection({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const session = await requireClient();
  if (!session) redirect("/portal");
  const { section } = await params;
  const data = SECTIONS[section];
  if (!data) notFound();

  return (
    <section className="py-12">
      <Container className="max-w-3xl">
        <Card>
          <h1 className="font-display text-3xl font-semibold text-navy">{data.title}</h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">{data.body}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/portal/dashboard" variant="secondary">
              Back to dashboard
            </Button>
            <Button href="/contact">Contact My Agent</Button>
            {section === "claims" ? <Button href="/claims" variant="ghost">Claims page</Button> : null}
          </div>
        </Card>
      </Container>
    </section>
  );
}
