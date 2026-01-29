import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    cacheComponents: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
            },
            {
                protocol: 'https',
                hostname: 'dev4fun.vn',
            },
            {
                protocol: 'https',
                hostname: 'pub-a893aee04799448e98702e8da7edff53.r2.dev',
            },
        ],
    },
};

export default nextConfig;
