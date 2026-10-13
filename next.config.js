/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async headers() {
    // Signed-in and admin areas must never appear in search results. This
    // header works even where a page cannot export metadata (client layouts),
    // and robots.txt disallows the same paths.
    const noindex = [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }];
    const privatePaths = [
      '/partner-portal', '/partner-portal/:path*',
      '/channel-admin', '/channel-admin/:path*',
      '/portal-admin', '/portal-admin/:path*',
      '/sign-in', '/sign-up',
    ];
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      ...privatePaths.map((source) => ({ source, headers: noindex })),
    ];
  },
  async redirects() {
    return [
      // Module URL shortened (October 2026): the brand name added nothing.
      {
        source: '/platform/secure-ai-agents-omnipriv',
        destination: '/platform/secure-ai-agents',
        permanent: true,
      },
      // Audit, Governance & Compliance moved to its SEO URL (October 2026).
      {
        source: '/platform/audit-compliance',
        destination: '/privileged-access-audit-compliance',
        permanent: true,
      },
      // The Identity Security hub was briefly served from the top level.
      {
        source: '/identity-security',
        destination: '/platform/identity-security',
        permanent: true,
      },
      // Threat Detection & Response was renamed to AI Threat Protection.
      {
        source: '/platform/threat-detection',
        destination: '/platform/ai-threat-protection',
        permanent: true,
      },
      // Privileged Session Management was renamed to Secure Remote Access.
      {
        source: '/platform/session-management',
        destination: '/platform/secure-remote-access',
        permanent: true,
      },
      // AI Agent Governance was renamed to Secure AI Agents.
      {
        source: '/platform/ai-agent-governance',
        destination: '/platform/secure-ai-agents',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
