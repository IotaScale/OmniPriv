"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { Check, Server } from "lucide-react";

/*
 * Infrastructure hero: one product, three topologies, on the platform you
 * already run. Cycles standalone → active-standby → HA cluster while the
 * hypervisor row steps through VMware, Red Hat and OpenStack. Node names are
 * illustrative.
 */

type Node = { id: string; x: number; y: number; label: string; role: string };
const LAYOUTS: {
  key: string;
  title: string;
  note: string;
  nodes: Node[];
  links: [string, string, "lb" | "rep"][];
}[] = [
  {
    key: "standalone",
    title: "Standalone",
    note: "A single appliance for one site",
    nodes: [{ id: "n1", x: 160, y: 104, label: "node-1", role: "active" }],
    links: [],
  },
  {
    key: "standby",
    title: "Active-standby",
    note: "A replica ready to take over",
    nodes: [
      { id: "n1", x: 96, y: 104, label: "node-1", role: "active" },
      { id: "n2", x: 224, y: 104, label: "node-2", role: "standby" },
    ],
    links: [["n1", "n2", "rep"]],
  },
  {
    key: "ha",
    title: "HA cluster",
    note: "Load balanced, replicated, health-checked",
    nodes: [
      { id: "lb", x: 160, y: 36, label: "load balancer", role: "" },
      { id: "n1", x: 64, y: 128, label: "node-1", role: "healthy" },
      { id: "n2", x: 160, y: 128, label: "node-2", role: "healthy" },
      { id: "n3", x: 256, y: 128, label: "node-3", role: "healthy" },
    ],
    links: [
      ["lb", "n1", "lb"],
      ["lb", "n2", "lb"],
      ["lb", "n3", "lb"],
      ["n1", "n2", "rep"],
      ["n2", "n3", "rep"],
    ],
  },
];
const PLATFORMS = ["VMware", "Red Hat", "OpenStack"];
const STEP_MS = 3200;

