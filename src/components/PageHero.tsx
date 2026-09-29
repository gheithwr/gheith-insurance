import { Container } from "./ui";
import { type ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  actions,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-light to-teal py-16 text-white sm:py-20">
      <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-10 h-64 w-64 rounded-full bg-teal/30 blur-3xl" />
      <Container className="relative">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{eyebrow}</p>
        ) : null}
        <h1 className="mt-3 max-w-4xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-blue-100/90 sm:text-lg">
            {subtitle}
          </p>
        ) : null}
        {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
      </Container>
    </section>
  );
}
