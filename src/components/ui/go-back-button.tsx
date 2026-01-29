'use client';

import { ArrowLeft } from 'lucide-react';

export function GoBackButton() {
    return (
        <button
            onClick={() => window.history.back()}
            className="text-muted-foreground hover:text-primary mt-6 inline-flex cursor-pointer items-center gap-1 text-sm transition-colors"
        >
            <ArrowLeft className="h-4 w-4" />
            Quay lại trang trước
        </button>
    );
}
