import React from "react";
import { PartnerPortalProvider } from "@/components/partner-portal/PartnerPortalContext";
import PartnerPortalLayout from "@/components/partner-portal/PartnerPortalLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner Portal | OmniPriv PAM Channel Operations",
  description: "Manage your OmniPriv partnership, customer opportunities, enablement, and commercial requests in one place.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PartnerPortalProvider>
      <PartnerPortalLayout>{children}</PartnerPortalLayout>
    </PartnerPortalProvider>
  );
}
