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
    const navigateToPost = useCallback(
        (slug: string) => {
            setQuery('');
            setIsOpen(false);
            onClose?.();
            router.push(`/post/${slug}`);
        },
        [router, onClose]
    );

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex((prev) => Math.max(prev - 1, -1));
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
            if (
                resultsRef.current &&
                !resultsRef.current.contains(e.target as Node) &&
                inputRef.current &&
                !inputRef.current.contains(e.target as Node)
            ) {
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
            year: 'numeric',
        });
    };

    // Render search results
    const renderResults = () => {
        if (isLoading) {
            return (
                <div className="text-muted-foreground flex flex-col items-center justify-center py-8">
                    <Loader2 className="mb-2 h-6 w-6 animate-spin" />
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
                            className={`hover:bg-secondary/50 flex w-full items-start gap-3 px-4 py-3 text-left transition-colors ${selectedIndex === index ? 'bg-secondary/50' : ''}`}
                        >
                            {result.coverImage ? (
                                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                                    <Image
                                        src={result.coverImage}
                                        alt={result.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                                    <FileText className="text-primary h-5 w-5" />
                                </div>
                            )}
                            <div className="min-w-0 flex-1">
                                <h4 className="text-foreground line-clamp-1 text-sm font-medium">
                                    {result.title}
                                </h4>
                                <p className="text-muted-foreground mt-0.5 line-clamp-1 text-xs">
                                    {result.description}
                                </p>
                                <div className="text-muted-foreground mt-1 flex items-center gap-2 text-xs">
                                    <span>{formatDate(result.date)}</span>
                                    {result.readTime && (
                                        <>
                                            <span className="bg-muted-foreground/50 h-1 w-1 rounded-full"></span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
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
            <div className="text-muted-foreground py-8 text-center text-sm">
                Không tìm thấy bài viết nào cho &quot;{debouncedQuery}&quot;
            </div>
        );
    };

    // Render mobile results
    const renderMobileResults = () => {
        if (isLoading) {
            return (
                <div className="text-muted-foreground flex flex-col items-center justify-center py-12">
                    <Loader2 className="mb-3 h-8 w-8 animate-spin" />
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
                            className={`hover:bg-secondary/50 border-border/30 flex w-full items-start gap-3 border-b px-4 py-4 text-left transition-colors ${selectedIndex === index ? 'bg-secondary/50' : ''}`}
                        >
                            {result.coverImage ? (
                                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                                    <Image
                                        src={result.coverImage}
                                        alt={result.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="bg-primary/10 flex h-16 w-16 shrink-0 items-center justify-center rounded-lg">
                                    <FileText className="text-primary h-6 w-6" />
                                </div>
                            )}
                            <div className="min-w-0 flex-1">
                                <h4 className="text-foreground line-clamp-2 text-base font-semibold">
                                    {result.title}
                                </h4>
                                <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                                    {result.description}
                                </p>
                                <div className="text-muted-foreground mt-2 flex items-center gap-2 text-xs">
                                    <span>{formatDate(result.date)}</span>
                                    {result.readTime && (
                                        <>
                                            <span className="bg-muted-foreground/50 h-1 w-1 rounded-full"></span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
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
                <div className="bg-secondary mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl">
                    <Search className="text-muted-foreground h-8 w-8" />
                </div>
                <p className="text-muted-foreground">Không tìm thấy bài viết nào cho</p>
                <p className="text-foreground mt-1 font-medium">&quot;{debouncedQuery}&quot;</p>
            </div>
        );
    };

    // Desktop variant
    if (variant === 'desktop') {
        return (
            <div className="relative w-full">
                <div
                    className={`from-primary/20 absolute inset-0 rounded-xl bg-gradient-to-r via-purple-500/20 to-pink-500/20 blur-lg transition-opacity duration-300 ${isOpen && query ? 'opacity-100' : 'opacity-0'}`}
                ></div>
                <div className="relative">
                    <Search className="text-muted-foreground absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2" />
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
                        className="border-border/50 bg-card/50 focus:bg-card focus:ring-primary/50 focus:border-primary/50 placeholder:text-muted-foreground/60 h-11 w-full rounded-xl border pr-10 pl-11 text-sm transition-all focus:ring-2 focus:outline-none"
                    />
                    {query && (
                        <button
                            onClick={clearSearch}
                            className="hover:bg-secondary text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 rounded-md p-1 transition-colors"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>

                {/* Desktop Results Dropdown */}
                {isOpen && debouncedQuery && (
                    <div
                        ref={resultsRef}
                        className="bg-card border-border/50 absolute top-full right-0 left-0 z-50 mt-2 overflow-hidden rounded-xl border shadow-xl"
                    >
                        {renderResults()}
                    </div>
                )}
            </div>
        );
    }

    // Mobile variant
    return (
        <div className="flex h-full flex-col">
            {/* Mobile Search Header */}
            <div className="border-border/50 flex items-center gap-3 border-b p-4">
                <div className="relative flex-1">
                    <Search className="text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => handleQueryChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Tìm kiếm bài viết..."
                        className="border-border/50 bg-card focus:ring-primary/50 focus:border-primary/50 placeholder:text-muted-foreground/60 h-12 w-full rounded-xl border pr-10 pl-12 text-base transition-all focus:ring-2 focus:outline-none"
                    />
                    {query && (
                        <button
                            onClick={clearSearch}
                            className="hover:bg-secondary text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 rounded-md p-1"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>
                <button
                    onClick={onClose}
                    className="hover:bg-primary/10 text-muted-foreground hover:text-primary rounded-xl p-3 transition-colors"
                    aria-label="Đóng tìm kiếm"
                >
                    <X className="h-6 w-6" />
                </button>
            </div>

            {/* Mobile Search Results */}
            <div className="flex-1 overflow-y-auto">
                {debouncedQuery ? (
                    renderMobileResults()
                ) : (
                    <div className="py-12 text-center">
                        <div className="from-primary/20 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br to-purple-500/20">
                            <Search className="text-primary h-8 w-8" />
                        </div>
                        <p className="text-muted-foreground">Nhập từ khóa để tìm kiếm bài viết</p>
                    </div>
                )}
            </div>
        </div>
    );
}
