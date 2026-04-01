/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable optimizations
  compress: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  
  // Optimize package imports for Vercel builds
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
};

module.exports = nextConfig;
