# AWS Deployment Guide - River Paws Next.js Application

## Overview

This guide covers deploying your Next.js application to AWS. We'll cover multiple options from easiest to most customizable.

## 🎯 Recommended: AWS Amplify (Easiest)

AWS Amplify is the simplest way to deploy Next.js applications to AWS. It handles:
- Automatic builds
- CI/CD
- SSL certificates
- CDN distribution
- Environment variables
- Custom domains

### Prerequisites

1. AWS Account
2. GitHub/GitLab/Bitbucket repository (or AWS CodeCommit)
3. Node.js 18+ installed locally

### Step 1: Prepare Your Repository

```bash
# Make sure your code is committed and pushed
git add .
git commit -m "Prepare for AWS deployment"
git push origin main
```

### Step 2: Deploy via AWS Amplify Console

1. **Go to AWS Amplify Console**
   - Navigate to: https://console.aws.amazon.com/amplify
   - Click "New app" → "Host web app"

2. **Connect Repository**
   - Choose your Git provider (GitHub, GitLab, Bitbucket, or CodeCommit)
   - Authorize AWS to access your repository
   - Select your repository and branch (usually `main` or `master`)

3. **Configure Build Settings**
   - Amplify will auto-detect Next.js
   - Build settings should be:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
         - .next/cache/**/*
   ```

4. **Environment Variables** (if needed)
   - Add any environment variables in the Amplify console
   - Example: `NODE_ENV=production`

5. **Review and Deploy**
   - Review settings
   - Click "Save and deploy"
   - Wait for build to complete (~5-10 minutes)

### Step 3: Custom Domain (Optional)

1. In Amplify console, go to "Domain management"
2. Click "Add domain"
3. Enter your domain name
4. Follow DNS configuration instructions
5. SSL certificate is automatically provisioned

### Step 4: Configure Next.js for Production

Update `next.config.ts` to ensure production optimizations:

```typescript
const nextConfig: NextConfig = {
  // ... existing config ...
  
  // Ensure output is set correctly for Amplify
  output: 'standalone', // Optional: for better performance
  
  // Environment variables (if needed)
  env: {
    // Add any public env vars here
  },
};
```

### Amplify Advantages
- ✅ Zero configuration needed
- ✅ Automatic SSL certificates
- ✅ Built-in CDN
- ✅ Automatic deployments on git push
- ✅ Preview deployments for PRs
- ✅ Free tier: 15 build minutes/month

### Amplify Pricing
- Free tier: 15 build minutes/month, 5GB storage, 15GB served/month
- Paid: ~$0.01 per build minute, $0.023/GB served

---

## 🐳 Option 2: Docker + ECS/Fargate (More Control)

For more control over infrastructure, use Docker containers on AWS ECS or Fargate.

### Step 1: Create Dockerfile

Create `Dockerfile` in project root:

```dockerfile
# Stage 1: Dependencies
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Stage 2: Builder
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Runner
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Step 2: Update next.config.ts for Standalone Output

```typescript
const nextConfig: NextConfig = {
  // ... existing config ...
  output: 'standalone', // Required for Docker
};
```

### Step 3: Build and Push Docker Image

```bash
# Build image
docker build -t riverpaws:latest .

# Tag for ECR (replace with your AWS account ID and region)
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# Create ECR repository
aws ecr create-repository --repository-name riverpaws --region us-east-1

# Tag image
docker tag riverpaws:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/riverpaws:latest

# Push to ECR
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/riverpaws:latest
```

### Step 4: Deploy to ECS Fargate

1. **Create ECS Cluster**
   ```bash
   aws ecs create-cluster --cluster-name riverpaws-cluster
   ```

2. **Create Task Definition** (task-definition.json):
   ```json
   {
     "family": "riverpaws",
     "networkMode": "awsvpc",
     "requiresCompatibilities": ["FARGATE"],
     "cpu": "256",
     "memory": "512",
     "containerDefinitions": [{
       "name": "riverpaws",
       "image": "<account-id>.dkr.ecr.us-east-1.amazonaws.com/riverpaws:latest",
       "portMappings": [{
         "containerPort": 3000,
         "protocol": "tcp"
       }],
       "essential": true,
       "environment": [
         {"name": "NODE_ENV", "value": "production"}
       ],
       "logConfiguration": {
         "logDriver": "awslogs",
         "options": {
           "awslogs-group": "/ecs/riverpaws",
           "awslogs-region": "us-east-1",
           "awslogs-stream-prefix": "ecs"
         }
       }
     }]
   }
   ```

3. **Register Task Definition**
   ```bash
   aws ecs register-task-definition --cli-input-json file://task-definition.json
   ```

4. **Create Service**
   ```bash
   aws ecs create-service \
     --cluster riverpaws-cluster \
     --service-name riverpaws-service \
     --task-definition riverpaws \
     --desired-count 1 \
     --launch-type FARGATE \
     --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx],securityGroups=[sg-xxx],assignPublicIp=ENABLED}"
   ```

