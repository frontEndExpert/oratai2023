/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx"],

  trailingSlash: true,
  experimental: {
    appDir: false,
    typedRoutes: true
  },
  images: { unoptimized: true }
}

module.exports = nextConfig

//output: "export",
// reactStrictMode: false,
//
