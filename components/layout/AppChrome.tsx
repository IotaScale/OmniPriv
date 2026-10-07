"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Strip public marketing navigation and footer on private operational application pages
  const isPrivateOperationalSurface =
    pathname.startsWith("/partner-portal") ||
    pathname.startsWith("/channel-admin") ||
    pathname.startsWith("/portal-admin") ||
    pathname === "/sign-in";

  if (isPrivateOperationalSurface) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="pt-[72px]">{children}</main>
      <Footer />
    </>
  );
}
