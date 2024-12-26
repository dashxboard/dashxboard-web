import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        pathname: "/attachments/**",
      },
    ],
  },
  transpilePackages: ["ui"],
};

export default nextConfig;
