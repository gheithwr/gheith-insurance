import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "Privacy practices for the Gheith Insurance website.",
  path: "/legal/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" subtitle="Placeholder policy for website visitors. Replace with counsel-reviewed language before production use." />
      <section className="py-14">
        <Container className="prose-custom max-w-3xl space-y-4 text-sm leading-relaxed text-slate-700">
          <p>
            Gheith Insurance collects information you submit through quote, contact, callback, chat,
            and portal forms. That may include name, phone, email, ZIP code, and insurance-related
            details you choose to share.
          </p>
          <p>
            We do not request Social Security numbers, payment card data, or driver&apos;s license
            numbers on initial public forms. Do not send that information through chat or the website.
          </p>
          <p>
            Inquiry records are stored so a representative can follow up. Access is limited to
            authorized agency users. Session cookies are used for portal and admin authentication.
          </p>
          <p>
            This website may capture UTM parameters to understand how visitors arrive. Analytics
            identifiers, if configured, should be documented here before launch.
          </p>
          <p>
            To request an update to information you submitted, use the contact form or the phone and
            email published in agency settings.
          </p>
        </Container>
      </section>
    </>
  );
}
