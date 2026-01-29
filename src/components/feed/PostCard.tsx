import Image from 'next/image';
import Link from 'next/link';
import { Clock } from 'lucide-react';

interface PostCardProps {
    title: string;
    description?: string;
    author: {
        name: string;
        image: string;
        date: string;
    };
    tags: string[];
    readTime: string;
    coverImage?: string;
    isFirst?: boolean;
    slug?: string;
}

const AVATAR_COLORS = [
    'from-pink-500 to-rose-500',
    'from-violet-500 to-purple-500',
    'from-blue-500 to-cyan-500',
    'from-green-500 to-emerald-500',
    'from-yellow-500 to-orange-500',
    'from-indigo-500 to-violet-500',
];

function getAvatarColor(name: string) {
    const index = name.charCodeAt(0) % AVATAR_COLORS.length;
    return AVATAR_COLORS[index];
}

export function PostCard({
    title,
    description,
    author,
    tags,
    readTime,
    coverImage,
    isFirst,
    slug,
}: PostCardProps) {
    const avatarColor = getAvatarColor(author.name);

    // Layout cho bài viết đầu tiên (featured)
    if (isFirst && coverImage) {
        return (
            <article className="group bg-card border-border/50 hover:shadow-primary/5 relative mb-4 overflow-hidden rounded-xl border shadow-sm transition-all duration-300 hover:shadow-xl sm:mb-5 sm:rounded-2xl">
                {/* Gradient border on hover */}
                <div className="gradient-border pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:rounded-2xl"></div>

                <div className="relative aspect-[3/2] w-full overflow-hidden">
                    <Image
                        src={coverImage}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Enhanced gradient overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>

                    {/* Content overlay */}
                    <div className="absolute right-0 bottom-0 left-0 p-4 sm:p-5 md:p-6">
                        {/* Author Info */}
                        <div className="mb-2 flex items-center gap-2 sm:mb-3 sm:gap-3">
                            <div
                                className={`h-8 w-8 rounded-lg bg-gradient-to-br sm:h-9 sm:w-9 sm:rounded-xl md:h-10 md:w-10 ${avatarColor} flex items-center justify-center text-xs font-bold text-white shadow-md sm:text-sm`}
                            >
                                {author.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-semibold text-white drop-shadow-md sm:text-sm">
                                    {author.name}
                                </span>
                                <div className="flex items-center gap-1.5 text-[10px] text-white/80 sm:gap-2 sm:text-xs">
                                    <span>{author.date}</span>
                                    <span className="h-0.5 w-0.5 rounded-full bg-white/50 sm:h-1 sm:w-1"></span>
                                    <span className="flex items-center gap-0.5 sm:gap-1">
                                        <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                        {readTime} phút đọc
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Title */}
                        <Link href={`/post/${slug}`} className="mb-2 block sm:mb-3">
                            <h2 className="group-hover:text-primary line-clamp-2 text-lg leading-snug font-bold tracking-tight text-white drop-shadow-lg transition-colors duration-200 sm:text-xl md:text-2xl lg:text-3xl">
                                {title}
                            </h2>
                        </Link>

                        {/* Tags */}
                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                {tags.slice(0, 3).map((tag) => (
                                    <Link
                                        key={tag}
                                        href={`/tags/${tag.replace('#', '')}`}
                                        className="rounded-md bg-white/20 px-2 py-0.5 text-[10px] font-medium text-white/90 backdrop-blur-sm transition-all duration-200 hover:bg-white/30 hover:text-white sm:rounded-lg sm:px-2.5 sm:py-1 sm:text-xs"
                                    >
                                        {tag}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </article>
        );
    }

    // Layout cân đối với thumbnail bên phải
    return (
        <article className="group bg-card border-border/50 hover:shadow-primary/5 relative mb-4 overflow-hidden rounded-xl border shadow-sm transition-all duration-300 hover:shadow-xl sm:mb-5 sm:rounded-2xl">
            {/* Gradient border on hover */}
            <div className="gradient-border pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:rounded-2xl"></div>

            <div className="flex flex-col sm:flex-row">
                {/* Content bên trái */}
                <div className="flex-1 p-4 sm:p-5 md:p-6">
                    {/* Author Info */}
                    <div className="mb-2 flex items-center gap-2 sm:mb-3 sm:gap-3">
                        <div
                            className={`h-7 w-7 rounded-lg bg-gradient-to-br sm:h-8 sm:w-8 sm:rounded-xl md:h-9 md:w-9 ${avatarColor} flex items-center justify-center text-xs font-bold text-white shadow-md sm:text-sm`}
                        >
                            {author.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-foreground text-xs font-semibold sm:text-sm">
                                {author.name}
                            </span>
                            <div className="text-muted-foreground flex items-center gap-1.5 text-[10px] sm:gap-2 sm:text-xs">
                                <span>{author.date}</span>
                                <span className="bg-muted-foreground/50 h-0.5 w-0.5 rounded-full sm:h-1 sm:w-1"></span>
                                <span className="flex items-center gap-0.5 sm:gap-1">
                                    <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                    {readTime} phút đọc
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <Link href={`/post/${slug}`} className="mb-1.5 block sm:mb-2">
                        <h2 className="text-foreground group-hover:text-primary line-clamp-2 text-base leading-snug font-bold tracking-tight transition-colors duration-200 sm:text-lg md:text-xl">
                            {title}
                        </h2>
                    </Link>

                    {/* Description */}
                    {description && (
                        <p className="text-muted-foreground mb-2 line-clamp-2 text-xs leading-relaxed sm:mb-3 sm:text-sm">
                            {description}
                        </p>
                    )}

                    {/* Tags */}
                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {tags.slice(0, 3).map((tag) => (
                                <Link
                                    key={tag}
                                    href={`/tags/${tag.replace('#', '')}`}
                                    className="text-muted-foreground hover:text-primary bg-secondary/50 hover:bg-primary/10 rounded-md px-2 py-0.5 text-[10px] font-medium transition-all duration-200 sm:rounded-lg sm:px-2.5 sm:py-1 sm:text-xs"
                                >
                                    {tag}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Thumbnail bên phải */}
                {coverImage && (
                    <div className="shrink-0 sm:w-[200px] md:w-[240px] lg:w-[280px]">
                        <Link href={`/post/${slug}`} className="block h-full w-full">
                            <div className="relative aspect-[3/2] w-full overflow-hidden sm:aspect-auto sm:h-full">
                                <Image
                                    src={coverImage}
                                    alt={title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </article>
    );
}
