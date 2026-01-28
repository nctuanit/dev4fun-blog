'use client'
import Link from 'next/link';
import Image from 'next/image';
import { Search, Moon, Sun, Github } from 'lucide-react';
import { useTheme } from "next-themes";
import { useState, useEffect } from 'react';
import { SITE_CONFIG, SOCIAL_LINKS, FEATURES } from '@/lib/constants';
import { SearchBox } from '@/components/search/SearchBox';
import { useMounted } from '@/hooks/useMounted';

export function Header() {
    const { resolvedTheme, setTheme } = useTheme();
    const mounted = useMounted();
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

    // Close mobile search on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsMobileSearchOpen(false);
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    // Prevent body scroll when mobile search is open
    useEffect(() => {
        if (isMobileSearchOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileSearchOpen]);

    return (
        <header className="fixed top-0 left-0 right-0 h-16 glass border-b border-border/50 z-50">
            <div className="flex items-center gap-4 h-full w-full max-w-7xl mx-auto px-4 md:px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center shrink-0 group">
                    <div className="relative h-10 w-10 sm:h-11 sm:w-11 transition-transform duration-300 group-hover:scale-105">
                        <Image
                            src={SITE_CONFIG.logo}
                            alt={SITE_CONFIG.name}
                            fill
                            className="object-contain rounded-xl"
                            priority
                        />
                    </div>
                    <span className="ml-2 font-bold text-lg hidden sm:inline-block bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                        {SITE_CONFIG.name}
                    </span>
                </Link>

                {/* Desktop Search Bar */}
                {FEATURES.enableSearch && (
                    <div className="hidden md:flex flex-1 justify-center max-w-xl mx-auto">
                        <SearchBox variant="desktop" />
                    </div>
                )}

                {/* Right Actions */}
                <div className="flex items-center gap-1 sm:gap-2">
                    {/* Mobile Search Button */}
                    {FEATURES.enableSearch && (
                        <button 
                            onClick={() => setIsMobileSearchOpen(true)}
                            className="md:hidden p-2.5 hover:bg-primary/10 rounded-xl text-muted-foreground hover:text-primary transition-colors"
                            aria-label="Mở tìm kiếm"
                        >
                            <Search className="w-5 h-5" />
                        </button>
                    )}

                    {/* GitHub */}
                    <Link 
                        href={SOCIAL_LINKS.github}
                        target="_blank"
                        className="p-2.5 hover:bg-primary/10 rounded-xl text-muted-foreground hover:text-primary transition-colors"
                    >
                        <Github className="w-5 h-5" />
                    </Link>

                    {/* Theme Toggle */}
                    {FEATURES.enableDarkMode && (
                        <button
                            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                            className="p-2.5 hover:bg-primary/10 rounded-xl text-muted-foreground hover:text-primary transition-all hover:rotate-12"
                            aria-label="Chuyển đổi theme"
                        >
                            {!mounted ? (
                                <div className="w-5 h-5" />
                            ) : resolvedTheme === 'dark' ? (
                                <Sun className="w-5 h-5" />
                            ) : (
                                <Moon className="w-5 h-5" />
                            )}
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile Search Overlay */}
            {FEATURES.enableSearch && isMobileSearchOpen && (
                <div className="md:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
                    <SearchBox 
                        variant="mobile" 
                        onClose={() => setIsMobileSearchOpen(false)} 
                    />
                </div>
            )}
        </header>
    );
}