5. **Set up Application Load Balancer** (for HTTPS and custom domain)

### ECS Advantages
- ✅ Full control over infrastructure
- ✅ Can scale horizontally
- ✅ Good for high traffic
- ✅ Can use spot instances for cost savings

### ECS Pricing
- Fargate: ~$0.04/vCPU-hour, ~$0.004/GB-hour
- ALB: ~$0.0225/hour + data transfer

---

## ⚡ Option 3: EC2 Instance (Simplest Infrastructure)

For a simple, single-server deployment:

### Step 1: Launch EC2 Instance

1. Go to EC2 Console → Launch Instance
2. Choose Ubuntu 22.04 LTS (or Amazon Linux 2023)
3. Instance type: t3.small or t3.medium (2GB+ RAM recommended)
4. Configure security group:
   - HTTP (80) from anywhere
   - HTTPS (443) from anywhere
   - SSH (22) from your IP

### Step 2: Connect and Set Up

```bash
# SSH into instance
ssh -i your-key.pem ubuntu@<instance-ip>

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 (process manager)
sudo npm install -g pm2

# Install Nginx (reverse proxy)
sudo apt install nginx -y
```

### Step 3: Deploy Application

```bash
# Clone repository
git clone <your-repo-url>
cd riverpaws

# Install dependencies
npm ci --production

# Build application
npm run build

# Start with PM2
pm2 start npm --name "riverpaws" -- start
pm2 save
pm2 startup  # Follow instructions to enable auto-start
```

### Step 4: Configure Nginx

Edit `/etc/nginx/sites-available/default`:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

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

```bash
# Test nginx config
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx
```

### Step 5: Set Up SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal is set up automatically
```

### EC2 Advantages
- ✅ Simple setup
- ✅ Full control
- ✅ Good for learning
- ✅ Can be cost-effective for small sites

### EC2 Pricing
- t3.small: ~$0.0208/hour (~$15/month)
- Data transfer: First 100GB free, then ~$0.09/GB

---

## 🔧 Pre-Deployment Checklist

Before deploying, ensure:

- [ ] **Environment Variables**: Set up any needed env vars
- [ ] **Build Test**: Run `npm run build` locally to ensure it works
- [ ] **Service Worker**: Test service worker registration
- [ ] **API Routes**: Test all API endpoints
- [ ] **Images**: Verify image optimization works
- [ ] **Security**: Review security headers in `next.config.ts`
- [ ] **Cache**: Test cache invalidation system
- [ ] **Redirects**: Verify redirects work correctly

### Create `.env.production` (if needed)

```bash
# Example .env.production
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://www.riverpaws.dog
```

---

## 📊 Comparison Table

| Option | Difficulty | Cost/Month | Scalability | Best For |
|--------|-----------|------------|-------------|----------|
| **Amplify** | ⭐ Easy | $0-50 | Auto-scales | Most users |
| **ECS Fargate** | ⭐⭐⭐ Medium | $20-100+ | Excellent | High traffic |
| **EC2** | ⭐⭐ Medium | $15-50 | Manual | Learning/Small sites |

---

## 🚀 Recommended: Start with Amplify

For most Next.js applications, **AWS Amplify is the best choice**:
- Easiest setup (5 minutes)
- Automatic deployments
- Built-in CDN and SSL
- Free tier available
- No server management

### Quick Start Commands

```bash
# 1. Ensure code is pushed to Git
git push origin main

# 2. Go to AWS Amplify Console
# https://console.aws.amazon.com/amplify

# 3. Follow the wizard (connect repo, deploy)

# 4. Done! Your site is live.
```

---

## 🔍 Post-Deployment

### Monitor Your Application

1. **AWS CloudWatch** (for Amplify/ECS)
   - Monitor logs
   - Set up alarms
   - Track metrics

2. **Application Monitoring**
   - Check service worker registration
   - Verify cache invalidation works
   - Test all pages load correctly

### Update Cache Version on Deploy

When deploying updates, remember to update cache version:

```bash
node scripts/update-cache-version.js
git add .
git commit -m "Deploy update [cache: 1.0.2 → 1.0.3]"
git push
```

---

## 📝 Additional Resources

- [AWS Amplify Docs](https://docs.amplify.aws/)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [AWS ECS Docs](https://docs.aws.amazon.com/ecs/)
- [EC2 User Guide](https://docs.aws.amazon.com/ec2/)

---

## 🆘 Troubleshooting

### Build Fails
- Check Node.js version (need 18+)
- Verify all dependencies are in `package.json`
- Check build logs in Amplify/CloudWatch

### Service Worker Not Working
- Ensure HTTPS is enabled (required for service workers)
- Check browser console for errors
- Verify `/sw.js` is accessible

### Images Not Loading
- Check Next.js image optimization settings
- Verify image paths are correct
- Check CDN configuration

---

**Last Updated**: January 2025  
**Recommended**: AWS Amplify for easiest deployment



