
import { getAllTags } from '@/lib/posts';
import { Tag, Hash } from 'lucide-react';
import Link from 'next/link';

const TAG_COLORS = [
    "from-pink-500 to-rose-500",
    "from-violet-500 to-purple-500",
    "from-blue-500 to-cyan-500",
    "from-green-500 to-emerald-500",
    "from-yellow-500 to-orange-500",
    "from-indigo-500 to-violet-500",
    "from-cyan-500 to-teal-500",
    "from-rose-500 to-pink-500",
];

function getTagColor(tagName: string) {
    const index = tagName.charCodeAt(0) % TAG_COLORS.length;
    return TAG_COLORS[index];
}

export default function TagsPage() {
    const tags = getAllTags();

    return (
        <div>
            <div className="text-foreground">
                {/* Page Title */}
                <div className="mb-5 sm:mb-6 md:mb-8">
                    <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                            <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        </div>
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Tất cả Tags</h1>
                    </div>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                        Khám phá các bài viết theo chủ đề
                    </p>
                </div>
                {/* Tags Grid */}
                {tags.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                        {tags.map((tag) => {
                            const colorClass = getTagColor(tag.name);
                            return (
                                <Link
                                    key={tag.name}
                                    href={`/tags/${tag.name}`}
                                    className="group relative bg-card border border-border/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 overflow-hidden hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                                >
                                    {/* Gradient background on hover */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                                    
                                    <div className="relative">
                                        <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                                            <Hash className={`w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors`} />
                                            <span className="font-semibold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors truncate">
                                                {tag.name}
                                            </span>
                                        </div>
                                        <p className="text-[10px] sm:text-xs text-muted-foreground">
                                            {tag.count} bài viết
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20 text-center bg-card rounded-xl sm:rounded-2xl border border-border/50">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center">
                            <Tag className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary" />
                        </div>
                        <h3 className="text-base sm:text-lg font-bold mb-2">Chưa có tag nào</h3>
                        <p className="text-muted-foreground text-xs sm:text-sm max-w-sm px-4">
                            Thêm tags vào frontmatter của bài viết để hiển thị ở đây.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
