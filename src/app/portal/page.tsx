"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Card, Field } from "@/components/ui";

export default function PortalLoginPage() {
  const [mode, setMode] = useState<"login" | "forgot">("login");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
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
          portal: "client",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to sign in");
      window.location.href = "/portal/dashboard";
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to sign in");
    } finally {
      setLoading(false);
    }
  }

  async function forgot(form: FormData) {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.get("email") }),
      });
      const data = await res.json();
      setMessage(data.message || "If an account exists, next steps will follow.");
      setMode("login");
    } catch {
      setError("Unable to process that request.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-md px-4">
        <Card>
          <p className="text-xs font-semibold uppercase tracking-wider text-teal">Client Portal</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-navy">Sign in</h1>
          <p className="mt-2 text-sm text-slate-600">
            Policy, document, and claim details remain placeholders until authorized APIs are connected.
            We never fabricate customer data.
          </p>
          {message ? <p className="mt-4 text-sm text-teal">{message}</p> : null}
          {mode === "login" ? (
            <form
              className="mt-6 grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                login(new FormData(e.currentTarget));
              }}
            >
              <Field name="email" label="Email or username" required />
              <Field name="password" label="Password" type="password" required />
              {error ? <p className="text-sm text-red-700">{error}</p> : null}
              <Button type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </Button>
              <button
                type="button"
                className="cursor-pointer text-left text-sm font-semibold text-teal"
                onClick={() => setMode("forgot")}
              >
                Forgot password
              </button>
            </form>
          ) : (
            <form
              className="mt-6 grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                forgot(new FormData(e.currentTarget));
              }}
            >
              <Field name="email" label="Email" type="email" required />
              {error ? <p className="text-sm text-red-700">{error}</p> : null}
              <Button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Request reset"}
              </Button>
              <button
                type="button"
                className="cursor-pointer text-left text-sm font-semibold text-teal"
                onClick={() => setMode("login")}
              >
                Back to sign in
              </button>
            </form>
          )}
          <p className="mt-6 text-xs text-slate-500">
            Need access? <Link href="/contact" className="font-semibold text-navy">Contact the agency</Link>.
          </p>
        </Card>
      </div>
    </section>
  );
}
