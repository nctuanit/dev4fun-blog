import Link from 'next/link';
import { Tag, TrendingUp } from 'lucide-react';
import { SITE_CONFIG, PAGINATION } from '@/lib/constants';

interface SidebarTagInfo {
    name: string;
    count: number;
}

interface SidebarPostInfo {
    slug: string;
    title: string;
}

interface RightSidebarProps {
    tags?: SidebarTagInfo[];
    recentPosts?: SidebarPostInfo[];
}

export function RightSidebar({ tags, recentPosts }: RightSidebarProps) {
    // Lấy tất cả tags từ bài viết, sắp xếp theo số lượng bài viết (phổ biến nhất)
    const allTags = tags ?? [];
    // Hiển thị ít nhất 8 tags (từ config)
    const popularTags = allTags.slice(0, Math.max(PAGINATION.popularTagsCount, allTags.length));

    // Lấy bài viết mới nhất
    const recentPostsData = recentPosts ?? [];

    return (
        <aside className="sticky top-20 hidden h-fit w-[280px] shrink-0 space-y-5 py-4 xl:block">
            {/* Tags */}
            <div className="bg-card border-border/50 overflow-hidden rounded-2xl border shadow-sm transition-shadow hover:shadow-md">
                <div className="border-border/50 border-b bg-gradient-to-r from-purple-500/5 to-pink-500/5 p-4">
                    <h3 className="flex items-center gap-2 font-bold">
                        <Tag className="h-4 w-4 text-purple-500" />
                        Tags phổ biến
                    </h3>
                </div>
                <div className="flex flex-wrap gap-2 p-4">
                    {popularTags.length > 0 ? (
                        popularTags.map((tag) => (
                            <Link
                                key={tag.name}
                                href={`/tags/${tag.name}`}
                                className="group bg-secondary hover:bg-primary/10 relative rounded-lg px-3 py-1.5 transition-all hover:scale-105"
                            >
                                <span className="text-muted-foreground group-hover:text-primary text-sm font-medium transition-colors">
                                    #{tag.name}
                                </span>
                            </Link>
                        ))
                    ) : (
                        <p className="text-muted-foreground text-sm">Chưa có tags nào</p>
                    )}
                </div>
            </div>

            {/* Recent Posts */}
            {recentPostsData.length > 0 && (
                <div className="bg-card border-border/50 overflow-hidden rounded-2xl border shadow-sm transition-shadow hover:shadow-md">
                    <div className="border-border/50 border-b bg-gradient-to-r from-cyan-500/5 to-blue-500/5 p-4">
                        <h3 className="flex items-center gap-2 font-bold">
                            <TrendingUp className="h-4 w-4 text-cyan-500" />
                            Bài viết gần đây
                        </h3>
                    </div>
                    <div className="space-y-1 p-3">
                        {recentPostsData.map((post, index) => (
                            <Link
                                key={post.slug}
                                href={`/post/${post.slug}`}
                                className="group hover:bg-secondary/50 flex items-start gap-3 rounded-xl p-2 transition-colors"
                            >
                                <span className="from-primary/20 text-primary flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br to-purple-500/20 text-xs font-bold">
                                    {index + 1}
                                </span>
                                <span className="text-muted-foreground group-hover:text-foreground line-clamp-2 text-sm leading-snug transition-colors">
                                    {post.title}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            {/* About */}
            <div className="bg-card border-border/50 rounded-2xl border p-5 shadow-sm">
                <h3 className="mb-3 font-bold">Về {SITE_CONFIG.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                    {SITE_CONFIG.description}
                </p>
            </div>
        </aside>
    );
}
