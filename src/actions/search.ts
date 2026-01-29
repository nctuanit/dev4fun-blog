'use server';

import { getSortedPostsData } from '@/lib/posts';

export interface SearchResult {
    slug: string;
    title: string;
    description: string;
    date: string;
    tags?: string[];
    coverImage?: string;
    readTime?: string;
}

export async function searchPosts(query: string): Promise<SearchResult[]> {
    // Return empty array if query is empty
    if (!query || !query.trim()) {
        return [];
    }

    const posts = getSortedPostsData();
    const normalizedQuery = query.toLowerCase().trim();
    const words = normalizedQuery.split(/\s+/);

    const filtered = posts.filter((post) => {
        const titleMatch = post.frontmatter.title.toLowerCase();
        const descMatch = post.frontmatter.description.toLowerCase();
        const tagsMatch = post.frontmatter.tags?.join(' ').toLowerCase() || '';

        // Check if all words are found in title, description, or tags
        return words.every(
            (word) =>
                titleMatch.includes(word) || descMatch.includes(word) || tagsMatch.includes(word)
        );
    });
    // Sort by relevance (title matches first)
    filtered.sort((a, b) => {
        const aTitle = a.frontmatter.title.toLowerCase();
        const bTitle = b.frontmatter.title.toLowerCase();
        const aHasTitle = words.some((w) => aTitle.includes(w));
        const bHasTitle = words.some((w) => bTitle.includes(w));

        if (aHasTitle && !bHasTitle) return -1;
        if (!aHasTitle && bHasTitle) return 1;
        return 0;
    });
    // Return top 5 results with only necessary fields
    return filtered.slice(0, 5).map((post) => ({
        slug: post.slug,
        title: post.frontmatter.title,
        description: post.frontmatter.description,
        date: post.frontmatter.date,
        tags: post.frontmatter.tags,
        coverImage: post.frontmatter.coverImage,
        readTime: post.frontmatter.readTime,
    }));
}
