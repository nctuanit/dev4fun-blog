import type { Metadata } from 'next';
import { Github, Star, GitFork, ArrowUpRight, Code2 } from 'lucide-react';
import Link from 'next/link';
import { getSortedProjectsData } from '@/lib/opensrc';

export const metadata: Metadata = {
    title: 'Mã nguồn mở',
    description: 'Các dự án mã nguồn mở mà mình đã đóng góp hoặc xây dựng.',
};

export default function OpenSourcePage() {
    const projects = getSortedProjectsData();
    return (
        <div className="space-y-8">
            <header className="border-border/50 border-b pb-8">
                <h1 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                    <span className="from-blue-500 to-cyan-500 bg-gradient-to-r bg-clip-text text-transparent">
                        Mã nguồn mở
                    </span>
                </h1>
                <p className="text-muted-foreground text-lg sm:text-xl">
                    Các dự án mình đã xây dựng và chia sẻ với cộng đồng.
                </p>
            </header>

            <div className="grid gap-6 md:grid-cols-2">
                {projects.map((project) => (
                    <Link
                        key={project.slug}
                        href={project.frontmatter.url}
                        target="_blank"
                        className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-1 shadow-lg transition-all hover:-translate-y-1 hover:shadow-primary/5 dark:border-white/5 dark:bg-white/5 backdrop-blur-sm"
                    >
                        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl transition-all duration-500 group-hover:bg-blue-500/20" />

                        <div className="relative flex h-full flex-col rounded-[1.2rem] bg-card/50 p-5 transition-colors hover:bg-card/80">
                            <div className="mb-4 flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-blue-500 ring-1 ring-blue-500/20">
                                        <Code2 className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-xl font-bold transition-colors group-hover:text-blue-500">
                                        {project.frontmatter.name}
                                    </h3>
                                </div>
                                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                            </div>

                            <p className="text-muted-foreground mb-6 line-clamp-2 h-12 flex-1 leading-relaxed">
                                {project.frontmatter.description}
                            </p>

                            <div className="flex items-center justify-between border-t border-border/50 pt-4 text-sm mt-auto">
                                <div className="flex items-center gap-2">
                                    <span className="h-2.5 w-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                    <span className="font-medium text-foreground/80">
                                        {project.frontmatter.language}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-muted-foreground">
                                    <div className="flex items-center gap-1.5 rounded-md bg-secondary/50 px-2 py-0.5">
                                        <Star className="h-3.5 w-3.5 text-yellow-500" />
                                        <span className="font-semibold text-foreground">{project.frontmatter.stars}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="rounded-3xl border border-border/50 bg-gradient-to-br from-secondary/50 via-secondary/30 to-background p-6 text-center sm:p-10">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 shadow-inner">
                    <GitFork className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-3 text-2xl font-bold">Bạn muốn đóng góp?</h3>
                <p className="text-muted-foreground mx-auto mb-8 max-w-lg text-lg">
                    Mình luôn hoan nghênh mọi sự đóng góp từ cộng đồng.
                    Hãy ghé thăm GitHub của mình để cùng nhau xây dựng những điều tuyệt vời nhé!
                </p>
                <Link
                    href="https://github.com/nctuanit"
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:shadow-primary/40 active:scale-95"
                >
                    <Github className="h-5 w-5" />
                    Đến GitHub Profile
                </Link>
            </div>
        </div>
    );
}
