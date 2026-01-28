'use client';

import Link from 'next/link';
import { BookOpen, ChevronLeft, ChevronRight, List } from 'lucide-react';
import { useState } from 'react';

export interface SeriesPost {
    slug: string;
    title: string;
    order: number;
}

export interface Series {
    name: string;
    description?: string;
    posts: SeriesPost[];
}

interface SeriesNavigationProps {
    series: Series;
    currentSlug: string;
}

export default function SeriesNavigation({ series, currentSlug }: SeriesNavigationProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const sortedPosts = [...series.posts].sort((a, b) => a.order - b.order);
    const currentIndex = sortedPosts.findIndex((p) => p.slug === currentSlug);
    const prevPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
    const nextPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;

    return (
        <div className="bg-primary/5 border border-primary/20 rounded-xl overflow-hidden mb-6">
            {/* Header */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center gap-3 p-4 hover:bg-primary/10 transition-colors"
            >
                <div className="p-2 rounded-lg bg-primary/10">
                    <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 text-left">
                    <div className="text-sm text-muted-foreground">Series</div>
                    <div className="font-semibold text-foreground">{series.name}</div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                        {currentIndex + 1}/{sortedPosts.length}
                    </span>
                    <List className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
            </button>

            {/* Posts list */}
            {isExpanded && (
                <div className="border-t border-primary/20 p-2 max-h-64 overflow-y-auto">
                    {sortedPosts.map((post, index) => (
                        <Link
                            key={post.slug}
                            href={`/post/${post.slug}`}
                            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                                post.slug === currentSlug
                                    ? 'bg-primary/10 text-primary'
                                    : 'hover:bg-secondary/50 text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                                post.slug === currentSlug
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-secondary'
                            }`}>
                                {index + 1}
                            </span>
                            <span className="flex-1 line-clamp-1 text-sm">{post.title}</span>
                        </Link>
                    ))}
                </div>
            )}

            {/* Navigation */}
            <div className="flex border-t border-primary/20">
                {prevPost ? (
                    <Link
                        href={`/post/${prevPost.slug}`}
                        className="flex-1 flex items-center gap-2 p-3 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        <span className="line-clamp-1">Trước</span>
                    </Link>
                ) : (
                    <div className="flex-1" />
                )}
                
                <div className="w-px bg-primary/20" />
                
                {nextPost ? (
                    <Link
                        href={`/post/${nextPost.slug}`}
                        className="flex-1 flex items-center justify-end gap-2 p-3 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                    >
                        <span className="line-clamp-1">Tiếp</span>
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                ) : (
                    <div className="flex-1" />
                )}
            </div>
        </div>
    );
}
