import type { Metadata } from "next";

import "./globals.css";
import { Be_Vietnam_Pro, JetBrains_Mono } from "next/font/google";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || SITE_CONFIG.url || 'http://localhost:3000'),
  title: SEO_CONFIG.defaultTitle,
  description: SEO_CONFIG.defaultDescription,
  keywords: SEO_CONFIG.keywords,
};

import { ThemeProvider } from "@/components/theme-provider";
import { MainLayout } from "@/components/layout/MainLayout";
import { SEO_CONFIG, SITE_CONFIG } from "@/lib/constants";
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
      <body className={`${beVietnamPro.className} ${beVietnamPro.variable} ${jetbrainsMono.variable} antialiased`}>
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
        <GoogleAnalytics gaId="G-8WF2XC91PL" />
        <GoogleTagManager gtmId="GTM-TTRKPX7B" />
      </body>
    </html>
  );
}
