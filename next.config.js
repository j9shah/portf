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
};

module.exports = nextConfig;
