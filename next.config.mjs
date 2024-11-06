/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "replicate.com",
      },
      {
        protocol: "https",
        hostname: "replicate.delivery",
      },
    ],
  },
  output: "standalone",
  //TODO: Remove this after fixing the lint errors
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
