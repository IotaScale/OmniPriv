"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Award, Building2, ExternalLink, Globe, Mail, MapPin, Search, ShieldCheck, X } from "lucide-react";

import { DOTS_D, LAND_D, MAP_H, MAP_W, project } from "./worldMap";

/*
 * Public partner locator for /partners: an interactive world map.
 *
 * Data still comes from /api/public/locator with the same `region` and
 * `query` parameters as before. Partners are pinned by their headquarters
 * city (see CITY below; unknown cities fall back to the centre of their
 * first coverage region). Picking a region zooms the map; picking a pin or
 * a list row opens that partner's card. The current pins stay on screen
 * while a filter change loads, so nothing flashes.
 */

const REGIONS = [
    { v: "all", t: "All Regions" },
    { v: "United Kingdom", t: "United Kingdom" },
    { v: "North America", t: "North America" },
    { v: "Western Europe", t: "Western Europe" },
    { v: "Nordics", t: "Nordics" },
];

/* Map framing per region, as [x, y, width, height] on the 1000 x 394 canvas. */
const VIEW: Record<string, [number, number, number, number]> = {
    all: [0, 0, MAP_W, MAP_H],
    "United Kingdom": [418, 50, 140, 55],
    "North America": [70, 60, 330, 130],
    "Western Europe": [425, 52, 175, 69],
    Nordics: [468, 18, 165, 65],
};

interface Listing {
    id: string | number;
    display_name: string;
    headquarters: string;
    service_regions: string[];
    specializations: string[];
    public_description: string;
    public_contact_email: string;
    public_website: string;
}

/* Headquarters city to [lat, lng]. Extend as partners are approved. */
const CITY: Record<string, [number, number]> = {
    london: [51.51, -0.13], manchester: [53.48, -2.24], birmingham: [52.49, -1.89], leeds: [53.8, -1.55], edinburgh: [55.95, -3.19], glasgow: [55.86, -4.25], bristol: [51.45, -2.59], belfast: [54.6, -5.93], dublin: [53.35, -6.26],
    "new york": [40.71, -74.0], boston: [42.36, -71.06], washington: [38.9, -77.04], rockville: [39.08, -77.15], chicago: [41.88, -87.63], atlanta: [33.75, -84.39], dallas: [32.78, -96.8], austin: [30.27, -97.74], denver: [39.74, -104.99], seattle: [47.61, -122.33], "san francisco": [37.77, -122.42], "los angeles": [34.05, -118.24], miami: [25.76, -80.19], toronto: [43.65, -79.38], montreal: [45.5, -73.57], vancouver: [49.28, -123.12], ottawa: [45.42, -75.7],
    amsterdam: [52.37, 4.9], rotterdam: [51.92, 4.48], brussels: [50.85, 4.35], paris: [48.86, 2.35], lyon: [45.76, 4.84], berlin: [52.52, 13.4], frankfurt: [50.11, 8.68], munich: [48.14, 11.58], hamburg: [53.55, 9.99], zurich: [47.38, 8.54], geneva: [46.2, 6.14], vienna: [48.21, 16.37], madrid: [40.42, -3.7], barcelona: [41.39, 2.17], lisbon: [38.72, -9.14], milan: [45.46, 9.19], rome: [41.9, 12.5], luxembourg: [49.61, 6.13],
    oslo: [59.91, 10.75], bergen: [60.39, 5.32], stockholm: [59.33, 18.07], gothenburg: [57.71, 11.97], copenhagen: [55.68, 12.57], aarhus: [56.16, 10.2], helsinki: [60.17, 24.94], reykjavik: [64.15, -21.94],
    dubai: [25.2, 55.27], "abu dhabi": [24.45, 54.38], riyadh: [24.71, 46.68], doha: [25.29, 51.53], karachi: [24.86, 67.0], lahore: [31.55, 74.34], islamabad: [33.68, 73.05], mumbai: [19.08, 72.88], bangalore: [12.97, 77.59], singapore: [1.35, 103.82], tokyo: [35.68, 139.69], sydney: [-33.87, 151.21], johannesburg: [-26.2, 28.05],
};
const REGION_CENTRE: Record<string, [number, number]> = {
    "united kingdom": [53.5, -2], "north america": [42, -95], "western europe": [49, 6], nordics: [61, 15],
};

