import { getAllTags } from '@/lib/posts';
import { Tag, Hash } from 'lucide-react';
import Link from 'next/link';

const TAG_COLORS = [
    'from-pink-500 to-rose-500',
    'from-violet-500 to-purple-500',
    'from-blue-500 to-cyan-500',
    'from-green-500 to-emerald-500',
    'from-yellow-500 to-orange-500',
    'from-indigo-500 to-violet-500',
    'from-cyan-500 to-teal-500',
    'from-rose-500 to-pink-500',
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
                    <div className="mb-1.5 flex items-center gap-2 sm:mb-2 sm:gap-3">
                        <div className="from-primary/20 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br to-purple-500/20 sm:h-10 sm:w-10 sm:rounded-xl">
                            <Tag className="text-primary h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <h1 className="text-xl font-bold sm:text-2xl lg:text-3xl">Tất cả Tags</h1>
                    </div>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                        Khám phá các bài viết theo chủ đề
                    </p>
                </div>
                {/* Tags Grid */}
                {tags.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 md:gap-4">
                        {tags.map((tag) => {
                            const colorClass = getTagColor(tag.name);
                            return (
                                <Link
                                    key={tag.name}
                                    href={`/tags/${tag.name}`}
                                    className="group bg-card border-border/50 hover:shadow-primary/5 relative overflow-hidden rounded-xl border p-3 transition-all duration-300 hover:shadow-lg sm:rounded-2xl sm:p-4 md:p-5"
                                >
                                    {/* Gradient background on hover */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
                                    ></div>

                                    <div className="relative">
                                        <div className="mb-1 flex items-center gap-1.5 sm:mb-2 sm:gap-2">
                                            <Hash
                                                className={`text-muted-foreground group-hover:text-primary h-4 w-4 transition-colors sm:h-5 sm:w-5`}
                                            />
                                            <span className="text-foreground group-hover:text-primary truncate text-sm font-semibold transition-colors sm:text-base">
                                                {tag.name}
                                            </span>
                                        </div>
                                        <p className="text-muted-foreground text-[10px] sm:text-xs">
                                            {tag.count} bài viết
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="bg-card border-border/50 flex flex-col items-center justify-center rounded-xl border py-12 text-center sm:rounded-2xl sm:py-16 lg:py-20">
                        <div className="from-primary/20 mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br via-purple-500/20 to-pink-500/20 sm:mb-4 sm:h-14 sm:w-14 sm:rounded-2xl lg:h-16 lg:w-16">
                            <Tag className="text-primary h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
                        </div>
                        <h3 className="mb-2 text-base font-bold sm:text-lg">Chưa có tag nào</h3>
                        <p className="text-muted-foreground max-w-sm px-4 text-xs sm:text-sm">
                            Thêm tags vào frontmatter của bài viết để hiển thị ở đây.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
