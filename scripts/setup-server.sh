#!/bin/bash

# ===========================================
# Server Setup Script for Dev4Fun Blog
# Run this script on your server first time
# Uses Caddy as reverse proxy
# ===========================================

set -e

echo "🚀 Setting up server for Dev4Fun Blog..."

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js (via nvm)
echo "📦 Installing Node.js..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install --lts
nvm use --lts

# Install Bun
echo "📦 Installing Bun..."
curl -fsSL https://bun.sh/install | bash
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

# Install PM2
echo "📦 Installing PM2..."
npm install -g pm2

# Setup PM2 to start on boot
pm2 startup
sudo env PATH=$PATH:/home/$(whoami)/.nvm/versions/node/$(node -v)/bin pm2 startup systemd -u $(whoami) --hp /home/$(whoami)

# Create app directory
echo "📁 Creating app directories..."
sudo mkdir -p /var/www/dev4fun-blog
sudo mkdir -p /var/www/backups
sudo mkdir -p /var/log/pm2
sudo chown -R $(whoami):$(whoami) /var/www/dev4fun-blog
sudo chown -R $(whoami):$(whoami) /var/www/backups
sudo chown -R $(whoami):$(whoami) /var/log/pm2

# Install Caddy
echo "📦 Installing Caddy..."
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install -y caddy

# Create Caddy config
echo "⚙️ Configuring Caddy..."
sudo tee /etc/caddy/Caddyfile > /dev/null <<EOF
# Dev4Fun Blog - Caddyfile
# Replace :80 with your domain for automatic HTTPS
# Example: dev4fun.blog

:80 {
    reverse_proxy localhost:3101

    # Enable compression
    encode gzip

    # Logging
    log {
        output file /var/log/caddy/access.log
    }

    # Headers
    header {
        X-Content-Type-Options nosniff
        X-Frame-Options DENY
        Referrer-Policy strict-origin-when-cross-origin
    }
}

# With domain and automatic HTTPS (uncomment and replace):
# dev4fun.blog {
#     reverse_proxy localhost:3101
#
#     encode gzip
#
#     log {
#         output file /var/log/caddy/access.log
#     }
#
#     header {
#         X-Content-Type-Options nosniff
#         X-Frame-Options DENY
#         Referrer-Policy strict-origin-when-cross-origin
#         Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
#     }
# }
EOF

# Create log directory for Caddy
sudo mkdir -p /var/log/caddy
sudo chown caddy:caddy /var/log/caddy

# Restart Caddy
sudo systemctl restart caddy
sudo systemctl enable caddy

# Setup firewall
echo "🔒 Configuring firewall..."
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw --force enable

echo ""
echo "✅ Server setup completed!"
echo ""
echo "Next steps:"
echo "1. Edit /etc/caddy/Caddyfile and replace :80 with your domain"
echo "   Example: dev4fun.blog"
echo "2. Reload Caddy: sudo systemctl reload caddy"
echo "   (SSL will be automatically configured when using a domain)"
echo ""
echo "3. Add GitHub Actions secrets:"
echo "   - SERVER_HOST: Your server IP"
echo "   - SERVER_USER: $(whoami)"
echo "   - SERVER_SSH_KEY: Your private SSH key"
echo ""
echo "Useful commands:"
echo "  - Check Caddy status: sudo systemctl status caddy"
echo "  - View Caddy logs: sudo journalctl -u caddy"
echo "  - Check PM2 status: pm2 status"
echo "  - View app logs: pm2 logs dev4fun-blog"
echo ""
