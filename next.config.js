/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  nextConfig: nextConfig,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.nike.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}
