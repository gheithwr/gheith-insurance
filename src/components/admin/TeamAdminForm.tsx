"use client";

import { useState } from "react";
import { Button, Card, Field } from "@/components/ui";

type Member = {
  id: string;
  name: string;
  title: string;
  biography: string;
  email: string | null;
  phone: string | null;
  photoUrl: string | null;
  published: boolean;
};

export function TeamAdminForm({ members }: { members: Member[] }) {
  const [list, setList] = useState(members);
  const [form, setForm] = useState({
    name: "",
    title: "",
    biography: "",
    email: "",
    phone: "",
    photoUrl: "",
    published: false,
  });
  const [message, setMessage] = useState("");

  async function create() {
    const res = await fetch("/api/admin/team", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      setList((l) => [...l, data.member]);
      setMessage("Saved. Publish only when the profile is accurate.");
    } else setMessage(data.error || "Unable to save");
  }

  return (
    <div className="mt-6 space-y-4">
      {list.map((m) => (
        <Card key={m.id}>
          <p className="font-semibold text-navy">{m.name}</p>
          <p className="text-sm text-slate-600">{m.title} · {m.published ? "Published" : "Hidden"}</p>
        </Card>
      ))}
      <Card>
        <h2 className="font-display text-xl font-semibold text-navy">Add profile</h2>
        <div className="mt-4 grid gap-4">
          <Field name="name" label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
          <Field name="title" label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
          <Field name="biography" label="Biography" type="textarea" value={form.biography} onChange={(v) => setForm({ ...form, biography: v })} />
          <Field name="email" label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
          <Field name="phone" label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
          <Field name="photoUrl" label="Photo URL" value={form.photoUrl} onChange={(v) => setForm({ ...form, photoUrl: v })} />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
            />
            Publish on Team page
          </label>
          <Button onClick={create}>Save profile</Button>
          {message ? <p className="text-sm text-teal">{message}</p> : null}
        </div>
      </Card>
    </div>
  );
}
