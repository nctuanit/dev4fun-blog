import { SITE_CONFIG } from '@/lib/constants';
import { MetadataRoute } from 'next';

const BASE_URL = SITE_CONFIG.url;

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/_next/', '/private/'],
            },
        ],
        sitemap: `${BASE_URL}/sitemap.xml`
    };
}
