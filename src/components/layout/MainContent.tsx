'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { LeftSidebar } from './LeftSidebar';
import { RightSidebar } from './RightSidebar';

interface MainContentProps {
    children: React.ReactNode;
    tags: {
        name: string;
        count: number;
    }[];
    categories: {
        name: string;
        count: number;
    }[];
    recentPosts: {
        slug: string;
        title: string;
    }[];
}

export function MainContent({ children, tags, categories, recentPosts }: MainContentProps) {
    const pathname = usePathname();

    // Ẩn left sidebar khi ở trang bài viết chi tiết
    const isPostPage = pathname.startsWith('/post/');

    return (
        <div className="flex gap-6">
            {/* Left Sidebar - Ẩn khi ở trang bài viết */}
            {!isPostPage && <LeftSidebar />}

            {/* Main Content - Mở rộng khi không có left sidebar */}
            <main className={`min-w-0 flex-1 py-4 ${isPostPage ? 'mx-auto max-w-4xl' : ''}`}>
                {children}
            </main>

            {/* Right Sidebar */}
            <RightSidebar tags={tags} categories={categories} recentPosts={recentPosts} />
        </div>
    );
}
