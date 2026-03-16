import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog|omnipriv Privileged Access Management Solution",
  description:
    "Explore the Omnipriv blog to discover best practices and strategies for implementing a secure privileged access management solution in your organization.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
