import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    cacheComponents: true,
    partialPrefetching: true,

    turbopack: {
        rules: {
            "*.css": {
                loaders: ["@tailwindcss/turbopack"],
                as: "*.css",
            },
        },
    },

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "raw.githubusercontent.com",
            },
        ],
    },
};

export default nextConfig;