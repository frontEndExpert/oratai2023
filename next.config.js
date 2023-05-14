/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx"],
  output: "standalone",
  experimental: {
    appDir: true,
    typedRoutes: true
  }
}

module.exports = nextConfig