export default function DeployHero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { amount: 0.3 });
  const [t, setT] = useState(reduce ? 2 : 0);

  useEffect(() => {
    if (reduce || !seen) return;
    const id = window.setInterval(() => setT((v) => v + 1), STEP_MS);
    return () => window.clearInterval(id);
  }, [seen, reduce]);

  const layout = LAYOUTS[t % 3];
  const platform = Math.floor(t / 3) % PLATFORMS.length;
  const at = (id: string) => layout.nodes.find((n) => n.id === id)!;

  return (
    <div
      ref={ref}
      className="aip-console relative overflow-hidden"
      role="img"
      aria-label="Illustration: OmniPriv deployed as a software appliance on VMware, Red Hat or OpenStack, as a standalone node, an active-standby pair or a load-balanced high-availability cluster"
    >
      <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="ml-3 text-[0.75rem] font-mono text-slate-400 truncate">
          Deployment · your infrastructure
        </span>
        <span className="ml-auto inline-flex items-center gap-1.5 text-[0.6875rem] font-semibold text-emerald-300 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 aip-blink" />{" "}
          Health checks passing
        </span>
      </div>

      {/* topology tabs */}
      <ol className="grid grid-cols-3 gap-1.5 px-4 pt-4" aria-hidden="true">
        {LAYOUTS.map((l, i) => (
          <li
            key={l.key}
            className={`rounded-lg px-1 py-1.5 text-center text-[0.6875rem] sm:text-[0.75rem] whitespace-nowrap font-semibold transition-colors duration-300 ${i === t % 3 ? "bg-[#00B8DB]/[0.14] text-white ring-1 ring-[#00B8DB]/45" : "text-slate-500"}`}
          >
            {l.title}
          </li>
        ))}
      </ol>

      {/* diagram */}
      <div className="mx-4 mt-4 rounded-2xl border border-white/[0.07] bg-[#0b0c0e]">
        <svg
          viewBox="16 10 288 154"
          className="w-full h-auto"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="dh-grid"
              width="16"
              height="16"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M16 0H0V16"
                fill="none"
                stroke="rgba(255,255,255,0.035)"
              />
            </pattern>
          </defs>
          <rect x="16" y="10" width="288" height="154" fill="url(#dh-grid)" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.g
              key={layout.key}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.18 } }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              {layout.links.map(([a, b, kind]) => {
                const A = at(a);
                const B = at(b);
                return kind === "lb" ? (
                  <line
                    key={a + b}
                    x1={A.x}
                    y1={A.y + 14}
                    x2={B.x}
                    y2={B.y - 20}
                    stroke="#00B8DB"
                    strokeOpacity={0.55}
                    strokeWidth={1.4}
                  />
                ) : (
                  <g key={a + b}>
                    <line
                      x1={A.x + 38}
                      y1={A.y}
                      x2={B.x - 38}
                      y2={B.y}
                      stroke="#7FE3F2"
                      strokeOpacity={0.6}
                      strokeWidth={1.4}
                      strokeDasharray="4 4"
                    >
                      {!reduce && (
                        <animate
                          attributeName="stroke-dashoffset"
                          from="16"
                          to="0"
                          dur="1s"
                          repeatCount="indefinite"
                        />
                      )}
                    </line>
                    {B.x - A.x > 110 && (
                      <text
                        x={(A.x + B.x) / 2}
                        y={A.y - 8}
                        textAnchor="middle"
                        fontSize="7.5"
                        fill="#64748b"
                        style={{ fontFamily: "var(--font-inter), sans-serif" }}
                      >
                        replication
                      </text>
                    )}
                  </g>
                );
              })}
              {layout.nodes.map((n) =>
                n.id === "lb" ? (
                  <g key={n.id}>
                    <rect
                      x={n.x - 52}
                      y={n.y - 14}
                      width={104}
                      height={28}
                      rx={8}
                      fill="#15171a"
                      stroke="#00B8DB"
                      strokeOpacity={0.6}
                    />
                    <text
                      x={n.x}
                      y={n.y + 4}
                      textAnchor="middle"
                      fontSize="10.5"
                      fontWeight="600"
                      fill="#e2e8f0"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      {n.label}
                    </text>
                  </g>
                ) : (
                  <g key={n.id}>
                    <rect
                      x={n.x - 38}
                      y={n.y - 20}
                      width={76}
                      height={40}
                      rx={9}
                      fill="#15171a"
                      stroke={
                        n.role === "standby"
                          ? "rgba(255,255,255,0.18)"
                          : "rgba(0,184,219,0.55)"
                      }
                    />
                    <circle
                      cx={n.x - 26}
                      cy={n.y - 6}
                      r={2.8}
                      fill={n.role === "standby" ? "#94a3b8" : "#34d399"}
                      className={reduce ? "" : "aip-blink"}
                    />
                    <text
                      x={n.x - 19}
                      y={n.y - 2.5}
                      fontSize="10"
                      fontWeight="600"
                      fill="#f1f5f9"
                      style={{ fontFamily: "var(--font-jetbrains), monospace" }}
                    >
                      {n.label}
                    </text>
                    <text
                      x={n.x - 26}
                      y={n.y + 12}
                      fontSize="8.5"
                      fill={n.role === "standby" ? "#94a3b8" : "#7FE3F2"}
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      {n.role}
                    </text>
                  </g>
                ),
              )}
            </motion.g>
          </AnimatePresence>
        </svg>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={layout.key}
          initial={reduce ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.12 } }}
          className="px-4 pt-3 text-[0.75rem] text-slate-400"
        >
          {layout.note}
        </motion.p>
      </AnimatePresence>

      {/* platform row */}
      <div className="m-4 mt-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-3">
        <div className="flex items-center gap-2 text-[0.75rem]">
          <Server
            className="w-4 h-4 text-slate-300 shrink-0"
            aria-hidden="true"
          />
          <span className="font-semibold text-white truncate">
            Software appliance
          </span>
          <span className="ml-auto text-[0.6875rem] text-slate-500 shrink-0">
            hardware-agnostic
          </span>
        </div>
        <div className="mt-2.5 grid grid-cols-3 gap-1.5" aria-hidden="true">
          {PLATFORMS.map((p, i) => (
            <span
              key={p}
              className={`inline-flex items-center justify-center gap-1 rounded-lg border py-1.5 text-[0.6875rem] font-semibold transition-colors duration-300 ${i === platform ? "border-[#00B8DB]/45 bg-[#00B8DB]/[0.1] text-[#7FE3F2]" : "border-white/[0.07] text-slate-400"}`}
            >
              {i === platform && <Check className="w-3 h-3" strokeWidth={3} />}
              {p}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 px-4 h-10 border-t border-white/[0.08] text-[0.6875rem] text-slate-500">
        <span className="truncate">Same product at every size</span>
        <span className="font-mono shrink-0">illustrative</span>
      </div>
    </div>
  );
}
