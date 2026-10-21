# Deployment Guide - Rawaha Portfolio CMS

## 📦 Pre-Deployment Checklist

### ✅ Code Preparation
- [ ] All tests passing
- [ ] No console.log statements in production code
- [ ] Environment variables documented
- [ ] Dependencies up to date
- [ ] Security audit completed
- [ ] Code committed to repository

### ✅ Configuration
- [ ] Production environment variables prepared
- [ ] MongoDB production cluster ready
- [ ] Cloudinary account configured
- [ ] Domain name purchased (if needed)
- [ ] SSL certificate ready

---

## 🗄️ Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Cluster
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign in or create account
3. Create new cluster (Free tier available)
4. Choose cloud provider and region
5. Wait for cluster creation (2-5 minutes)

### Step 2: Configure Database Access
1. **Network Access**:
   - Go to Network Access
   - Add IP address: `0.0.0.0/0` (Allow from anywhere) OR
   - Add your server's specific IP address (more secure)

2. **Database User**:
   - Go to Database Access
   - Add new database user
   - Choose username and strong password
   - Set role to "Read and write to any database"

### Step 3: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `myPortfolio-DB`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/myPortfolio-DB?retryWrites=true&w=majority
```

### Step 4: Seed Admin User
```bash
cd backend
npm run seed:admin
```

---

## ☁️ Backend Deployment Options

### Option 1: Heroku (Recommended for beginners)

#### Step 1: Install Heroku CLI
```bash
# macOS
brew tap heroku/brew && brew install heroku

# Windows
# Download from https://devcenter.heroku.com/articles/heroku-cli

# Verify installation
heroku --version
```

#### Step 2: Login to Heroku
```bash
heroku login
```

#### Step 3: Create Heroku App
```bash
cd backend
heroku create rawaha-portfolio-api
```

#### Step 4: Set Environment Variables
```bash
heroku config:set NODE_ENV=production
heroku config:set PORT=5001
heroku config:set MONGODB_URI="your-mongodb-connection-string"
heroku config:set JWT_SECRET="your-super-secret-jwt-key-32-chars-minimum"
heroku config:set JWT_EXPIRE=7d
heroku config:set CLOUDINARY_CLOUD_NAME="your-cloud-name"
heroku config:set CLOUDINARY_API_KEY="your-api-key"
heroku config:set CLOUDINARY_API_SECRET="your-api-secret"
heroku config:set ADMIN_EMAIL="portfolioadmin@rawaha.me"
heroku config:set ADMIN_PASSWORD="change-this-in-production"
heroku config:set ADMIN_NAME="M.Rawaha"
heroku config:set FRONTEND_URL="https://your-frontend-domain.com"
```

#### Step 5: Create Procfile
```bash
echo "web: node server.js" > Procfile
```

#### Step 6: Deploy
```bash
git add .
git commit -m "Prepare for Heroku deployment"
heroku git:remote -a rawaha-portfolio-api
git push heroku main
```

#### Step 7: Verify
```bash
heroku logs --tail
heroku open
```

---

### Option 2: Railway.app (Modern alternative)

#### Step 1: Sign Up
1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub

#### Step 2: Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository
4. Select `backend` as root directory

#### Step 3: Configure Environment Variables
Add all variables from `.env.example` in the Railway dashboard

#### Step 4: Deploy
Railway automatically deploys on git push

---

### Option 3: Render (Free tier available)

#### Step 1: Create Account
1. Go to [Render.com](https://render.com)
2. Sign up with GitHub

#### Step 2: New Web Service
1. Click "New" → "Web Service"
2. Connect your repository
3. Configure:
   - **Name**: rawaha-portfolio-api
   - **Environment**: Node
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && node server.js`
   - **Instance Type**: Free

#### Step 3: Environment Variables
Add all variables in Render dashboard

#### Step 4: Deploy
Render automatically deploys

---

### Option 4: DigitalOcean / AWS / VPS (Advanced)

