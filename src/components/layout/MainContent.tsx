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
    recentPosts: {
        slug: string;
        title: string;
    }[];
}

export function MainContent({ children, tags, recentPosts }: MainContentProps) {
    const pathname = usePathname();
    
    // Ẩn left sidebar khi ở trang bài viết chi tiết
    const isPostPage = pathname.startsWith('/post/');

    return (
        <div className="flex gap-6">
            {/* Left Sidebar - Ẩn khi ở trang bài viết */}
            {!isPostPage && <LeftSidebar />}
            
            {/* Main Content - Mở rộng khi không có left sidebar */}
            <main className={`flex-1 min-w-0 py-4 ${isPostPage ? 'max-w-4xl mx-auto' : ''}`}>
                {children}
            </main>
            
            {/* Right Sidebar */}
            <RightSidebar tags={tags} recentPosts={recentPosts} />
        </div>
    );
}
