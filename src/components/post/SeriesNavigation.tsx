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
        <div className="bg-primary/5 border-primary/20 mb-6 overflow-hidden rounded-xl border">
            {/* Header */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="hover:bg-primary/10 flex w-full items-center gap-3 p-4 transition-colors"
            >
                <div className="bg-primary/10 rounded-lg p-2">
                    <BookOpen className="text-primary h-5 w-5" />
                </div>
                <div className="flex-1 text-left">
                    <div className="text-muted-foreground text-sm">Series</div>
                    <div className="text-foreground font-semibold">{series.name}</div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-sm">
                        {currentIndex + 1}/{sortedPosts.length}
                    </span>
                    <List
                        className={`h-5 w-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    />
                </div>
            </button>

            {/* Posts list */}
            {isExpanded && (
                <div className="border-primary/20 max-h-64 overflow-y-auto border-t p-2">
                    {sortedPosts.map((post, index) => (
                        <Link
                            key={post.slug}
                            href={`/post/${post.slug}`}
                            className={`flex items-center gap-3 rounded-lg p-3 transition-colors ${
                                post.slug === currentSlug
                                    ? 'bg-primary/10 text-primary'
                                    : 'hover:bg-secondary/50 text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            <span
                                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
                                    post.slug === currentSlug
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-secondary'
                                }`}
                            >
                                {index + 1}
                            </span>
                            <span className="line-clamp-1 flex-1 text-sm">{post.title}</span>
                        </Link>
                    ))}
                </div>
            )}

            {/* Navigation */}
            <div className="border-primary/20 flex border-t">
                {prevPost ? (
                    <Link
                        href={`/post/${prevPost.slug}`}
                        className="text-muted-foreground hover:text-foreground hover:bg-primary/10 flex flex-1 items-center gap-2 p-3 text-sm transition-colors"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="line-clamp-1">Trước</span>
                    </Link>
                ) : (
                    <div className="flex-1" />
                )}

                <div className="bg-primary/20 w-px" />

                {nextPost ? (
                    <Link
                        href={`/post/${nextPost.slug}`}
                        className="text-muted-foreground hover:text-foreground hover:bg-primary/10 flex flex-1 items-center justify-end gap-2 p-3 text-sm transition-colors"
                    >
                        <span className="line-clamp-1">Tiếp</span>
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                ) : (
                    <div className="flex-1" />
                )}
            </div>
        </div>
    );
}
