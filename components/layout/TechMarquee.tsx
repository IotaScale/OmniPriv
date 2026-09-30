"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/* ─── Official brand marks (source: Iconify "logos" icon set) ───
   36 logos split across 2 rows of 18. */
type Logo = { name: string; src: string };

/* Row 1 — operating systems, runtime & databases */
const rowOne: Logo[] = [
    { name: "Linux", src: "/tech/linux.svg" },
    { name: "Windows", src: "/tech/windows.svg" },
    { name: "Ubuntu", src: "/tech/ubuntu.svg" },
    { name: "Debian", src: "/tech/debian.svg" },
    { name: "Red Hat", src: "/tech/redhat.svg" },
    { name: "SUSE", src: "/tech/suse.svg" },
    { name: "Fedora", src: "/tech/fedora.svg" },
    { name: "Rocky Linux", src: "/tech/rocky-linux.svg" },
    { name: "Docker", src: "/tech/docker.svg" },
    { name: "Kubernetes", src: "/tech/kubernetes.svg" },
    { name: "OpenShift", src: "/tech/openshift.svg" },
    { name: "Rancher", src: "/tech/rancher.svg" },
    { name: "PostgreSQL", src: "/tech/postgresql.svg" },
    { name: "MySQL", src: "/tech/mysql.svg" },
    { name: "MongoDB", src: "/tech/mongodb.svg" },
    { name: "Redis", src: "/tech/redis.svg" },
    { name: "Oracle", src: "/tech/oracle.svg" },
    { name: "MariaDB", src: "/tech/mariadb.svg" },
];

/* Row 2 — data platforms, cloud, DevOps, identity & AI */
const rowTwo: Logo[] = [
    { name: "Elasticsearch", src: "/tech/elasticsearch.svg" },
    { name: "Cassandra", src: "/tech/cassandra.svg" },
    { name: "Snowflake", src: "/tech/snowflake.svg" },
    { name: "Kafka", src: "/tech/kafka.svg" },
    { name: "Splunk", src: "/tech/splunk.svg" },
    { name: "Vault", src: "/tech/vault.svg" },
    { name: "IBM Cloud", src: "/tech/ibm.svg" },
    { name: "AWS", src: "/tech/aws.svg" },
    { name: "Azure", src: "/tech/azure.svg" },
    { name: "Google Cloud", src: "/tech/gcp.svg" },
    { name: "VMware", src: "/tech/vmware.svg" },
    { name: "Terraform", src: "/tech/terraform.svg" },
    { name: "Ansible", src: "/tech/ansible.svg" },
    { name: "GitHub", src: "/tech/github.svg" },
    { name: "GitLab", src: "/tech/gitlab.svg" },
    { name: "Okta", src: "/tech/okta.svg" },
    { name: "Anthropic", src: "/tech/anthropic.svg" },
    { name: "OpenAI", src: "/tech/openai.svg" },
];

/* ─── Scroll Reveal Hook ─── */
function useScrollReveal() {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed");
                    }
                });
            },
            { threshold: 0.15 }
        );
        const children = el.querySelectorAll(".reveal-item");
        children.forEach((child) => observer.observe(child));
        return () => observer.disconnect();
    }, []);
    return ref;
}

/* ─── One marquee row ───
   The CSS animation translates the track by -50%, so each row needs an even
   number of identical copies for a seamless loop, and half of the track must
   be wider than the largest viewport so no gap appears. 4 copies of an 18-logo
   row gives ~5.8k px of travel — enough for ultrawide and 4K displays. */
function MarqueeRow({
    logos,
    direction,
    duration,
}: {
    logos: Logo[];
    direction: "left" | "right";
    duration: string;
}) {
    return (
        <div className="marquee-wrapper">
            <div
                className={direction === "left" ? "marquee-track" : "marquee-track-reverse"}
                style={{ animationDuration: duration }}
            >
                {[...logos, ...logos, ...logos, ...logos].map((logo, i) => (
                    <div
                        key={`${logo.name}-${i}`}
                        className="flex-shrink-0 flex items-center gap-3 pl-2.5 pr-6 py-2.5 mx-2 rounded-xl border border-slate-900/[0.08] dark:border-white/[0.06] bg-slate-100/40 dark:bg-[#0A1628]/40 hover:border-[#00B8FF]/30 hover:bg-slate-100/80 dark:hover:bg-[#0A1628]/80 transition-all duration-300 group cursor-default select-none"
                    >
                        {/* Light tile keeps dark brand wordmarks legible in dark mode */}
                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white border border-slate-900/[0.06] dark:border-white/[0.08]">
                            <Image
                                src={logo.src}
                                alt={logo.name}
                                width={26}
                                height={26}
                                unoptimized
                                loading="eager"
                                className="h-[26px] w-[26px] object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                            />
                        </span>
                        <span className="text-slate-600 dark:text-slate-400 group-hover:text-slate-950 dark:group-hover:text-white text-sm font-semibold tracking-wide transition-colors whitespace-nowrap">
                            {logo.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function TechMarquee() {
    const ref = useScrollReveal();

    return (
        <div ref={ref}>
            <section className="py-16 border-b border-slate-900/[0.05] dark:border-white/[0.04] overflow-hidden">
                <div className="container-xl mb-8">
                    <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-widest reveal-item">
                        Supports Every Protocol &amp; Platform
                    </p>
                </div>

                <div className="space-y-4">
                    {/* Row 1 — operating systems, runtime & databases (scrolls left) */}
                    <MarqueeRow logos={rowOne} direction="left" duration="52s" />

                    {/* Row 2 — data, cloud, DevOps, identity & AI (scrolls right) */}
                    <MarqueeRow logos={rowTwo} direction="right" duration="60s" />
                </div>
            </section>
        </div>
    );
}
