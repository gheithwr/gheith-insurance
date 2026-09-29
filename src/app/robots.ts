import type { MetadataRoute } from "next";
import { DEFAULT_SETTINGS } from "@/lib/settings";

export default function robots(): MetadataRoute.Robots {
  const base = DEFAULT_SETTINGS.siteUrl;
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/portal/dashboard", "/api/"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
