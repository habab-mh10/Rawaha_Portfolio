import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Import configurations
import validateEnv from './config/env.js';
import connectDB from './config/db.js';
import configureCloudinary from './config/cloudinary.js';

// Import middleware
import errorHandler from './middleware/errorHandler.middleware.js';

// Import routes
import authRoutes from './routes/auth.routes.js';
import projectRoutes from './routes/project.routes.js';
import orderRoutes from './routes/order.routes.js';
import testimonialRoutes from './routes/testimonial.routes.js';
import technologyRoutes from './routes/technology.routes.js';
import aboutRoutes from './routes/about.routes.js';
import teamRoutes from './routes/team.routes.js';
import messageRoutes from './routes/message.routes.js';
import pricingRoutes from './routes/pricing.routes.js';
import serviceRoutes from './routes/service.routes.js';
import visiongoalsRoutes from './routes/visiongoals.routes.js';

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Validate environment variables
validateEnv();

// Connect to database
connectDB();

// Configure Cloudinary
configureCloudinary();

// Initialize Express app
const app = express();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// CORS configuration
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'http://localhost:5174',
  // Add your production domain here, e.g. 'https://rawaha.me'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter rate limit for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login attempts per windowMs
  message: 'Too many login attempts, please try again after 15 minutes.',
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Don't count successful requests
});

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:", "http:"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
})); // Enhanced security headers
app.use(cors(corsOptions)); // CORS with whitelist
app.use(limiter); // Apply rate limiting to all routes
app.use(mongoSanitize()); // Sanitize data against NoSQL injection
app.use(morgan('dev')); // Logging
app.use(express.json({ limit: '10mb' })); // Parse JSON with size limit
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Parse URL-encoded data
app.use(cookieParser()); // Parse cookies

// Apply stricter rate limit to auth routes
app.use('/api/admin/auth', authLimiter);

// API Routes
app.use('/api/admin/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/technologies', technologyRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/pricing', pricingRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/visiongoals', visiongoalsRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Root route — only shows endpoints in development
app.get('/', (req, res) => {
  const isDev = process.env.NODE_ENV === 'development';
  res.status(200).json({
    success: true,
    message: 'Rawaha Portfolio API',
    version: '1.0.0',
    ...(isDev && {
      endpoints: {
        health: '/api/health',
        auth: '/api/admin/auth',
        projects: '/api/projects',
        orders: '/api/orders',
        services: '/api/services',
        testimonials: '/api/testimonials',
        technologies: '/api/technologies',
        about: '/api/about',
        team: '/api/team',
        visiongoals: '/api/visiongoals',
        messages: '/api/messages',
      },
    }),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handler middleware (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('\n🚀 ===============================================');
  console.log(`   Server running in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`   Server URL: http://localhost:${PORT}`);
  console.log(`   API Version: 1.0.0`);
  console.log('🚀 ===============================================\n');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  // Close server & exit process
  process.exit(1);
});
