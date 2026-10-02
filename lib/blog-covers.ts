/**
 * Cover art for blog posts.
 *
 * Kept out of lib/blog-data.ts deliberately — that file is 2,284 lines of
 * article content, and covers are presentational metadata that changes on a
 * different schedule.
 *
 * Every entry is an Unsplash photo under the free Unsplash License. The
 * premium (Unsplash+) library uses a `plus.unsplash.com/premium_photo-…`
 * host and is NOT free to use, so each id here was verified individually by
 * following `unsplash.com/photos/<slug>/download` and reading the redirect
 * target — the free library redirects to `images.unsplash.com/photo-…` while
 * premium resolves elsewhere. Several rejections during that sweep were
 * premium, including the obvious-looking "bank vault" and "Riyadh Kingdom
 * Tower" candidates.
 *
 * Host is `images.unsplash.com`, which is already allowed in
 * next.config.js `images.remotePatterns`.
 */

export interface BlogCover {
    src: string;
    alt: string;
}

const url = (id: string) =>
    `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=70`;

export const blogCovers: Record<string, BlogCover> = {
    "privileged-access-management-solutions-guide-2026": {
        src: url("photo-1565665532830-0dfd1facb1a9"),
        alt: "Laptop computer open on a desk",
    },
    "what-is-privileged-access-management": {
        src: url("photo-1537884944318-390069bb8665"),
        alt: "Source code displayed on a dark monitor",
    },
    "complete-pam-guide-2026": {
        src: url("photo-1695668548342-c0c1ad479aee"),
        alt: "Rack of servers in a server room",
    },
    "privileged-account-breaches-2025": {
        src: url("photo-1544197150-b99a580bb7a8"),
        alt: "Blue network patch cable connected to a port",
    },
    "meridian-bank-case-study": {
        src: url("photo-1573166364839-1bfe9196c23e"),
        alt: "Colleagues seated around a boardroom table",
    },
    "jit-access-guide": {
        src: url("photo-1488590528505-98d2b5aba04b"),
        alt: "Open laptop computer switched on",
    },
    "hipaa-pam-guide": {
        src: url("photo-1777269749032-d8d458ae594d"),
        alt: "Empty hospital corridor with seating and doors",
    },
    "cicd-privileged-access": {
        src: url("photo-1663524789637-9ed898d79611"),
        alt: "Developer working at a laptop",
    },
    "OmniPriv-4-release": {
        src: url("photo-1668092548351-a90526eefb7e"),
        alt: "Colleagues working together in a modern office",
    },
    "ssh-key-management": {
        src: url("photo-1609358905581-e5381612486e"),
        alt: "Wooden door with a brass handle and lock",
    },
    "pam-business-case": {
        src: url("photo-1787647561912-660e537b0c65"),
        alt: "Team collaborating around a table in a modern office",
    },
    "soc2-pam-audit": {
        src: url("photo-1675098978646-32d22c0b5b22"),
        alt: "Person taking notes in a notebook beside a laptop",
    },
    "zero-trust-pam-guide": {
        src: url("photo-1571826784833-50a3087d9d60"),
        alt: "Colleague presenting at a whiteboard during a meeting",
    },
    "stale-privilege-accounts": {
        src: url("photo-1587639499910-963a961a2c23"),
        alt: "Person writing with a pen on paper",
    },
    "privileged-access-management-best-practices-2026": {
        src: url("photo-1654721217546-724e68918b61"),
        alt: "Two colleagues reviewing written notes at a desk",
    },
    "pam-solution-features": {
        src: url("photo-1668092548064-730e05fd0324"),
        alt: "Busy open-plan office with people at workstations",
    },
    "bank-case-study": {
        src: url("photo-1573165231977-3f0e27806045"),
        alt: "Group working on laptops around a wooden table",
    },
    "privileged-access-management-use-cases": {
        src: url("photo-1714976326715-96d4a22f8da8"),
        alt: "Team seated around a wooden meeting table",
    },
    "pam-as-a-service": {
        src: url("photo-1630673287511-4d477913d7a0"),
        alt: "Two colleagues working at a table with laptops",
    },
    "privileged-access-management-pam-solution": {
        src: url("photo-1573165759995-5865a394a1aa"),
        alt: "People working together at a table with laptops",
    },
    "best-pam-solutions-enterprises-2026": {
        src: url("photo-1565688103955-d38e06888776"),
        alt: "Colleagues seated in a conference room",
    },
    "pim-vs-pam-key-differences": {
        src: url("photo-1739287088753-73a9b8b771bc"),
        alt: "Group of people seated around a white table",
    },
    "importance-of-privileged-access-management-for-cybersecurity": {
        src: url("photo-1550591105-4e692a5c22bb"),
        alt: "Close-up of audio and network connectors",
    },
    "one-identity-privileged-access-management": {
        src: url("photo-1622675363311-3e1904dc1885"),
        alt: "Four colleagues with laptops in a board meeting",
    },
    "pam-solution-saudi-arabia": {
        src: url("photo-1663900108404-a05e8bf82cda"),
        alt: "City skyline illuminated at night",
    },
    "zero-trust-saudi-arabia-pam-jit-access": {
        src: url("photo-1622675205169-901710ac8643"),
        alt: "Colleagues discussing a project around a table",
    },
    "ai-pam-solutions": {
        src: url("photo-1531746790731-6c087fecd65a"),
        alt: "Secure AI PAM solutions for human, machine, and automated access",
    },
};

/** Cover for a post, or `undefined` if none is mapped yet. */
export function getCover(slug: string): BlogCover | undefined {
    return blogCovers[slug];
}
