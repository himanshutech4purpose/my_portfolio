/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 15 configuration
  outputFileTracingRoot: require('path').join(__dirname),
  
  // Performance optimizations
  compress: true,
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ['res.cloudinary.com'],
  },
  
  // React strict mode for better development experience
  reactStrictMode: true,
  devIndicators: false,
}

module.exports = nextConfig
