const fs = require("fs");
const f = "C:/Users/bilal.abbasi/Desktop/Webomnipriv/app/platform/[slug]/page.tsx";
let t = fs.readFileSync(f, "utf8");

// Use \r\n since file has Windows line endings
const CRLF = "\r\n";

if (!t.includes("import Image from")) {
  t = t.replace(
    "import Link from \"next/link\";",
    "import Image from \"next/image\";" + CRLF + "import Link from \"next/link\";"
  );
}

t = t.replace("pt-16 pb-20 border-b", "pt-32 pb-24 border-b");

const imgSrc = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=50";

const oldLayers =
  "                <div className=\"absolute inset-0 bg-grid opacity-50\" />" + CRLF +
  "                <div className=\"absolute inset-0 bg-gradient-to-b from-transparent to-[#07070E]\" />";

const newLayers =
  "                <div className=\"absolute inset-0\">" + CRLF +
  "                    <Image src=\"" + imgSrc + "\" alt=\"\" fill className=\"object-cover\" sizes=\"100vw\" />" + CRLF +
  "                    <div className=\"absolute inset-0 bg-[#07070E]/85\" />" + CRLF +
  "                    <div className=\"absolute bottom-0 left-0 right-0 h-40 bg-[#07070E]\" />" + CRLF +
  "                </div>" + CRLF +
  "                <div className=\"absolute inset-0 bg-grid opacity-40\" />";

if (t.includes(oldLayers)) {
  t = t.replace(oldLayers, newLayers);
  console.log("✓ Replaced successfully");
} else {
  console.log("✗ Not found");
  const idx = t.indexOf("bg-grid opacity-50");
  console.log("idx:", idx);
  if (idx > 0) console.log("raw:", JSON.stringify(t.substring(idx - 20, idx + 120)));
}

fs.writeFileSync(f, t, "utf8");
console.log("Saved");
