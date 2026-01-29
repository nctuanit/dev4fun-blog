import { PostCard } from '@/components/feed/PostCard';
import { getAllTags, getPostsByTag } from '@/lib/posts';
import { Hash, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface TagPageProps {
    params: Promise<{
        tag: string;
    }>;
}

export async function generateStaticParams() {
    const tags = getAllTags();
    return tags.map((tag) => ({
        tag: tag.name,
    }));
}

export async function generateMetadata({ params }: TagPageProps) {
    const { tag } = await params;
    const decodedTag = decodeURIComponent(tag);
    return {
        title: `#${decodedTag} - Dev4Fun Blog`,
        description: `Tất cả bài viết với tag ${decodedTag}`,
    };
}

export default async function TagPage({ params }: TagPageProps) {
    const { tag } = await params;
    const decodedTag = decodeURIComponent(tag);
    const posts = getPostsByTag(decodedTag);

    if (posts.length === 0) {
        notFound();
    }

    return (
        <div>
            <div className="text-foreground">
                {/* Back link */}
                <Link
                    href="/tags"
                    className="text-muted-foreground hover:text-primary mb-4 inline-flex items-center gap-1.5 text-xs transition-colors sm:mb-5 sm:gap-2 sm:text-sm md:mb-6"
                >
                    <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Tất cả tags
                </Link>

                {/* Page Title */}
                <div className="mb-5 sm:mb-6 md:mb-8">
                    <div className="mb-1.5 flex items-center gap-2 sm:mb-2 sm:gap-3">
                        <div className="from-primary/20 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br to-purple-500/20 sm:h-11 sm:w-11 sm:rounded-xl md:h-12 md:w-12">
                            <Hash className="text-primary h-5 w-5 sm:h-5.5 sm:w-5.5 md:h-6 md:w-6" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold sm:text-2xl lg:text-3xl">
                                #{decodedTag}
                            </h1>
                            <p className="text-muted-foreground text-xs sm:text-sm">
                                {posts.length} bài viết
                            </p>
                        </div>
                    </div>
                </div>

                {/* Posts Feed */}
                <div className="space-y-0">
                    {posts.map((post, index) => (
                        <PostCard
                            key={post.slug}
                            slug={post.slug}
                            title={post.frontmatter.title}
                            description={post.frontmatter.description}
                            author={{
                                name: post.frontmatter.author || 'Dev4Fun',
                                image: '',
                                date: post.frontmatter.date,
                            }}
                            tags={
                                post.frontmatter.tags
                                    ? post.frontmatter.tags.map((t) => `#${t}`)
                                    : []
                            }
                            readTime={post.frontmatter.readTime || '5'}
                            coverImage={post.frontmatter.coverImage}
                            isFirst={index === 0}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
