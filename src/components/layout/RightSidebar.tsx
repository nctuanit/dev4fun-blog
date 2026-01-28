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
        <aside className="hidden xl:block w-[280px] shrink-0 space-y-5 sticky top-20 h-fit py-4">
            
            {/* Tags */}
            <div className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4 border-b border-border/50 bg-gradient-to-r from-purple-500/5 to-pink-500/5">
                    <h3 className="font-bold flex items-center gap-2">
                        <Tag className="w-4 h-4 text-purple-500" />
                        Tags phổ biến
                    </h3>
                </div>
                <div className="p-4 flex flex-wrap gap-2">
                    {popularTags.length > 0 ? (
                        popularTags.map(tag => (
                            <Link 
                                key={tag.name} 
                                href={`/tags/${tag.name}`} 
                                className="group relative px-3 py-1.5 rounded-lg bg-secondary hover:bg-primary/10 transition-all hover:scale-105"
                            >
                                <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                                    #{tag.name}
                                </span>
                            </Link>
                        ))
                    ) : (
                        <p className="text-sm text-muted-foreground">Chưa có tags nào</p>
                    )}
                </div>
            </div>

            {/* Recent Posts */}
            {recentPostsData.length > 0 && (
                <div className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-4 border-b border-border/50 bg-gradient-to-r from-cyan-500/5 to-blue-500/5">
                        <h3 className="font-bold flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-cyan-500" />
                            Bài viết gần đây
                        </h3>
                    </div>
                    <div className="p-3 space-y-1">
                        {recentPostsData.map((post, index) => (
                            <Link 
                                key={post.slug}
                                href={`/post/${post.slug}`}
                                className="group flex items-start gap-3 p-2 rounded-xl hover:bg-secondary/50 transition-colors"
                            >
                                <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center text-xs font-bold text-primary">
                                    {index + 1}
                                </span>
                                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors line-clamp-2 leading-snug">
                                    {post.title}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            {/* About */}
            <div className="bg-card rounded-2xl border border-border/50 p-5 shadow-sm">
                <h3 className="font-bold mb-3">Về {SITE_CONFIG.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {SITE_CONFIG.description}
                </p>
            </div>

        </aside>
    );
}
