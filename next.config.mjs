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
    logging: {
        fetches: {
            fullUrl: true
        }
    },
    output: 'standalone'
};

export default nextConfig;
