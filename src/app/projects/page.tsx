import type { Metadata } from 'next';
import { Briefcase, Building2, Calendar, Layout, ArrowUpRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getSortedProjectsData } from '@/lib/projects';

export const metadata: Metadata = {
    title: 'Dự án',
    description: 'Các dự án đã thực hiện và tham gia phát triển.',
};

export default function ProjectsPage() {
    const projects = getSortedProjectsData();

    return (
        <div className="space-y-8">
            <header className="border-border/50 border-b pb-8">
                <h1 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                    <span className="from-primary to-purple-600 bg-gradient-to-r bg-clip-text text-transparent">
                        Dự án đã tham gia
                    </span>
                </h1>
                <p className="text-muted-foreground text-lg sm:text-xl">
                    Hành trình xây dựng và phát triển các sản phẩm công nghệ.
                </p>
            </header>

            <div className="grid gap-8">
                {projects.map((project) => (
                    <div
                        key={project.slug}
                        className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-1 shadow-lg transition-all hover:shadow-primary/5 dark:border-white/5 dark:bg-white/5 backdrop-blur-sm"
                    >
                        {/* Decorative gradient blob */}
                        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/20 blur-3xl transition-all duration-500 group-hover:bg-primary/30" />

                        <div className="relative flex h-full flex-col overflow-hidden rounded-[1.2rem] bg-card/50 p-5 md:p-6 transition-colors hover:bg-card/80">
                            {/* Header: Title & Meta */}
                            <div className="mb-4">
                                <div className="mb-4 flex flex-col gap-2">
                                    <h2 className="text-2xl font-bold sm:text-3xl">
                                        <Link
                                            href={`/projects/${project.slug}`}
                                            className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:from-primary group-hover:to-purple-600 transition-all duration-300"
                                        >
                                            {project.frontmatter.name}
                                        </Link>
                                    </h2>

                                    <div className="flex flex-wrap gap-2 text-sm">
                                        {project.frontmatter.role && (
                                            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-primary text-xs font-medium backdrop-blur-sm">
                                                <Briefcase className="h-3 w-3" />
                                                <span>{project.frontmatter.role}</span>
                                            </div>
                                        )}
                                        {project.frontmatter.company && (
                                            <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-muted-foreground text-xs backdrop-blur-sm">
                                                <Building2 className="h-3 w-3" />
                                                <span>{project.frontmatter.company}</span>
                                            </div>
                                        )}
                                        {project.frontmatter.period && (
                                            <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-muted-foreground text-xs backdrop-blur-sm">
                                                <Calendar className="h-3 w-3" />
                                                <span>{project.frontmatter.period}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Body: Description */}
                            <p className="text-muted-foreground mb-8 text-base leading-relaxed sm:text-lg flex-grow">
                                {project.frontmatter.description}
                            </p>

                            {/* Footer: Tech Stack & Actions */}
                            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between border-t border-border/50 pt-6 mt-auto">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-xs font-semibold text-foreground/80 uppercase tracking-wider">
                                        <Layout className="h-3.5 w-3.5 text-purple-500" />
                                        <span>Công nghệ</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {project.frontmatter.techStack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="inline-flex items-center rounded-md border border-border/50 bg-secondary/30 px-2.5 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 shrink-0">
                                    {project.frontmatter.url && (
                                        <Link
                                            href={project.frontmatter.url}
                                            target="_blank"
                                            className="inline-flex items-center gap-2 rounded-xl bg-secondary/80 px-4 py-2 text-sm font-semibold text-secondary-foreground shadow-sm transition-all hover:bg-secondary hover:text-primary active:scale-95 whitespace-nowrap"
                                        >
                                            Live Demo
                                            <ArrowUpRight className="h-4 w-4" />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {projects.length === 0 && (
                    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-dashed border-border p-8 text-center">
                        <div className="mb-4 rounded-full bg-secondary/50 p-4">
                            <Briefcase className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-bold">Chưa có dự án nào</h3>
                        <p className="text-muted-foreground mt-2 max-w-sm">
                            Danh sách dự án đang được cập nhật. Vui lòng quay lại sau nhé!
                        </p>
                    </div>
                )}
            </div>

            <div className="mt-12 text-center">
                <p className="text-muted-foreground mb-4">
                    Muốn hợp tác cùng mình?
                </p>
                <Link
                    href="/about"
                    className="group inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
                >
                    Liên hệ ngay
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
        </div>
    );
}
