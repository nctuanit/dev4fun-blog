import { getAllCategories } from '@/lib/posts';
import { Layers } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'Categories - Dev4Fun Blog',
    description: 'Danh mục bài viết trên Dev4Fun Blog',
};

export default function CategoriesPage() {
    const categories = getAllCategories();

    return (
        <div className="container py-8 max-w-4xl mx-auto">
            <div className="mb-8 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-blue-500/20">
                    <Layers className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold">Danh mục</h1>
                    <p className="text-muted-foreground">
                        Sắp xếp bài viết theo chủ đề
                    </p>
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {categories.map((category) => (
                    <Link
                        key={category.name}
                        href={`/categories/${category.name}`}
                        className="group relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                {category.name}
                            </h3>
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-sm font-medium text-secondary-foreground">
                                {category.count}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>

            {categories.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">Chưa có danh mục nào.</p>
                </div>
            )}
        </div>
    );
}
