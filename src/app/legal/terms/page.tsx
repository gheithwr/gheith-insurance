import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: "Terms of use for the Gheith Insurance website.",
  path: "/legal/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Use" subtitle="Placeholder terms. Have qualified counsel review before public production use." />
      <section className="py-14">
        <Container className="max-w-3xl space-y-4 text-sm leading-relaxed text-slate-700">
          <p>
            This website provides general information and a way to request contact from Gheith
            Insurance. It is not an offer of insurance, a binder, or a guarantee that coverage can
            be placed.
          </p>
          <p>
            Insurance products are offered only where the agency and producers are properly licensed.
            Coverage, eligibility, and pricing are determined by the insurance carrier.
          </p>
          <p>
            Chat and WhatsApp tools may provide general information based on approved website content.
            They will not invent policy numbers, premiums, deductibles, renewal dates, or claim status.
          </p>
          <p>
            You are responsible for the accuracy of information you submit. Do not submit another
            person&apos;s information without authority.
          </p>
        </Container>
      </section>
    </>
  );
}
