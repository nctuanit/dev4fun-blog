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

    return {
        title: post.frontmatter.title,
        description: post.frontmatter.description || post.frontmatter.title,
        openGraph: {
            title: post.frontmatter.title,
            description: post.frontmatter.description || post.frontmatter.title,
            images: post.frontmatter.coverImage ? [post.frontmatter.coverImage] : [],
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
        <PostContent frontmatter={post.frontmatter} headings={headings}>
            <MDXContent source={post.content} />
        </PostContent>
    );
}
