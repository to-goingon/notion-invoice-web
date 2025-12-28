import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,

  // Performance optimizations
  compress: true, // Enable gzip compression
  poweredByHeader: false, // Remove X-Powered-By header

  // Optimize images (if added in the future)
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
