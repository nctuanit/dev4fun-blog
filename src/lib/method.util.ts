import { TOCItem } from "@/components/post/TableOfContents";
import GithubSlugger from 'github-slugger';

/**
 * Extract headings from markdown content
 * Supports h1-h6 headings with # syntax
 * Uses github-slugger to match rehype-slug's behavior
 */
export function extractHeadings(content: string): TOCItem[] {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const headings: TOCItem[] = [];
    const slugger = new GithubSlugger();
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
        const level = match[1].length;
        const rawText = match[2];
        
        // Clean text for display (remove markdown formatting)
        const text = rawText
            .replace(/\*\*(.+?)\*\*/g, '$1')  // Remove bold
            .replace(/\*(.+?)\*/g, '$1')      // Remove italic
            .replace(/`(.+?)`/g, '$1')        // Remove inline code
            .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Remove links, keep text
            .trim();

        // Use github-slugger to generate id (same as rehype-slug)
        const id = slugger.slug(rawText);

        if (text && id) {
            headings.push({ id, text, level });
        }
    }

    return headings;
}
