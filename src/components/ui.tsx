import Link from "next/link";
import { type ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  type,
  onClick,
  disabled,
  external,
}: {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "gold" | "whatsapp";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  external?: boolean;
}) {
  const styles: Record<string, string> = {
    primary:
      "bg-navy text-white hover:bg-navy-light shadow-card",
    secondary:
      "bg-white text-navy border border-navy/15 hover:border-navy/40 hover:bg-sky-50",
    ghost: "bg-transparent text-navy hover:bg-navy/5",
    gold: "bg-gold text-navy hover:bg-gold-dark shadow-gold font-semibold",
    whatsapp: "bg-whatsapp text-white hover:bg-emerald-600",
  };
  const cls = `inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${styles[variant]} ${className}`;
  if (href) {
    if (external) {
      return (
        <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type || "button"} className={cls} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-teal">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
        {title}
      </h2>
      {subtitle ? <p className="mt-4 text-base leading-relaxed text-slate-600">{subtitle}</p> : null}
    </div>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-navy/8 bg-white p-6 shadow-card ${className}`}>
      {children}
    </div>
  );
}

export function Field({
  label,
  name,
  type = "text",
  required,
  options,
  placeholder,
  hint,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  options?: string[];
  placeholder?: string;
  hint?: string;
  value?: string;
  onChange?: (v: string) => void;
}) {
  const id = name;
  const inputCls =
    "mt-1.5 w-full min-h-11 rounded-xl border border-navy/15 bg-white px-3.5 text-sm text-navy outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/20";
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-navy">
        {label}
        {required ? <span className="text-gold"> *</span> : null}
      </label>
      {type === "select" ? (
        <select
          id={id}
          name={name}
          required={required}
          className={inputCls}
          {...(onChange ? { value: value ?? "", onChange: (e) => onChange(e.target.value) } : { defaultValue: value ?? "" })}
        >
          <option value="">Select</option>
          {options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          required={required}
          placeholder={placeholder}
          rows={4}
          className={`${inputCls} py-3`}
          {...(onChange ? { value: value ?? "", onChange: (e) => onChange(e.target.value) } : {})}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={inputCls}
          autoComplete={name === "email" ? "email" : name === "phone" || name === "cb_phone" ? "tel" : "on"}
          {...(onChange ? { value: value ?? "", onChange: (e) => onChange(e.target.value) } : {})}
        />
      )}
      {hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
    </div>
  );
}
