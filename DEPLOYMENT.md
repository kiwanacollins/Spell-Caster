# Magic Application Deployment Guide

## Docker Deployment on Contabo VPS

This guide covers deploying your Next.js application to a Contabo VPS using Docker and GitHub Actions CI/CD.

## Prerequisites

- Contabo VPS (Ubuntu 20.04/22.04 recommended)
- GitHub repository with this code
- Domain name (optional but recommended)

## Quick Start

### 1. VPS Setup

SSH into your Contabo VPS and run the setup script:

```bash
# Download and run the setup script
wget https://raw.githubusercontent.com/YOUR_USERNAME/magic/main/scripts/vps-setup.sh
chmod +x vps-setup.sh
./vps-setup.sh
```

Or manually:

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Create project directory
sudo mkdir -p /opt/magic
sudo chown $USER:$USER /opt/magic
```

### 2. GitHub Secrets Configuration

Add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):

**VPS Connection:**
- `VPS_HOST`: Your VPS IP address (e.g., `123.45.67.89`)
- `VPS_USERNAME`: SSH username (usually `root` or your user)
- `VPS_SSH_KEY`: Private SSH key for authentication
- `VPS_PORT`: SSH port (default: `22`)

**Environment Variables:**
- `MONGODB_URI`: MongoDB connection string
- `OPENAI_API_KEY`: OpenAI API key
- `STRIPE_SECRET_KEY`: Stripe secret key
- `STRIPE_PUBLIC_KEY`: Stripe publishable key
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook secret
- `WHATSAPP_API_KEY`: WhatsApp API key
- `WHATSAPP_PHONE_NUMBER_ID`: WhatsApp phone number ID
- `MESSENGER_PAGE_ACCESS_TOKEN`: Facebook Messenger token
- `MESSENGER_APP_SECRET`: Facebook Messenger app secret
- `MESSENGER_VERIFY_TOKEN`: Facebook Messenger verify token
- `BETTER_AUTH_SECRET`: Authentication secret (generate with `openssl rand -base64 32`)
- `BETTER_AUTH_URL`: Your application URL
- `NEXT_PUBLIC_APP_URL`: Public application URL

### 3. SSH Key Setup

Generate SSH key for GitHub Actions:

```bash
# On your VPS
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github-actions
cat ~/.ssh/github-actions.pub >> ~/.ssh/authorized_keys
cat ~/.ssh/github-actions  # Copy this to VPS_SSH_KEY secret
```

### 4. Update Docker Compose

Edit `/opt/magic/docker-compose.yml` on your VPS:

```yaml
services:
  app:
    image: ghcr.io/YOUR_GITHUB_USERNAME/magic:latest
    # ... rest of config
```

### 5. Deploy

Push to your main branch:

```bash
git add .
git commit -m "Initial deployment setup"
git push origin main
```

The GitHub Action will automatically:
1. Run tests and linting
2. Build Docker image
3. Push to GitHub Container Registry
4. Deploy to your VPS
5. Run health check

## Manual Deployment

If you prefer to deploy manually:

```bash
# On your VPS
cd /opt/magic

# Pull latest code
git pull origin main

# Build and start
docker compose up -d --build

# View logs
docker compose logs -f
```

## Nginx Reverse Proxy (Optional)

For production with SSL:

```bash
# Install Nginx
sudo apt install nginx certbot python3-certbot-nginx

# Create Nginx config
sudo nano /etc/nginx/sites-available/magic
```

Nginx configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

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
```

Enable and get SSL:

```bash
sudo ln -s /etc/nginx/sites-available/magic /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Monitoring

View logs:
```bash
docker compose logs -f app
```

Check status:
```bash
docker compose ps
```

Restart application:
```bash
docker compose restart
```

## Troubleshooting

**Deployment fails:**
- Check GitHub Actions logs
- Verify all secrets are set correctly
- Ensure SSH key has correct permissions

**Container won't start:**
- Check logs: `docker compose logs app`
- Verify environment variables
- Check MongoDB connection

**Out of memory:**
- Increase VPS RAM
- Enable swap space

**Can't connect:**
- Check firewall rules: `sudo ufw status`
- Verify ports are open
- Check Nginx configuration

## Updating

The application auto-deploys on push to main. For manual update:

```bash
cd /opt/magic
docker compose pull
docker compose up -d
```

## Rollback

To rollback to previous version:

```bash
docker compose down
docker pull ghcr.io/YOUR_USERNAME/magic:PREVIOUS_SHA
docker compose up -d
```

## Security Recommendations

1. Change default SSH port
2. Set up UFW firewall
3. Enable automatic security updates
4. Use strong passwords/keys
5. Regular backups of MongoDB
6. Monitor application logs
7. Keep Docker images updated

## Performance Optimization

1. Enable Docker BuildKit
2. Use multi-stage builds (already configured)
3. Configure CDN for static assets
4. Enable Next.js image optimization
5. Set up database indexes
6. Monitor resource usage

## Support

For issues:
- Check logs: `docker compose logs -f`
- Review GitHub Actions workflow
- Verify all environment variables
- Check VPS resources
