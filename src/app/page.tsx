
import { PostCard } from '@/components/feed/PostCard';
import { getSortedPostsData } from '@/lib/posts';
import { FileText } from 'lucide-react';

export default function Home() {
  const posts = getSortedPostsData();
  
  return (
      <div className="text-foreground">
        {/* Page Title */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Bài viết mới nhất</h1>
          <p className="text-muted-foreground text-xs sm:text-sm mt-1">Chia sẻ kiến thức lập trình và công nghệ</p>
        </div>
        {/* Posts Feed */}
        {posts.length > 0 ? (
          <div className="space-y-0">
            {posts.map((post, index) => (
              <PostCard
                key={post.slug}
                slug={post.slug}
                title={post.frontmatter.title}
                description={post.frontmatter.description}
                author={{
                  name: post.frontmatter.author || 'Dev4Fun',
                  image: '',
                  date: post.frontmatter.date
                }}
                tags={post.frontmatter.tags ? post.frontmatter.tags.map(t => `#${t}`) : []}
                readTime={post.frontmatter.readTime || '5'}
                coverImage={post.frontmatter.coverImage}
                isFirst={index === 0}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20 text-center bg-card rounded-2xl border border-border/50">
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mb-3 sm:mb-4 rounded-2xl bg-gradient-to-br from-primary/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center">
              <FileText className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary" />
            </div>
            <h3 className="text-base sm:text-lg font-bold mb-2">Chưa có bài viết nào</h3>
            <p className="text-muted-foreground text-xs sm:text-sm max-w-sm px-4">
              Thêm file .mdx vào thư mục <code className="bg-secondary px-1.5 py-0.5 rounded text-xs">content/posts</code> để bắt đầu.
            </p>
          </div>
        )}
      </div>
  );
}
