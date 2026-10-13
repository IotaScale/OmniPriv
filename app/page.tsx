import type { Metadata } from "next";
import HeroScene from "@/components/home/HeroScene";
import FlowSection from "@/components/home/FlowSection";
import LogoMarquee from "@/components/sections/LogoMarquee";
import ChallengeScroller from "@/components/home/ChallengeScroller";
import ControlFlow from "@/components/home/ControlFlow";
import IdentitySwitcher from "@/components/home/identity/IdentitySwitcher";
import InsightsSection from "@/components/home/InsightsSection";
import ModuleGrid from "@/components/home/ModuleGrid";
import { faqs } from "@/components/home/faqs";
import Spotlight from "@/components/aipam/Spotlight";
import { ClosingBand, FactsStrip, FaqSplit } from "@/components/pageui/blocks";
import { posts as blogData } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: {
    absolute: "OmniPriv | Top Privileged Access Management & PAM Solutions",
  },
  description:
    "Protect your enterprise with OmniPriv advanced PAM solutions. Discover seamless privileged access management to secure critical data and reduce risk.",
};

/*
 * Homepage. One idea per section, each in a different layout family:
 *
 *   Hero               split copy + live AI feature tour (OmniPriv navy)
 *   Challenges         3D hand-off from the hero, pinned, one slide per scroll
 *   Stack marquee      the one marquee on the page
 *   Identities         expanding image panels
 *   At a glance        verified figures, same strip as the interior pages
 *   Control plane      left-to-right flow with a moving pulse
 *   Nine modules       links into every redesigned platform page
 *   Insights           lead story + two
 *   Closing band, FAQ  the shared blocks every interior page ends with
 *
 * The old fabricated testimonials stay removed. If real, attributable quotes
 * are supplied, build that section fresh.
 */

/*
 * The three articles featured on the homepage. Pinned on purpose (not
 * "latest"), each with artwork in the same visual language as the rest of
 * the page. To change them, edit this list.
 */
const FEATURED_POSTS = [
  {
    slug: "ai-pam-solutions",
    image: "/identities/ai-automated-identities.jpeg",
    imageAlt: "Glowing AI brain above a secured platform",
  },
  {
    slug: "jit-access-guide",
    image: "/challenges/defend-ai-driven-threats.jpeg",
    imageAlt: "Vaulted keys and privileges released through a secure gateway on demand",
  },
  {
    slug: "one-identity-privileged-access-management",
    image: "/challenges/audit-governance-compliance.jpeg",
    imageAlt: "One secure control point governing every user, server and cloud connection",
  },
];

/* Verified figures (see claude/homepage-redesign-notes.md, "Facts and copy rules"). */
const FACTS = [
  { value: 9, label: "capability modules on one policy engine" },
  { value: 39, label: "behavioural features scored on every session" },
  { value: 53, label: "MCP tools governed for AI agents" },
  { value: 6, label: "compliance frameworks mapped in audit reports" },
];

const featuredPosts = FEATURED_POSTS.flatMap(({ slug, image, imageAlt }) => {
  const post = blogData[slug as keyof typeof blogData];
  if (!post) return [];
  return [
    {
      category: post.category,
      title: post.title,
      excerpt: post.excerpt,
      date: post.date,
      readTime: post.readTime,
      href: `/blog/${slug}`,
      image,
      imageAlt,
    },
  ];
});

export default function HomePage() {
  return (
    <>
      {/* Hero, then the 3D hand-off into the challenges story */}
      <HeroScene />
      <Spotlight />

      {/*
       * Everything below the hero sits on the same ground as the hero (white,
       * or navy in dark mode), with no bands or hairlines, and every section
       * moves on the same scroll-linked curve (FlowSection). The control plane
       * section's markup is untouched; it only loses its own ground.
       */}
      <div className="op-home">
        <ChallengeScroller />

        <FlowSection>
          <LogoMarquee label="Works across your entire stack" />
          <div className="aip container-xl -mt-2 pb-6">
            <FactsStrip facts={FACTS} />
          </div>
        </FlowSection>
        <FlowSection>
          <IdentitySwitcher visual="zsp2" />
        </FlowSection>

        <FlowSection>
          <ControlFlow />
        </FlowSection>

        <FlowSection>
          <ModuleGrid />
        </FlowSection>

        <FlowSection>
          <InsightsSection posts={featuredPosts} />
        </FlowSection>
      </div>

      <ClosingBand
        title="Take control of every privileged move"
        body={[
          "Centralised access control, Just-in-Time privileges, credential protection and session visibility for your most sensitive systems. See it on your own infrastructure.",
        ]}
        primary={{ href: "/demo", label: "Request a Demo" }}
        secondary={{ href: "/platform", label: "Explore Platform" }}
      />

      <div className="aip">
        <FaqSplit
          id="home-faq"
          title="Frequently Asked Questions About Privileged Access Management"
          lead="Everything enterprise security and infrastructure leaders need to know about PAM architecture, policy governance, and session audit readiness."
          items={faqs}
        />
      </div>
    </>
  );
}
