/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    useTypeScriptCli: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
