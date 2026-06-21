import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/i18n";
import { SITE_URL } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/privatnost", "/uslovi"];
  const entries: MetadataRoute.Sitemap = [];
  for (const loc of LOCALES) {
    for (const p of paths) {
      entries.push({
        url: `${SITE_URL}/${loc}${p}`,
        changeFrequency: "weekly",
        priority: p === "" ? 1 : 0.5,
      });
    }
  }
  return entries;
}
