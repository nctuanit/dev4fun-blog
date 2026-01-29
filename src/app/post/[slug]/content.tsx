'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Clock, Calendar, ArrowLeft } from 'lucide-react';
import TableOfContents, { TOCItem } from '@/components/post/TableOfContents';
import ReadingProgressBar from '@/components/post/ReadingProgressBar';
import CopyCodeButton from '@/components/post/CopyCodeButton';
import ShareButtons from '@/components/post/ShareButtons';
import Comments from '@/components/post/Comments';

interface PostFrontmatter {
    title: string;
    date: string;
    coverImage?: string;
    tags?: string[];
    author?: string;
    readTime?: string;
}

interface PostContentProps {
    frontmatter: PostFrontmatter;
    headings: TOCItem[];
    slug: string;
    children: React.ReactNode;
}

function formatDateOnly(dateString: string) {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('vi-VN', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
}

export default function PostContent({ frontmatter, headings, slug, children }: PostContentProps) {
    return (
        <div>
            {/* Reading Progress Bar */}
            <ReadingProgressBar />

            {/* Copy Code Button - auto attaches to code blocks */}
            <CopyCodeButton />


            {/* Back button */}
            <Link
                href="/"
                className="inline-flex items-center gap-1.5 sm:gap-2 text-muted-foreground hover:text-foreground mb-3 sm:mb-4 transition-colors text-sm sm:text-base"
            >
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Quay lại</span>
            </Link>

            <article className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm mb-6">
                {/* Cover Image */}
                {frontmatter.coverImage && (
                    <div className="w-full aspect-[3/2] relative">
                        <Image
                            src={frontmatter.coverImage}
                            alt={frontmatter.title}
                            fill

                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent"></div>
                    </div>
                )}

                <div className="p-4 sm:p-6 md:p-8 lg:p-10">
                    {/* Header */}
                    <header className="mb-5 sm:mb-6 md:mb-8">
                        {/* Tags */}
                        {frontmatter.tags && frontmatter.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                                {frontmatter.tags.map(tag => (
                                    <Link
                                        key={tag}
                                        href={`/tags/${tag}`}
                                        className="text-xs sm:text-sm font-medium text-primary hover:text-primary/80 px-2 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                                    >
                                        #{tag}
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Title */}
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4 sm:mb-5 md:mb-6 leading-tight text-foreground">
                            {frontmatter.title}
                        </h1>

                        {/* Meta info */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm text-muted-foreground pb-4 sm:pb-5 md:pb-6 border-b border-border/50">
                            <span className="font-medium text-foreground">
                                {frontmatter.author || 'Dev4Fun'}
                            </span>
                            <span className="flex items-center gap-1 sm:gap-1.5">
                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                                {formatDateOnly(frontmatter.date)}
                            </span>
                            <span className="flex items-center gap-1 sm:gap-1.5">
                                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                                {frontmatter.readTime || '5'} phút đọc
                            </span>
                        </div>
                    </header>

                    {/* Table of Contents */}
                    {headings.length > 0 && (
                        <TableOfContents headings={headings} />
                    )}

                    {/* Content */}
                    {children}

                    {/* Share Buttons */}
                    <div className="mt-8 pt-6 border-t border-border/50">
                        <ShareButtons title={frontmatter.title} />
                    </div>

                    {/* Comments */}
                    <Comments />
                </div>
            </article>
        </div>
    );
}
