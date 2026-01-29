import { getSortedPostsData, getAllTags } from '@/lib/posts';
import {
    Code2,
    Heart,
    Rocket,
    Users,
    FileText,
    Tag,
    Github,
    Facebook,
    Mail,
    Globe,
    Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG, SOCIAL_LINKS as SOCIAL_CONFIG } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: `Về Blog - ${SITE_CONFIG.title}`,
    description: SITE_CONFIG.description,
};

const SKILLS = [
    { name: 'React', color: 'from-cyan-400 to-blue-500' },
    { name: 'Next.js', color: 'from-gray-600 to-gray-800' },
    { name: 'TypeScript', color: 'from-blue-400 to-indigo-500' },
    { name: 'Node.js', color: 'from-green-400 to-emerald-500' },
    { name: 'Tailwind CSS', color: 'from-cyan-400 to-teal-500' },
    { name: 'PostgreSQL', color: 'from-blue-500 to-indigo-600' },
];

const ABOUT_SOCIAL_LINKS = [
    {
        icon: Github,
        label: 'GitHub',
        href: SOCIAL_CONFIG.github,
        color: 'hover:bg-gray-500/20 hover:text-gray-300',
    },
    {
        icon: Facebook,
        label: 'Facebook',
        href: SOCIAL_CONFIG.facebook,
        color: 'hover:bg-blue-600/20 hover:text-blue-500',
    },
    {
        icon: Mail,
        label: 'Email',
        href: `mailto:${SOCIAL_CONFIG.email}`,
        color: 'hover:bg-red-500/20 hover:text-red-400',
    },
    {
        icon: Globe,
        label: 'Website',
        href: SOCIAL_CONFIG.website,
        color: 'hover:bg-green-500/20 hover:text-green-400',
    },
];

