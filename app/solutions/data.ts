import type { LucideIcon } from "lucide-react";
import { Bot, Cpu, Server, UserCheck } from "lucide-react";

/**
 * Registry of solution pages.
 *
 * Each `app/solutions/<slug>/` page owns its own copy in a sibling `data.ts`;
 * this file holds only what a *list* of solutions needs — enough to build a
 * `/solutions` index, drive navigation, or generate a sitemap without
 * importing any page module.
 */
export interface SolutionMeta {
    slug: string;
    /** Badge text shown on the page hero. */
    eyebrow: string;
    /** Short label for cards and navigation. */
    cardTitle: string;
    /** One-sentence summary for index cards and meta descriptions. */
    description: string;
    /** Full page title. Used with `title: { absolute }` to bypass the template. */
    metaTitle: string;
    metaDescription: string;
    icon: LucideIcon;
    /** Display order in listings. */
    order: number;
}

export const solutions: SolutionMeta[] = [
    {
        slug: "human-identity-security",
        eyebrow: "Human Identity Security",
        cardTitle: "Human Identity Security",
        description:
            "Secure admins, employees, developers and vendors with least privilege, JIT access, credential protection and session monitoring.",
        metaTitle: "Human Identity Security & PAM Solutions | OmniPriv",
        metaDescription:
            "Secure admins, employees, developers, and vendors with OmniPriv human identity security, JIT access, least privilege, AI-driven detection, and PAM.",
        icon: UserCheck,
        order: 1,
    },
    {
        slug: "ai-agent-security",
        eyebrow: "AI Agent Security",
        cardTitle: "AI Agent Security",
        description:
            "Secure AI agents and automated workflows with least privilege, JIT access, credential protection, session monitoring and intelligent threat detection.",
        metaTitle: "AI Agent Security & Privileged Access Management | OmniPriv",
        metaDescription:
            "Strengthen AI agent security with OmniPriv PAM using JIT access, least privilege, credential protection, session monitoring, and intelligent threat detection.",
        icon: Cpu,
        order: 2,
    },
    {
        slug: "machine-identity-security",
        eyebrow: "Machine Identity Security",
        cardTitle: "Machine Identity Security",
        description:
            "Secure service accounts, workloads, APIs and machine identities with automated credential rotation, JIT access and intelligent threat detection.",
        metaTitle: "Machine Identity Security | OmniPriv",
        metaDescription:
            "Secure service accounts, workloads, APIs and machine identities with OmniPriv PAM, automated credential rotation, JIT access and intelligent threat detection.",
        icon: Server,
        order: 3,
    },
    {
        slug: "ai-pam-solutions",
        eyebrow: "AI PAM Solutions",
        cardTitle: "AI PAM Solutions",
        description:
            "Secure AI agents, machine identities, and privileged access with OmniPriv AI PAM solutions, JIT access, credential security, monitoring, and Zero Trust.",
        metaTitle: "AI PAM Solutions | Secure AI & Machine Access | OmniPriv",
        metaDescription:
            "Secure AI agents, machine identities, and privileged access with OmniPriv AI PAM solutions, JIT access, credential security, monitoring, and Zero Trust.",
        icon: Bot,
        order: 4,
    },
];

/** Look up a solution by slug. Returns `undefined` when the slug is unknown. */
export function getSolution(slug: string): SolutionMeta | undefined {
    return solutions.find((solution) => solution.slug === slug);
}

/**
 * Look up a solution by slug, throwing when it does not exist.
 *
 * Used by page modules, where an unknown slug is a build-time programming
 * error rather than a 404.
 */
export function requireSolution(slug: string): SolutionMeta {
    const solution = getSolution(slug);
    if (!solution) {
        throw new Error(
            `Unknown solution slug "${slug}". Add it to app/solutions/data.ts.`
        );
    }
    return solution;
}
