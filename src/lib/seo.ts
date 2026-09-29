import type { Metadata } from "next";
import { DEFAULT_SETTINGS } from "./settings";

export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${DEFAULT_SETTINGS.siteUrl}${opts.path}`;
  const title = opts.title.includes("Gheith")
    ? opts.title
    : `${opts.title} | Gheith Insurance`;
  return {
    title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: opts.description,
      url,
      siteName: "Gheith Insurance",
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: opts.description,
    },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    name: DEFAULT_SETTINGS.companyName,
    description: DEFAULT_SETTINGS.seoDescription,
    url: DEFAULT_SETTINGS.siteUrl,
    areaServed: [
      { "@type": "State", name: "New York" },
      { "@type": "State", name: "New Jersey" },
    ],
    serviceType: [
      "Auto Insurance",
      "Homeowners Insurance",
      "Renters Insurance",
      "Business Insurance",
      "Life Insurance",
    ],
  };
}
