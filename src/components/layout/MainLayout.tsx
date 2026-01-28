'use client'

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
    recentPosts: {
        slug: string;
        title: string;
    }[];
}

export function MainLayout({ children, tags, recentPosts }: MainLayoutProps) {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
            {/* Background decoration */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500/5 rounded-full blur-3xl"></div>
            </div>

            <Header />
            
            <div className="flex-1 max-w-7xl mx-auto w-full pt-20 px-4 lg:px-6">
                <MainContent tags={tags} recentPosts={recentPosts}>
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
