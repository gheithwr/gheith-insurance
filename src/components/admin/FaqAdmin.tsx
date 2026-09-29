"use client";

import { useState } from "react";
import { Button, Card, Field } from "@/components/ui";

type Faq = { id: string; question: string; answer: string; published: boolean };

export function FaqAdmin({ faqs }: { faqs: Faq[] }) {
  const [list, setList] = useState(faqs);
  const [form, setForm] = useState({ question: "", answer: "", published: true });
  const [message, setMessage] = useState("");

  async function create() {
    const res = await fetch("/api/admin/faq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      setList((l) => [...l, data.faq]);
      setMessage("Saved.");
      setForm({ question: "", answer: "", published: true });
    } else setMessage(data.error || "Unable to save");
  }

  return (
    <div className="mt-6 space-y-4">
      {list.map((f) => (
        <Card key={f.id}>
          <h2 className="font-semibold text-navy">{f.question}</h2>
          <p className="mt-2 text-sm text-slate-600">{f.answer}</p>
        </Card>
      ))}
      <Card>
        <h2 className="font-display text-xl font-semibold text-navy">Add FAQ</h2>
        <div className="mt-4 grid gap-4">
          <Field name="question" label="Question" value={form.question} onChange={(v) => setForm({ ...form, question: v })} />
          <Field name="answer" label="Answer" type="textarea" value={form.answer} onChange={(v) => setForm({ ...form, answer: v })} />
          <Button onClick={create}>Save FAQ</Button>
          {message ? <p className="text-sm text-teal">{message}</p> : null}
        </div>
      </Card>
    </div>
  );
}
