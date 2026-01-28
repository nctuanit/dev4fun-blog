import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import { GoBackButton } from '@/components/ui/go-back-button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      {/* 404 Number */}
      <div className="relative mb-8">
        <h1 className="text-[150px] md:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary via-purple-500 to-pink-500 leading-none select-none">
          404
        </h1>
        <div className="absolute inset-0 text-[150px] md:text-[200px] font-bold text-primary/5 blur-2xl leading-none">
          404
        </div>
      </div>

      {/* Message */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Oops! Trang không tồn tại
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-md">
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển đến địa chỉ khác.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
        >
          <Home className="w-4 h-4" />
          Về trang chủ
        </Link>
        <Link
          href="/tags"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-xl font-medium hover:bg-secondary/80 transition-colors"
        >
          <Search className="w-4 h-4" />
          Xem các chủ đề
        </Link>
      </div>

      {/* Go Back Link */}
      <GoBackButton />
    </div>
  );
}
