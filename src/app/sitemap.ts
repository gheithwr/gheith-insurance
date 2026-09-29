import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";
import { DEFAULT_SETTINGS } from "@/lib/settings";
import { prisma } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = DEFAULT_SETTINGS.siteUrl;
  const staticPaths = [
    "",
    "/insurance",
    "/business-insurance",
    "/claims",
    "/resources",
    "/about",
    "/team",
    "/contact",
    "/faq",
    "/quote",
    "/why-choose-us",
    "/locations/new-york",
    "/locations/new-jersey",
    "/portal",
    "/legal/privacy",
    "/legal/terms",
    "/legal/accessibility",
    "/legal/communications",
  ];
  const productPaths = PRODUCTS.map((p) => `/insurance/${p.slug}`);
  let articles: { slug: string; updatedAt: Date }[] = [];
  try {
    articles = await prisma.article.findMany({
      where: { status: "published" },
      select: { slug: true, updatedAt: true },
    });
  } catch {
    articles = [];
  }
  return [
    ...staticPaths.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
    })),
    ...productPaths.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
    })),
    ...articles.map((a) => ({
      url: `${base}/resources/${a.slug}`,
      lastModified: a.updatedAt,
    })),
  ];
}
