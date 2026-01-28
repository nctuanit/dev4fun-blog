import type { Metadata } from "next";

import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: SEO_CONFIG.defaultTitle,
  description:SEO_CONFIG.defaultDescription,
  keywords: SEO_CONFIG.keywords,
};  

import { ThemeProvider } from "@/components/theme-provider";
import { MainLayout } from "@/components/layout/MainLayout";  
import { SEO_CONFIG } from "@/lib/constants";
import { getAllTags, getSortedPostsData } from "@/lib/posts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tags = getAllTags();
  const posts = getSortedPostsData();
  
  const recentPosts = posts
    .slice(0, 3)
    .map((post) => ({
      slug: post.slug,
      title: post.frontmatter.title,
    }));

  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${inter.className} ${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MainLayout tags={tags} recentPosts={recentPosts}>
            {children}
          </MainLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
