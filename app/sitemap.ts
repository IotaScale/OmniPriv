import type { MetadataRoute } from "next";
import { posts } from "@/lib/blog-data";
import { solutions } from "@/app/platform/data";

const BASE_URL = "https://omnipriv.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // ── Static pages ──────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`,               lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE_URL}/platform`,       lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/features`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/integrations`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/enterprise`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/about`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/demo`,           lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/blog`,           lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/case-studies`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/docs`,           lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE_URL}/security`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly",  priority: 0.4 },
    { url: `${BASE_URL}/terms`,          lastModified: new Date(), changeFrequency: "yearly",  priority: 0.4 },
  ];

  // ── Platform solution pages (auto-derived from data.ts) ─
  const platformPages: MetadataRoute.Sitemap = solutions.map((s) => ({
    url: `${BASE_URL}/platform/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // ── Blog posts (auto-derived from lib/blog-data.ts) ────
  // Adding a new post to lib/blog-data.ts automatically adds it here.
  const blogPages: MetadataRoute.Sitemap = Object.entries(posts).map(
    ([slug, post]) => ({
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  );

  return [...staticPages, ...platformPages, ...blogPages];
}
