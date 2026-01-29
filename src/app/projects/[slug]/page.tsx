import { getProjectBySlug, getSortedProjectsData } from '@/lib/projects';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Briefcase, Building2, Calendar, Layout } from 'lucide-react';
import MDXContent from '@/app/post/[slug]/mdx-content';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const projects = getSortedProjectsData();
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata(props: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const params = await props.params;
    const project = getProjectBySlug(params.slug);
    if (!project) {
        return {
            title: 'Không tìm thấy dự án',
        };
    }
    return {
        title: project.frontmatter.name,
        description: project.frontmatter.description,
    };
}

export default async function ProjectDetailPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const project = getProjectBySlug(params.slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="mx-auto max-w-4xl space-y-8">
            {/* Navigation */}
            <Link
                href="/projects"
                className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm font-medium transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                Quay lại danh sách dự án
            </Link>

            {/* Header Section */}
            <div className="space-y-6 border-b border-border/50 pb-8">
                <div className="space-y-4">
                    <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
                        <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                            {project.frontmatter.name}
                        </span>
                    </h1>

                    <div className="flex flex-wrap gap-3 text-sm">
                        {project.frontmatter.role && (
                            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-primary shadow-sm backdrop-blur-sm">
                                <Briefcase className="h-3.5 w-3.5" />
                                <span className="font-medium">{project.frontmatter.role}</span>
                            </div>
                        )}
                        {project.frontmatter.company && (
                            <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-3 py-1 text-muted-foreground backdrop-blur-sm">
                                <Building2 className="h-3.5 w-3.5" />
                                <span>{project.frontmatter.company}</span>
                            </div>
                        )}
                        {project.frontmatter.period && (
                            <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-3 py-1 text-muted-foreground backdrop-blur-sm">
                                <Calendar className="h-3.5 w-3.5" />
                                <span>{project.frontmatter.period}</span>
                            </div>
                        )}
                    </div>
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed sm:text-xl max-w-2xl">
                    {project.frontmatter.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                    {project.frontmatter.url && (
                        <Link
                            href={project.frontmatter.url}
                            target="_blank"
                            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:bg-primary/90 hover:shadow-primary/30 active:scale-95"
                        >
                            Live Demo
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    )}
                </div>
            </div>

            {/* Tech Stack */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground/80 uppercase tracking-wider">
                    <Layout className="h-4 w-4 text-purple-500" />
                    <span>Công nghệ sử dụng</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {project.frontmatter.techStack.map((tech) => (
                        <span
                            key={tech}
                            className="inline-flex items-center rounded-lg border border-border/50 bg-secondary/30 px-3 py-1.5 text-sm font-medium text-secondary-foreground transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* Content Divider */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />

            {/* Main Content */}
            <div className="rounded-3xl border border-border/50 bg-card/50 p-6 sm:p-10 backdrop-blur-sm shadow-sm">
                <article className="prose prose-lg dark:prose-invert max-w-none">
                    <MDXContent source={project.content} />
                </article>
            </div>
        </div>
    );
}
