'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

export default function Comments() {
    const { theme } = useTheme();

    return (
        <div className="border-border/50 mt-10 border-t pt-10" id="comments">
            <h2 className="mb-6 text-2xl font-bold">Bình luận</h2>
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
