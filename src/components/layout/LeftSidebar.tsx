'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Home, Tag, Github, Facebook, BookOpen } from 'lucide-react';
import { SITE_CONFIG, SOCIAL_LINKS, THEME_COLORS } from '@/lib/constants';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
    { icon: Home, label: 'Trang chủ', href: '/' },
    { icon: Tag, label: 'Tags', href: '/tags' },
    { icon: BookOpen, label: 'Về blog', href: '/about' },
];

const SIDEBAR_SOCIAL_LINKS = [
    { icon: Github, label: 'Github', href: SOCIAL_LINKS.github },
    { icon: Facebook, label: 'Facebook', href: SOCIAL_LINKS.facebook },
];

export function LeftSidebar() {
    const pathname = usePathname();

    // Hàm kiểm tra active state
    const isActive = (href: string) => {
        if (href === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(href);
    };

    return (
        <aside className="sticky top-20 hidden h-fit w-[220px] shrink-0 py-4 lg:block">
            {/* Main Navigation */}
            <nav className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => {
                    const active = isActive(item.href);
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`group flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                                active
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground'
                            }`}
                        >
                            <item.icon
                                className={`h-5 w-5 transition-transform duration-200 group-hover:scale-110 ${active ? 'text-primary' : ''}`}
                            />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Divider */}
            <div className="via-border mx-4 my-6 h-px bg-gradient-to-r from-transparent to-transparent"></div>

            {/* Social Links */}
            <div className="px-4">
                <div className="text-muted-foreground mb-3 text-xs font-semibold tracking-wider uppercase">
                    Kết nối
                </div>
                <div className="flex gap-3">
                    {SIDEBAR_SOCIAL_LINKS.map((social) => (
                        <Link
                            key={social.label}
                            href={social.href}
                            className="bg-secondary hover:bg-primary/10 text-muted-foreground hover:text-primary flex h-9 w-9 items-center justify-center rounded-xl transition-all hover:scale-110"
                            target="_blank"
                        >
                            <social.icon className="h-4 w-4" />
                        </Link>
                    ))}
                </div>
            </div>

            {/* About Card with Logo */}
            <div
                className={`mx-2 mt-6 rounded-2xl bg-gradient-to-br p-4 ${THEME_COLORS.gradients.card} border border-[${THEME_COLORS.primary.navy}]/20`}
            >
                <div className="relative mb-2 h-8 w-full">
                    <Image
                        src={SITE_CONFIG.logo}
                        alt={SITE_CONFIG.name}
                        fill
                        className="object-contain object-left"
                    />
                </div>
                <p className="text-muted-foreground text-xs">{SITE_CONFIG.description}</p>
            </div>
        </aside>
    );
}