function locate(l: Listing): [number, number] | null {
    const city = (l.headquarters ?? "").split(",")[0].trim().toLowerCase();
    const ll = CITY[city] ?? REGION_CENTRE[(l.service_regions?.[0] ?? "").toLowerCase()];
    return ll ? project(ll[0], ll[1]) : null;
}

/* Rockville, Maryland: the OmniPriv office in the site footer. Arcs start here. */
const HQ = project(39.08, -77.15);

const isStarter = (l: Listing) => String(l.id).startsWith("demo-");

function initials(name: string) {
    return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

/* Starter listings, shown as authorized partners alongside approved
 * portal listings until the real directory is populated. They have no
 * contact details of their own, so enquiries go to the OmniPriv channel team. */
const DEMO: Listing[] = [
    {
        id: "demo-1",
        display_name: "Harbourline Cyber",
        headquarters: "Manchester, United Kingdom",
        service_regions: ["United Kingdom", "Western Europe"],
        specializations: ["PAM deployment", "Session monitoring", "ISO 27001 readiness"],
        public_description: "A UK security integrator that designs and deploys OmniPriv for regulated financial services and public sector estates.",
        public_contact_email: "partners@example.com",
        public_website: "https://example.com",
    },
    {
        id: "demo-2",
        display_name: "Kestrel Point MSSP",
        headquarters: "Toronto, Canada",
        service_regions: ["North America"],
        specializations: ["Managed PAM", "24/7 SOC", "Credential rotation"],
        public_description: "A managed security provider running OmniPriv as a service for mid-market companies across the US and Canada.",
        public_contact_email: "partners@example.com",
        public_website: "https://example.com",
    },
    {
        id: "demo-3",
        display_name: "Lumen Fjord Security",
        headquarters: "Oslo, Norway",
        service_regions: ["Nordics", "Western Europe"],
        specializations: ["AI agent governance", "Cloud PAM", "Zero standing privilege"],
        public_description: "A Nordic consultancy focused on governing AI agents and cloud workloads with just-in-time privileged access.",
        public_contact_email: "partners@example.com",
        public_website: "https://example.com",
    },
    {
        id: "demo-4",
        display_name: "Ridgeway Secure Systems",
        headquarters: "Austin, United States",
        service_regions: ["North America"],
        specializations: ["Authorized reseller", "Licensing", "Proof of concept"],
        public_description: "An authorized reseller that scopes, licenses and pilots OmniPriv for enterprise IT and OT teams.",
        public_contact_email: "partners@example.com",
        public_website: "https://example.com",
    },
    {
        id: "demo-5",
        display_name: "Atlas Meridian IT",
        headquarters: "Amsterdam, Netherlands",
        service_regions: ["Western Europe", "United Kingdom"],
        specializations: ["SIEM integration", "Audit & compliance", "Vendor access"],
        public_description: "An integration partner connecting OmniPriv to SIEM, ITSM and directory services for multinational estates.",
        public_contact_email: "partners@example.com",
        public_website: "https://example.com",
    },
    {
        id: "demo-6",
        display_name: "Brightwater Identity",
        headquarters: "Stockholm, Sweden",
        service_regions: ["Nordics"],
        specializations: ["Identity security", "Directory sync", "Managed PAM"],
        public_description: "An identity specialist that brings human, machine and vendor identities under one OmniPriv policy model.",
        public_contact_email: "partners@example.com",
        public_website: "https://example.com",
    },
];

function matches(l: Listing, region: string, query: string) {
    const inRegion = region === "all" || (l.service_regions ?? []).some((r) => r.toLowerCase().includes(region.toLowerCase()));
    const q = query.toLowerCase();
    const inQuery = !q || [l.display_name, l.headquarters, ...(l.specializations ?? [])].some((v) => v.toLowerCase().includes(q));
    return inRegion && inQuery;
}

const ease = [0.23, 1, 0.32, 1] as const;

export function PartnerDirectory() {
    const reduce = useReducedMotion();
    const [loaded, setLoaded] = useState(false);
    const [listings, setListings] = useState<Listing[]>([]);
    const [regionFilter, setRegionFilter] = useState("all");
    const [input, setInput] = useState("");
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<string | number | null>(null);
    const [hover, setHover] = useState<string | number | null>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);
    const [box, setBox] = useState({ w: 0, h: 0 });
    useEffect(() => {
        const el = boxRef.current;
        if (!el) return;
        const ro = new ResizeObserver(([e]) => setBox({ w: e.contentRect.width, h: e.contentRect.height }));
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    useEffect(() => {
        const t = window.setTimeout(() => setSearch(input.trim()), 250);
        return () => window.clearTimeout(t);
    }, [input]);

    /* One load of every approved listing; search and region filter run in the browser. */
    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                const res = await fetch(`/api/public/locator`);
                const data = res.ok ? await res.json() : null;
                if (alive) setListings(data?.listings ?? []);
            } catch (err) {
                console.error("Failed to load partner locator listings", err);
            } finally {
                if (alive) setLoaded(true);
            }
        })();
        return () => {
            alive = false;
        };
    }, []);

    const all = useMemo(() => {
        const names = new Set(listings.map((l) => l.display_name.toLowerCase()));
        return [...listings, ...DEMO.filter((l) => !names.has(l.display_name.toLowerCase()))];
    }, [listings]);
    const shown = useMemo(() => all.filter((l) => matches(l, regionFilter, search)), [all, regionFilter, search]);

    /* Pin positions, nudged apart when two partners share a city. */
    const pins = useMemo(() => {
        const used = new Map<string, number>();
        return shown
            .map((l) => {
                const p = locate(l);
                if (!p) return null;
                const key = `${Math.round(p[0])},${Math.round(p[1])}`;
                const n = used.get(key) ?? 0;
                used.set(key, n + 1);
                const a = n * 2.1;
                return { l, x: p[0] + (n ? Math.cos(a) * 3 * n : 0), y: p[1] + (n ? Math.sin(a) * 3 * n : 0) };
            })
            .filter(Boolean) as { l: Listing; x: number; y: number }[];
    }, [shown]);

    useEffect(() => {
        if (selected !== null && !shown.some((l) => l.id === selected)) setSelected(null);
    }, [shown, selected]);

    /* Keep the opened partner visible in the list, e.g. after clicking its pin. */
    useEffect(() => {
        if (selected === null || !listRef.current) return;
        const row = listRef.current.querySelector<HTMLElement>(`[data-pid="${String(selected)}"]`);
        if (!row) return;
        const t = window.setTimeout(() => {
            const list = listRef.current;
            if (!list) return;
            const top = row.offsetTop - 8;
            list.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
        }, 60);
        return () => window.clearTimeout(t);
    }, [selected, reduce]);

    /* On narrow, taller maps the worldwide view frames the Atlantic instead of the whole globe. */
    const narrow = box.w > 0 && box.w / box.h < 2;
    const vb = regionFilter === "all" && narrow ? ([150, 30, 460, 345] as [number, number, number, number]) : VIEW[regionFilter] ?? VIEW.all;
    const k = vb[2] / MAP_W; /* map units per "full-map" unit, keeps pins a constant size on screen */
    const active = shown.find((l) => l.id === selected) ?? null;
    const activePin = pins.find((p) => p.l.id === selected) ?? null;
    const firstLoad = !loaded;
    const dur = reduce ? 0 : 0.9;

    const count = firstLoad ? "Loading authorized partners..." : `${shown.length} authorized ${shown.length === 1 ? "partner" : "partners"}`;

    const detail = (l: Listing) => (
        <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[0.625rem] font-semibold text-emerald-300">
                    <ShieldCheck className="w-3 h-3" aria-hidden="true" /> Authorized Partner
                </span>
            </div>
            <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-slate-300">{l.public_description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
                {(l.specializations ?? []).map((s, i) => (
                    <span key={i} className="inline-flex items-center gap-1 rounded-md border border-[#00B8DB]/25 bg-[#00B8DB]/[0.08] px-2 py-0.5 text-[0.6875rem] font-medium text-[#7FE3F2]">
                        <Award className="w-3 h-3" aria-hidden="true" /> {s}
                    </span>
                ))}
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
                {(l.service_regions ?? []).map((r, i) => (
                    <span key={i} className="rounded-md bg-white/[0.06] px-2 py-0.5 text-[0.6875rem] text-slate-300">
                        {r}
                    </span>
                ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-3">
                {isStarter(l) ? (
                    <Link href="/demo?intent=partner" className="inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-[#7FE3F2] hover:underline underline-offset-2">
                        <Mail className="w-4 h-4" aria-hidden="true" /> Contact via OmniPriv
                    </Link>
                ) : (
                    <>
                        <a href={`mailto:${l.public_contact_email}`} className="inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-[#7FE3F2] hover:underline underline-offset-2">
                            <Mail className="w-4 h-4" aria-hidden="true" /> Contact Partner
                        </a>
                        <a href={l.public_website} target="_blank" rel="noreferrer" className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-white/[0.12] px-3 text-[0.75rem] font-semibold text-slate-200 hover:border-[#00B8DB]/50 active:scale-[0.97]">
                            Visit Website <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
                    </>
                )}
            </div>
        </div>
    );

    return (
        <div>
            {/* Controls */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <label className="relative block w-full lg:max-w-md">
                    <span className="sr-only">Search partners</span>
                    <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" aria-hidden="true" />
                    <input
                        type="search"
                        placeholder="Search by partner name, city, or specialization..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full h-11 rounded-xl border border-white/[0.1] bg-white/[0.04] pl-10 pr-10 text-[0.9375rem] text-white placeholder:text-slate-500 outline-none focus-visible:border-[#00B8DB] focus-visible:ring-2 focus-visible:ring-[#00B8DB]/30"
                    />
                    {input && (
                        <button type="button" onClick={() => setInput("")} className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex w-8 h-8 items-center justify-center rounded-lg text-slate-400 hover:bg-white/[0.06]" aria-label="Clear search">
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </label>
                <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0" role="group" aria-label="Region">
                    {REGIONS.map((r) => {
                        const on = regionFilter === r.v;
                        return (
                            <button
                                key={r.v}
                                type="button"
                                aria-pressed={on}
                                onClick={() => setRegionFilter(r.v)}
                                className={`inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-[0.8125rem] font-semibold transition-colors duration-150 active:scale-[0.97] ${on ? "border-[#00B8DB] bg-[#00B8DB]/[0.14] text-[#7FE3F2]" : "border-white/[0.12] text-slate-400 hover:border-[#00B8DB]/50 hover:text-white"}`}
                            >
                                {r.v === "all" && <Globe className="w-3.5 h-3.5" aria-hidden="true" />}
                                {r.t}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
                {/* Map */}
                <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#070b12]">
                    <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.06]">
                        <Globe className="w-4 h-4 text-[#7FE3F2]" aria-hidden="true" />
                        <span className="text-[0.75rem] font-mono text-slate-400 truncate">{regionFilter === "all" ? "Worldwide" : regionFilter}</span>
                        <span className="ml-auto flex items-center gap-2 text-[0.75rem] text-slate-400" aria-live="polite">
                            {count}
                        </span>
                    </div>

                    <div ref={boxRef} className="relative aspect-[4/3] sm:aspect-[1000/394]">
                        <motion.svg
                            role="img"
                            aria-label={`Map of ${shown.length} partners${regionFilter === "all" ? " worldwide" : ` in ${regionFilter}`}`}
                            className="absolute inset-0 block h-full w-full"
                            initial={false}
                            animate={{ viewBox: vb.join(" ") }}
                            transition={{ duration: dur, ease }}
                            preserveAspectRatio="xMidYMid slice"
                        >
                            <defs>
                                <radialGradient id="pmap-glow" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stopColor="#00B8DB" stopOpacity="0.55" />
                                    <stop offset="100%" stopColor="#00B8DB" stopOpacity="0" />
                                </radialGradient>
                            </defs>
                            <path d={LAND_D} fill="#0f1a26" stroke="#1d3344" strokeWidth={0.6} vectorEffect="non-scaling-stroke" />
                            <path d={DOTS_D} stroke="#2a4a5e" strokeWidth={2.4} strokeLinecap="round" vectorEffect="non-scaling-stroke" fill="none" />

                            {/* Arcs from the OmniPriv office to each partner, worldwide view only */}
                            {regionFilter === "all" &&
                                pins.map((p, idx) => {
                                    const mx = (HQ[0] + p.x) / 2;
                                    const my = Math.min(HQ[1], p.y) - Math.abs(p.x - HQ[0]) * 0.18;
                                    return (
                                        <motion.path
                                            key={`arc-${p.l.id}`}
                                            d={`M${HQ[0]} ${HQ[1]} Q${mx} ${my} ${p.x} ${p.y}`}
                                            fill="none"
                                            stroke="#00B8DB"
                                            strokeOpacity={0.35}
                                            strokeWidth={1}
                                            vectorEffect="non-scaling-stroke"
                                            strokeDasharray="3 4"
                                            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                                            animate={{ pathLength: 1, opacity: 1 }}
                                            transition={{ duration: 1.2, delay: 0.2 + idx * 0.08, ease }}
                                        />
                                    );
                                })}
                            {regionFilter === "all" && (
                                <g>
                                    <circle cx={HQ[0]} cy={HQ[1]} r={4} fill="#0a1628" stroke="#7FE3F2" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
                                    <text x={HQ[0] + 7} y={HQ[1] + 3} fontSize={9} fill="#94a3b8" fontFamily="var(--font-sans, sans-serif)">
                                        OmniPriv
                                    </text>
                                </g>
                            )}

                            {/* Pins */}
                            {pins.map((p) => {
                                const on = p.l.id === selected || p.l.id === hover;
                                return (
                                    <g
                                        key={p.l.id}
                                        role="button"
                                        tabIndex={0}
                                        aria-label={`${p.l.display_name}, ${p.l.headquarters}`}
                                        aria-pressed={p.l.id === selected}
                                        className="cursor-pointer outline-none"
                                        onClick={() => setSelected(p.l.id === selected ? null : p.l.id)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") {
                                                e.preventDefault();
                                                setSelected(p.l.id === selected ? null : p.l.id);
                                            }
                                        }}
                                        onMouseEnter={() => setHover(p.l.id)}
                                        onMouseLeave={() => setHover(null)}
                                    >
                                        <motion.circle initial={false} animate={{ cx: p.x, cy: p.y, r: 22 * k }} transition={{ duration: dur, ease }} fill="url(#pmap-glow)" opacity={on ? 1 : 0.55} />
                                        {!reduce && (
                                            <motion.circle
                                                initial={false}
                                                animate={{ cx: p.x, cy: p.y, r: [6 * k, 18 * k], opacity: [0.7, 0] }}
                                                transition={{ cx: { duration: dur, ease }, cy: { duration: dur, ease }, r: { duration: 2.2, repeat: Infinity, ease: "easeOut" }, opacity: { duration: 2.2, repeat: Infinity, ease: "easeOut" } }}
                                                fill="none"
                                                stroke="#00B8DB"
                                                strokeWidth={1}
                                                vectorEffect="non-scaling-stroke"
                                            />
                                        )}
                                        <motion.circle
                                            initial={false}
                                            animate={{ cx: p.x, cy: p.y, r: (on ? 8 : 6) * k }}
                                            transition={{ duration: dur, ease }}
                                            fill={on ? "#7FE3F2" : "#00B8DB"}
                                            stroke="#04121a"
                                            strokeWidth={1.5}
                                            vectorEffect="non-scaling-stroke"
                                        />
                                        <circle cx={p.x} cy={p.y} r={18 * k} fill="transparent" />
                                    </g>
                                );
                            })}
                        </motion.svg>

                        {/* Name tag over the hovered or selected pin */}
                        <AnimatePresence>
                            {(hover !== null || activePin) && (() => {
                                const p = pins.find((x) => x.l.id === (hover ?? selected));
                                if (!p) return null;
                                return (
                                    <div
                                        key={`tag-${p.l.id}-${regionFilter}`}
                                        className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full"
                                        style={(() => {
                                            /* Same maths as preserveAspectRatio="xMidYMid slice". */
                                            const sc = Math.max(box.w / vb[2], box.h / vb[3]) || 0;
                                            const ox = (box.w - vb[2] * sc) / 2;
                                            const oy = (box.h - vb[3] * sc) / 2;
                                            return { left: (p.x - vb[0]) * sc + ox, top: (p.y - vb[1]) * sc + oy };
                                        })()}
                                    >
                                        <motion.span
                                            className="mb-3 block whitespace-nowrap rounded-lg border border-white/[0.12] bg-[#0b1220]/95 px-2.5 py-1.5 text-[0.75rem] font-semibold text-white shadow-lg"
                                            initial={{ opacity: 0, y: 4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, transition: { duration: 0.1 } }}
                                            transition={{ duration: 0.2, delay: hover !== null ? 0 : dur * 0.8 }}
                                        >
                                            {p.l.display_name}
                                            <span className="ml-1.5 font-normal text-slate-400">{p.l.headquarters.split(",")[0]}</span>
                                        </motion.span>
                                    </div>
                                );
                            })()}
                        </AnimatePresence>

                        {/* Empty result */}
                        {!firstLoad && shown.length === 0 && (
                            <div className="absolute inset-0 flex items-center justify-center p-4">
                                <div className="max-w-sm rounded-2xl border border-white/[0.1] bg-[#0b1220]/90 px-5 py-5 text-center backdrop-blur-sm">
                                    <div className="text-[0.9375rem] font-semibold text-white">No Partners Found</div>
                                    <p className="mt-1.5 text-[0.8125rem] text-slate-400">No approved partners match your criteria in this region. Contact OmniPriv direct sales for regional inquiries.</p>
                                    {(input || regionFilter !== "all") && (
                                        <button type="button" onClick={() => { setInput(""); setRegionFilter("all"); }} className="mt-3 text-[0.8125rem] font-semibold text-[#7FE3F2] hover:underline underline-offset-2">
                                            Clear filters
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                </div>

                {/* List */}
                <div className="relative flex min-h-0 flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02]">
                    <div className="flex items-center justify-between gap-3 px-4 h-11 border-b border-white/[0.06]">
                        <span className="text-[0.8125rem] font-semibold text-white">Partners</span>
                        <span className="text-[0.75rem] tabular-nums text-slate-500">{firstLoad ? "" : shown.length}</span>
                    </div>
                    <ul ref={listRef} className={`max-h-[26rem] space-y-1 overflow-y-auto p-2 lg:absolute lg:inset-x-0 lg:bottom-0 lg:top-11 lg:max-h-none`}>
                        {firstLoad &&
                            [0, 1, 2, 3].map((n) => (
                                <li key={n} className="flex items-center gap-3 rounded-xl px-3 py-3" aria-hidden="true">
                                    <span className="w-9 h-9 rounded-lg bg-white/[0.06] animate-pulse" />
                                    <span className="flex-1 space-y-1.5">
                                        <span className="block h-3 w-2/3 rounded bg-white/[0.07] animate-pulse" />
                                        <span className="block h-2.5 w-1/3 rounded bg-white/[0.05] animate-pulse" />
                                    </span>
                                </li>
                            ))}
                        {!firstLoad && shown.length === 0 && <li className="px-3 py-6 text-center text-[0.8125rem] text-slate-500">No partners match.</li>}
                        {shown.map((l) => {
                            const on = l.id === selected;
                            return (
                                <motion.li key={l.id} data-pid={String(l.id)} layout={!reduce} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25, ease }}>
                                    <button
                                        type="button"
                                        onClick={() => setSelected(on ? null : l.id)}
                                        onMouseEnter={() => setHover(l.id)}
                                        onMouseLeave={() => setHover(null)}
                                        aria-pressed={on}
                                        className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors duration-150 ${on ? "border-[#00B8DB]/50 bg-[#00B8DB]/[0.1]" : "border-transparent hover:bg-white/[0.04]"}`}
                                    >
                                        <span className={`inline-flex w-9 h-9 shrink-0 items-center justify-center rounded-lg text-[0.6875rem] font-bold ${on ? "bg-[#00B8DB]/25 text-[#7FE3F2]" : "bg-white/[0.06] text-slate-300"}`} aria-hidden="true">
                                            {initials(l.display_name)}
                                        </span>
                                        <span className="min-w-0 flex-1">
                                            <span className="block truncate text-[0.875rem] font-semibold text-white">{l.display_name}</span>
                                            <span className="block truncate text-[0.75rem] text-slate-400">
                                                {l.headquarters} · {(l.specializations ?? [])[0]}
                                            </span>
                                        </span>
                                        <MapPin className={`w-4 h-4 shrink-0 ${on ? "text-[#7FE3F2]" : "text-slate-600"}`} aria-hidden="true" />
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {on && (
                                            <motion.div
                                                key="detail"
                                                initial={reduce ? false : { height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0, transition: { duration: 0.15 } }}
                                                transition={{ duration: 0.28, ease }}
                                                className="overflow-hidden"
                                            >
                                                <div className="mx-1 mb-2 mt-1 rounded-xl border border-white/[0.08] bg-[#0b1220] p-4">{detail(l)}</div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}

/* ─── Hero: who is in the directory and where they cover (illustrative) ─── */
const TYPES = [
    { t: "Security specialists", d: "design and deploy OmniPriv", i: ShieldCheck },
    { t: "Authorized resellers", d: "license and supply", i: Building2 },
    { t: "MSSPs", d: "run and manage it for you", i: Globe },
];
export function PartnerHero() {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const seen = useInView(ref, { amount: 0.3 });
    const [i, setI] = useState(0);
    useEffect(() => {
        if (reduce || !seen) return;
        const t = window.setInterval(() => setI((v) => (v + 1) % (REGIONS.length - 1)), 1400);
        return () => window.clearInterval(t);
    }, [seen, reduce]);
    const region = REGIONS[i + 1].t;
    return (
        <div ref={ref} className="aip-console relative overflow-hidden" role="img" aria-label="Illustration: the directory lists OmniPriv-approved security specialists, authorized resellers and MSSPs across the United Kingdom, North America, Western Europe and the Nordics">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="ml-3 text-[0.75rem] font-mono text-slate-400 truncate">Partner locator · approved listings</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 px-4 pt-4" aria-hidden="true">
                {REGIONS.slice(1).map((r, k) => (
                    <span key={r.v} className={`flex items-center justify-center gap-1.5 truncate rounded-lg border px-2 py-2 text-[0.6875rem] font-semibold transition-colors duration-300 ${k === i ? "border-[#00B8DB]/55 bg-[#00B8DB]/[0.12] text-white" : "border-white/[0.07] text-slate-500"}`}>
                        <MapPin className="w-3 h-3 shrink-0" /> <span className="truncate">{r.t}</span>
                    </span>
                ))}
            </div>
            <ul className="p-4 space-y-2" aria-hidden="true">
                {TYPES.map((x, k) => (
                    <motion.li key={`${region}-${x.t}`} initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: k * 0.08, ease: [0.23, 1, 0.32, 1] }} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-3">
                        <span className="inline-flex w-9 h-9 items-center justify-center rounded-lg bg-[#00B8DB]/15 text-[#7FE3F2]">
                            <x.i className="w-4 h-4" />
                        </span>
                        <span className="min-w-0">
                            <span className="block truncate text-[0.8125rem] font-semibold text-white">{x.t}</span>
                            <span className="block truncate text-[0.6875rem] text-slate-400">
                                {x.d} · {region}
                            </span>
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[0.625rem] font-semibold text-emerald-300">
                            <ShieldCheck className="w-3 h-3" /> approved
                        </span>
                    </motion.li>
                ))}
            </ul>
            <div className="flex items-center justify-between gap-3 px-4 h-10 border-t border-white/[0.08] text-[0.6875rem] text-slate-500">
                <span className="truncate">Listed only after OmniPriv approval</span>
                <span className="font-mono shrink-0">illustrative</span>
            </div>
        </div>
    );
}
