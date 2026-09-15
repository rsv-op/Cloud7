// File: next.config.mjs

/**
 * Cloud7 Institutional Compiler Configuration
 * Architecture: Next.js App Router | Edge Optimized
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // Security: Obscure underlying framework from response headers
  compiler: {
    // Strip console statements in production to prevent data leakage of diagnostic telemetry
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
  experimental: {
    // Optimize client-side compute payloads
    scrollRestoration: true,
  },
};

export default nextConfig;
