/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx"],
  experimental: {
    appDir: true,
    typedRoutes: true
  }
}

module.exports = nextConfig
