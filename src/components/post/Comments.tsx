'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

export default function Comments() {
    const { theme } = useTheme();

    return (
        <div className="mt-10 pt-10 border-t border-border/50" id="comments">
            <h2 className="text-2xl font-bold mb-6">Bình luận</h2>
            <Giscus
                id="comments"
                repo="nctuanit/dev4fun-blog"
                repoId="R_kgDORDCAOA"
                category="Q&A"
                categoryId="DIC_kwDORDCAOM4C1kxA"
                mapping="pathname"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme={theme === 'dark' ? 'dark' : 'light'}
                lang="vi"
                loading="lazy"
            />
        </div>
    );
}
