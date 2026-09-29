"use client";

import { useState } from "react";
import { Button, Card, Field } from "@/components/ui";

type Article = {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: string;
  excerpt: string;
};

const CATEGORIES = ["Auto", "Home", "Business", "Life", "Claims", "Insurance Tips", "New York", "New Jersey"];

export function BlogAdmin({ articles }: { articles: Article[] }) {
  const [list, setList] = useState(articles);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "Insurance Tips",
    excerpt: "",
    content: "",
    status: "draft",
  });
  const [message, setMessage] = useState("");

  async function create() {
    const res = await fetch("/api/admin/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      setList((l) => [data.article, ...l]);
      setMessage(form.status === "published" ? "Published." : "Saved as draft. Approve before publishing.");
    } else setMessage(data.error || "Unable to save");
  }

  async function setStatus(id: string, status: string) {
    const res = await fetch("/api/admin/articles", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      setList((l) => l.map((a) => (a.id === id ? { ...a, status } : a)));
    }
  }

  return (
    <div className="mt-6 space-y-4">
      {list.map((a) => (
        <Card key={a.id}>
          <p className="text-xs text-teal">{a.category} · {a.status}</p>
          <h2 className="font-semibold text-navy">{a.title}</h2>
          <p className="text-sm text-slate-600">{a.excerpt}</p>
          <div className="mt-3 flex gap-2">
            {a.status !== "published" ? (
              <Button onClick={() => setStatus(a.id, "published")}>Approve & publish</Button>
            ) : (
              <Button variant="secondary" onClick={() => setStatus(a.id, "draft")}>
                Unpublish
              </Button>
            )}
          </div>
        </Card>
      ))}
      <Card>
        <h2 className="font-display text-xl font-semibold text-navy">New article</h2>
        <div className="mt-4 grid gap-4">
          <Field name="title" label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
          <Field name="slug" label="Slug" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} hint="SEO-friendly URL, for example auto-quote-checklist" />
          <Field name="category" label="Category" type="select" options={CATEGORIES} value={form.category} onChange={(v) => setForm({ ...form, category: v })} />
          <Field name="excerpt" label="Excerpt" type="textarea" value={form.excerpt} onChange={(v) => setForm({ ...form, excerpt: v })} />
          <Field name="content" label="Content" type="textarea" value={form.content} onChange={(v) => setForm({ ...form, content: v })} />
          <Field name="status" label="Status" type="select" options={["draft", "published"]} value={form.status} onChange={(v) => setForm({ ...form, status: v })} />
          <Button onClick={create}>Save article</Button>
          {message ? <p className="text-sm text-teal">{message}</p> : null}
        </div>
      </Card>
    </div>
  );
}
