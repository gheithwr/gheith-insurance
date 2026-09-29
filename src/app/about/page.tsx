import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Container, Button, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { Logo } from "@/components/Logo";
import { QuoteCta } from "@/components/QuoteCta";
import {
  Handshake,
  Layers3,
  Sparkles,
  ListChecks,
  MapPin,
  ShieldCheck,
  HeartHandshake,
  Cpu,
  Users,
} from "lucide-react";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Gheith Insurance Agency is an independent insurance agency helping individuals, families, and businesses find insurance solutions that fit their needs.",
  path: "/about",
});

const WHY = [
  { title: "Personal Service", text: "Real people when customers need help.", icon: Handshake },
  { title: "Multiple Insurance Solutions", text: "Help customers explore appropriate coverage.", icon: Layers3 },
  { title: "Technology + Human Support", text: "Web, AI chat, WhatsApp, phone and agent support.", icon: Sparkles },
  { title: "Simple Quote Process", text: "Easy online quote requests.", icon: ListChecks },
  { title: "Local Service", text: "NY/NJ positioning only where licensing and service availability are confirmed.", icon: MapPin },
];

const VALUES = [
  {
    title: "Trust",
    text: "Build lasting relationships through honesty, transparency, and dependable service.",
    icon: ShieldCheck,
  },
  {
    title: "Personal Service",
    text: "Treat every customer as an individual and understand their specific insurance needs.",
    icon: HeartHandshake,
  },
  {
    title: "Innovation",
    text: "Use modern technology and AI-assisted tools to make insurance interactions easier and more convenient.",
    icon: Cpu,
  },
  {
    title: "Customer First",
    text: "Design our services and digital experience around the needs of our customers.",
    icon: Users,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="An independent insurance agency built around the customer"
        subtitle="At Gheith Insurance Agency, we believe insurance should be understandable, accessible and built around the customer—not the paperwork."
        actions={
          <>
            <Button href="/quote" variant="gold" className="tracking-wide">
              GET A QUOTE
            </Button>
            <Button href="/contact" variant="secondary" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
              Talk With Our Insurance Team
            </Button>
          </>
        }
      />

      <section className="py-16">
        <Container className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <Logo href={null} height={96} className="mb-6 max-h-24" />
            <SectionHeading
              eyebrow="Who we are"
              title="Gheith Insurance Agency"
              subtitle="An independent insurance agency—not an insurance carrier."
            />
            <p className="mt-6 text-base leading-relaxed text-slate-600">
              Gheith Insurance Agency is an independent insurance agency committed to helping
              individuals, families, and businesses find insurance solutions that fit their needs.
              We believe insurance should be understandable, accessible, and supported by people who
              genuinely care about their customers.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Our team combines personalized service with modern technology to make it easier for
              customers to explore coverage options, ask questions, manage insurance needs, and
              receive ongoing support.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              We serve New York and New Jersey where licensing and service availability are confirmed.
              Coverage, eligibility, and pricing are determined by the insurance carrier. We do not
              promise the lowest prices or guaranteed savings.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/quote" variant="gold" className="tracking-wide">
                GET A QUOTE
              </Button>
              <Button href="/team">Meet the team</Button>
              <Button href="/contact" variant="secondary">
                Contact
              </Button>
            </div>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-navy to-teal p-8 text-white shadow-lift">
            <p className="text-sm uppercase tracking-[0.18em] text-gold">Our approach</p>
            <ul className="mt-5 space-y-4 text-sm leading-relaxed text-blue-50">
              <li>Explain coverage conversations in plain language.</li>
              <li>Collect only the preliminary information needed to start a quote.</li>
              <li>Escalate policy-specific questions to a representative.</li>
              <li>Keep WhatsApp, phone, email, and portal options configurable.</li>
            </ul>
            <p className="mt-8 text-sm text-blue-100/80">
              Explore your coverage options. Request your quote. Talk with our insurance team.
            </p>
            <Button href="/quote" variant="gold" className="mt-5 tracking-wide">
              GET A QUOTE
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="overflow-hidden rounded-3xl border border-navy/10 bg-sky-50 shadow-lift">
                <Image
                  src="/images/ceo.webp"
                  alt="Chief Executive Officer of Gheith Insurance Agency"
                  width={1198}
                  height={1313}
                  className="h-auto w-full object-cover object-top"
                  sizes="(max-width: 1024px) 90vw, 480px"
                  priority
                />
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">
                Message from Our CEO
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
                Protection made personal
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                <p>
                  At Gheith Insurance Agency, our goal is simple: to make insurance easier to
                  understand and help our customers make informed decisions about protecting what
                  matters most to them.
                </p>
                <p>
                  Insurance is more than a policy. It is about protecting your family, your home,
                  your business, and your future. We are committed to providing personal attention,
                  clear communication, and dependable service throughout our relationship with every
                  customer.
                </p>
                <p>
                  Technology is changing how people interact with insurance, and we believe it should
                  make the experience simpler—not more complicated. By combining experienced
                  professionals with modern digital tools, we aim to provide customers with convenient
                  access to information and support while maintaining the personal service they deserve.
                </p>
                <p>
                  Thank you for trusting Gheith Insurance Agency. We look forward to serving you and
                  building a long-term relationship based on trust, service, and respect.
                </p>
              </div>
              <div className="mt-8 border-l-4 border-gold pl-4">
                <p className="font-display text-lg font-semibold text-navy">Chief Executive Officer</p>
                <p className="text-sm text-teal">Gheith Insurance Agency</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/quote" variant="gold" className="tracking-wide">
                  GET A QUOTE
                </Button>
                <Button href="/contact" variant="secondary">
                  Talk With Our Insurance Team
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Our Vision"
            title="A modern, customer-focused insurance agency"
            subtitle="Where technology and personal service work together."
            align="center"
          />
          <div className="mx-auto mt-10 max-w-3xl space-y-4 rounded-3xl border border-navy/8 bg-white p-8 text-base leading-relaxed text-slate-600 shadow-card sm:p-10">
            <p>
              Our vision is to build a modern, customer-focused insurance agency where technology and
              personal service work together.
            </p>
            <p>
              We want customers to have a simple and convenient way to understand their insurance
              options, communicate with our team, request assistance, and manage their insurance needs.
            </p>
            <p>
              Our long-term vision is to become a trusted insurance partner for individuals, families,
              and businesses by delivering responsive service, innovative digital experiences, and
              lasting customer relationships.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Our Values" title="What guides our work" align="center" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-navy/8 bg-gradient-to-br from-white to-sky-50 p-6 shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-teal text-white">
                  <item.icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold uppercase tracking-wide text-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <SectionHeading title="Why choose Gheith Insurance" align="center" />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {WHY.map((item) => (
              <div key={item.title} className="rounded-2xl border border-navy/8 p-6 shadow-card">
                <item.icon className="h-7 w-7 text-teal" />
                <h3 className="mt-4 font-display text-xl font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <QuoteCta
        eyebrow="Get Started Today"
        title="Ready to Find the Right Coverage?"
        subtitle="Tell us what you need to protect, and our team will help you explore insurance options that fit your needs."
      />
    </>
  );
}
