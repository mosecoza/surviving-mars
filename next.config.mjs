/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "**",
      },
    ],
  },
  webpack: function (config) {
    config.module.rules.push({
      test: /\.(md|node)$/,
      use: "raw-loader",
    });
    return config;
  },
  swcMinify: true,
  staticPageGenerationTimeout: 1000,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  output: "standalone",
};

export default nextConfig;
