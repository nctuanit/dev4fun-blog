# Dev4Fun Blog

Blog cá nhân được xây dựng với Next.js 15, MDX và Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 4
- **Content:** MDX với remark/rehype plugins
- **Package Manager:** Bun
- **Deployment:** Self-hosted với PM2 + Caddy

## Tính năng

- Dark/Light mode
- MDX với syntax highlighting, math equations (KaTeX), GFM
- Tự động tạo mục lục từ headings
- Tìm kiếm bài viết
- SEO friendly (sitemap, robots.txt)
- Responsive design

## Cài đặt

### Yêu cầu

- Node.js 18+
- Bun

### Chạy local

```bash
# Clone repo
git clone https://github.com/your-username/dev4fun-blog.git
cd dev4fun-blog

# Cài đặt dependencies
bun install

# Chạy development server
bun dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem kết quả.

### Build production

```bash
bun run build
bun start
```

## Cấu trúc thư mục

```
dev4fun-blog/
├── content/
│   └── posts/          # Bài viết MDX
├── public/             # Static files
├── src/
│   ├── app/            # Next.js App Router
│   ├── components/     # React components
│   ├── hooks/          # Custom hooks
│   ├── lib/            # Utilities
│   └── actions/        # Server actions
├── scripts/            # Setup scripts
├── Caddyfile           # Caddy config
└── ecosystem.config.js # PM2 config
```

## Viết bài mới

Tạo file `.mdx` trong `content/posts/`:

```mdx
---
title: 'Tiêu đề bài viết'
date: '2026-01-28'
description: 'Mô tả ngắn'
tags: ['tag1', 'tag2']
author: 'Tên tác giả'
readTime: '5'
coverImage: 'https://example.com/image.jpg'
---

Nội dung bài viết...
```

## Deployment

### Setup server lần đầu

```bash
# Trên server (Ubuntu)
curl -fsSL https://raw.githubusercontent.com/your-username/dev4fun-blog/main/scripts/setup-server.sh | bash
```

### CI/CD

Project sử dụng GitHub Actions:

1. **CI** (`ci.yml`): Lint, type check, build
2. **Deploy** (`deploy.yml`): Tự động deploy khi CI thành công

#### Secrets cần thiết

| Secret           | Mô tả                  |
| ---------------- | ---------------------- |
| `SERVER_HOST`    | IP hoặc domain server  |
| `SERVER_USER`    | SSH username           |
| `SERVER_SSH_KEY` | Private SSH key        |
| `SERVER_PORT`    | Port SSH (mặc định 22) |

### Caddy config

Sửa `/etc/caddy/Caddyfile`:

```caddyfile
dev4fun.vn {
    reverse_proxy localhost:3101
    encode gzip
}
```

Reload Caddy:

```bash
sudo systemctl reload caddy
```

### PM2 commands

```bash
# Xem status
pm2 status

# Xem logs
pm2 logs dev4fun-blog

# Restart
pm2 restart dev4fun-blog
```

## License

MIT
