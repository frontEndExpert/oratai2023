/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx"],

  trailingSlash: true,
  experimental: {
    appDir: true,
    typedRoutes: true
  }
}

module.exports = nextConfig

//
// reactStrictMode: false,
//  output: "export",
