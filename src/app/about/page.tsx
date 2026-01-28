import { MainLayout } from '@/components/layout/MainLayout';
import { getSortedPostsData, getAllTags } from '@/lib/posts';
import { Code2, Heart, Rocket, Users, FileText, Tag, Github, Twitter, Facebook, Mail, Globe, Sparkles } from 'lucide-react';
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
    { icon: Github, label: 'GitHub', href: SOCIAL_CONFIG.github, color: 'hover:bg-gray-500/20 hover:text-gray-300' },
    { icon: Twitter, label: 'Twitter', href: SOCIAL_CONFIG.twitter, color: 'hover:bg-blue-500/20 hover:text-blue-400' },
    { icon: Facebook, label: 'Facebook', href: SOCIAL_CONFIG.facebook, color: 'hover:bg-blue-600/20 hover:text-blue-500' },
    { icon: Mail, label: 'Email', href: `mailto:${SOCIAL_CONFIG.email}`, color: 'hover:bg-red-500/20 hover:text-red-400' },
    { icon: Globe, label: 'Website', href: SOCIAL_CONFIG.website, color: 'hover:bg-green-500/20 hover:text-green-400' },
];

export default function AboutPage() {
    const posts = getSortedPostsData();
    const tags = getAllTags();
    
    const stats = [
        { icon: FileText, label: 'Bài viết', value: posts.length, color: 'from-blue-500 to-cyan-500' },
        { icon: Tag, label: 'Chủ đề', value: tags.length, color: 'from-purple-500 to-pink-500' },
        { icon: Code2, label: 'Open Source', value: '100%', color: 'from-orange-500 to-yellow-500' },
    ];

    return (
            <div className="text-foreground">
                {/* Hero Section */}
                <div className="relative bg-gradient-to-br from-[#2d4a6f]/10 via-[#f5a623]/5 to-transparent rounded-2xl sm:rounded-3xl border border-border/50 p-5 sm:p-8 md:p-10 lg:p-12 mb-6 sm:mb-8 lg:mb-10 overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-[#f5a623]/10 rounded-full blur-3xl -z-10"></div>
                    <div className="absolute bottom-0 left-0 w-36 sm:w-48 h-36 sm:h-48 bg-[#2d4a6f]/10 rounded-full blur-3xl -z-10"></div>
                    
                    <div className="flex flex-col md:flex-row items-center gap-5 sm:gap-6 md:gap-8">
                        {/* Logo */}
                        <div className="relative h-16 sm:h-20 md:h-24 w-[200px] sm:w-[250px] md:w-[300px] shrink-0">
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
                            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-2 sm:mb-3">
                                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                                Blog về lập trình
                            </div>
                            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
                                {SITE_CONFIG.description}. Nơi chia sẻ kiến thức, kinh nghiệm và những bài học 
                                trong hành trình phát triển phần mềm.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 lg:mb-10">
                    {stats.map((stat) => (
                        <div 
                            key={stat.label}
                            className="group bg-card rounded-xl sm:rounded-2xl border border-border/50 p-3 sm:p-4 md:p-5 text-center hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2 sm:mb-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                                <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                            </div>
                            <div className="text-lg sm:text-2xl md:text-3xl font-bold text-foreground mb-0.5 sm:mb-1">{stat.value}</div>
                            <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* About Author */}
                <div className="bg-card rounded-xl sm:rounded-2xl border border-border/50 p-4 sm:p-6 md:p-8 mb-4 sm:mb-5 md:mb-6">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-5">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        </div>
                        <h2 className="text-base sm:text-lg md:text-xl font-bold">Về Blog</h2>
                    </div>
                    <div className="space-y-3 sm:space-y-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
                        <p>
                            <strong className="text-foreground">{SITE_CONFIG.title}</strong> là nơi tôi chia sẻ những kiến thức, 
                            kinh nghiệm và bài học trong quá trình phát triển phần mềm. Từ những khái niệm cơ bản 
                            đến các kỹ thuật nâng cao, tất cả đều được trình bày một cách dễ hiểu và thực tế.
                        </p>
                        <p>
                            Blog được xây dựng với mục tiêu giúp các bạn mới bắt đầu có thể tiếp cận công nghệ 
                            một cách dễ dàng, đồng thời cung cấp các bài viết chuyên sâu cho những ai muốn 
                            nâng cao kỹ năng.
                        </p>
                    </div>
                </div>

                {/* Mission & Tech Stack Grid */}
                <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-4 sm:mb-5 md:mb-6">
                    {/* Mission */}
                    <div className="bg-card rounded-xl sm:rounded-2xl border border-border/50 p-4 sm:p-6 md:p-8">
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-5">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                                <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                            </div>
                            <h2 className="text-base sm:text-lg md:text-xl font-bold">Sứ mệnh</h2>
                        </div>
                        <ul className="space-y-2 sm:space-y-3 text-muted-foreground text-sm sm:text-base">
                            <li className="flex items-start gap-2 sm:gap-3">
                                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 mt-1.5 sm:mt-2 shrink-0"></span>
                                <span>Chia sẻ kiến thức lập trình miễn phí và chất lượng</span>
                            </li>
                            <li className="flex items-start gap-2 sm:gap-3">
                                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 mt-1.5 sm:mt-2 shrink-0"></span>
                                <span>Xây dựng cộng đồng developer Việt Nam</span>
                            </li>
                            <li className="flex items-start gap-2 sm:gap-3">
                                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 mt-1.5 sm:mt-2 shrink-0"></span>
                                <span>Cập nhật xu hướng công nghệ mới</span>
                            </li>
                            <li className="flex items-start gap-2 sm:gap-3">
                                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 mt-1.5 sm:mt-2 shrink-0"></span>
                                <span>Hỗ trợ các bạn mới học lập trình</span>
                            </li>
                        </ul>
                    </div>

                    {/* Tech Stack */}
                    <div className="bg-card rounded-xl sm:rounded-2xl border border-border/50 p-4 sm:p-6 md:p-8">
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-5">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                                <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500" />
                            </div>
                            <h2 className="text-base sm:text-lg md:text-xl font-bold">Tech Stack</h2>
                        </div>
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                            {SKILLS.map((skill) => (
                                <span 
                                    key={skill.name}
                                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-gradient-to-r ${skill.color} text-white text-xs sm:text-sm font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all cursor-default`}
                                >
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div className="bg-card rounded-xl sm:rounded-2xl border border-border/50 p-4 sm:p-6 md:p-8 mb-4 sm:mb-5 md:mb-6">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-5">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                        </div>
                        <h2 className="text-base sm:text-lg md:text-xl font-bold">Kết nối với tôi</h2>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                        {ABOUT_SOCIAL_LINKS.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl bg-secondary text-muted-foreground ${social.color} transition-all duration-200`}
                            >
                                <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span className="font-medium text-xs sm:text-sm md:text-base">{social.label}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="relative bg-gradient-to-br from-[#2d4a6f]/10 via-[#f5a623]/10 to-[#2d4a6f]/5 rounded-xl sm:rounded-2xl border border-[#2d4a6f]/20 p-5 sm:p-6 md:p-8 lg:p-10 text-center overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 sm:w-80 md:w-96 h-24 sm:h-28 md:h-32 bg-[#f5a623]/20 rounded-full blur-3xl -z-10"></div>
                    
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">Bắt đầu khám phá</h3>
                    <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-5 md:mb-6 max-w-md mx-auto">
                        Xem các bài viết mới nhất hoặc khám phá theo chủ đề yêu thích của bạn
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
                        <Link
                            href="/"
                            className="px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl bg-[#2d4a6f] text-white text-sm sm:text-base font-medium hover:bg-[#2d4a6f]/90 transition-all hover:shadow-lg hover:shadow-[#2d4a6f]/20"
                        >
                            Xem bài viết
                        </Link>
                        <Link
                            href="/tags"
                            className="px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl bg-[#f5a623] text-white text-sm sm:text-base font-medium hover:bg-[#f5a623]/90 transition-all hover:shadow-lg hover:shadow-[#f5a623]/20"
                        >
                            Khám phá tags
                        </Link>
                    </div>
                </div>
            </div>
    );
}
