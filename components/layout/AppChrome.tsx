"use client";

import React from "react";
import { usePathname } from "next/navigation";
import EventPopup from "@/components/events/EventPopup";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Strip public marketing navigation and footer on private operational application pages
  const isPrivateOperationalSurface =
    pathname.startsWith("/partner-portal") ||
    pathname.startsWith("/channel-admin") ||
    pathname.startsWith("/portal-admin");

  if (isPrivateOperationalSurface) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="pt-[4.5rem]">{children}</main>
      <Footer />
      <EventPopup />
    </>
  );
}
