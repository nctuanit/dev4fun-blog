'use client';

import { useEffect } from 'react';

export default function CopyCodeButton() {
    useEffect(() => {
        const codeBlocks = document.querySelectorAll('pre');

        codeBlocks.forEach((pre) => {
            // Skip if already has copy button
            if (pre.querySelector('.copy-code-btn')) return;

            // Create wrapper if needed
            const wrapper = document.createElement('div');
            wrapper.className = 'relative group';
            pre.parentNode?.insertBefore(wrapper, pre);
            wrapper.appendChild(pre);

            // Create copy button
            const button = document.createElement('button');
            button.className =
                'copy-code-btn absolute top-2 right-2 p-2 rounded-lg bg-secondary/80 hover:bg-secondary text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-all duration-200 z-10';
            button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
            button.title = 'Sao chép mã';

            button.addEventListener('click', async () => {
                const code = pre.querySelector('code')?.textContent || pre.textContent || '';

                try {
                    await navigator.clipboard.writeText(code);
                    button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500"><polyline points="20 6 9 17 4 12"/></svg>`;
                    button.title = 'Đã sao chép!';

                    setTimeout(() => {
                        button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
                        button.title = 'Sao chép mã';
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
            });

            wrapper.appendChild(button);
        });
    }, []);

    return null;
}
