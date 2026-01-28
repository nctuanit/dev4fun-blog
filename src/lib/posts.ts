import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface Post {
    slug: string;
    frontmatter: {
        title: string;
        date: string;
        description: string;
        coverImage?: string;
        tags?: string[];
        author?: string;
        readTime?: string;
    };
    content: string;
}

export function getSortedPostsData(): Post[] {
    // Create content/posts if it doesn't exist
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // Remove ".mdx" from file name to get id
        const slug = fileName.replace(/\.mdx$/, '');

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        return {
            slug,
            frontmatter: matterResult.data as Post['frontmatter'],
            content: matterResult.content,
        };
    });

    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.frontmatter.date < b.frontmatter.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getPostBySlug(slug: string): Post | null {
    try {
        // Decode URL-encoded slug (e.g., "hello-world%20copy" -> "hello-world copy")
        const decodedSlug = decodeURIComponent(slug);
        const fullPath = path.join(postsDirectory, `${decodedSlug}.mdx`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);
        return {
            slug: decodedSlug,
            frontmatter: matterResult.data as Post['frontmatter'],
            content: matterResult.content,
        };
    } catch (e) {
        console.log(e)
        return null;
    }
}

export interface TagInfo {
    name: string;
    count: number;
}

export function getAllTags(): TagInfo[] {
    const posts = getSortedPostsData();
    const tagCount: Record<string, number> = {};

    posts.forEach((post) => {
        const tags = post.frontmatter.tags || [];
        tags.forEach((tag) => {
            tagCount[tag] = (tagCount[tag] || 0) + 1;
        });
    });

    return Object.entries(tagCount)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);
}

export function getPostsByTag(tag: string): Post[] {
    const posts = getSortedPostsData();
    return posts.filter((post) => 
        post.frontmatter.tags?.includes(tag)
    );
}