export default function AboutPage() {
    const posts = getSortedPostsData();
    const tags = getAllTags();

    const stats = [
        {
            icon: FileText,
            label: 'Bài viết',
            value: posts.length,
            color: 'from-blue-500 to-cyan-500',
        },
        { icon: Tag, label: 'Chủ đề', value: tags.length, color: 'from-purple-500 to-pink-500' },
        {
            icon: Code2,
            label: 'Open Source',
            value: '100%',
            color: 'from-orange-500 to-yellow-500',
        },
    ];

    return (
        <div className="text-foreground">
            {/* Hero Section */}
            <div className="border-border/50 relative mb-6 overflow-hidden rounded-2xl border bg-gradient-to-br from-[#2d4a6f]/10 via-[#f5a623]/5 to-transparent p-5 sm:mb-8 sm:rounded-3xl sm:p-8 md:p-10 lg:mb-10 lg:p-12">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 -z-10 h-48 w-48 rounded-full bg-[#f5a623]/10 blur-3xl sm:h-64 sm:w-64"></div>
                <div className="absolute bottom-0 left-0 -z-10 h-36 w-36 rounded-full bg-[#2d4a6f]/10 blur-3xl sm:h-48 sm:w-48"></div>

                <div className="flex flex-col items-center gap-5 sm:gap-6 md:flex-row md:gap-8">
                    {/* Logo */}
                    <div className="relative h-16 w-[200px] shrink-0 sm:h-20 sm:w-[250px] md:h-24 md:w-[300px]">
                        <Image
                            src={SITE_CONFIG.logo}
                            alt={SITE_CONFIG.name}
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>

                    {/* Info */}
                    <div className="text-center md:text-left">
                        <div className="bg-primary/10 text-primary mb-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium sm:mb-3 sm:gap-2 sm:px-3 sm:py-1 sm:text-sm">
                            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
                            Blog về lập trình
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed sm:text-base lg:text-lg">
                            {SITE_CONFIG.description}. Nơi chia sẻ kiến thức, kinh nghiệm và những
                            bài học trong hành trình phát triển phần mềm.
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="mb-6 grid grid-cols-3 gap-2 sm:mb-8 sm:gap-3 md:gap-4 lg:mb-10">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="group bg-card border-border/50 hover:shadow-primary/5 rounded-xl border p-3 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:rounded-2xl sm:p-4 md:p-5"
                    >
                        <div
                            className={`mx-auto mb-2 h-8 w-8 rounded-lg bg-gradient-to-br sm:mb-3 sm:h-10 sm:w-10 sm:rounded-xl md:h-12 md:w-12 ${stat.color} flex items-center justify-center shadow-lg`}
                        >
                            <stat.icon className="h-4 w-4 text-white sm:h-5 sm:w-5 md:h-6 md:w-6" />
                        </div>
                        <div className="text-foreground mb-0.5 text-lg font-bold sm:mb-1 sm:text-2xl md:text-3xl">
                            {stat.value}
                        </div>
                        <div className="text-muted-foreground text-[10px] sm:text-xs md:text-sm">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* About Author */}
            <div className="bg-card border-border/50 mb-4 rounded-xl border p-4 sm:mb-5 sm:rounded-2xl sm:p-6 md:mb-6 md:p-8">
                <div className="mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3 md:mb-5">
                    <div className="from-primary/20 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br to-purple-500/20 sm:h-10 sm:w-10 sm:rounded-xl">
                        <Heart className="text-primary h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <h2 className="text-base font-bold sm:text-lg md:text-xl">Về Blog</h2>
                </div>
                <div className="text-muted-foreground space-y-3 text-sm leading-relaxed sm:space-y-4 sm:text-base">
                    <p>
                        <strong className="text-foreground">{SITE_CONFIG.title}</strong> là nơi tôi
                        chia sẻ những kiến thức, kinh nghiệm và bài học trong quá trình phát triển
                        phần mềm. Từ những khái niệm cơ bản đến các kỹ thuật nâng cao, tất cả đều
                        được trình bày một cách dễ hiểu và thực tế.
                    </p>
                    <p>
                        Blog được xây dựng với mục tiêu giúp các bạn mới bắt đầu có thể tiếp cận
                        công nghệ một cách dễ dàng, đồng thời cung cấp các bài viết chuyên sâu cho
                        những ai muốn nâng cao kỹ năng.
                    </p>
                </div>
            </div>

            {/* Mission & Tech Stack Grid */}
            <div className="mb-4 grid gap-4 sm:mb-5 sm:gap-5 md:mb-6 md:grid-cols-2 md:gap-6">
                {/* Mission */}
                <div className="bg-card border-border/50 rounded-xl border p-4 sm:rounded-2xl sm:p-6 md:p-8">
                    <div className="mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3 md:mb-5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 sm:h-10 sm:w-10 sm:rounded-xl">
                            <Rocket className="h-4 w-4 text-green-500 sm:h-5 sm:w-5" />
                        </div>
                        <h2 className="text-base font-bold sm:text-lg md:text-xl">Sứ mệnh</h2>
                    </div>
                    <ul className="text-muted-foreground space-y-2 text-sm sm:space-y-3 sm:text-base">
                        <li className="flex items-start gap-2 sm:gap-3">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500 sm:mt-2 sm:h-2 sm:w-2"></span>
                            <span>Chia sẻ kiến thức lập trình miễn phí và chất lượng</span>
                        </li>
                        <li className="flex items-start gap-2 sm:gap-3">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500 sm:mt-2 sm:h-2 sm:w-2"></span>
                            <span>Xây dựng cộng đồng developer Việt Nam</span>
                        </li>
                        <li className="flex items-start gap-2 sm:gap-3">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500 sm:mt-2 sm:h-2 sm:w-2"></span>
                            <span>Cập nhật xu hướng công nghệ mới</span>
                        </li>
                        <li className="flex items-start gap-2 sm:gap-3">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500 sm:mt-2 sm:h-2 sm:w-2"></span>
                            <span>Hỗ trợ các bạn mới học lập trình</span>
                        </li>
                    </ul>
                </div>

                {/* Tech Stack */}
                <div className="bg-card border-border/50 rounded-xl border p-4 sm:rounded-2xl sm:p-6 md:p-8">
                    <div className="mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3 md:mb-5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 sm:h-10 sm:w-10 sm:rounded-xl">
                            <Code2 className="h-4 w-4 text-cyan-500 sm:h-5 sm:w-5" />
                        </div>
                        <h2 className="text-base font-bold sm:text-lg md:text-xl">Tech Stack</h2>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                        {SKILLS.map((skill) => (
                            <span
                                key={skill.name}
                                className={`rounded-lg bg-gradient-to-r px-3 py-1.5 sm:rounded-xl sm:px-4 sm:py-2 ${skill.color} cursor-default text-xs font-medium text-white shadow-md transition-all hover:scale-105 hover:shadow-lg sm:text-sm`}
                            >
                                {skill.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Social Links */}
            <div className="bg-card border-border/50 mb-4 rounded-xl border p-4 sm:mb-5 sm:rounded-2xl sm:p-6 md:mb-6 md:p-8">
                <div className="mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3 md:mb-5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 sm:h-10 sm:w-10 sm:rounded-xl">
                        <Users className="h-4 w-4 text-purple-500 sm:h-5 sm:w-5" />
                    </div>
                    <h2 className="text-base font-bold sm:text-lg md:text-xl">Kết nối với tôi</h2>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                    {ABOUT_SOCIAL_LINKS.map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`bg-secondary text-muted-foreground flex items-center gap-1.5 rounded-lg px-3 py-2 sm:gap-2 sm:rounded-xl sm:px-4 sm:py-2.5 md:px-5 md:py-3 ${social.color} transition-all duration-200`}
                        >
                            <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                            <span className="text-xs font-medium sm:text-sm md:text-base">
                                {social.label}
                            </span>
                        </a>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="relative overflow-hidden rounded-xl border border-[#2d4a6f]/20 bg-gradient-to-br from-[#2d4a6f]/10 via-[#f5a623]/10 to-[#2d4a6f]/5 p-5 text-center sm:rounded-2xl sm:p-6 md:p-8 lg:p-10">
                <div className="absolute top-0 left-1/2 -z-10 h-24 w-64 -translate-x-1/2 rounded-full bg-[#f5a623]/20 blur-3xl sm:h-28 sm:w-80 md:h-32 md:w-96"></div>

                <h3 className="mb-2 text-lg font-bold sm:mb-3 sm:text-xl md:text-2xl">
                    Bắt đầu khám phá
                </h3>
                <p className="text-muted-foreground mx-auto mb-4 max-w-md text-sm sm:mb-5 sm:text-base md:mb-6">
                    Xem các bài viết mới nhất hoặc khám phá theo chủ đề yêu thích của bạn
                </p>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
                    <Link
                        href="/"
                        className="rounded-lg bg-[#2d4a6f] px-5 py-2 text-sm font-medium text-white transition-all hover:bg-[#2d4a6f]/90 hover:shadow-lg hover:shadow-[#2d4a6f]/20 sm:rounded-xl sm:px-6 sm:py-2.5 sm:text-base md:px-8 md:py-3"
                    >
                        Xem bài viết
                    </Link>
                    <Link
                        href="/tags"
                        className="rounded-lg bg-[#f5a623] px-5 py-2 text-sm font-medium text-white transition-all hover:bg-[#f5a623]/90 hover:shadow-lg hover:shadow-[#f5a623]/20 sm:rounded-xl sm:px-6 sm:py-2.5 sm:text-base md:px-8 md:py-3"
                    >
                        Khám phá tags
                    </Link>
                </div>
            </div>
        </div>
    );
}
