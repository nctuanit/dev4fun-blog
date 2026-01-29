import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import { GoBackButton } from '@/components/ui/go-back-button';

export default function NotFound() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
            {/* 404 Number */}
            <div className="relative mb-8">
                <h1 className="from-primary bg-gradient-to-br via-purple-500 to-pink-500 bg-clip-text text-[150px] leading-none font-bold text-transparent select-none md:text-[200px]">
                    404
                </h1>
                <div className="text-primary/5 absolute inset-0 text-[150px] leading-none font-bold blur-2xl md:text-[200px]">
                    404
                </div>
            </div>

            {/* Message */}
            <div className="mb-8">
                <h2 className="mb-3 text-2xl font-bold md:text-3xl">Oops! Trang không tồn tại</h2>
                <p className="text-muted-foreground max-w-md text-base md:text-lg">
                    Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển đến địa
                    chỉ khác.
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                    href="/"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-medium transition-colors"
                >
                    <Home className="h-4 w-4" />
                    Về trang chủ
                </Link>
                <Link
                    href="/tags"
                    className="bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-medium transition-colors"
                >
                    <Search className="h-4 w-4" />
                    Xem các chủ đề
                </Link>
            </div>

            {/* Go Back Link */}
            <GoBackButton />
        </div>
    );
}
