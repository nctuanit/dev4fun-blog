'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Github, Facebook, Mail, Heart } from 'lucide-react';
import { SITE_CONFIG, SOCIAL_LINKS, NAV_ITEMS } from '@/lib/constants';

const FOOTER_SOCIAL_LINKS = [
    { icon: Github, label: 'GitHub', href: SOCIAL_LINKS.github },
    { icon: Facebook, label: 'Facebook', href: SOCIAL_LINKS.facebook },
    { icon: Mail, label: 'Email', href: `mailto:${SOCIAL_LINKS.email}` },
];

const FOOTER_LINKS = [
    {
        title: 'Điều hướng',
        links: NAV_ITEMS,
    },
    {
        title: 'Tài nguyên',
        links: [{ label: 'Sitemap', href: '/sitemap.xml' }],
    },
];

export function Footer() {
    return (
        <footer className="border-border/50 bg-card/30 mt-10 border-t backdrop-blur-sm sm:mt-12 lg:mt-16">
            <div className="mx-auto max-w-7xl px-4 lg:px-6">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 gap-6 py-8 sm:gap-8 sm:py-10 md:grid-cols-2 lg:grid-cols-4 lg:py-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="mb-3 inline-block sm:mb-4">
                            <div className="relative h-8 w-[130px] sm:h-10 sm:w-[160px]">
                                <Image
                                    src={SITE_CONFIG.logo}
                                    alt={SITE_CONFIG.name}
                                    fill
                                    className="rounded-sm object-contain object-left"
                                />
                            </div>
                        </Link>
                        <p className="text-muted-foreground mb-4 max-w-md text-xs leading-relaxed sm:mb-6 sm:text-sm">
                            {SITE_CONFIG.description}. Cập nhật xu hướng công nghệ mới nhất và chia
                            sẻ những kinh nghiệm thực tế trong quá trình phát triển phần mềm.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-2 sm:gap-3">
                            {FOOTER_SOCIAL_LINKS.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-secondary hover:bg-primary/10 text-muted-foreground hover:text-primary flex h-8 w-8 items-center justify-center rounded-lg transition-all hover:scale-110 sm:h-10 sm:w-10 sm:rounded-xl"
                                    aria-label={social.label}
                                >
                                    <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Footer Links */}
                    {FOOTER_LINKS.map((section) => (
                        <div key={section.title}>
                            <h3 className="text-foreground mb-3 text-sm font-bold sm:mb-4 sm:text-base">
                                {section.title}
                            </h3>
                            <ul className="space-y-2 sm:space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-muted-foreground hover:text-primary text-xs transition-colors sm:text-sm"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="border-border/50 flex flex-col items-center justify-between gap-3 border-t py-4 sm:flex-row sm:gap-4 sm:py-5 lg:py-6">
                    <p className="text-muted-foreground flex items-center gap-1 text-xs sm:text-sm">
                        © <span suppressHydrationWarning>{2026}</span> {SITE_CONFIG.name}. Made with
                        <Heart className="mx-0.5 inline h-3 w-3 fill-red-500 text-red-500 sm:mx-1 sm:h-4 sm:w-4" />
                        in Vietnam
                    </p>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                        Built with{' '}
                        <a
                            href="https://nextjs.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground hover:text-primary font-medium transition-colors"
                        >
                            Next.js
                        </a>{' '}
                        &{' '}
                        <a
                            href="https://tailwindcss.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground hover:text-primary font-medium transition-colors"
                        >
                            Tailwind CSS
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
