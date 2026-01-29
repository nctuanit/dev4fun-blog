import { MetadataRoute } from 'next';
import { getSortedPostsData, getAllTags } from '@/lib/posts';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://dev4fun.blog';

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getSortedPostsData();
    const tags = getAllTags();

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/tags`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
    ];

    // Blog posts
    const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${BASE_URL}/post/${encodeURIComponent(post.slug)}`,
        lastModified: new Date(post.frontmatter.date),
        changeFrequency: 'weekly',
        priority: 0.9,
    }));

    // Tag pages
    const tagPages: MetadataRoute.Sitemap = tags.map((tag) => ({
        url: `${BASE_URL}/tags/${encodeURIComponent(tag.name)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
    }));

    return [...staticPages, ...postPages, ...tagPages];
}
