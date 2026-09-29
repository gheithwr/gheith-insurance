import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Accessibility",
  description: "Accessibility statement for the Gheith Insurance website.",
  path: "/legal/accessibility",
});

export default function AccessibilityPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Accessibility" subtitle="We aim to make this website usable across devices and assistive technologies." />
      <section className="py-14">
        <Container className="max-w-3xl space-y-4 text-sm leading-relaxed text-slate-700">
          <p>
            The Gheith Insurance website is designed with semantic HTML, labeled form fields, keyboard
            focus states, skip links, and responsive layouts for phones, tablets, and desktops.
          </p>
          <p>
            If you encounter a barrier, contact the agency using the phone, email, or form published
            on the Contact page and describe the page and issue.
          </p>
        </Container>
      </section>
    </>
  );
}
