import type { MetadataRoute } from "next";
import { posts } from "@/lib/blog-data";
import { solutions, solutionHref } from "@/app/platform/data";
import { solutions as solutionRegistry } from "@/app/solutions/data";

const BASE_URL = "https://omnipriv.com";

/*
 * Last real content change for pages that are not dated posts. Bump this when
 * pages are edited; `new Date()` told search engines every page changed on
 * every deploy, which teaches them to ignore the field.
 */
const SITE_UPDATED = new Date("2026-10-13");

export default function sitemap(): MetadataRoute.Sitemap {
  // ── Static pages ──────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`,               lastModified: SITE_UPDATED, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE_URL}/ai-pam`,         lastModified: SITE_UPDATED, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/platform`,       lastModified: SITE_UPDATED, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/platform/identity-security`, lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/platform/consolidation`, lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/features`,       lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/integrations`,   lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/partners`,       lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/partners/apply`, lastModified: SITE_UPDATED, changeFrequency: "yearly",  priority: 0.5 },
    { url: `${BASE_URL}/enterprise`,     lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/about`,          lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/demo`,           lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/blog`,           lastModified: SITE_UPDATED, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/case-studies`,   lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/docs`,           lastModified: SITE_UPDATED, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE_URL}/security`,       lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: SITE_UPDATED, changeFrequency: "yearly",  priority: 0.4 },
    { url: `${BASE_URL}/terms`,          lastModified: SITE_UPDATED, changeFrequency: "yearly",  priority: 0.4 },
  ];

  // ── Platform solution pages (auto-derived from data.ts) ─
  const platformPages: MetadataRoute.Sitemap = solutions.map((s) => ({
    url: `${BASE_URL}${solutionHref(s)}`,
    lastModified: SITE_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // ── Solution pages (auto-derived from app/solutions/data.ts) ─
  // Adding a new solution to the registry adds it here.
  const solutionPages: MetadataRoute.Sitemap = solutionRegistry.map((s) => ({
    url: `${BASE_URL}/solutions/${s.slug}`,
    lastModified: SITE_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // ── Blog posts (auto-derived from lib/blog-data.ts) ────
  // Adding a new post to lib/blog-data.ts automatically adds it here.
  const blogPages: MetadataRoute.Sitemap = Object.entries(posts).map(
    ([slug, post]) => ({
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: Number.isNaN(Date.parse(post.date)) ? SITE_UPDATED : new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  );

  return [...staticPages, ...solutionPages, ...platformPages, ...blogPages];
}
