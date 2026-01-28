import { MDXRemote } from 'next-mdx-remote/rsc';
// Remark plugins (process markdown)
import remarkGfm from 'remark-gfm';              // GitHub Flavored Markdown: tables, strikethrough, task lists
import remarkMath from 'remark-math';            // Math expressions: $inline$ and $$block$$
import remarkBreaks from 'remark-breaks';        // Convert line breaks to <br>
// Rehype plugins (process HTML)
import rehypeHighlight from 'rehype-highlight';  // Syntax highlighting
import rehypeSlug from 'rehype-slug';            // Add id to headings
import rehypeAutolinkHeadings from 'rehype-autolink-headings'; // Add links to headings
import rehypeKatex from 'rehype-katex';          // Render math with KaTeX
import 'katex/dist/katex.min.css';               // KaTeX styles

interface MDXContentProps {
    source: string;
}

export default function MDXContent({ source }: MDXContentProps) {
    return (
        <div className={`
            prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none
            
            /* Headings */
            prose-headings:font-bold prose-headings:text-foreground
            prose-headings:tracking-tight prose-headings:scroll-mt-20
            [&_h1]:text-2xl sm:[&_h1]:text-3xl lg:[&_h1]:text-4xl [&_h1]:mt-8 [&_h1]:mb-4
            [&_h2]:text-xl sm:[&_h2]:text-2xl lg:[&_h2]:text-3xl [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:pb-2 [&_h2]:border-b [&_h2]:border-border/50
            [&_h3]:text-lg sm:[&_h3]:text-xl lg:[&_h3]:text-2xl [&_h3]:mt-6 [&_h3]:mb-2
            [&_h4]:text-base sm:[&_h4]:text-lg lg:[&_h4]:text-xl [&_h4]:mt-4 [&_h4]:mb-2
            [&_.heading-anchor]:ml-2 [&_.heading-anchor]:opacity-0 [&_.heading-anchor]:text-primary/60
            [&_h2:hover_.heading-anchor]:opacity-100 [&_h3:hover_.heading-anchor]:opacity-100
            [&_.heading-anchor]:transition-opacity [&_.heading-anchor]:no-underline
            
            /* Paragraphs & Text */
            prose-p:text-foreground/85 prose-p:leading-relaxed
            [&_p]:text-sm sm:[&_p]:text-base lg:[&_p]:text-lg
            [&_li]:text-sm sm:[&_li]:text-base lg:[&_li]:text-lg
            prose-strong:text-foreground prose-strong:font-semibold
            
            /* Links */
            prose-a:text-primary prose-a:font-medium prose-a:no-underline
            prose-a:border-b prose-a:border-primary/30 hover:prose-a:border-primary
            prose-a:transition-colors
            
            /* Inline Code */
            prose-code:bg-secondary/80 prose-code:px-1.5 prose-code:py-0.5 
            prose-code:rounded-md prose-code:text-[0.85em] prose-code:font-medium
            prose-code:before:content-none prose-code:after:content-none
            prose-code:text-primary dark:prose-code:text-primary
            
            /* Code Blocks */
            prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-0
            [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-border/50 
            [&_pre]:my-4 sm:[&_pre]:my-6 [&_pre]:overflow-x-auto
            [&_pre]:shadow-sm dark:[&_pre]:shadow-none
            [&_pre]:bg-[#fafafa] dark:[&_pre]:bg-[#1a1b26]
            [&_code]:text-xs sm:[&_code]:text-sm
            [&_pre_code]:p-4 sm:[&_pre_code]:p-5 [&_pre_code]:block
            
            /* Blockquotes */
            prose-blockquote:border-l-4 prose-blockquote:border-primary
            prose-blockquote:bg-primary/5 dark:prose-blockquote:bg-primary/10
            prose-blockquote:py-3 prose-blockquote:px-4 sm:prose-blockquote:px-6
            prose-blockquote:rounded-r-xl prose-blockquote:not-italic
            prose-blockquote:my-6 prose-blockquote:text-foreground/80
            [&_blockquote_p]:text-sm sm:[&_blockquote_p]:text-base
            
            /* Lists */
            [&_ul]:my-4 [&_ol]:my-4 [&_li]:my-1
            prose-li:marker:text-primary/60
            [&_ul_ul]:my-2 [&_ol_ol]:my-2
            
            /* Tables */
            [&_table]:text-xs sm:[&_table]:text-sm [&_table]:w-full 
            [&_table]:border-collapse [&_table]:my-6 [&_table]:rounded-lg [&_table]:overflow-hidden
            [&_table]:shadow-sm dark:[&_table]:shadow-none [&_table]:border [&_table]:border-border
            [&_thead]:bg-secondary/70 dark:[&_thead]:bg-secondary/50
            [&_th]:px-3 sm:[&_th]:px-4 [&_th]:py-2.5 [&_th]:text-left 
            [&_th]:font-semibold [&_th]:text-foreground
            [&_td]:px-3 sm:[&_td]:px-4 [&_td]:py-2.5 [&_td]:border-t [&_td]:border-border/50
            [&_tr]:transition-colors [&_tbody_tr]:hover:bg-secondary/30
            
            /* Images */
            [&_img]:rounded-xl [&_img]:shadow-lg [&_img]:my-6
            [&_img]:border [&_img]:border-border/20
            
            /* Horizontal Rule */
            prose-hr:border-border/50 prose-hr:my-8
            
            /* Task Lists (Checkboxes) */
            [&_input[type=checkbox]]:w-4 [&_input[type=checkbox]]:h-4
            [&_input[type=checkbox]]:accent-primary [&_input[type=checkbox]]:mr-2
            [&_input[type=checkbox]]:rounded
            
            /* Strikethrough */
            [&_del]:text-muted-foreground [&_del]:line-through
            
            /* Math (KaTeX) */
            [&_.katex]:overflow-x-auto [&_.katex-display]:overflow-x-auto 
            [&_.katex-display]:py-4 [&_.katex-display]:my-4
            [&_.katex-display]:bg-secondary/30 [&_.katex-display]:rounded-lg
            
            /* Keyboard */
            [&_kbd]:bg-secondary [&_kbd]:px-2 [&_kbd]:py-1 [&_kbd]:rounded-md
            [&_kbd]:border [&_kbd]:border-border [&_kbd]:shadow-sm
            [&_kbd]:text-xs [&_kbd]:font-mono
            
            /* Definition Lists */
            [&_dl]:my-4 [&_dt]:font-semibold [&_dd]:ml-4 [&_dd]:text-foreground/80
            
            /* Abbreviations */
            [&_abbr]:border-b [&_abbr]:border-dotted [&_abbr]:border-foreground/50
            [&_abbr]:cursor-help
            
            /* Footnotes */
            [&_.footnotes]:mt-8 [&_.footnotes]:pt-4 [&_.footnotes]:border-t [&_.footnotes]:border-border
            [&_.footnotes]:text-sm [&_.footnotes]:text-muted-foreground
        `}>
            <MDXRemote 
                source={source} 
                options={{
                    mdxOptions: {
                        remarkPlugins: [
                            remarkGfm,
                            remarkMath,
                            remarkBreaks,
                        ],
                        rehypePlugins: [
                            rehypeHighlight,
                            rehypeSlug,
                            [rehypeAutolinkHeadings, {
                                behavior: 'append',
                                properties: {
                                    className: ['heading-anchor'],
                                    ariaLabel: 'Link to this section',
                                },
                                content: {
                                    type: 'text',
                                    value: '#',
                                },
                            }],
                            rehypeKatex,
                        ],
                    },
                }}
            />
        </div>
    );
}
