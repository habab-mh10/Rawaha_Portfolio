# Rawaha Portfolio Backend

Backend API for Rawaha Portfolio CMS built with Node.js, Express, MongoDB, and Cloudinary.

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account
- Cloudinary account
- npm or yarn

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Setup

Create a `.env` file in the backend folder with the following variables:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rawaha-portfolio?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7

# Frontend Configuration
FRONTEND_URL=http://localhost:5173

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Admin Credentials
ADMIN_EMAIL=portfolioadmin@rawaha.me
ADMIN_PASSWORD=rawahamr11
ADMIN_NAME=M.Rawaha
```

### 3. Get MongoDB URI

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a free cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<username>`, `<password>`, and database name
6. Paste it in `.env` as `MONGODB_URI`

### 4. Get Cloudinary Credentials

1. Go to [Cloudinary](https://cloudinary.com/users/register/free)
2. Sign up for free account
3. Go to Dashboard
4. Copy:
   - Cloud Name
   - API Key
   - API Secret
5. Paste them in `.env`

### 5. Seed Admin User

```bash
npm run seed:admin
```

This will create an admin user with:
- **Email:** portfolioadmin@rawaha.me
- **Password:** rawahamr11
- **Name:** M.Rawaha

### 6. Start Development Server

```bash
npm run dev
```

Server will start at: `http://localhost:5000`

## 📁 Project Structure

```
backend/
├── config/           # Configuration files
│   ├── db.js         # MongoDB connection
│   ├── cloudinary.js # Cloudinary config
│   └── env.js        # Environment validation
├── controllers/      # Route controllers
├── middleware/       # Custom middleware
│   ├── auth.middleware.js
│   ├── upload.middleware.js
│   ├── errorHandler.middleware.js
│   └── validation.middleware.js
├── models/          # Mongoose models
│   ├── AdminUser.js
│   ├── Project.js
│   ├── Order.js
│   ├── Message.js
│   ├── Service.js
│   ├── Testimonial.js
│   ├── Technology.js
│   ├── AboutProfile.js
│   └── TeamMember.js
├── routes/          # API routes
├── scripts/         # Utility scripts
│   └── seedAdmin.js # Admin seed script
├── utils/           # Helper functions
├── uploads/         # Temporary file uploads
├── .env             # Environment variables
├── .env.example     # Environment template
├── package.json
└── server.js        # Entry point
```

## 🔐 API Endpoints

### Authentication
```
POST   /api/admin/auth/login     - Admin login
POST   /api/admin/auth/logout    - Admin logout
GET    /api/admin/auth/me        - Get current admin
PUT    /api/admin/auth/password  - Update password
```

### Health Check
```
GET    /api/health               - Server health check
```

## 🧪 Testing

### Test Server is Running

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Test Admin Login

```bash
curl -X POST http://localhost:5000/api/admin/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "portfolioadmin@rawaha.me",
    "password": "rawahamr11"
  }'
```

## 🛠️ Available Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run seed:admin # Create admin user
```

## 🔒 Security Features

- ✅ JWT authentication with httpOnly cookies
- ✅ Bcrypt password hashing (12 rounds)
- ✅ Helmet.js security headers
- ✅ CORS protection
- ✅ Rate limiting on auth endpoints
- ✅ Input validation with express-validator
- ✅ XSS protection
- ✅ File upload validation
- ✅ Environment variable validation

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment (development/production) | No |
| `PORT` | Server port | No (default: 5000) |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | JWT secret key | Yes |
| `JWT_EXPIRE` | JWT expiration time | No (default: 7d) |
| `FRONTEND_URL` | Frontend URL for CORS | Yes |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes |
| `ADMIN_EMAIL` | Default admin email | No |
| `ADMIN_PASSWORD` | Default admin password | No |
| `ADMIN_NAME` | Default admin name | No |

## 🐛 Troubleshooting

### MongoDB Connection Error

- Check if MongoDB URI is correct
- Ensure your IP is whitelisted in MongoDB Atlas
- Verify database user credentials

### Cloudinary Upload Error

- Verify Cloudinary credentials are correct
- Check if `uploads/` folder exists
- Ensure file size is within limits

### Port Already in Use

```bash
# Change PORT in .env file
PORT=5001
```

## 📚 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT
- **File Upload:** Multer + Cloudinary
- **Validation:** express-validator
- **Security:** Helmet, CORS, bcryptjs
- **Logging:** Morgan

## 🤝 Support

For issues or questions, contact: portfolioadmin@rawaha.me

## 📄 License

MIT License
