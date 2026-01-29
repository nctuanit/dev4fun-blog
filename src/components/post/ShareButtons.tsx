'use client';

import { useState } from 'react';
import { Facebook, Twitter, Linkedin, Link2, Check } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface ShareButtonsProps {
    title: string;
}

export default function ShareButtons({ title }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);
    const path = usePathname();
    const url = typeof window !== 'undefined'
        ? `${window.location.origin}${path}`
        : '';

    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = [
        {
            name: 'Facebook',
            icon: Facebook,
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            color: 'hover:text-blue-600',
        },
        {
            name: 'Twitter',
            icon: Twitter,
            url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
            color: 'hover:text-sky-500',
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            color: 'hover:text-blue-700',
        },
    ];

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground mr-1">Chia sẻ:</span>

            {shareLinks.map((link) => (
                <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg bg-secondary/50 hover:bg-secondary text-muted-foreground ${link.color} transition-colors`}
                    title={`Chia sẻ lên ${link.name}`}
                >
                    <link.icon className="w-4 h-4" />
                </a>
            ))}

            <button
                onClick={copyToClipboard}
                className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-primary transition-colors"
                title={copied ? 'Đã copy!' : 'Copy link'}
            >
                {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                ) : (
                    <Link2 className="w-4 h-4" />
                )}
            </button>
        </div>
    );
}
