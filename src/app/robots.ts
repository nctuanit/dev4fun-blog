import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://dev4fun.blog';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/_next/', '/private/'],
            },
        ],
        sitemap: `${BASE_URL}/sitemap.xml`,
        // Note: llms.txt is available at /llms.txt
        // Some crawlers may look for it automatically
    };
}
