# AWS Deployment - Quick Start Guide

## 🚀 Fastest Way: AWS Amplify (5 minutes)

### Step 1: Push Code to Git
```bash
git add .
git commit -m "Prepare for AWS deployment"
git push origin main
```

### Step 2: Deploy via AWS Console
1. Go to: https://console.aws.amazon.com/amplify
2. Click **"New app"** → **"Host web app"**
3. Connect your Git repository (GitHub/GitLab/Bitbucket)
4. Select branch: `main`
5. Build settings: **Auto-detect** (Amplify will detect Next.js)
6. Click **"Save and deploy"**
7. Wait ~5-10 minutes for build

### Step 3: Done! 🎉
Your site will be live at: `https://<random-id>.amplifyapp.com`

### Step 4: Add Custom Domain (Optional)
1. In Amplify console → **Domain management**
2. Click **"Add domain"**
3. Enter your domain
4. Follow DNS instructions
5. SSL certificate is automatic

---

## 📋 Pre-Deployment Checklist

- [ ] Code is pushed to Git repository
- [ ] `npm run build` works locally
- [ ] All environment variables documented in `.env.example`
- [ ] Service worker tested (`/sw.js` accessible)
- [ ] Images load correctly
- [ ] All pages render without errors

---

## 🔧 Environment Variables (if needed)

In AWS Amplify Console:
1. Go to your app → **Environment variables**
2. Add any variables:
   - `NODE_ENV=production`
   - `NEXT_PUBLIC_SITE_URL=https://www.riverpaws.dog`
   - Any other vars from `.env.example`

---

## 🐳 Docker Deployment (Alternative)

If you prefer Docker:

```bash
# Build image
docker build -t riverpaws .

# Test locally
docker run -p 3000:3000 riverpaws

# Push to AWS ECR and deploy to ECS
# (See AWS_DEPLOYMENT_GUIDE.md for full instructions)
```

---

## 📊 Cost Estimate

**AWS Amplify:**
- Free tier: 15 build minutes/month, 5GB storage, 15GB served/month
- Paid: ~$0.01/build minute, $0.023/GB served
- **Estimated cost**: $0-20/month for small site

**EC2 (t3.small):**
- ~$15/month + data transfer
- Good for learning/small sites

**ECS Fargate:**
- ~$20-50/month + ALB costs
- Best for high traffic

---

## 🆘 Troubleshooting

### Build Fails
- Check Node.js version (need 18+)
- Verify all dependencies in `package.json`
- Check build logs in Amplify console

### Service Worker Not Working
- Ensure HTTPS is enabled (required)
- Check browser console for errors
- Verify `/sw.js` is accessible

### Images Not Loading
- Check Next.js image optimization
- Verify image paths
- Check CDN configuration

---

## 📚 Full Documentation

See `AWS_DEPLOYMENT_GUIDE.md` for:
- Detailed Amplify setup
- Docker + ECS deployment
- EC2 setup
- Advanced configurations

---

**Recommended**: Start with AWS Amplify - it's the easiest! 🎯

