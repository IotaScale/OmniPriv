const fs = require("fs");
const f = "C:/Users/bilal.abbasi/Desktop/Webomnipriv/app/platform/page.tsx";
let t = fs.readFileSync(f, "utf8");
// Remove duplicate Image import - handles mixed EOL
const dup1 = 'import Image from "next/image";\r\nimport Image from "next/image";';
const dup2 = 'import Image from "next/image";\nimport Image from "next/image";';
const single = 'import Image from "next/image";';
if (t.includes(dup1)) {
  t = t.replace(dup1, single);
  console.log("Fixed CRLF+CRLF dup");
} else if (t.includes(dup2)) {
  t = t.replace(dup2, single);
  console.log("Fixed LF+LF dup");
} else {
  // Mixed: first one ends with \n, second starts with import
  const mixedDup = 'import Image from "next/image";\nimport Image from "next/image";';
  if (t.includes(mixedDup)) {
    t = t.replace(mixedDup, single);
    console.log("Fixed mixed dup");
  } else {
    console.log("Trying indexOf approach...");
    const first = t.indexOf('import Image from "next/image";');
    const second = t.indexOf('import Image from "next/image";', first + 1);
    if (second !== -1) {
      // Remove from second occurrence to end of its line
      const endOfLine = t.indexOf('\n', second);
      t = t.slice(0, second) + t.slice(endOfLine + 1);
      console.log("Removed second occurrence at", second);
    }
  }
}
fs.writeFileSync(f, t, "utf8");
console.log("Saved.");
