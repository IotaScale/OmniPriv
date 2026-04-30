import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Stat {
  val: string;
  label: string;
}

interface PageHeroProps {
  badge: string;
  title: React.ReactNode;
  subtitle: string;
  /** Unsplash-compatible image URL */
  image: string;
  ctaPrimary?: { href: string; label: string };
  ctaSecondary?: { href: string; label: string };
  stats?: Stat[];
  centered?: boolean;
  children?: React.ReactNode;
}

export default function PageHero({
  badge,
  title,
  subtitle,
  image,
  ctaPrimary,
  ctaSecondary,
  stats,
  centered = false,
  children,
}: PageHeroProps) {
  return (
    <section className="relative pt-32 pb-24 border-b border-white/[0.04] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Progressive darkening overlay */}
        <div className="absolute inset-0 bg-[#07070E]/75" />
        {/* Bottom solid fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-[#07070E]" />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 bg-grid opacity-50" />

      {/* Left accent bar (non-centered only) */}
      {!centered && (
        <div className="absolute left-0 top-[15%] bottom-[15%] w-[3px] bg-[#6366F1]" />
      )}

      {/* Content */}
      <div className={`container-xl relative z-10 ${centered ? "text-center" : ""}`}>
        <div className={centered ? "max-w-3xl mx-auto" : "max-w-3xl"}>
          <div className={`badge-cyan mb-6 ${centered ? "inline-flex" : ""}`}>{badge}</div>

          <h1
            className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {title}
          </h1>

          <p className="text-xl text-slate-400 leading-relaxed mb-8 max-w-2xl">
            {subtitle}
          </p>

          {/* Stat pills */}
          {stats && stats.length > 0 && (
            <div className={`grid grid-cols-${stats.length} gap-4 mb-10 max-w-xl ${centered ? "mx-auto" : ""}`}>
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="p-4 rounded-xl bg-[#0E0E1C]/80 border border-white/[0.07] backdrop-blur-sm text-center"
                >
                  <div
                    className="text-2xl font-extrabold text-white mb-0.5"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {s.val}
                  </div>
                  <div className="text-xs text-slate-500">{s.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* CTAs */}
          {(ctaPrimary || ctaSecondary) && (
            <div className={`flex flex-wrap gap-4 ${centered ? "justify-center" : ""}`}>
              {ctaPrimary && (
                <Link href={ctaPrimary.href} className="btn-primary">
                  {ctaPrimary.label} <ArrowRight className="w-4 h-4" />
                </Link>
              )}
              {ctaSecondary && (
                <Link href={ctaSecondary.href} className="btn-secondary">
                  {ctaSecondary.label}
                </Link>
              )}
            </div>
          )}

          {children}
        </div>
      </div>
    </section>
  );
}
