"use client";

import { useState } from "react";
import { Button, Card, Field } from "@/components/ui";
import { LEAD_STATUSES } from "@/lib/leads";

type Lead = {
  id: string;
  inquiryNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  insuranceType: string;
  status: string;
  source: string;
  preferredContact: string;
  zipCode: string | null;
  notes: string;
  payload: string;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
};

export function LeadEditor({ lead }: { lead: Lead }) {
  const [status, setStatus] = useState(lead.status);
  const [notes, setNotes] = useState(lead.notes);
  const [saved, setSaved] = useState("");

  async function save() {
    const res = await fetch(`/api/admin/leads/${lead.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, notes }),
    });
    setSaved(res.ok ? "Saved" : "Unable to save");
  }

  let payload: Record<string, unknown> = {};
  try {
    payload = JSON.parse(lead.payload || "{}");
  } catch {
    payload = {};
  }

  return (
    <Card>
      <p className="text-xs uppercase tracking-wider text-teal">{lead.inquiryNumber}</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-navy">
        {lead.firstName} {lead.lastName}
      </h1>
      <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
        <div>Email: {lead.email}</div>
        <div>Phone: {lead.phone}</div>
        <div>Type: {lead.insuranceType}</div>
        <div>Source: {lead.source}</div>
        <div>Preferred: {lead.preferredContact}</div>
        <div>ZIP: {lead.zipCode || "—"}</div>
        <div>UTM source: {lead.utmSource || "—"}</div>
        <div>Campaign: {lead.utmCampaign || "—"}</div>
      </dl>
      <pre className="mt-4 overflow-x-auto rounded-xl bg-sky-50 p-4 text-xs text-slate-700">
        {JSON.stringify(payload, null, 2)}
      </pre>
      <div className="mt-6 grid gap-4">
        <Field name="status" label="Lead status" type="select" options={[...LEAD_STATUSES]} value={status} onChange={setStatus} />
        <Field name="notes" label="Internal notes" type="textarea" value={notes} onChange={setNotes} />
        <Button onClick={save}>Save</Button>
        {saved ? <p className="text-sm text-teal">{saved}</p> : null}
      </div>
    </Card>
  );
}
