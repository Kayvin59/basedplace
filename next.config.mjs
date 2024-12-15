// @ts-check
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  webpack: config => {
    config.externals.push('pino-pretty', 'encoding')
    return config
  }
}

export default nextConfig