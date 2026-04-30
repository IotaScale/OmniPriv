const fs = require("fs");

// Platform slug page
{
  const f = "C:/Users/bilal.abbasi/Desktop/Webomnipriv/app/platform/[slug]/page.tsx";
  let t = fs.readFileSync(f, "utf8");

  if (!t.includes("import Image")) {
    t = t.replace(
      'import Link from "next/link";',
      'import Image from "next/image";\nimport Link from "next/link";'
    );
  }

  t = t.replace("pt-16 pb-20 border-b", "pt-32 pb-24 border-b");

  const oldLayers =
    '                <div className="absolute inset-0 bg-grid opacity-50" />\n' +
    '                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#07070E]" />';

  const imgSrc = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=50";
  const newLayers =
    '                <div className="absolute inset-0">\n' +
    '                  <Image\n' +
    '                    src="' + imgSrc + '"\n' +
    '                    alt=""\n' +
    '                    fill\n' +
    '                    className="object-cover"\n' +
    '                    sizes="100vw"\n' +
    '                  />\n' +
    '                  <div className="absolute inset-0 bg-[#07070E]/85" />\n' +
    '                  <div className="absolute bottom-0 left-0 right-0 h-40 bg-[#07070E]" />\n' +
    '                </div>\n' +
    '                <div className="absolute inset-0 bg-grid opacity-40" />';

  if (t.includes(oldLayers)) {
    t = t.replace(oldLayers, newLayers);
    console.log("found and replaced");
  } else {
    console.log("NOT found, checking index:", t.indexOf("bg-grid opacity-50"));
  }

  fs.writeFileSync(f, t, "utf8");
  console.log("✓ platform/[slug]/page.tsx done");
}
