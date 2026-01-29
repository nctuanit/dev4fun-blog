'use client'

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
        <aside className="hidden lg:block w-[220px] shrink-0 sticky top-20 h-fit py-4">
            {/* Main Navigation */}
            <nav className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => {
                    const active = isActive(item.href);
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`group flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${active
                                ? 'bg-primary/10 text-primary'
                                : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground'
                                }`}
                        >
                            <item.icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${active ? 'text-primary' : ''}`} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Divider */}
            <div className="my-6 mx-4 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

            {/* Social Links */}
            <div className="px-4">
                <div className="mb-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Kết nối</div>
                <div className="flex gap-3">
                    {SIDEBAR_SOCIAL_LINKS.map((social) => (
                        <Link
                            key={social.label}
                            href={social.href}
                            className="w-9 h-9 rounded-xl bg-secondary hover:bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary transition-all hover:scale-110"
                            target="_blank"
                        >
                            <social.icon className="w-4 h-4" />
                        </Link>
                    ))}
                </div>
            </div>


            {/* About Card with Logo */}
            <div className={`mt-6 mx-2 p-4 rounded-2xl bg-gradient-to-br ${THEME_COLORS.gradients.card} border border-[${THEME_COLORS.primary.navy}]/20`}>
                <div className="relative h-8 w-full mb-2">
                    <Image
                        src={SITE_CONFIG.logo}
                        alt={SITE_CONFIG.name}
                        fill
                        className="object-contain object-left"
                    />
                </div>
                <p className="text-xs text-muted-foreground">
                    {SITE_CONFIG.description}
                </p>
            </div>
        </aside>
    );
}
