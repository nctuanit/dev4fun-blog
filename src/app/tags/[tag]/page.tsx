
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
                    className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors mb-4 sm:mb-5 md:mb-6"
                >
                    <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Tất cả tags
                </Link>

                {/* Page Title */}
                <div className="mb-5 sm:mb-6 md:mb-8">
                    <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                            <Hash className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">#{decodedTag}</h1>
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
                                date: post.frontmatter.date
                            }}
                            tags={post.frontmatter.tags ? post.frontmatter.tags.map(t => `#${t}`) : []}
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
