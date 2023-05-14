/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx"],
  output: "export",
  experimental: {
    appDir: true,
    typedRoutes: true
  }
}

module.exports = nextConfig
