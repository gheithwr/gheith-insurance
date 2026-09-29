import { Button, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="py-24">
      <Container className="max-w-xl text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-teal">404</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-navy">Page not found</h1>
        <p className="mt-4 text-sm text-slate-600">
          The page you requested is not available. You can return home or start a quote.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/">Home</Button>
          <Button href="/quote" variant="secondary">
            Get a Quote
          </Button>
        </div>
      </Container>
    </section>
  );
}
