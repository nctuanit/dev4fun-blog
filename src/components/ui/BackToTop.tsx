'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', toggleVisibility, { passive: true });
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="bg-primary text-primary-foreground fixed right-6 bottom-6 z-50 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl"
            aria-label="Cuộn lên đầu trang"
        >
            <ArrowUp className="h-5 w-5" />
        </button>
    );
}
