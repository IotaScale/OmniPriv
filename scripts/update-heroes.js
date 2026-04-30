const fs = require("fs");
const path = require("path");

const root = "C:/Users/bilal.abbasi/Desktop/Webomnipriv";

// ─────────────────────────────────────────────────────────────────────────────
// PLATFORM PAGE
// ─────────────────────────────────────────────────────────────────────────────
{
  const f = path.join(root, "app/platform/page.tsx");
  let t = fs.readFileSync(f, "utf8");

  // Add Image import if missing
  if (!t.includes("import Image")) {
    t = t.replace(
      'import Link from "next/link";',
      'import Image from "next/image";\nimport Link from "next/link";'
    );
  }

  // Replace the hero section
  t = t.replace(
    `      {/* Hero */}
      <section className="relative pt-16 pb-20 border-b border-white/[0.04] overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#07070E]" />
        <div className="container-xl relative z-10 text-center">
          <div className="badge-cyan mb-6 inline-flex mx-auto">PAM Capabilities</div>
          <h1
            className="text-5xl md:text-6xl font-extrabold text-white mb-6 max-w-4xl mx-auto"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Enterprise-Grade <span className="text-accent">PAM Platform</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            From infrastructure deployment to threat detection, OmniPriv covers every dimension of
            privileged access management with purpose-built, enterprise-ready capabilities.
          </p>
          <Link href="/demo" className="btn-primary text-base px-8 py-3.5">
            Request a Demo <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>`,
    `      {/* Hero */}
      <section className="relative pt-32 pb-24 border-b border-white/[0.04] overflow-hidden">
        {/* Background image — cybersecurity */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=1920&q=50"
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#07070E]/80" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-[#07070E]" />
        </div>
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="container-xl relative z-10 text-center">
          <div className="badge-cyan mb-6 inline-flex mx-auto">PAM Capabilities</div>
          <h1
            className="text-5xl md:text-6xl font-extrabold text-white mb-6 max-w-4xl mx-auto"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Enterprise-Grade <span className="text-[#6366F1]">PAM Platform</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            From infrastructure deployment to threat detection, OmniPriv covers every dimension of
            privileged access management with purpose-built, enterprise-ready capabilities.
          </p>
          <Link href="/demo" className="btn-primary text-base px-8 py-3.5">
            Request a Demo <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>`
  );

  fs.writeFileSync(f, t, "utf8");
  console.log("✓ platform/page.tsx updated");
}

// ─────────────────────────────────────────────────────────────────────────────
// DEMO PAGE
// ─────────────────────────────────────────────────────────────────────────────
{
  const f = path.join(root, "app/demo/page.tsx");
  let t = fs.readFileSync(f, "utf8");

  if (!t.includes("import Image")) {
    t = t.replace(
      '"use client";',
      '"use client";\n\nimport Image from "next/image";'
    );
  }

  const oldHero = `      {/* Hero */}
      <section className="relative pt-16 pb-16 border-b border-white/[0.04] overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#07070E]" />
        <div className="container-xl relative z-10 text-center max-w-3xl mx-auto">
          <div className="badge-cyan mb-6">Request a Demo</div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight" style={{ fontFamily: "var(--font-syne)" }}>
            See OmniPriv in Your <span className="text-accent">Environment</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            Get a personalized, no-commitment walkthrough tailored to your infrastructure and compliance requirements. Our PAM specialists will show you exactly how OmniPriv eliminates privilege-based risk at your scale.`;

  const newHero = `      {/* Hero */}
      <section className="relative pt-32 pb-24 border-b border-white/[0.04] overflow-hidden">
        {/* Background image — professional meeting */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1920&q=50"
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#07070E]/85" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-[#07070E]" />
        </div>
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="container-xl relative z-10 text-center max-w-3xl mx-auto">
          <div className="badge-cyan mb-6">Request a Demo</div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight" style={{ fontFamily: "var(--font-syne)" }}>
            See OmniPriv in Your <span className="text-[#6366F1]">Environment</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            Get a personalized, no-commitment walkthrough tailored to your infrastructure and compliance requirements. Our PAM specialists will show you exactly how OmniPriv eliminates privilege-based risk at your scale.`;

  if (t.includes(oldHero)) {
    t = t.replace(oldHero, newHero);
    fs.writeFileSync(f, t, "utf8");
    console.log("✓ demo/page.tsx updated");
  } else {
    console.log("✗ demo hero not found – checking content...");
    const idx = t.indexOf("pt-16 pb-16");
    console.log("pt-16 pb-16 index:", idx);
    // Fallback: just fix the class names we know about
    t = t.replace("pt-16 pb-16 border-b", "pt-32 pb-24 border-b");
    t = t.replace('<div className="absolute inset-0 bg-grid opacity-40" />\n        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#07070E]" />', '<div className="absolute inset-0">\n          <Image src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1920&q=50" alt="" fill className="object-cover" priority sizes="100vw" />\n          <div className="absolute inset-0 bg-[#07070E]/85" />\n          <div className="absolute bottom-0 left-0 right-0 h-40 bg-[#07070E]" />\n        </div>\n        <div className="absolute inset-0 bg-grid opacity-40" />');
    t = t.replace('text-accent">Environment', 'text-[#6366F1]">Environment');
    fs.writeFileSync(f, t, "utf8");
    console.log("✓ demo/page.tsx updated (fallback)");
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PLATFORM [SLUG] PAGE
// ─────────────────────────────────────────────────────────────────────────────
{
  const f = path.join(root, "app/platform/[slug]/page.tsx");
  let t = fs.readFileSync(f, "utf8");

  if (!t.includes("import Image")) {
    t = t.replace(
      'import Link from "next/link";',
      'import Image from "next/image";\nimport Link from "next/link";'
    );
  }

  // Find the hero section and replace the background layers
  const oldBg = `        <div className="absolute inset-0 bg-grid opacity-40" />`;
  const newBg = `        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=50"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#07070E]/85" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-[#07070E]" />
        </div>
        <div className="absolute inset-0 bg-grid opacity-40" />`;

  // Only replace first occurrence (the hero section's bg-grid)
  const firstIdx = t.indexOf(oldBg);
  if (firstIdx !== -1) {
    t = t.slice(0, firstIdx) + newBg + t.slice(firstIdx + oldBg.length);
    fs.writeFileSync(f, t, "utf8");
    console.log("✓ platform/[slug]/page.tsx updated");
  } else {
    console.log("✗ platform slug hero not found");
  }
}

console.log("\nAll done!");
