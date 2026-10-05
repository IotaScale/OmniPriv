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
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
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
        destination: '/platform/secure-ai-agents-omnipriv',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
