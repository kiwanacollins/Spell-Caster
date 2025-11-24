#!/bin/bash

# VPS Setup Script for Magic Application
# Run this script on your Contabo VPS to prepare the environment

set -e

echo "=== Magic Application VPS Setup ==="

# Update system packages
echo "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Docker
if ! command -v docker &> /dev/null; then
    echo "Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
else
    echo "Docker already installed"
fi

# Install Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "Installing Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
else
    echo "Docker Compose already installed"
fi

# Create project directory
echo "Creating project directory..."
sudo mkdir -p /opt/magic
sudo chown $USER:$USER /opt/magic

# Create docker-compose.yml for VPS
cat > /opt/magic/docker-compose.yml << 'EOF'
version: '3.8'

services:
  app:
    image: ghcr.io/$GITHUB_USERNAME/$REPO_NAME:latest
    ports:
      - "3000:3000"
    env_file:
      - .env
    restart: unless-stopped
    networks:
      - magic-network

networks:
  magic-network:
    driver: bridge
EOF

# Install Nginx (optional, for reverse proxy)
read -p "Do you want to install Nginx as reverse proxy? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    sudo apt install -y nginx
    
    # Create Nginx configuration
    sudo tee /etc/nginx/sites-available/magic << 'EOF'
server {
    listen 80;
    server_name YOUR_DOMAIN;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF
    
    # Enable site
    sudo ln -sf /etc/nginx/sites-available/magic /etc/nginx/sites-enabled/
    sudo nginx -t && sudo systemctl restart nginx
    
    echo "Nginx installed and configured. Remember to:"
    echo "1. Update YOUR_DOMAIN in /etc/nginx/sites-available/magic"
    echo "2. Set up SSL with: sudo apt install certbot python3-certbot-nginx && sudo certbot --nginx -d YOUR_DOMAIN"
fi

# Install UFW firewall (optional)
read -p "Do you want to configure UFW firewall? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    sudo apt install -y ufw
    sudo ufw default deny incoming
    sudo ufw default allow outgoing
    sudo ufw allow ssh
    sudo ufw allow 80/tcp
    sudo ufw allow 443/tcp
    sudo ufw --force enable
    echo "Firewall configured"
fi

echo ""
echo "=== Setup Complete ==="
echo ""
echo "Next steps:"
echo "1. Add your GitHub secrets to the repository settings:"
echo "   - VPS_HOST (your VPS IP address)"
echo "   - VPS_USERNAME (your VPS username)"
echo "   - VPS_SSH_KEY (your private SSH key)"
echo "   - VPS_PORT (SSH port, default 22)"
echo "   - All environment variables (MONGODB_URI, STRIPE_SECRET_KEY, etc.)"
echo ""
echo "2. Generate an SSH key pair for GitHub Actions:"
echo "   ssh-keygen -t ed25519 -C 'github-actions'"
echo "   cat ~/.ssh/id_ed25519.pub >> ~/.ssh/authorized_keys"
echo "   cat ~/.ssh/id_ed25519  # Add this as VPS_SSH_KEY secret"
echo ""
echo "3. Update docker-compose.yml with your GitHub username and repo name"
echo ""
echo "4. Create a Personal Access Token (PAT) with packages:read permission"
echo "   and add it as GITHUB_TOKEN secret"
echo ""
echo "5. Push to your main branch to trigger deployment"
echo ""
