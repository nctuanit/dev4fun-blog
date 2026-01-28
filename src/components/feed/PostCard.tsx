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
    slug?: string
}

const AVATAR_COLORS = [
    "from-pink-500 to-rose-500",
    "from-violet-500 to-purple-500",
    "from-blue-500 to-cyan-500",
    "from-green-500 to-emerald-500",
    "from-yellow-500 to-orange-500",
    "from-indigo-500 to-violet-500",
];

function getAvatarColor(name: string) {
    const index = name.charCodeAt(0) % AVATAR_COLORS.length;
    return AVATAR_COLORS[index];
}

export function PostCard({ title, description, author, tags, readTime, coverImage, isFirst, slug }: PostCardProps) {
    const avatarColor = getAvatarColor(author.name);
    
    // Layout cho bài viết đầu tiên (featured)
    if (isFirst && coverImage) {
        return (
            <article className="group relative bg-card border border-border/50 rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-5 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                {/* Gradient border on hover */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none gradient-border"></div>
                
                <div className="relative w-full h-[200px] sm:h-[280px] md:h-[320px] overflow-hidden">
                    <Image
                        src={coverImage}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Enhanced gradient overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>
                    
                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
                        {/* Author Info */}
                        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                            <div className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br ${avatarColor} flex items-center justify-center text-white font-bold shadow-md text-xs sm:text-sm`}>
                                {author.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs sm:text-sm font-semibold text-white drop-shadow-md">
                                    {author.name}
                                </span>
                                <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-white/80">
                                    <span>{author.date}</span>
                                    <span className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-white/50"></span>
                                    <span className="flex items-center gap-0.5 sm:gap-1">
                                        <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                        {readTime} phút đọc
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Title */}
                        <Link href={`/post/${slug}`} className="block mb-2 sm:mb-3">
                            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-white drop-shadow-lg group-hover:text-primary transition-colors duration-200 leading-snug line-clamp-2">
                                {title}
                            </h2>
                        </Link>

                        {/* Tags */}
                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                {tags.slice(0, 3).map(tag => (
                                    <Link
                                        key={tag}
                                        href={`/tags/${tag.replace('#', '')}`}
                                        className="text-[10px] sm:text-xs font-medium text-white/90 hover:text-white px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 backdrop-blur-sm"
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
        <article className="group relative bg-card border border-border/50 rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-5 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
            {/* Gradient border on hover */}
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none gradient-border"></div>
            
            <div className="flex flex-col sm:flex-row">
                {/* Content bên trái */}
                <div className="flex-1 p-4 sm:p-5 md:p-6">
                    {/* Author Info */}
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <div className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg sm:rounded-xl bg-gradient-to-br ${avatarColor} flex items-center justify-center text-white font-bold shadow-md text-xs sm:text-sm`}>
                            {author.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs sm:text-sm font-semibold text-foreground">
                                {author.name}
                            </span>
                            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground">
                                <span>{author.date}</span>
                                <span className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-muted-foreground/50"></span>
                                <span className="flex items-center gap-0.5 sm:gap-1">
                                    <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                    {readTime} phút đọc
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <Link href={`/post/${slug}`} className="block mb-1.5 sm:mb-2">
                        <h2 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200 leading-snug line-clamp-2">
                            {title}
                        </h2>
                    </Link>

                    {/* Description */}
                    {description && (
                        <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 line-clamp-2 leading-relaxed">
                            {description}
                        </p>
                    )}

                    {/* Tags */}
                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {tags.slice(0, 3).map(tag => (
                                <Link
                                    key={tag}
                                    href={`/tags/${tag.replace('#', '')}`}
                                    className="text-[10px] sm:text-xs font-medium text-muted-foreground hover:text-primary px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg bg-secondary/50 hover:bg-primary/10 transition-all duration-200"
                                >
                                    {tag}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Thumbnail bên phải */}
                {coverImage && (
                    <div className="sm:w-[140px] md:w-[180px] lg:w-[200px] shrink-0">
                        <Link href={`/post/${slug}`} className="block h-full">
                            <div className="relative w-full h-[140px] sm:h-full overflow-hidden">
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
