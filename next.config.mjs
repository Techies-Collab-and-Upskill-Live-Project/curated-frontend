/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["yt3.ggpht.com", "i.ytimg.com"], // Add YouTube image hosts here
  },
};

export default nextConfig;