#### Requirements
- Ubuntu 20.04+ server
- Node.js 16+ installed
- Nginx for reverse proxy
- PM2 for process management
- SSL certificate (Let's Encrypt)

#### Step 1: Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx
```

#### Step 2: Clone Repository
```bash
cd /var/www
git clone https://github.com/your-username/rawaha-portfolio.git
cd rawaha-portfolio/backend
npm install
```

#### Step 3: Configure Environment
```bash
nano .env
# Add all production environment variables
```

#### Step 4: Start with PM2
```bash
pm2 start server.js --name rawaha-api
pm2 save
pm2 startup
```

#### Step 5: Configure Nginx
```bash
sudo nano /etc/nginx/sites-available/rawaha-api
```

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/rawaha-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Step 6: SSL with Let's Encrypt
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.yourdomain.com
```

---

## 🎨 Frontend Deployment Options

### Option 1: Vercel (Recommended)

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Login
```bash
vercel login
```

#### Step 3: Configure
Create `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "env": {
    "VITE_API_URL": "https://your-backend-url.com"
  }
}
```

#### Step 4: Deploy
```bash
vercel --prod
```

---

### Option 2: Netlify

#### Step 1: Create `netlify.toml`
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  VITE_API_URL = "https://your-backend-url.com"
```

#### Step 2: Deploy
1. Go to [Netlify.com](https://netlify.com)
2. Sign in with GitHub
3. "New site from Git"
4. Select repository
5. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Add environment variables
7. Deploy

---

### Option 3: GitHub Pages (Static only)

```bash
npm run build
npm run deploy
```

---

## 🔧 Post-Deployment Configuration

### Update Frontend API URL

Create `.env.production`:
```env
VITE_API_URL=https://your-backend-url.com
```

### Update Backend CORS

In `backend/server.js`:
```javascript
const corsOptions = {
  origin: 'https://your-frontend-domain.com',
  credentials: true,
};
```

### Test Deployment

1. **Backend Health Check**:
   ```
   https://your-backend-url.com/api/health
   ```

2. **Frontend Load**:
   ```
   https://your-frontend-domain.com
   ```

3. **Admin Login**:
   ```
   https://your-frontend-domain.com/admin/login
   ```

---

## 📊 Monitoring & Maintenance

### Set Up Monitoring

#### Backend Monitoring
```bash
# PM2 monitoring (if using VPS)
pm2 monitor

# Or use services:
# - New Relic
# - Datadog
# - AppDynamics
```

#### Error Tracking
```javascript
// Install Sentry
npm install @sentry/node

// Configure in server.js
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: process.env.NODE_ENV,
});
```

### Regular Maintenance

```bash
# Update dependencies monthly
npm update
npm audit fix

# Check for outdated packages
npm outdated

# Backup database weekly
mongodump --uri="your-mongodb-uri"

# Monitor logs
heroku logs --tail  # Heroku
pm2 logs           # PM2
```

---

## 🚨 Rollback Procedure

### Heroku
```bash
# View releases
heroku releases

# Rollback to previous
heroku rollback

# Rollback to specific version
heroku rollback v102
```

### Vercel
```bash
# View deployments
vercel ls

# Promote specific deployment
vercel promote <deployment-url>
```

### VPS/PM2
```bash
# Keep git history
git reset --hard HEAD~1
pm2 restart rawaha-api
```

---

## 📝 Environment Variables Reference

### Backend (.env)
```env
# Required
NODE_ENV=production
PORT=5001
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-32-character-secret-key
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
FRONTEND_URL=https://your-frontend.com

# Optional
ADMIN_EMAIL=portfolioadmin@rawaha.me
ADMIN_PASSWORD=secure-password
ADMIN_NAME=M.Rawaha
```

### Frontend (.env.production)
```env
VITE_API_URL=https://your-backend-url.com
```

---

## ✅ Deployment Verification Checklist

- [ ] Backend health endpoint responding
- [ ] Database connection successful
- [ ] Admin login working
- [ ] Public pages loading
- [ ] Images/videos uploading to Cloudinary
- [ ] Contact form submitting
- [ ] Dashboard showing real statistics
- [ ] All API endpoints working
- [ ] HTTPS enabled
- [ ] CORS configured correctly
- [ ] Error tracking active
- [ ] Monitoring set up
- [ ] Backup strategy implemented
- [ ] Domain pointing to correct servers
- [ ] SSL certificates valid

---

## 📞 Support

For deployment assistance:
- **Email**: rawahamr11@gmail.com
- **WhatsApp**: +92 302 80 53159

---

## 🎉 Post-Deployment

Congratulations! Your portfolio CMS is now live!

### Share Your Work
- Update LinkedIn with new portfolio link
- Share on social media
- Add to resume
- Submit to portfolio showcases

### Next Steps
- Monitor performance
- Gather user feedback
- Plan feature additions
- Regular security updates

---

**Last Updated**: 2026-10-10
**Version**: 1.0.0
