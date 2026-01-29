import { PostCard } from '@/components/feed/PostCard';
import { getSortedPostsData } from '@/lib/posts';
import { FileText } from 'lucide-react';

export default function Home() {
    const posts = getSortedPostsData();

    return (
        <div className="text-foreground">
            {/* Page Title */}
            <div className="mb-4 sm:mb-6">
                <h1 className="text-xl font-bold sm:text-2xl lg:text-3xl">Bài viết mới nhất</h1>
                <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
                    Chia sẻ kiến thức lập trình và công nghệ
                </p>
            </div>
            {/* Posts Feed */}
            {posts.length > 0 ? (
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
            ) : (
                <div className="bg-card border-border/50 flex flex-col items-center justify-center rounded-2xl border py-12 text-center sm:py-16 lg:py-20">
                    <div className="from-primary/20 mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br via-purple-500/20 to-pink-500/20 sm:mb-4 sm:h-14 sm:w-14 lg:h-16 lg:w-16">
                        <FileText className="text-primary h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
                    </div>
                    <h3 className="mb-2 text-base font-bold sm:text-lg">Chưa có bài viết nào</h3>
                    <p className="text-muted-foreground max-w-sm px-4 text-xs sm:text-sm">
                        Thêm file .mdx vào thư mục{' '}
                        <code className="bg-secondary rounded px-1.5 py-0.5 text-xs">
                            content/posts
                        </code>{' '}
                        để bắt đầu.
                    </p>
                </div>
            )}
        </div>
    );
}
