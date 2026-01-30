import { Tag, TrendingUp, Github, Layers } from 'lucide-react';
import { SITE_CONFIG, PAGINATION, SOCIAL_LINKS } from '@/lib/constants';
import Link from 'next/link';

interface SidebarTagInfo {
    name: string;
    count: number;
}

interface SidebarCategoryInfo {
    name: string;
    count: number;
}

interface SidebarPostInfo {
    slug: string;
    title: string;
}

interface RightSidebarProps {
    tags?: SidebarTagInfo[];
    categories?: SidebarCategoryInfo[];
    recentPosts?: SidebarPostInfo[];
}

export function RightSidebar({ tags, categories, recentPosts }: RightSidebarProps) {
    // Lấy tất cả tags từ bài viết, sắp xếp theo số lượng bài viết (phổ biến nhất)
    const allTags = tags ?? [];
    // Hiển thị ít nhất 8 tags (từ config)
    const popularTags = allTags.slice(0, Math.max(PAGINATION.popularTagsCount, allTags.length));

    // Lấy bài viết mới nhất
    // Lấy bài viết mới nhất
    const recentPostsData = recentPosts ?? [];

    // Lấy danh muc
    const categoriesData = categories ?? [];

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

            {/* Categories */}
            <div className="bg-card border-border/50 overflow-hidden rounded-2xl border shadow-sm transition-shadow hover:shadow-md">
                <div className="border-border/50 border-b bg-gradient-to-r from-blue-500/5 to-cyan-500/5 p-4">
                    <h3 className="flex items-center gap-2 font-bold">
                        <Layers className="h-4 w-4 text-blue-500" />
                        Danh mục
                    </h3>
                </div>
                <div className="flex flex-col p-2">
                    {categoriesData.length > 0 ? (
                        categoriesData.map((category) => (
                            <Link
                                key={category.name}
                                href={`/categories/${category.name}`}
                                className="group hover:bg-secondary/50 flex items-center justify-between rounded-lg px-3 py-2 transition-colors"
                            >
                                <span className="text-muted-foreground group-hover:text-primary text-sm font-medium transition-colors">
                                    {category.name}
                                </span>
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-xs font-medium text-secondary-foreground group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                                    {category.count}
                                </span>
                            </Link>
                        ))
                    ) : (
                        <div className="p-2 text-muted-foreground text-sm">Chưa có danh mục nào</div>
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
                                className="group hover:bg-secondary/50 flex items-center gap-3 rounded-xl p-2 transition-colors"
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
            {/* Source Code */}
            <div className="bg-card border-border/50 overflow-hidden rounded-2xl border shadow-sm transition-shadow hover:shadow-md">
                <div className="border-border/50 border-b bg-gradient-to-r from-gray-500/5 to-slate-500/5 p-4">
                    <h3 className="flex items-center gap-2 font-bold">
                        <Github className="h-4 w-4 text-slate-500" />
                        Mã nguồn
                    </h3>
                </div>
                <div className="p-4">
                    <p className="text-muted-foreground mb-3 text-sm">
                        Blog được open source trên GitHub. Hãy cho mình 1 ⭐️ nếu bạn thấy hữu ích nhé!
                    </p>
                    <Link
                        href={`${SOCIAL_LINKS.github}/dev4fun-blog`}
                        target="_blank"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                    >
                        <Github className="h-4 w-4" />
                        Xem trên GitHub
                    </Link>
                </div>
            </div>
        </aside>
    );
}
