import type { Metadata } from "next";

/*
 * app/demo/page.tsx is a client component (it holds the EmailJS form state),
 * so it cannot export `metadata` itself. This layout supplies it instead —
 * the same arrangement app/sign-in/layout.tsx uses.
 *
 * Without this, /demo fell back to the root layout's default title and
 * description, which made it a duplicate of /docs.
 */
export const metadata: Metadata = {
  title: { absolute: "Request a Demo | See OmniPriv PAM in Your Environment" },
  description:
    "Book a 30-minute introductory call, a tailored walkthrough, or an architecture review — including an optional 30-day proof-of-concept in your own environment.",
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
