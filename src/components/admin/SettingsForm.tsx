"use client";

import { useState } from "react";
import type { AgencySettings } from "@/lib/settings";
import { Button, Card, Field } from "@/components/ui";

export function SettingsForm({ settings }: { settings: AgencySettings }) {
  const [values, setValues] = useState(settings);
  const [saved, setSaved] = useState("");

  async function save() {
    const res = await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setSaved(res.ok ? "Saved. Public pages will use these values." : "Unable to save");
  }

  const fields: Array<keyof AgencySettings> = [
    "companyName",
    "tagline",
    "phone",
    "email",
    "whatsappNumber",
    "whatsappMessage",
    "address",
    "city",
    "state",
    "zip",
    "hours",
    "markets",
    "siteUrl",
    "seoTitle",
    "seoDescription",
    "smsConsent",
  ];

  return (
    <Card className="mt-6">
      <div className="grid gap-4">
        {fields.map((key) => (
          <Field
            key={key}
            name={key}
            label={key}
            type={key === "smsConsent" || key === "seoDescription" || key === "whatsappMessage" ? "textarea" : "text"}
            value={values[key]}
            onChange={(v) => setValues((s) => ({ ...s, [key]: v }))}
          />
        ))}
        <p className="text-xs text-slate-500">
          WhatsApp uses https://wa.me/ with the configured number and pre-filled message. Enter digits with country code, for example 1XXXXXXXXXX.
        </p>
        <Button onClick={save}>Save settings</Button>
        {saved ? <p className="text-sm text-teal">{saved}</p> : null}
      </div>
    </Card>
  );
}
