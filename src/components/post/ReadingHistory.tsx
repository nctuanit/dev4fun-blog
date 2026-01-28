'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { History, X, Clock } from 'lucide-react';

interface ReadingHistoryItem {
    slug: string;
    title: string;
    timestamp: number;
    progress: number; // 0-100
}

const STORAGE_KEY = 'dev4fun-reading-history';
const MAX_HISTORY = 10;

// Hook để sử dụng reading history
export function useReadingHistory() {
    const [history, setHistory] = useState<ReadingHistoryItem[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setHistory(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to parse reading history:', e);
            }
        }
    }, []);

    const addToHistory = (item: Omit<ReadingHistoryItem, 'timestamp'>) => {
        setHistory((prev) => {
            // Remove existing entry for same slug
            const filtered = prev.filter((h) => h.slug !== item.slug);
            // Add new entry at the beginning
            const newHistory = [
                { ...item, timestamp: Date.now() },
                ...filtered,
            ].slice(0, MAX_HISTORY);
            
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
            return newHistory;
        });
    };

    const updateProgress = (slug: string, progress: number) => {
        setHistory((prev) => {
            const updated = prev.map((h) =>
                h.slug === slug ? { ...h, progress, timestamp: Date.now() } : h
            );
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });
    };

    const removeFromHistory = (slug: string) => {
        setHistory((prev) => {
            const filtered = prev.filter((h) => h.slug !== slug);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
            return filtered;
        });
    };

    const clearHistory = () => {
        localStorage.removeItem(STORAGE_KEY);
        setHistory([]);
    };

    return { history, addToHistory, updateProgress, removeFromHistory, clearHistory };
}

// Component để track reading progress
export function ReadingTracker({ slug, title }: { slug: string; title: string }) {
    const { addToHistory, updateProgress } = useReadingHistory();

    useEffect(() => {
        // Add to history when component mounts
        addToHistory({ slug, title, progress: 0 });

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
            updateProgress(slug, Math.min(100, Math.max(0, progress)));
        };

        // Throttle scroll updates
        let ticking = false;
        const throttledScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', throttledScroll, { passive: true });
        return () => window.removeEventListener('scroll', throttledScroll);
    }, [slug, title]);

    return null;
}

// Component hiển thị widget reading history
export default function ReadingHistoryWidget() {
    const { history, removeFromHistory, clearHistory } = useReadingHistory();
    const [isOpen, setIsOpen] = useState(false);

    if (history.length === 0) return null;

    const formatTime = (timestamp: number) => {
        const diff = Date.now() - timestamp;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Vừa xong';
        if (minutes < 60) return `${minutes} phút trước`;
        if (hours < 24) return `${hours} giờ trước`;
        return `${days} ngày trước`;
    };

    // Get the most recent unfinished post
    const continueReading = history.find((h) => h.progress > 0 && h.progress < 100);

    return (
        <>
            {/* Continue reading banner */}
            {continueReading && (
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Clock className="w-4 h-4" />
                        <span>Tiếp tục đọc</span>
                    </div>
                    <Link
                        href={`/post/${continueReading.slug}`}
                        className="font-medium text-foreground hover:text-primary transition-colors line-clamp-1"
                    >
                        {continueReading.title}
                    </Link>
                    <div className="mt-2 h-1 bg-secondary rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${continueReading.progress}%` }}
                        />
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">
                        {continueReading.progress}% hoàn thành
                    </span>
                </div>
            )}

            {/* History button */}
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
                <History className="w-4 h-4" />
                <span>Lịch sử đọc ({history.length})</span>
            </button>

            {/* History modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="bg-card border border-border rounded-2xl shadow-xl max-w-md w-full max-h-[70vh] overflow-hidden animate-fade-up"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between p-4 border-b border-border">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <History className="w-5 h-5" />
                                Lịch sử đọc
                            </h3>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={clearHistory}
                                    className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                                >
                                    Xóa tất cả
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 rounded-lg hover:bg-secondary transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="overflow-y-auto max-h-[50vh]">
                            {history.map((item) => (
                                <div
                                    key={item.slug}
                                    className="flex items-start gap-3 p-4 border-b border-border/50 hover:bg-secondary/30 transition-colors group"
                                >
                                    <div className="flex-1 min-w-0">
                                        <Link
                                            href={`/post/${item.slug}`}
                                            onClick={() => setIsOpen(false)}
                                            className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2"
                                        >
                                            {item.title}
                                        </Link>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className="text-xs text-muted-foreground">
                                                {formatTime(item.timestamp)}
                                            </span>
                                            <div className="flex items-center gap-1">
                                                <div className="w-16 h-1 bg-secondary rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-primary"
                                                        style={{ width: `${item.progress}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs text-muted-foreground">
                                                    {item.progress}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFromHistory(item.slug)}
                                        className="p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-secondary transition-all"
                                        title="Xóa"
                                    >
                                        <X className="w-4 h-4 text-muted-foreground" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
