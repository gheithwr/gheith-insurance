import { Button, Container } from "@/components/ui";

export function QuoteCta({
  eyebrow = "Get Started Today",
  title = "Ready to Find the Right Coverage?",
  subtitle = "Tell us what you need to protect, and our team will help you explore insurance options that fit your needs.",
  compact = false,
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div className="rounded-2xl border border-navy/8 bg-gradient-to-br from-navy to-teal p-6 text-white shadow-card">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{eyebrow}</p>
        <h3 className="mt-2 font-display text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-blue-100/85">{subtitle}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button href="/quote" variant="gold">
            GET A QUOTE
          </Button>
          <Button href="/contact" variant="secondary" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
            CONTACT OUR TEAM
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy via-navy-light to-teal px-6 py-12 text-center text-white shadow-lift sm:px-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold/20 blur-3xl" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-blue-100/90 sm:text-base">
            {subtitle}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/quote" variant="gold" className="min-h-12 px-7 tracking-wide">
              GET A QUOTE
            </Button>
            <Button
              href="/contact"
              variant="secondary"
              className="min-h-12 border-white/25 bg-white/10 px-7 text-white hover:bg-white/20"
            >
              CONTACT OUR TEAM
            </Button>
          </div>
          <p className="mt-4 text-xs text-blue-100/70">Request your quote. Explore your coverage options.</p>
        </div>
      </Container>
    </section>
  );
}
