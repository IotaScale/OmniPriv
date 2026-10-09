import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OmniPriv Partner Portal",
  description:
    "Sign in to the OmniPriv Partner Portal. Access credentials are provisioned by the OmniPriv sales team.",
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
