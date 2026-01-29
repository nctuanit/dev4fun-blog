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
    const minLevel = Math.min(...headings.map((h) => h.level));

    return (
        <nav className="bg-secondary/30 border-border/30 mb-5 rounded-lg border p-3">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-foreground/80 hover:text-primary flex w-full items-center gap-1.5 text-left text-sm font-medium transition-colors"
            >
                <List className="h-4 w-4" />
                <span>Mục lục</span>
                <span className="text-muted-foreground bg-secondary ml-1 rounded-full px-1.5 py-0.5 text-[10px]">
                    {headings.length}
                </span>
                <ChevronRight
                    className={cn(
                        'ml-auto h-3.5 w-3.5 transition-transform duration-200',
                        isOpen ? 'rotate-90' : ''
                    )}
                />
            </button>

            {isOpen && (
                <ul className="border-border/50 mt-2 max-h-[280px] space-y-0.5 overflow-y-auto border-l">
                    {headings.map((heading) => {
                        const indent = (heading.level - minLevel) * 8;
                        return (
                            <li key={heading.id}>
                                <a
                                    href={`#${heading.id}`}
                                    onClick={(e) => handleClick(e, heading.id)}
                                    className={cn(
                                        '-ml-px block truncate border-l px-2.5 py-1 text-xs leading-relaxed transition-all duration-150',
                                        activeId === heading.id
                                            ? 'text-primary border-primary bg-primary/5 font-medium'
                                            : 'text-muted-foreground hover:text-foreground hover:border-border/50 border-transparent'
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
