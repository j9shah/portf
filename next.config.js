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

  // Cache headers for OG images
  async headers() {
    return [
      {
        source: '/opengraph-image',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
