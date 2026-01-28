'use client';

import { ArrowLeft } from 'lucide-react';

export function GoBackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="mt-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
    >
      <ArrowLeft className="w-4 h-4" />
      Quay lại trang trước
    </button>
  );
}
