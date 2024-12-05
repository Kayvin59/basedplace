const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: config => {
      config.externals.push('pino-pretty', 'lokijs', 'encoding')
      return config
    }
}

module.exports = withBundleAnalyzer(nextConfig)

module.exports = {
  experimental: {
    optimizeCss: true,
  },
};

/* export default nextConfig;
 */