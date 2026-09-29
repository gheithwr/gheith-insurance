import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getSettingsMap } from "@/lib/seed";
import { Container } from "@/components/ui";
import { SettingsForm } from "@/components/admin/SettingsForm";

export default async function SettingsAdmin() {
  const session = await requireAdmin();
  if (!session) redirect("/admin");
  const settings = await getSettingsMap();
  return (
    <section className="py-12">
      <Container className="max-w-3xl">
        <h1 className="font-display text-3xl font-semibold text-navy">Website, SEO & WhatsApp</h1>
        <p className="mt-2 text-sm text-slate-600">
          Keep phone, email, WhatsApp, address, and SEO in one place. Address and map stay hidden on the public site until a real address is saved.
        </p>
        <SettingsForm settings={settings} />
      </Container>
    </section>
  );
}
