'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Keyboard, X } from 'lucide-react';

interface KeyboardNavigationProps {
    prevPost?: { slug: string; title: string } | null;
    nextPost?: { slug: string; title: string } | null;
}

export default function KeyboardNavigation({ prevPost, nextPost }: KeyboardNavigationProps) {
    const router = useRouter();
    const [showHelp, setShowHelp] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignore if typing in input/textarea
            if (
                e.target instanceof HTMLInputElement ||
                e.target instanceof HTMLTextAreaElement ||
                e.target instanceof HTMLSelectElement
            ) {
                return;
            }

            switch (e.key.toLowerCase()) {
                case 'j':
                    // Next post
                    if (nextPost) {
                        router.push(`/post/${nextPost.slug}`);
                    }
                    break;
                case 'k':
                    // Previous post
                    if (prevPost) {
                        router.push(`/post/${prevPost.slug}`);
                    }
                    break;
                case 't':
                    // Scroll to top
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    break;
                case 'b':
                    // Scroll to bottom
                    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                    break;
                case '/':
                    // Focus search (if exists)
                    e.preventDefault();
                    const searchInput = document.querySelector('input[type="search"], input[placeholder*="Tìm"]') as HTMLInputElement;
                    if (searchInput) {
                        searchInput.focus();
                    }
                    break;
                case 'h':
                    // Go home
                    router.push('/');
                    break;
                case '?':
                    // Toggle help
                    setShowHelp((prev) => !prev);
                    break;
                case 'escape':
                    setShowHelp(false);
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [router, prevPost, nextPost]);

    const shortcuts = [
        { key: 'j', description: 'Bài tiếp theo' },
        { key: 'k', description: 'Bài trước' },
        { key: 't', description: 'Lên đầu trang' },
        { key: 'b', description: 'Xuống cuối trang' },
        { key: '/', description: 'Tìm kiếm' },
        { key: 'h', description: 'Về trang chủ' },
        { key: '?', description: 'Hiện/ẩn trợ giúp' },
    ];

    return (
        <>
            {/* Help button */}
            <button
                onClick={() => setShowHelp(true)}
                className="fixed bottom-6 left-6 p-3 rounded-full bg-secondary text-muted-foreground hover:text-foreground shadow-lg hover:shadow-xl transition-all duration-200 z-50 hidden md:flex items-center justify-center"
                aria-label="Phím tắt"
                title="Phím tắt (?)"
            >
                <Keyboard className="w-5 h-5" />
            </button>

            {/* Help modal */}
            {showHelp && (
                <div 
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                    onClick={() => setShowHelp(false)}
                >
                    <div 
                        className="bg-card border border-border rounded-2xl shadow-xl max-w-sm w-full p-6 animate-fade-up"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Phím tắt</h3>
                            <button
                                onClick={() => setShowHelp(false)}
                                className="p-1 rounded-lg hover:bg-secondary transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-2">
                            {shortcuts.map((shortcut) => (
                                <div key={shortcut.key} className="flex items-center justify-between py-2">
                                    <span className="text-muted-foreground">{shortcut.description}</span>
                                    <kbd className="px-2 py-1 bg-secondary rounded-md text-sm font-mono">
                                        {shortcut.key}
                                    </kbd>
                                </div>
                            ))}
                        </div>

                        <p className="mt-4 text-xs text-muted-foreground text-center">
                            Nhấn <kbd className="px-1.5 py-0.5 bg-secondary rounded text-xs">Esc</kbd> để đóng
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
