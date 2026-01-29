import { getSortedPostsData } from '@/lib/posts';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://dev4fun.blog';

export async function GET() {
    const posts = getSortedPostsData();

    const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Dev4Fun Blog</title>
    <link>${BASE_URL}</link>
    <description>Chia sẻ kiến thức lập trình và công nghệ</description>
    <language>vi</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    ${posts
            .map((post) => {
                return `
    <item>
      <title><![CDATA[${post.frontmatter.title}]]></title>
      <link>${BASE_URL}/post/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/post/${post.slug}</guid>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.frontmatter.description}]]></description>
      ${post.frontmatter.tags?.map(tag => `<category>${tag}</category>`).join('') || ''}
    </item>`;
            })
            .join('')}
  </channel>
</rss>`;

    return new Response(feed, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 's-maxage=3600, stale-while-revalidate',
        },
    });
}
