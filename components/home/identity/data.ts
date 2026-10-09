import { Bot, Server, Users, type LucideIcon } from "lucide-react";

/*
 * Shared content for the "Every identity that can touch production" section.
 * All three layout options read from here, so the copy stays identical while
 * we compare designs. Figures are the verified product facts only.
 */

export type IdentityKey = "human" | "machine" | "ai";

export interface IdentityItem {
  key: IdentityKey;
  title: string;
  short: string;
  /** One sentence: what goes wrong without PAM. */
  risk: string;
  /** Three controls, each a short line. */
  controls: [string, string, string];
  /** One proof figure. */
  stat: { value: string; label: string };
  cta: string;
  href: string;
  icon: LucideIcon;
  image: string;
  alt: string;
  /** Where the subject sits in the picture, for object-position. */
  focus: string;
}

export const IDENTITIES: IdentityItem[] = [
  {
    key: "human",
    title: "Human identities",
    short: "Admins, employees, contractors and vendors",
    risk: "Shared admin passwords and standing access that nobody takes back.",
    controls: [
      "MFA on every privileged sign-in",
      "Just-in-Time access with approval",
      "Every session recorded and searchable",
    ],
    stat: { value: "0", label: "standing privileges with Just-in-Time access" },
    cta: "Secure human access",
    href: "/solutions/human-identity-security",
    icon: Users,
    image: "/identities/human-identities.jpeg",
    alt: "Colleagues around a table with holographic identity verification panels and a security shield",
    focus: "50% 45%",
  },
  {
    key: "machine",
    title: "Machine identities",
    short: "Applications, service accounts and workloads",
    risk: "Hard-coded secrets and service accounts that are never rotated.",
    controls: [
      "Credentials held in an isolated vault",
      "Automatic rotation on a schedule",
      "Secrets injected, never shown to people",
    ],
    stat: { value: "3", label: "level key hierarchy: KEK, DEK, SEK" },
    cta: "Secure machine access",
    href: "/solutions/machine-identity-security",
    icon: Server,
    image: "/identities/machine-identities.jpeg",
    alt: "A robot presenting a holographic key, surrounded by padlocked cloud, server and database platforms",
    focus: "45% 40%",
  },
  {
    key: "ai",
    title: "AI and automated identities",
    short: "AI agents, copilots and automated workflows",
    risk: "Agents acting on borrowed human logins with no limits on what they call.",
    controls: [
      "Its own verifiable identity per agent",
      "Tool allowlist and data scope by policy",
      "Risky calls held for human approval",
    ],
    stat: { value: "53", label: "MCP tools permission-gated" },
    cta: "Explore AI-ready PAM",
    href: "/solutions/ai-agent-security",
    icon: Bot,
    image: "/identities/ai-automated-identities.jpeg",
    alt: "A glowing neural network above a lit platform, ringed by security padlocks",
    focus: "50% 40%",
  },
];
