// ============================================
// BLOG CONFIGURATION
// ============================================

export const SITE_CONFIG = {
    // Thông tin cơ bản
    name: 'Dev4Fun',
    title: 'Dev4Fun Blog',
    description: 'Blog cá nhân chia sẻ kiến thức lập trình và công nghệ',
    url: 'https://dev4fun.vn',
    logo: '/logo.png',
    favicon: '/favicon.ico',
    // Ngôn ngữ
    locale: 'vi-VN',
    language: 'vi',
} as const;

// ============================================
// SOCIAL LINKS
// ============================================

export const SOCIAL_LINKS = {
    github: 'https://github.com/nctuanit',
    facebook: 'https://www.facebook.com/tuannc.dev/',
    youtube: 'https://www.youtube.com/@devsieucapvippro',
    email: 'info@dev4fun.vn',
    website: 'https://dev4fun.vn',
} as const;

// ============================================
// AUTHOR INFO
// ============================================

export const AUTHOR = {
    name: 'Dev4Fun Team',
    avatar: '/avatar.png',
    bio: 'Chia sẻ kiến thức lập trình và công nghệ',
    job: 'Software Developer',
    location: 'Vietnam',
} as const;

// ============================================
// CACHE CONFIGURATION (in seconds)
// =======================123=====================

export const CACHE_CONFIG = {
    // Revalidate time for static pages
    revalidate: 3600, // 1 hour
    
    // Posts cache
    posts: {
        list: 300,      // 5 minutes
        detail: 600,    // 10 minutes
    },
    
    // Tags cache
    tags: {
        list: 600,      // 10 minutes
    },
    
    // Static assets cache
    assets: {
        images: 86400,  // 1 day
        fonts: 604800,  // 7 days
    },
} as const;

// ============================================
// PAGINATION
// ============================================

export const PAGINATION = {
    postsPerPage: 10,
    tagsPerPage: 20,
    recentPostsCount: 5,
    popularTagsCount: 8,
} as const;

// ============================================
// SEO CONFIGURATION
// ============================================

export const SEO_CONFIG = {
    titleTemplate: '%s | Dev4Fun Blog',
    defaultTitle: 'Dev4Fun Blog - Chia sẻ kiến thức lập trình',
    defaultDescription: 'Blog cá nhân chia sẻ kiến thức về lập trình, công nghệ và những trải nghiệm trong quá trình phát triển phần mềm.',
    keywords:["blog", "lập trình", "developer", "coding", "javascript", "react", "nextjs"]  ,
    openGraph: {
        type: 'website',
        siteName: 'Dev4Fun Blog',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Dev4Fun Blog',
            },
        ],
    },
    twitter: {
        handle: '@dev4fun',
        site: '@dev4fun',
        cardType: 'summary_large_image',
    },
}

// ============================================
// NAVIGATION
// ============================================

export const NAV_ITEMS = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Tags', href: '/tags' },
    { label: 'Về blog', href: '/about' },
] as const;

// ============================================
// THEME COLORS (matching logo)
// ============================================

export const THEME_COLORS = {
    primary: {
        navy: '#2d4a6f',
        orange: '#f5a623',
    },
    gradients: {
        primary: 'from-[#2d4a6f] to-[#f5a623]',
        card: 'from-[#2d4a6f]/10 via-[#f5a623]/10 to-[#2d4a6f]/5',
    },
} as const;

// ============================================
// FEATURE FLAGS
// ============================================

export const FEATURES = {
    enableSearch: true,
    enableComments: false,
    enableNewsletter: false,
    enableAnalytics: false,
    enableDarkMode: true,
} as const;
