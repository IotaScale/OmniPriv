const fs = require("fs");
const f = "C:/Users/bilal.abbasi/Desktop/Webomnipriv/app/platform/page.tsx";
let t = fs.readFileSync(f, "utf8");
// Remove duplicate Image import
const dup = 'import Image from "next/image";\r\nimport Image from "next/image";';
const single = 'import Image from "next/image";';
if (t.includes(dup)) {
  t = t.replace(dup, single);
  console.log("Fixed duplicate Image import");
} else {
  // Show first few lines
  console.log("No dup found. First 300:", JSON.stringify(t.substring(0, 300)));
}
fs.writeFileSync(f, t, "utf8");
