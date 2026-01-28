'use client';

import { useEffect, useState } from 'react';
import { List, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TOCItem {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    headings: TOCItem[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>('');
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-80px 0px -80% 0px',
                threshold: 0,
            }
        );

        headings.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [headings]);

    if (headings.length === 0) {
        return null;
    }

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth',
            });
            setActiveId(id);
            // Update URL hash without scrolling
            window.history.pushState(null, '', `#${id}`);
        }
    };

    // Find minimum level to normalize indentation
    const minLevel = Math.min(...headings.map(h => h.level));

    return (
        <nav className="bg-secondary/30 border border-border/30 rounded-lg p-3 mb-5">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 w-full text-left text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
                <List className="w-4 h-4" />
                <span>Mục lục</span>
                <span className="text-[10px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded-full ml-1">
                    {headings.length}
                </span>
                <ChevronRight
                    className={cn(
                        "w-3.5 h-3.5 ml-auto transition-transform duration-200",
                        isOpen ? "rotate-90" : ""
                    )}
                />
            </button>

            {isOpen && (
                <ul className="mt-2 space-y-0.5 border-l border-border/50 max-h-[280px] overflow-y-auto">
                    {headings.map((heading) => {
                        const indent = (heading.level - minLevel) * 8;
                        return (
                            <li key={heading.id}>
                                <a
                                    href={`#${heading.id}`}
                                    onClick={(e) => handleClick(e, heading.id)}
                                    className={cn(
                                        "block py-1 px-2.5 text-xs leading-relaxed transition-all duration-150 border-l -ml-px truncate",
                                        activeId === heading.id
                                            ? "text-primary border-primary bg-primary/5 font-medium"
                                            : "text-muted-foreground hover:text-foreground border-transparent hover:border-border/50"
                                    )}
                                    style={{ paddingLeft: `${10 + indent}px` }}
                                    title={heading.text}
                                >
                                    {heading.text}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            )}
        </nav>
    );
}

