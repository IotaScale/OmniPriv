"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/*
 * 404 helper: shows the address that was not found and, when it is close to
 * a real page (a typo, an old slug, wrong case), offers that page.
 */

function distance(a: string, b: string) {
    const m = a.length;
    const n = b.length;
    const d = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
    for (let j = 1; j <= n; j++) d[0][j] = j;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        }
    }
    return d[m][n];
}

export default function NotFoundHint({ known }: { known: string[] }) {
    const [path, setPath] = useState("");
    useEffect(() => setPath(window.location.pathname), []);
    if (!path) return null;

    const p = path.toLowerCase().replace(/\/+$/, "") || "/";
    const last = p.split("/").pop() ?? "";
    let best = "";
    let score = Infinity;
    for (const k of known) {
        const kl = k.toLowerCase();
        const kLast = kl.split("/").pop() ?? "";
        const s = Math.min(distance(p, kl), last && kLast ? distance(last, kLast) + 1 : Infinity, kl.includes(last) && last.length > 3 ? 1 : Infinity);
        if (s < score) {
            score = s;
            best = k;
        }
    }
    const suggest = best && best !== p && score <= Math.max(3, Math.floor(p.length / 4));

    return (
        <div className="mt-6 rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.03] px-5 py-4 text-[0.9375rem]">
            <span className="text-slate-500 dark:text-slate-400">Requested: </span>
            <code className="break-all font-mono text-[0.875rem] text-slate-800 dark:text-slate-200">{path}</code>
            {suggest && (
                <p className="mt-2 text-slate-700 dark:text-slate-300">
                    Did you mean{" "}
                    <Link href={best} className="op-link font-semibold underline-offset-2 hover:underline">
                        {best}
                    </Link>
                    ?
                </p>
            )}
        </div>
    );
}
