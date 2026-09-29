"use client";

import { useState } from "react";
import { Field, Button, Card } from "@/components/ui";
import { readUtm } from "@/components/LeadSource";
import { whatsappLink } from "@/lib/settings";

const TYPES = [
  "Auto",
  "Home",
  "Renters",
  "Condo",
  "Landlord",
  "Business",
  "Commercial Auto",
  "Life",
  "Claims",
  "Other",
];

export function ContactForms({
  initialType,
  whatsappNumber,
  whatsappMessage,
  smsConsent,
}: {
  initialType?: string;
  whatsappNumber: string;
  whatsappMessage: string;
  smsConsent: string;
}) {
  const [contactDone, setContactDone] = useState("");
  const [callbackDone, setCallbackDone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [typeValue, setTypeValue] = useState(initialType || "");
  const wa = whatsappLink(whatsappNumber, whatsappMessage);

  async function submitContact(form: FormData) {
    setError("");
    setLoading(true);
    try {
      const utm = readUtm();
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          insuranceType: form.get("insuranceType"),
          message: form.get("message"),
          preferredContact: form.get("preferredContact"),
          company: form.get("company"),
          ...utm,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to send");
      setContactDone(data.inquiryNumber);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to send");
    } finally {
      setLoading(false);
    }
  }

  async function submitCallback(form: FormData) {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("cb_name"),
          phone: form.get("cb_phone"),
          email: form.get("cb_email"),
          preferredTime: form.get("preferredTime"),
          insuranceType: form.get("cb_type"),
          message: form.get("cb_message"),
          company: form.get("cb_company"),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to send");
      setCallbackDone(data.inquiryNumber);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to send");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <h2 className="font-display text-2xl font-semibold text-navy">Send a message</h2>
        {contactDone ? (
          <p className="mt-4 text-sm text-slate-600">
            Thank you. Inquiry number <strong>{contactDone}</strong>. A representative will follow up.
            {wa ? (
              <>
                {" "}
                You can also continue on{" "}
                <a href={wa} className="font-semibold text-whatsapp" target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
                .
              </>
            ) : null}
          </p>
        ) : (
          <form
            className="mt-5 grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              submitContact(new FormData(e.currentTarget));
            }}
          >
            <Field name="name" label="Name" required />
            <Field name="phone" label="Phone" type="tel" required />
            <Field name="email" label="Email" type="email" required />
            <Field
              name="insuranceType"
              label="Insurance type"
              type="select"
              options={TYPES}
              required
              value={typeValue}
              onChange={setTypeValue}
            />
            <Field name="message" label="Message" type="textarea" required />
            <Field
              name="preferredContact"
              label="Preferred contact"
              type="select"
              options={["Phone", "Email", "WhatsApp", "Text"]}
              required
            />
            <div className="hidden">
              <Field name="company" label="Company" />
            </div>
            <p className="text-xs text-slate-500">{smsConsent}</p>
            {error ? <p className="text-sm text-red-700">{error}</p> : null}
            <Button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send message"}
            </Button>
          </form>
        )}
      </Card>

      <Card id-ignored="">
        <div id="callback">
          <h2 className="font-display text-2xl font-semibold text-navy">Request a Callback</h2>
          {callbackDone ? (
            <p className="mt-4 text-sm text-slate-600">
              Thank you. Inquiry number <strong>{callbackDone}</strong>. We will call during the
              selected window when possible.
            </p>
          ) : (
            <form
              className="mt-5 grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                submitCallback(new FormData(e.currentTarget));
              }}
            >
              <Field name="cb_name" label="Name" required />
              <Field name="cb_phone" label="Phone" type="tel" required />
              <Field name="cb_email" label="Email" type="email" />
              <Field
                name="preferredTime"
                label="Preferred time"
                type="select"
                options={["Morning", "Afternoon", "Evening"]}
                required
              />
              <Field name="cb_type" label="Insurance type" type="select" options={TYPES} />
              <Field name="cb_message" label="How can we help?" type="textarea" />
              <div className="hidden">
                <Field name="cb_company" label="Company" />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Request callback"}
              </Button>
            </form>
          )}
        </div>
      </Card>
    </div>
  );
}
