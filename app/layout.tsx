import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import AosProvider from "@/components/ui/AosProvider";
//
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

// Plus Jakarta Sans — premium modern sans used by high-end SaaS products.
// Kept under --font-syne so existing style references need no change.
const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://OmniPriv.com"),
  title: {
    default: "OmniPriv: Enterprise Privileged Access Management (PAM)",
    template: "%s | OmniPriv",
  },
  description:
    "OmniPriv delivers enterprise-grade Privileged Access Management with bastion host, session auditing, credential vaulting, and AI-driven controls. Secure every privileged session.",
  keywords: [
    "privileged access management",
    "PAM solution",
    "bastion host",
    "session auditing",
    "credential vault",
    "AI PAM",
    "enterprise security",
    "identity security",
    "access control",
    "OmniPriv",
    "SSH gateway",
    "RDP proxy",
    "MFA",
    "SSO",
    "RBAC",
  ],
  authors: [{ name: "OmniPriv Inc." }],
  creator: "OmniPriv Inc.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://OmniPriv.com",
    siteName: "OmniPriv",
    title: "OmniPriv: Enterprise Privileged Access Management",
    description:
      "Secure every privileged session with OmniPriv's enterprise PAM platform. Bastion host, session auditing, credential vaulting, and AI-driven controls.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OmniPriv PAM Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OmniPriv: Enterprise PAM",
    description:
      "Enterprise Privileged Access Management. AI-native. Always-on audit. Request a demo.",
    images: ["/og-image.png"],
  },
  verification: {
    google: "c24c76f27b101fa8",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: "/omnipriv-icon.png", type: "image/png" },
    ],
    shortcut: "/omnipriv-icon.png",
    apple: "/omnipriv-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jakartaSans.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('omnipriv-theme');if(t==='dark'){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){}})();`,
          }}
        />
        <link rel="icon" href="/omnipriv-icon.png" type="image/png" />
        <link rel="shortcut icon" href="/omnipriv-icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/omnipriv-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "OmniPriv",
              url: "https://OmniPriv.com",
              logo: "https://OmniPriv.com/logo.png",
              description:
                "Enterprise Privileged Access Management platform for securing privileged sessions, credentials, and access across your entire infrastructure.",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "sales",
                email: "sales@OmniPriv.com",
              },
              sameAs: ["https://www.linkedin.com/company/OmniPriv"],
            }),
          }}
        />
        {/*
          AOS ships `[data-aos] { opacity: 0 }`, so without JavaScript every
          animated element would stay invisible for good. Force them back to
          visible — this must stay in the head so it applies before first paint.
        */}
        <noscript>
          <style>{`[data-aos]{opacity:1!important;transform:none!important;transition:none!important}`}</style>
        </noscript>
      </head>
      <body className="bg-white text-slate-900 dark:bg-[#060b17] dark:text-slate-200 antialiased" suppressHydrationWarning>
        <AosProvider />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-W5FJSLJRGE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W5FJSLJRGE');
          `}
        </Script>
        <ThemeProvider>
          <Header />
          <main className="pt-[72px]">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
