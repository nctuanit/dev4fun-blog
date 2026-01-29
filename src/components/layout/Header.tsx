'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Moon, Sun, Github } from 'lucide-react';
import { useTheme } from 'next-themes';
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
        <header className="glass border-border/50 fixed top-0 right-0 left-0 z-50 h-16 border-b">
            <div className="mx-auto flex h-full w-full max-w-7xl items-center gap-4 px-4 md:px-6">
                {/* Logo */}
                <Link href="/" className="group flex shrink-0 items-center">
                    <div className="relative h-10 w-10 transition-transform duration-300 group-hover:scale-105 sm:h-11 sm:w-11">
                        <Image
                            src={SITE_CONFIG.logo}
                            alt={SITE_CONFIG.name}
                            fill
                            className="rounded-xl object-contain"
                            priority
                        />
                    </div>
                    <span className="from-primary ml-2 hidden bg-gradient-to-r to-purple-500 bg-clip-text text-lg font-bold text-transparent sm:inline-block">
                        {SITE_CONFIG.name}
                    </span>
                </Link>

                {/* Desktop Search Bar */}
                {FEATURES.enableSearch && (
                    <div className="mx-auto hidden max-w-xl flex-1 justify-center md:flex">
                        <SearchBox variant="desktop" />
                    </div>
                )}

                {/* Right Actions */}
                <div className="flex items-center gap-1 sm:gap-2">
                    {/* Mobile Search Button */}
                    {FEATURES.enableSearch && (
                        <button
                            onClick={() => setIsMobileSearchOpen(true)}
                            className="hover:bg-primary/10 text-muted-foreground hover:text-primary rounded-xl p-2.5 transition-colors md:hidden"
                            aria-label="Mở tìm kiếm"
                        >
                            <Search className="h-5 w-5" />
                        </button>
                    )}

                    {/* GitHub */}
                    <Link
                        href={SOCIAL_LINKS.github}
                        target="_blank"
                        className="hover:bg-primary/10 text-muted-foreground hover:text-primary rounded-xl p-2.5 transition-colors"
                    >
                        <Github className="h-5 w-5" />
                    </Link>

                    {/* Theme Toggle */}
                    {FEATURES.enableDarkMode && (
                        <button
                            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                            className="hover:bg-primary/10 text-muted-foreground hover:text-primary rounded-xl p-2.5 transition-all hover:rotate-12"
                            aria-label="Chuyển đổi theme"
                        >
                            {!mounted ? (
                                <div className="h-5 w-5" />
                            ) : resolvedTheme === 'dark' ? (
                                <Sun className="h-5 w-5" />
                            ) : (
                                <Moon className="h-5 w-5" />
                            )}
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile Search Overlay */}
            {FEATURES.enableSearch && isMobileSearchOpen && (
                <div className="bg-background/95 fixed inset-0 z-50 backdrop-blur-sm md:hidden">
                    <SearchBox variant="mobile" onClose={() => setIsMobileSearchOpen(false)} />
                </div>
            )}
        </header>
    );
}
