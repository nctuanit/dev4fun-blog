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
                    const searchInput = document.querySelector(
                        'input[type="search"], input[placeholder*="Tìm"]'
                    ) as HTMLInputElement;
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
                className="bg-secondary text-muted-foreground hover:text-foreground fixed bottom-6 left-6 z-50 hidden items-center justify-center rounded-full p-3 shadow-lg transition-all duration-200 hover:shadow-xl md:flex"
                aria-label="Phím tắt"
                title="Phím tắt (?)"
            >
                <Keyboard className="h-5 w-5" />
            </button>

            {/* Help modal */}
            {showHelp && (
                <div
                    className="bg-background/80 fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
                    onClick={() => setShowHelp(false)}
                >
                    <div
                        className="bg-card border-border animate-fade-up w-full max-w-sm rounded-2xl border p-6 shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold">Phím tắt</h3>
                            <button
                                onClick={() => setShowHelp(false)}
                                className="hover:bg-secondary rounded-lg p-1 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="space-y-2">
                            {shortcuts.map((shortcut) => (
                                <div
                                    key={shortcut.key}
                                    className="flex items-center justify-between py-2"
                                >
                                    <span className="text-muted-foreground">
                                        {shortcut.description}
                                    </span>
                                    <kbd className="bg-secondary rounded-md px-2 py-1 font-mono text-sm">
                                        {shortcut.key}
                                    </kbd>
                                </div>
                            ))}
                        </div>

                        <p className="text-muted-foreground mt-4 text-center text-xs">
                            Nhấn{' '}
                            <kbd className="bg-secondary rounded px-1.5 py-0.5 text-xs">Esc</kbd> để
                            đóng
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
