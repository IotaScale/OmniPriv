import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";

import { EdgeMotif } from "./BgMotif";

export interface InsightPost {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  href: string;
  image: string;
  imageAlt?: string;
}

/* "October 2, 2026" -> "Oct 2, 2026"; leaves anything unparseable as is. */
function shortDate(date: string) {
  const t = Date.parse(date);
  if (Number.isNaN(t)) return date;
  return new Date(t).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

/*
 * PAM research and best practice: three pinned articles (chosen in
 * app/page.tsx), one row of three compact cards that fits on one screen.
 *
 * Each card is a single link, so the whole card is the target, with a
 * visible focus ring. Hover is quiet: the border warms to cyan, the image
 * eases in slightly, the title takes the accent and the arrow nudges.
 */
export default function InsightsSection({ posts }: { posts: InsightPost[] }) {
  if (!posts.length) return null;

  return (
    <section className="relative overflow-x-clip">
      {/* Session recording in the right gutter */}
      <EdgeMotif kind="guide" side="right" size={300} aspect={300 / 360} top="34%" />
      <div className="container-xl op-sec">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6" data-aos="fade-up">
          <div className="max-w-2xl">
            <h2 className="op-h2">
              PAM research and best practice
            </h2>
            <p className="op-lede">
              Practical guides from the OmniPriv team on securing human, machine and AI access.
            </p>
          </div>
          <Link href="/blog" className="op-btn-ghost group shrink-0 self-start sm:self-auto">
            All articles
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>

        {/*
          Three cards in one row on desktop so the whole section fits a single
          screen. Below lg the cards stack, image beside text on tablets.
        */}
        <div className="op-body grid lg:grid-cols-3 gap-5" data-aos="fade-up" data-aos-delay="100">
          {posts.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="ins-card group grid sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:flex lg:flex-col"
            >
              <div className="ins-media relative aspect-[2/1] sm:aspect-auto sm:min-h-[11.25rem] lg:aspect-[2/1] lg:min-h-0">
                <Image
                  src={p.image}
                  alt={p.imageAlt ?? ""}
                  fill
                  priority={false}
                  sizes="(min-width: 1024px) 31vw, (min-width: 640px) 40vw, 100vw"
                  className="ins-img object-cover"
                />
              </div>
              <div className="flex flex-col flex-1 p-5 lg:p-6">
                <span className="ins-cat">{p.category}</span>
                <h3
                  className="ins-title mt-2 text-[1.0625rem] lg:text-lg font-bold tracking-[-0.015em] leading-snug line-clamp-3"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">{p.excerpt}</p>
                <Meta post={p} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Meta({ post, cta }: { post: InsightPost; cta?: string }) {
  return (
    <span className="mt-auto pt-4 flex items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
      <span className="inline-flex items-center gap-3">
        <time dateTime={new Date(Date.parse(post.date) || 0).toISOString().slice(0, 10)}>{shortDate(post.date)}</time>
        <span className="inline-flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" aria-hidden="true" />
          {post.readTime}
        </span>
      </span>
      {cta ? (
        <span className="ins-cta inline-flex items-center gap-1.5 text-sm font-semibold">
          {cta}
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      ) : (
        <ArrowUpRight
          className="ins-arrow w-[1.125rem] h-[1.125rem] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      )}
    </span>
  );
}
