import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "OmniPriv Partner Portal | Enterprise Channel Workspace",
  description: "Official OmniPriv Partner Portal and Channel Management workspace. Register opportunities, track protection locks, and manage enterprise PAM customer accounts.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 dark:bg-[#030711] text-slate-900 dark:text-slate-100 antialiased font-sans">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
