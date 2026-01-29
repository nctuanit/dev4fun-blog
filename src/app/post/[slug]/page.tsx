import { getPostBySlug, getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';
import { Metadata } from 'next';
import PostContent from './content';
import MDXContent from './mdx-content';
import { extractHeadings } from '@/lib/method.util';

export async function generateStaticParams() {
    const posts = getSortedPostsData();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    const post = getPostBySlug(params.slug);

    if (!post) {
        return {
            title: 'Không tìm thấy bài viết',
        };
    }

    const { title, description, coverImage } = post.frontmatter;
    const ogImage = `/api/og?title=${encodeURIComponent(title)}`;

    return {
        title: title,
        description: description || title,
        openGraph: {
            title: title,
            description: description || title,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
                ...(coverImage ? [{ url: coverImage }] : []) // Fallback/Secondary image
            ],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: title,
            description: description || title,
            images: [ogImage],
        },
    };
}

export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const post = getPostBySlug(params.slug);

    if (!post) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Không tìm thấy bài viết</h1>
                <Link href="/" className="text-primary hover:underline">
                    Quay về trang chủ
                </Link>
            </div>
        );
    }

    // Extract headings from markdown content for TOC
    const headings = extractHeadings(post.content);

    return (
        <PostContent frontmatter={post.frontmatter} headings={headings} slug={post.slug}>
            <MDXContent source={post.content} />
        </PostContent>
    );
}
