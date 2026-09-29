"use client";

import { useMemo, useState } from "react";
import { QUOTE_TYPES, quoteFields, CONTACT_FIELDS, type QuoteType } from "@/lib/quotes";
import { Field, Button, Card } from "@/components/ui";
import { readUtm } from "@/components/LeadSource";
import { whatsappLink } from "@/lib/settings";

const SENSITIVE = /ssn|social security|driver'?s license|credit card|cvv|routing number|bank account/i;

export function QuoteForm({
  initialType,
  whatsappNumber,
  whatsappMessage,
}: {
  initialType?: string;
  whatsappNumber: string;
  whatsappMessage: string;
}) {
  const start =
    QUOTE_TYPES.find((t) => t.id === initialType || t.id === mapSlug(initialType || ""))?.id ||
    null;
  const [step, setStep] = useState(start ? 1 : 0);
  const [type, setType] = useState<QuoteType | "">(start || "");
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<{ inquiryNumber: string } | null>(null);

  const fields = useMemo(() => (type ? quoteFields(type) : []), [type]);
  const wa = whatsappLink(whatsappNumber, whatsappMessage);

  function set(name: string, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
  }

  async function submit() {
    setError("");
    const notes = Object.values(values).join(" ");
    if (SENSITIVE.test(notes)) {
      setError("Please do not include SSN, payment information, or driver's license numbers.");
      return;
    }
    for (const f of [...fields, ...CONTACT_FIELDS]) {
      if (f.required && !values[f.name]) {
        setError(`Please complete: ${f.label}`);
        return;
      }
    }
    setLoading(true);
    try {
      const utm = readUtm();
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          insuranceType: type,
          ...values,
          ...utm,
          company: values.company,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Unable to submit right now.");
        return;
      }
      setDone({ inquiryNumber: data.inquiryNumber });
    } catch {
      setError("Unable to submit right now. Please try again or contact the agency.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <Card className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-teal">Request received</p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-navy">
          Thank you! A Gheith Insurance representative will review your request and contact you shortly.
        </h2>
        <p className="mt-4 text-sm text-slate-600">
          Inquiry number: <strong>{done.inquiryNumber}</strong>
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {wa ? (
            <Button href={wa} variant="whatsapp" external>
              Continue on WhatsApp
            </Button>
          ) : null}
          <Button href="/contact" variant="secondary">
            Contact the agency
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 flex gap-2">
        {["Type", "Details", "Contact"].map((label, i) => (
          <div
            key={label}
            className={`flex-1 rounded-full px-3 py-2 text-center text-xs font-semibold ${
              step >= i ? "bg-navy text-white" : "bg-white text-slate-500"
            }`}
          >
            {i + 1}. {label}
          </div>
        ))}
      </div>

      {step === 0 ? (
        <>
          <h2 className="font-display text-2xl font-semibold text-navy">
            What would you like to insure?
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {QUOTE_TYPES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setType(t.id);
                  setStep(1);
                }}
                className="cursor-pointer rounded-2xl border border-navy/10 bg-white p-5 text-left shadow-card hover:border-teal hover:shadow-lift"
              >
                <span className="block font-semibold text-navy">{t.label}</span>
                <span className="mt-1 block text-sm text-slate-500">{t.description}</span>
              </button>
            ))}
          </div>
        </>
      ) : null}

      {step === 1 && type ? (
        <Card>
          <h2 className="font-display text-2xl font-semibold text-navy">
            A few details about your {QUOTE_TYPES.find((t) => t.id === type)?.label.toLowerCase()} request
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Do not include SSN, payment information, or driver&apos;s license numbers.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {fields.map((f) => (
              <div key={f.name} className={f.type === "textarea" ? "sm:col-span-2" : ""}>
                <Field
                  {...f}
                  value={values[f.name] || ""}
                  onChange={(v) => set(f.name, v)}
                />
              </div>
            ))}
          </div>
          {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}
          <div className="mt-6 flex gap-3">
            <Button variant="secondary" onClick={() => setStep(0)}>
              Back
            </Button>
            <Button onClick={() => setStep(2)}>Continue</Button>
          </div>
        </Card>
      ) : null}

      {step === 2 ? (
        <Card>
          <h2 className="font-display text-2xl font-semibold text-navy">How should we reach you?</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {CONTACT_FIELDS.map((f) => (
              <Field
                key={f.name}
                {...f}
                value={values[f.name] || ""}
                onChange={(v) => set(f.name, v)}
              />
            ))}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="company">Website</label>
              <input
                id="company"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                value={values.company || ""}
                onChange={(e) => set("company", e.target.value)}
              />
            </div>
          </div>
          {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}
          <div className="mt-6 flex gap-3">
            <Button variant="secondary" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button onClick={submit} disabled={loading}>
              {loading ? "Sending..." : "Submit request"}
            </Button>
          </div>
        </Card>
      ) : null}
    </div>
  );
}

function mapSlug(slug: string): QuoteType | "" {
  if (slug === "homeowners") return "home";
  if (["general-liability", "bop", "workers-compensation", "umbrella"].includes(slug)) {
    return slug === "umbrella" ? "other" : "business";
  }
  const found = QUOTE_TYPES.find((t) => t.id === slug);
  return found?.id || "";
}
