import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const projectsDirectory = path.join(process.cwd(), 'content/projects');

export interface Project {
    slug: string;
    frontmatter: {
        name: string;
        description: string;
        role: string;
        techStack: string[];
        url?: string;
        company?: string;
        coverImage?: string;
        priority?: number; // Higher number = higher priority
        period?: string;
    };
    content: string;
}

export function getSortedProjectsData(): Project[] {
    // Create content/projects if it doesn't exist
    if (!fs.existsSync(projectsDirectory)) {
        fs.mkdirSync(projectsDirectory, { recursive: true });
        return [];
    }

    const fileNames = fs.readdirSync(projectsDirectory);
    const allProjectsData = fileNames
        .filter((fileName) => fileName.endsWith('.mdx'))
        .map((fileName) => {
            // Remove ".mdx" from file name to get id
            const slug = fileName.replace(/\.mdx$/, '');

            // Read markdown file as string
            const fullPath = path.join(projectsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');

            // Use gray-matter to parse the post metadata section
            const matterResult = matter(fileContents);

            return {
                slug,
                frontmatter: matterResult.data as Project['frontmatter'],
                content: matterResult.content,
            };
        });


    // Sort projects by priority (descending) then by name (ascending)
    return allProjectsData.sort((a, b) => {
        const priorityA = a.frontmatter.priority || 0;
        const priorityB = b.frontmatter.priority || 0;

        if (priorityA > priorityB) return -1;
        if (priorityA < priorityB) return 1;

        return a.frontmatter.name.localeCompare(b.frontmatter.name);
    });
}

export function getProjectBySlug(slug: string): Project | null {
    try {
        const fullPath = path.join(projectsDirectory, `${slug}.mdx`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        return {
            slug,
            frontmatter: matterResult.data as Project['frontmatter'],
            content: matterResult.content,
        };
    } catch {
        return null;
    }
}
