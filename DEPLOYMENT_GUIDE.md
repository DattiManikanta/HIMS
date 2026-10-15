# HIMS Hospital Management System - Deployment Guide

This guide explains how to deploy the **Indus Health City HIMS** project across different environments:

1. [Docker Deployment (Any Cloud / VPS)](#1-docker-deployment-recommended)
2. [Cloud VPS (Ubuntu, AWS EC2, DigitalOcean)](#2-cloud-vps-ubuntu--aws-ec2)
3. [Managed Cloud (Render / Railway)](#3-managed-cloud-render--railway)
4. [On-Premise / Hospital Local Network (LAN)](#4-on-premise-hospital-lan)

---

## 1. Docker Deployment (Recommended)

This is the fastest, cleanest way to run the entire stack on any server with Docker installed.

### Prerequisites:
- Install Docker and Docker Compose: `sudo apt install docker.io docker-compose`

### Steps:
```bash
# 1. Clone repository
git clone https://github.com/DattiManikanta/hims.git
cd hims

# 2. Build and start with Docker Compose
docker compose up -d --build

# 3. View running container logs
docker compose logs -f
```

The app will be live at `http://your-server-ip:3000`.

---

## 2. Cloud VPS (Ubuntu / AWS EC2)

For deploying directly on an Ubuntu/Debian server using Node.js and PM2.

### Step 1: Install Dependencies
```bash
sudo apt update && sudo apt upgrade -y
# Install OpenJDK 17
sudo apt install -y openjdk-17-jre openjdk-17-jdk

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 process manager
sudo npm install -g pm2
```

### Step 2: Setup Application
```bash
git clone https://github.com/DattiManikanta/hims.git /var/www/hims
cd /var/www/hims

# Build frontend (if modified)
npm run build
```

### Step 3: Run with PM2 (Auto-restart on reboot)
```bash
# Start server.cjs (handles frontend and launches Spring Boot)
pm2 start server.cjs --name "hims-app"

# Save PM2 process list and configure startup script
pm2 save
pm2 startup
```

### Step 4: Configure Nginx Reverse Proxy & SSL (Optional Domain Setup)
```bash
sudo apt install -y nginx certbot python3-certbot-nginx
```

Create `/etc/nginx/sites-available/hims`:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site and install free SSL:
```bash
sudo ln -s /etc/nginx/sites-available/hims /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx
sudo certbot --nginx -d yourdomain.com
```

---

## 3. Managed Cloud (Render / Railway)

1. Push your repository to GitHub.
2. Sign up on [Render.com](https://render.com) or [Railway.app](https://railway.app).
3. Select **New Web Service** and select your GitHub repository.
4. Choose **Docker** as the Environment / Runtime.
5. Render/Railway will automatically detect the `Dockerfile`, build the image, and provide a free HTTPS URL (e.g. `https://hims-app.onrender.com`).

---

## 4. On-Premise / Hospital LAN (Windows Server)

If you are hosting inside the hospital building so local computers and tablets can access it without external internet:

1. Find the server computer's local IP address (`ipconfig`, e.g., `192.168.1.100`).
2. Run `start_with_springboot.bat` on the server computer.
3. Open Windows Firewall to allow TCP inbound traffic on Port 3000.
4. Other hospital computers can access the app in their browser using:
   `http://192.168.1.100:3000`
5. Scan QR code or open `http://192.168.1.100:3000/mobile` from mobile devices.
