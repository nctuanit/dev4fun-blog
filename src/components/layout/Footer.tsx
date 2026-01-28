import Link from 'next/link';
import Image from 'next/image';
import { Github, Twitter, Facebook, Mail, Heart } from 'lucide-react';
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
        links: [
            { label: 'Sitemap', href: '/sitemap.xml' },
        ],
    },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm mt-10 sm:mt-12 lg:mt-16">
            <div className="max-w-7xl mx-auto px-4 lg:px-6">
                {/* Main Footer Content */}
                <div className="py-8 sm:py-10 lg:py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-block mb-3 sm:mb-4">
                            <div className="relative h-8 sm:h-10 w-[130px] sm:w-[160px]">
                                <Image
                                    src={SITE_CONFIG.logo}
                                    alt={SITE_CONFIG.name}
                                    fill
                                    className="object-contain object-left rounded-sm"
                                />
                            </div>
                        </Link>
                        <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-md mb-4 sm:mb-6">
                            {SITE_CONFIG.description}. Cập nhật xu hướng công nghệ mới nhất và chia sẻ 
                            những kinh nghiệm thực tế trong quá trình phát triển phần mềm.
                        </p>
                        
                        {/* Social Links */}
                        <div className="flex gap-2 sm:gap-3">
                            {FOOTER_SOCIAL_LINKS.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-secondary hover:bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary transition-all hover:scale-110"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Footer Links */}
                    {FOOTER_LINKS.map((section) => (
                        <div key={section.title}>
                            <h3 className="font-bold text-foreground text-sm sm:text-base mb-3 sm:mb-4">{section.title}</h3>
                            <ul className="space-y-2 sm:space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
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
                <div className="py-4 sm:py-5 lg:py-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                    <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                        © {currentYear} {SITE_CONFIG.name}. Made with 
                        <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 fill-red-500 inline mx-0.5 sm:mx-1" /> 
                        in Vietnam
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                        Built with{' '}
                        <a 
                            href="https://nextjs.org" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-foreground hover:text-primary transition-colors font-medium"
                        >
                            Next.js
                        </a>
                        {' '}& {' '}
                        <a 
                            href="https://tailwindcss.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-foreground hover:text-primary transition-colors font-medium"
                        >
                            Tailwind CSS
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
