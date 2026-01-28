'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import useSWR from 'swr';
import { Search, Clock, FileText, X, Loader2 } from 'lucide-react';
import { searchPosts } from '@/actions/search';
import { useDebounce } from '@/hooks/useDebounce';

interface SearchBoxProps {
    variant: 'desktop' | 'mobile';
    onClose?: () => void;
}

export function SearchBox({ variant, onClose }: SearchBoxProps) {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);

    // Debounce query với 300ms delay
    const debouncedQuery = useDebounce(query.trim(), 300);

    // Reset selected index when query changes
    const handleQueryChange = (newQuery: string) => {
        setQuery(newQuery);
        setSelectedIndex(-1);
    };

    // Use SWR với server action
    const { data: results = [], isLoading } = useSWR(
        debouncedQuery ? `/search/post?q=${debouncedQuery}` : null,
        () => searchPosts(debouncedQuery),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 1000,
        }
    );

    // Navigate to post
    const navigateToPost = useCallback((slug: string) => {
        setQuery('');
        setIsOpen(false);
        onClose?.();
        router.push(`/post/${slug}`);
    }, [router, onClose]);

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => Math.max(prev - 1, -1));
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            e.preventDefault();
            const selected = results[selectedIndex];
            if (selected) {
                navigateToPost(selected.slug);
            }
        } else if (e.key === 'Escape') {
            setIsOpen(false);
            setQuery('');
            onClose?.();
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (resultsRef.current && !resultsRef.current.contains(e.target as Node) &&
                inputRef.current && !inputRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Focus input on mobile
    useEffect(() => {
        if (variant === 'mobile' && inputRef.current) {
            inputRef.current.focus();
        }
    }, [variant]);

    const handleResultClick = (slug: string) => {
        navigateToPost(slug);
    };

    const clearSearch = () => {
        setQuery('');
        inputRef.current?.focus();
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    // Render search results
    const renderResults = () => {
        if (isLoading) {
            return (
                <div className="py-8 flex flex-col items-center justify-center text-muted-foreground">
                    <Loader2 className="w-6 h-6 animate-spin mb-2" />
                    <span className="text-sm">Đang tìm kiếm...</span>
                </div>
            );
        }

        if (results.length > 0) {
            return (
                <div className="py-2">
                    {results.map((result, index) => (
                        <button
                            key={result.slug}
                            onClick={() => handleResultClick(result.slug)}
                            className={`w-full flex items-start gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors text-left ${selectedIndex === index ? 'bg-secondary/50' : ''}`}
                        >
                            {result.coverImage ? (
                                <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                                    <Image
                                        src={result.coverImage}
                                        alt={result.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                    <FileText className="w-5 h-5 text-primary" />
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm text-foreground line-clamp-1">
                                    {result.title}
                                </h4>
                                <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                                    {result.description}
                                </p>
                                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                    <span>{formatDate(result.date)}</span>
                                    {result.readTime && (
                                        <>
                                            <span className="w-1 h-1 rounded-full bg-muted-foreground/50"></span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {result.readTime} phút
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            );
        }

        return (
            <div className="py-8 text-center text-muted-foreground text-sm">
                Không tìm thấy bài viết nào cho &quot;{debouncedQuery}&quot;
            </div>
        );
    };

    // Render mobile results
    const renderMobileResults = () => {
        if (isLoading) {
            return (
                <div className="py-12 flex flex-col items-center justify-center text-muted-foreground">
                    <Loader2 className="w-8 h-8 animate-spin mb-3" />
                    <span>Đang tìm kiếm...</span>
                </div>
            );
        }

        if (results.length > 0) {
            return (
                <div className="py-2">
                    {results.map((result, index) => (
                        <button
                            key={result.slug}
                            onClick={() => handleResultClick(result.slug)}
                            className={`w-full flex items-start gap-3 px-4 py-4 hover:bg-secondary/50 transition-colors border-b border-border/30 text-left ${selectedIndex === index ? 'bg-secondary/50' : ''}`}
                        >
                            {result.coverImage ? (
                                <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                                    <Image
                                        src={result.coverImage}
                                        alt={result.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                    <FileText className="w-6 h-6 text-primary" />
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-base text-foreground line-clamp-2">
                                    {result.title}
                                </h4>
                                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                    {result.description}
                                </p>
                                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                    <span>{formatDate(result.date)}</span>
                                    {result.readTime && (
                                        <>
                                            <span className="w-1 h-1 rounded-full bg-muted-foreground/50"></span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {result.readTime} phút
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            );
        }

        return (
            <div className="py-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-secondary flex items-center justify-center">
                    <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">
                    Không tìm thấy bài viết nào cho
                </p>
                <p className="text-foreground font-medium mt-1">&quot;{debouncedQuery}&quot;</p>
            </div>
        );
    };

    // Desktop variant
    if (variant === 'desktop') {
        return (
            <div className="relative w-full">
                <div className={`absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 rounded-xl blur-lg transition-opacity duration-300 ${isOpen && query ? 'opacity-100' : 'opacity-0'}`}></div>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => {
                            handleQueryChange(e.target.value);
                            setIsOpen(true);
                        }}
                        onFocus={() => setIsOpen(true)}
                        onKeyDown={handleKeyDown}
                        placeholder="Tìm kiếm bài viết..."
                        className="w-full h-11 pl-11 pr-10 rounded-xl border border-border/50 bg-card/50 focus:bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-muted-foreground/60 text-sm"
                    />
                    {query && (
                        <button
                            onClick={clearSearch}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-secondary rounded-md text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Desktop Results Dropdown */}
                {isOpen && debouncedQuery && (
                    <div 
                        ref={resultsRef}
                        className="absolute top-full left-0 right-0 mt-2 bg-card border border-border/50 rounded-xl shadow-xl overflow-hidden z-50"
                    >
                        {renderResults()}
                    </div>
                )}
            </div>
        );
    }

    // Mobile variant
    return (
        <div className="flex flex-col h-full">
            {/* Mobile Search Header */}
            <div className="flex items-center gap-3 p-4 border-b border-border/50">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => handleQueryChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Tìm kiếm bài viết..."
                        className="w-full h-12 pl-12 pr-10 rounded-xl border border-border/50 bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-muted-foreground/60 text-base"
                    />
                    {query && (
                        <button
                            onClick={clearSearch}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-secondary rounded-md text-muted-foreground"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
                <button
                    onClick={onClose}
                    className="p-3 hover:bg-primary/10 rounded-xl text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Đóng tìm kiếm"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* Mobile Search Results */}
            <div className="flex-1 overflow-y-auto">
                {debouncedQuery ? (
                    renderMobileResults()
                ) : (
                    <div className="py-12 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                            <Search className="w-8 h-8 text-primary" />
                        </div>
                        <p className="text-muted-foreground">
                            Nhập từ khóa để tìm kiếm bài viết
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
