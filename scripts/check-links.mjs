#!/usr/bin/env node
/*
 * Link checker for the public site.
 *
 *   npm run build && npm run start      (in one terminal)
 *   npm run check:links                 (in another)
 *
 *   BASE=https://staging.example.com npm run check:links   to check a deployment
 *
 * Starts from /sitemap.xml, fetches every page and checks every <a href>:
 *   ERROR  internal link to a page that returns 404 / 5xx
 *   ERROR  #anchor that does not exist on the target page
 *   ERROR  link to https://omnipriv.com/... (use a site path such as /platform)
 *   ERROR  utm_ tracking parameters on an internal link
 *   WARN   internal link that goes through a redirect (point it at the final URL)
 *   WARN   page in the sitemap that no other page links to
 *
 * Exits with code 1 when there is any ERROR, so it can gate CI.
 * No dependencies: Node 18+ only.
 */

const BASE = (process.env.BASE || "http://localhost:3000").replace(/\/$/, "");
const OWN = /^https?:\/\/(www\.)?omnipriv\.com/i;
const CONCURRENCY = 6;

const errors = [];
const warns = [];
const pageCache = new Map(); // path -> { status, location, ids:Set, links:[] }

const decode = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');

async function load(path) {
    if (pageCache.has(path)) return pageCache.get(path);
    const p = (async () => {
        let res;
        try {
            res = await fetch(BASE + path, { redirect: "manual", headers: { "user-agent": "omnipriv-link-check" } });
        } catch (e) {
            return { status: 0, ids: new Set(), links: [] };
        }
        const out = { status: res.status, location: res.headers.get("location"), ids: new Set(), links: [] };
        const type = res.headers.get("content-type") || "";
        if (res.status === 200 && type.includes("text/html")) {
            const html = await res.text();
            for (const m of html.matchAll(/\sid="([^"]+)"/g)) out.ids.add(decode(m[1]));
            for (const m of html.matchAll(/<a\b[^>]*?\shref="([^"]*)"/g)) out.links.push(decode(m[1]));
        }
        return out;
    })();
    pageCache.set(path, p);
    return p;
}

async function pool(items, fn) {
    const queue = [...items];
    await Promise.all(
        Array.from({ length: CONCURRENCY }, async () => {
            while (queue.length) await fn(queue.shift());
        }),
    );
}

async function main() {
    const sm = await fetch(BASE + "/sitemap.xml").then((r) => (r.ok ? r.text() : ""));
    if (!sm) {
        console.error(`Could not read ${BASE}/sitemap.xml. Is the site running?`);
        process.exit(2);
    }
    const pages = [...new Set([...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(decode(m[1])).pathname))];
    if (!pages.includes("/")) pages.unshift("/");
    console.log(`Checking ${pages.length} pages from the sitemap on ${BASE} ...`);

    const inbound = new Map(pages.map((p) => [p, new Set()]));

    await pool(pages, async (page) => {
        const info = await load(page);
        if (info.status !== 200) {
            errors.push(`${page} itself returns ${info.status}${info.location ? ` -> ${info.location}` : ""} (listed in the sitemap)`);
            return;
        }
        for (const raw of info.links) {
            const href = raw.trim();
            if (!href || /^(mailto:|tel:|javascript:)/i.test(href)) continue;
            if (OWN.test(href)) {
                errors.push(`${page}: full-domain link ${href} (use a site path)`);
                continue;
            }
            if (/^https?:\/\//i.test(href) || href.startsWith("//")) continue; // external
            const url = new URL(href, BASE + page);
            if (/[?&]utm_/i.test(url.search)) errors.push(`${page}: tracking parameters on internal link ${href}`);
            const path = url.pathname.replace(/(.)\/$/, "$1");
            if (path !== page && inbound.has(path)) inbound.get(path).add(page);
            const target = await load(path);
            if (target.status >= 300 && target.status < 400) {
                warns.push(`${page}: ${href} redirects to ${target.location} (link to the final URL)`);
            } else if (target.status !== 200) {
                errors.push(`${page}: broken link ${href} (${target.status || "no response"})`);
                continue;
            }
            const hash = decodeURIComponent(url.hash.slice(1));
            if (hash && target.status === 200 && !target.ids.has(hash)) errors.push(`${page}: anchor ${href} not found on ${path}`);
        }
    });

    for (const [p, from] of inbound) if (p !== "/" && from.size === 0) warns.push(`${p}: no other page links here (orphan)`);

    const uniq = (a) => [...new Set(a)].sort();
    for (const w of uniq(warns)) console.log(`WARN   ${w}`);
    for (const e of uniq(errors)) console.log(`ERROR  ${e}`);
    console.log(`\n${pages.length} pages, ${uniq(errors).length} errors, ${uniq(warns).length} warnings`);
    process.exit(errors.length ? 1 : 0);
}

main();
