'use client';

import React from 'react';
import { Header } from './Header';
import { MainContent } from './MainContent';
import { Footer } from './Footer';
import BackToTop from '@/components/ui/BackToTop';
import KeyboardNavigation from '@/components/ui/KeyboardNavigation';

interface MainLayoutProps {
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

export function MainLayout({ children, tags, categories, recentPosts }: MainLayoutProps) {
    return (
        <div className="bg-background text-foreground flex min-h-screen flex-col font-sans">
            {/* Background decoration */}
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <div className="bg-primary/5 absolute top-0 left-1/4 h-96 w-96 rounded-full blur-3xl"></div>
                <div className="absolute top-1/3 right-1/4 h-80 w-80 rounded-full bg-purple-500/5 blur-3xl"></div>
                <div className="absolute bottom-1/4 left-1/3 h-72 w-72 rounded-full bg-pink-500/5 blur-3xl"></div>
            </div>

            <Header />

            <div className="mx-auto w-full max-w-7xl flex-1 px-4 pt-16 lg:px-6">
                <MainContent tags={tags} categories={categories} recentPosts={recentPosts}>
                    {children}
                </MainContent>
            </div>

            {/* Footer */}
            <Footer />

            {/* Back to Top Button */}
            <BackToTop />

            {/* Keyboard Navigation */}
            <KeyboardNavigation />
        </div>
    );
}
