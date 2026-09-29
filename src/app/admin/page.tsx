"use client";

import { useState } from "react";
import { Button, Card, Field } from "@/components/ui";

export default function AdminLoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function login(form: FormData) {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          password: form.get("password"),
          portal: "admin",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to sign in");
      window.location.href = "/admin/dashboard";
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to sign in");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-md px-4">
        <Card>
          <p className="text-xs font-semibold uppercase tracking-wider text-teal">Agency admin</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-navy">Sign in</h1>
          <p className="mt-2 text-sm text-slate-600">
            Restricted to authorized Gheith Insurance staff. Change the default admin password in environment settings.
          </p>
          <form
            className="mt-6 grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              login(new FormData(e.currentTarget));
            }}
          >
            <Field name="email" label="Email" type="email" required />
            <Field name="password" label="Password" type="password" required />
            {error ? <p className="text-sm text-red-700">{error}</p> : null}
            <Button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}
