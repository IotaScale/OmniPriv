const fs = require("fs");

const newContent = `"use client";

/* ── TechMarquee — brand-coloured logos ──────────────────────────────────────
   Each logo uses authentic brand colours so they look like real product icons.
────────────────────────────────────────────────────────────────────────────── */

const logos = [
  {
    name: "AWS",
    svg: (
      <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none">
        <path d="M12 23.5C14.5 25.3 17.6 26.4 21 26.4C24 26.4 26.7 25.5 28.8 24" stroke="#FF9900" strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M27 24.8L30.5 22.8L28.5 27.2" stroke="#FF9900" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 11L20 22.5L27 11" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M15.5 16.5H24.5" stroke="#FF9900" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "Azure",
    svg: (
      <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none">
        <path d="M13 30L22 8H18L8 26L13 30Z" fill="#0078D4"/>
        <path d="M22 8L29 26L21 30H34L22 8Z" fill="#0078D4" opacity="0.7"/>
      </svg>
    ),
  },
  {
    name: "Linux",
    svg: (
      <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none">
        <ellipse cx="20" cy="16" rx="7" ry="8.5" fill="#F5C518"/>
        <ellipse cx="20" cy="16" rx="4.5" ry="5.5" fill="white" opacity="0.9"/>
        <circle cx="17.5" cy="14" r="1.2" fill="#1a1a1a"/>
        <circle cx="22.5" cy="14" r="1.2" fill="#1a1a1a"/>
        <path d="M18 17.5C19 18.5 21 18.5 22 17.5" stroke="#1a1a1a" strokeWidth="1" strokeLinecap="round"/>
        <ellipse cx="20" cy="28.5" rx="8" ry="5.5" fill="#1a1a1a"/>
      </svg>
    ),
  },
  {
    name: "Windows",
    svg: (
      <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none">
        <path d="M6 12.5L17.5 11V20H6V12.5Z" fill="#00ADEF"/>
        <path d="M19 10.5L34 8V20H19V10.5Z" fill="#00ADEF"/>
        <path d="M6 22H17.5V31L6 29.5V22Z" fill="#00ADEF"/>
        <path d="M19 22H34V33.5L19 31.5V22Z" fill="#00ADEF"/>
      </svg>
    ),
  },
  {
    name: "Kubernetes",
    svg: (
      <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none">
        <path d="M20 6L32 13V27L20 34L8 27V13L20 6Z" fill="#326CE5" opacity="0.15" stroke="#326CE5" strokeWidth="1.5"/>
        <circle cx="20" cy="20" r="4.5" fill="none" stroke="#326CE5" strokeWidth="1.8"/>
        <circle cx="20" cy="20" r="1.8" fill="#326CE5"/>
        <path d="M20 15.5V10M20 24.5V30M15.5 18L11 15M24.5 22L29 25M15.5 22L11 25M24.5 18L29 15" stroke="#326CE5" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "GCP",
    svg: (
      <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none">
        <path d="M24.8 15.2L27 12.5C25.2 11 23 10 20.5 10C15.8 10 12 13.8 12 18.5C12.2 18.5 12.5 18.4 12.7 18.4L18.7 17.4C18.7 17.4 19.6 15.2 21.5 15C22.6 14.9 23.8 15 24.8 15.2Z" fill="#EA4335"/>
        <path d="M29 18.5C28.7 16.8 27.7 15.3 26.5 14.2L24.3 16.4C25.2 17.1 25.7 18.2 25.7 19.5V20C27.7 20 29.3 21.5 29.3 23.5C29.3 25.5 27.7 27 25.7 27H20L20 29.2H25.7C28.9 29.2 31.5 26.6 31.5 23.4C31.5 21.2 30.5 19.3 29 18.5Z" fill="#4285F4"/>
        <path d="M14.3 29H20V27H14.3C13.2 27 12.3 26.1 12.3 25C12.3 23.9 13.2 23 14.3 23L14.8 23L14.7 21C14.6 21 14.5 21 14.3 21C12.1 21 10.3 22.8 10.3 25C10.3 27.2 12.1 29 14.3 29Z" fill="#34A853"/>
      </svg>
    ),
  },
  {
    name: "VMware",
    svg: (
      <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none">
        <path d="M7 17C9 15 11 14 13 16L19 26" stroke="#607078" strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M15 17L21 27L27 17" stroke="#607078" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 17L30 27" stroke="#607078" strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M33 17C31 15 29 14 27 16L25 20" stroke="#607078" strokeWidth="2.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "PostgreSQL",
    svg: (
      <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none">
        <ellipse cx="20" cy="12" rx="11" ry="5" fill="#336791" opacity="0.2" stroke="#336791" strokeWidth="1.5"/>
        <path d="M9 12V28C9 30.8 14 33 20 33C26 33 31 30.8 31 28V12" stroke="#336791" strokeWidth="1.5" fill="none"/>
        <path d="M9 19C9 21.8 14 24 20 24C26 24 31 21.8 31 19" stroke="#336791" strokeWidth="1.2" opacity="0.6"/>
        <circle cx="29" cy="13" r="4" fill="#336791" opacity="0.15" stroke="#336791" strokeWidth="1"/>
        <path d="M27 11L31 11M29 9V13" stroke="#336791" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "MongoDB",
    svg: (
      <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none">
        <path d="M20 5C20 5 13 13 13 22C13 28.5 15.5 32.5 20 36C24.5 32.5 27 28.5 27 22C27 13 20 5 20 5Z" fill="#13AA52" opacity="0.2" stroke="#13AA52" strokeWidth="1.5"/>
        <line x1="20" y1="14" x2="20" y2="32" stroke="#13AA52" strokeWidth="2" strokeLinecap="round"/>
        <path d="M20 14C20 14 18 18 18 22" stroke="#5CBA73" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "Redis",
    svg: (
      <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none">
        <path d="M6 16.5L20 22.5L34 16.5L20 10.5L6 16.5Z" fill="#DC382D" opacity="0.2" stroke="#DC382D" strokeWidth="1.5"/>
        <path d="M6 21L20 27L34 21" stroke="#DC382D" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M6 25.5L20 31.5L34 25.5" stroke="#DC382D" strokeWidth="1.5" strokeLinecap="round" opacity="0.55"/>
        <path d="M16 8L20 6L24 8L21.5 11H18.5L16 8Z" fill="#DC382D" opacity="0.6"/>
      </svg>
    ),
  },
  {
    name: "MySQL",
    svg: (
      <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none">
        <path d="M7 10C7 10 10 10 12 12.5C14 15 13 18 11 20C9 22 7 22 7 22" stroke="#00758F" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M17 10L22 22L27 10" stroke="#00758F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M19 15.5H25" stroke="#00758F" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M31 10V22" stroke="#F29111" strokeWidth="2" strokeLinecap="round"/>
        <path d="M28 13L31 10L34 13" stroke="#F29111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: "Oracle",
    svg: (
      <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none">
        <rect x="5" y="13" width="30" height="14" rx="7" fill="#F80000" opacity="0.15" stroke="#F80000" strokeWidth="1.8"/>
        <rect x="11" y="17" width="18" height="6" rx="3" fill="none" stroke="#F80000" strokeWidth="1.4"/>
      </svg>
    ),
  },
];

export default function TechMarquee() {
  return (
    <section className="py-16 border-b border-white/[0.04] overflow-hidden">
      <div className="container-xl mb-8">
        <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-widest">
          Supports Every Protocol &amp; Platform
        </p>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="marquee-wrapper mb-4">
        <div className="marquee-track">
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <div
              key={\`\${logo.name}-\${i}\`}
              className="flex-shrink-0 flex items-center gap-3 px-8 py-3 mx-2 rounded-xl border border-white/[0.06] bg-[#0E0E1C]/40 hover:border-white/[0.14] hover:bg-[#0E0E1C]/80 transition-all duration-300 group cursor-default select-none"
            >
              <div className="transition-transform duration-300 group-hover:scale-110">
                {logo.svg}
              </div>
              <span className="text-slate-400 group-hover:text-white text-sm font-semibold tracking-wide transition-colors whitespace-nowrap">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="marquee-wrapper">
        <div className="marquee-track-reverse">
          {[...logos, ...logos, ...logos].reverse().map((logo, i) => (
            <div
              key={\`rev-\${logo.name}-\${i}\`}
              className="flex-shrink-0 flex items-center gap-3 px-8 py-3 mx-2 rounded-xl border border-white/[0.06] bg-[#0E0E1C]/40 hover:border-white/[0.14] hover:bg-[#0E0E1C]/80 transition-all duration-300 group cursor-default select-none"
            >
              <div className="transition-transform duration-300 group-hover:scale-110">
                {logo.svg}
              </div>
              <span className="text-slate-400 group-hover:text-white text-sm font-semibold tracking-wide transition-colors whitespace-nowrap">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`;

fs.writeFileSync("C:/Users/bilal.abbasi/Desktop/Webomnipriv/components/layout/TechMarquee.tsx", newContent, "utf8");
console.log("Done");
