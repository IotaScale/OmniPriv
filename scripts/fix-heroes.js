const fs = require("fs");
const root = "C:/Users/bilal.abbasi/Desktop/Webomnipriv";
const CRLF = "\r\n";
const LF = "\n";

function processFile(relPath, updates) {
  const f = root + "/" + relPath;
  let t = fs.readFileSync(f, "utf8");
  const eol = t.includes(CRLF) ? CRLF : LF;
  
  let changed = 0;
  for (const [from, to] of updates) {
    const fromNorm = from.replace(/\n/g, eol);
    const toNorm = to.replace(/\n/g, eol);
    if (t.includes(fromNorm)) {
      t = t.replace(fromNorm, toNorm);
      changed++;
    } else {
      console.log("  NOT FOUND: " + JSON.stringify(from.substring(0, 60)));
    }
  }
  
  fs.writeFileSync(f, t, "utf8");
  console.log(relPath + ": " + changed + "/" + updates.length + " replacements made");
}

// ─── PLATFORM PAGE ─────────────────────────────────────────────────────────
const imgPlatform = "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=1920&q=50";

processFile("app/platform/page.tsx", [
  // Add Image import
  [
    'import Link from "next/link";\nimport { ArrowRight } from "lucide-react";',
    'import Image from "next/image";\nimport Link from "next/link";\nimport { ArrowRight } from "lucide-react";',
  ],
  // Fix hero padding
  [
    'relative pt-16 pb-20 border-b',
    'relative pt-32 pb-24 border-b',
  ],
  // Replace background layers
  [
    '        <div className="absolute inset-0 bg-grid opacity-50" />\n        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#07070E]" />',
    '        <div className="absolute inset-0">\n          <Image src="' + imgPlatform + '" alt="" fill className="object-cover" priority sizes="100vw" />\n          <div className="absolute inset-0 bg-[#07070E]/80" />\n          <div className="absolute bottom-0 left-0 right-0 h-40 bg-[#07070E]" />\n        </div>\n        <div className="absolute inset-0 bg-grid opacity-40" />',
  ],
  // Fix accent color
  [
    '<span className="text-accent">PAM Platform</span>',
    '<span className="text-[#6366F1]">PAM Platform</span>',
  ],
]);

// ─── DEMO PAGE ─────────────────────────────────────────────────────────────
const imgDemo = "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1920&q=50";

processFile("app/demo/page.tsx", [
  // Add Image import after "use client"
  [
    '"use client";\n\nimport { useState }',
    '"use client";\n\nimport Image from "next/image";\nimport { useState }',
  ],
  // Fix hero padding
  [
    'relative pt-16 pb-16 border-b',
    'relative pt-32 pb-24 border-b',
  ],
  // Replace background layers
  [
    '        <div className="absolute inset-0 bg-grid opacity-40" />\n        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#07070E]" />',
    '        <div className="absolute inset-0">\n          <Image src="' + imgDemo + '" alt="" fill className="object-cover" priority sizes="100vw" />\n          <div className="absolute inset-0 bg-[#07070E]/85" />\n          <div className="absolute bottom-0 left-0 right-0 h-40 bg-[#07070E]" />\n        </div>\n        <div className="absolute inset-0 bg-grid opacity-40" />',
  ],
  // Fix accent color
  [
    '<span className="text-accent">Environment</span>',
    '<span className="text-[#6366F1]">Environment</span>',
  ],
]);

console.log("\nDone!");
