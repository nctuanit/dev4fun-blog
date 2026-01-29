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
        year: 'numeric',
    });
}

export default function PostContent({ frontmatter, headings, children }: PostContentProps) {
    return (
        <div>
            {/* Reading Progress Bar */}
            <ReadingProgressBar />

            {/* Copy Code Button - auto attaches to code blocks */}
            <CopyCodeButton />

            {/* Back button */}
            <Link
                href="/"
                className="text-muted-foreground hover:text-foreground mb-3 inline-flex items-center gap-1.5 text-sm transition-colors sm:mb-4 sm:gap-2 sm:text-base"
            >
                <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>Quay lại</span>
            </Link>

            <article className="bg-card border-border/50 mb-6 overflow-hidden rounded-2xl border shadow-sm">
                {/* Cover Image */}
                {frontmatter.coverImage && (
                    <div className="relative aspect-[3/2] w-full">
                        <Image src={frontmatter.coverImage} alt={frontmatter.title} fill priority />
                        <div className="from-card absolute inset-0 bg-gradient-to-t via-transparent to-transparent"></div>
                    </div>
                )}

                <div className="p-4 sm:p-6 md:p-8 lg:p-10">
                    {/* Header */}
                    <header className="mb-5 sm:mb-6 md:mb-8">
                        {/* Tags */}
                        {frontmatter.tags && frontmatter.tags.length > 0 && (
                            <div className="mb-3 flex flex-wrap gap-1.5 sm:mb-4 sm:gap-2">
                                {frontmatter.tags.map((tag) => (
                                    <Link
                                        key={tag}
                                        href={`/tags/${tag}`}
                                        className="text-primary hover:text-primary/80 bg-primary/10 hover:bg-primary/20 rounded-md px-2 py-0.5 text-xs font-medium transition-colors sm:rounded-lg sm:px-3 sm:py-1 sm:text-sm"
                                    >
                                        #{tag}
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Title */}
                        <h1 className="text-foreground mb-4 text-xl leading-tight font-extrabold sm:mb-5 sm:text-2xl md:mb-6 md:text-3xl lg:text-4xl">
                            {frontmatter.title}
                        </h1>

                        {/* Meta info */}
                        <div className="text-muted-foreground border-border/50 flex flex-wrap items-center gap-2 border-b pb-4 text-xs sm:gap-3 sm:pb-5 sm:text-sm md:gap-4 md:pb-6">
                            <span className="text-foreground font-medium">
                                {frontmatter.author || 'Dev4Fun'}
                            </span>
                            <span className="flex items-center gap-1 sm:gap-1.5">
                                <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                                {formatDateOnly(frontmatter.date)}
                            </span>
                            <span className="flex items-center gap-1 sm:gap-1.5">
                                <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                                {frontmatter.readTime || '5'} phút đọc
                            </span>
                        </div>
                    </header>

                    {/* Table of Contents */}
                    {headings.length > 0 && <TableOfContents headings={headings} />}

                    {/* Content */}
                    {children}

                    {/* Share Buttons */}
                    <div className="border-border/50 mt-8 border-t pt-6">
                        <ShareButtons title={frontmatter.title} />
                    </div>

                    {/* Comments */}
                    <Comments />
                </div>
            </article>
        </div>
    );
}
