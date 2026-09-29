import Link from "next/link";
import { ProductIcon } from "./Icon";
import type { ProductCard as Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-navy/8 bg-white p-6 shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-lift">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-teal text-white">
        <ProductIcon name={product.icon} />
      </div>
      <h3 className="font-display text-lg font-semibold text-navy">{product.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{product.shortDesc}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        <Link
          href={`/insurance/${product.slug}`}
          className="inline-flex min-h-10 items-center rounded-lg border border-navy/15 px-3 text-sm font-semibold text-navy hover:bg-sky-50"
        >
          Learn More
        </Link>
        <Link
          href={`/quote?type=${product.slug === "homeowners" ? "home" : product.slug}`}
          className="inline-flex min-h-10 items-center rounded-lg bg-gold px-3 text-sm font-bold tracking-wide text-navy hover:bg-gold-dark"
        >
          GET A QUOTE
        </Link>
      </div>
    </article>
  );
}
