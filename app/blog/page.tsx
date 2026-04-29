"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import Link from "next/link";
import { ArrowRight, Clock, Calendar, ChevronRight } from "lucide-react";
import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_NEWSLETTER_TEMPLATE_ID,
} from "@/lib/emailjs";
import { posts as blogData } from "@/lib/blog-data";

const categories = ["All", "Best Practices", "Security Research", "Case Studies", "Product Updates", "Compliance", "DevSecOps"];

// ── Auto-derived from lib/blog-data.ts ──────────────────────────────────────
// The featured post is pinned by slug. Change FEATURED_SLUG to pin a different post.
const FEATURED_SLUG = "privileged-access-management-solutions-guide-2026";

const _fp = blogData[FEATURED_SLUG];
const featuredPost = {
  category: _fp.category,
  title: _fp.title,
  excerpt: _fp.excerpt,
  date: _fp.date,
  readTime: _fp.readTime,
  author: _fp.author,
  authorTitle: _fp.authorTitle,
  href: `/blog/${FEATURED_SLUG}`,
  tags: _fp.tags,
};

// All posts except the featured one, newest first.
// Adding a new post to lib/blog-data.ts automatically appears here.
const posts = Object.entries(blogData)
  .filter(([slug]) => slug !== FEATURED_SLUG)
  .map(([slug, post]) => ({
    category: post.category,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    readTime: post.readTime,
    author: post.author,
    authorTitle: post.authorTitle,
    href: `/blog/${slug}`,
    tags: post.tags,
  }))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
// ─────────────────────────────────────────────────────────────────────────────

function getTagColor(tag: string) {
  const colors: Record<string, string> = {
    "Best Practices": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "Security Research": "bg-red-500/10 text-red-400 border-red-500/20",
    "Case Study": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    "Product Updates": "bg-purple-500/10 text-purple-400 border-purple-500/20",
    "Compliance": "bg-orange-500/10 text-orange-400 border-orange-500/20",
    "DevSecOps": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  };
  return colors[tag] ?? "bg-slate-500/10 text-slate-400 border-slate-500/20";
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const filteredPosts = activeCategory === "All"
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  async function handleNewsletter(e: React.FormEvent) {
    e.preventDefault();
    setNewsletterStatus("loading");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_NEWSLETTER_TEMPLATE_ID,
        { subscriber_email: newsletterEmail },
        EMAILJS_PUBLIC_KEY,
      );
      setNewsletterStatus("success");
      setNewsletterEmail("");
    } catch {
      setNewsletterStatus("error");
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-16 pb-16 border-b border-white/[0.04] overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#030711]" />
        <div className="container-xl relative z-10 text-center">
          <div className="badge-cyan mb-6 inline-flex mx-auto">Blog & Insights</div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6" style={{ fontFamily: "var(--font-syne)" }}>
            PAM Security <span className="text-gradient">Insights</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-xl mx-auto">
            Best practices, security research, compliance guidance, and product updates from the OmniPriv team. Discover how to leverage our Privileged Access Management Solution to secure your enterprise.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-5 border-b border-white/[0.04] bg-[#0A1628]/30 sticky top-[72px] z-30 backdrop-blur-xl">
        <div className="container-xl">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                  cat === activeCategory
                    ? "bg-[#00B8FF]/15 border-[#00B8FF]/30 text-[#00B8FF]"
                    : "bg-transparent border-white/[0.06] text-slate-400 hover:border-[#00B8FF]/20 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="section-padding">
        <div className="container-xl">
          <Link
            href={featuredPost.href}
            className="group block relative rounded-2xl border border-white/[0.07] bg-gradient-to-br from-[#0A1628]/80 to-[#0F1E35]/60 overflow-hidden hover:border-[#00B8FF]/20 transition-all duration-300 card-shine"
          >
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] opacity-10" style={{ background: "radial-gradient(circle, #00B8FF 0%, transparent 60%)" }} />
            <div className="relative z-10 p-8 md:p-12">
              <div className="flex items-center gap-3 mb-5">
                <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${getTagColor(featuredPost.category)}`}>
                  {featuredPost.category}
                </span>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Featured</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4 leading-tight group-hover:text-[#00B8FF] transition-colors max-w-3xl" style={{ fontFamily: "var(--font-syne)" }}>
                {featuredPost.title}
              </h2>
              <p className="text-slate-400 text-base leading-relaxed mb-6 max-w-2xl">
                {featuredPost.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                {featuredPost.tags.map((tag) => (
                  <span key={tag} className="tag text-xs">{tag}</span>
                ))}
              </div>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00B8FF]/40 to-[#0060FF]/40 flex items-center justify-center text-white text-sm font-bold" style={{ fontFamily: "var(--font-syne)" }}>
                    {featuredPost.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">{featuredPost.author}</div>
                    <div className="text-slate-500 text-xs">{featuredPost.authorTitle}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{featuredPost.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{featuredPost.readTime}</span>
                  <span className="text-[#00B8FF] font-semibold flex items-center gap-1">
                    Read Article <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="pb-20">
        <div className="container-xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Link
                key={post.title}
                href={post.href}
                className="group flex flex-col p-6 rounded-2xl border border-white/[0.06] bg-[#0A1628]/60 hover:border-[#00B8FF]/20 hover:bg-[#0A1628]/90 transition-all duration-300 card-shine"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-2.5 py-1 rounded-full border text-xs font-semibold ${getTagColor(post.category)}`}>
                    {post.category}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-3 group-hover:text-[#00B8FF] transition-colors line-clamp-2 flex-1" style={{ fontFamily: "var(--font-syne)" }}>
                  {post.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="tag text-[11px]">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-white/[0.05] pt-4 mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00B8FF]/30 to-[#0060FF]/30 flex items-center justify-center text-white text-xs font-bold" style={{ fontFamily: "var(--font-syne)" }}>
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs text-white font-medium leading-tight">{post.author}</div>
                      <div className="text-[10px] text-slate-600">{post.readTime}</div>
                    </div>
                  </div>
                  <span className="text-xs text-slate-600 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date.split(",")[0].split(" ").slice(0, 2).join(" ")}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding border-t border-white/[0.04] bg-[#0A1628]/30">
        <div className="container-xl">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-extrabold text-white mb-3" style={{ fontFamily: "var(--font-syne)" }}>
              Get PAM Insights in Your Inbox
            </h2>
            <p className="text-slate-400 mb-7">
              Weekly security insights, PAM best practices, and OmniPriv product updates. No spam, unsubscribe anytime.
            </p>
            {newsletterStatus === "success" ? (
              <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[#00B8FF]/25 bg-[#00B8FF]/[0.08] text-[#00B8FF] text-sm font-medium">
                ✓ You&apos;re subscribed! Welcome aboard.
              </div>
            ) : (
              <>
                <form className="flex gap-3 max-w-md mx-auto" onSubmit={handleNewsletter}>
                  <input
                    type="email"
                    required
                    placeholder="Work email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="input-dark flex-1"
                  />
                  <button
                    type="submit"
                    disabled={newsletterStatus === "loading"}
                    className="btn-primary whitespace-nowrap disabled:opacity-60"
                  >
                    {newsletterStatus === "loading" ? "Subscribing..." : "Subscribe"}
                  </button>
                </form>
                {newsletterStatus === "error" && (
                  <p className="text-xs text-red-400 mt-2">Something went wrong. Please try again.</p>
                )}
                <p className="text-xs text-slate-600 mt-3">~4,200 security professionals subscribed</p>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
