/** @type {import('next').NextConfig} */
module.exports = {
  poweredByHeader: false,
  // Include multipart overhead above the existing 10 MB authority-file limit.
  experimental: { proxyClientMaxBodySize: '12mb' },
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Content-Security-Policy', value: "base-uri 'self'; frame-ancestors 'self'; object-src 'none'" },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      ],
    }];
  },
};
