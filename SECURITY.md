# Security Documentation - Rawaha Portfolio CMS

## 🔒 Security Overview

This document outlines the security measures implemented in the Rawaha Portfolio CMS to protect against common vulnerabilities and ensure data safety.

---

## 🛡️ Authentication & Authorization

### Password Security
- **Hashing Algorithm**: bcrypt with salt rounds of 10
- **Password Requirements**: Minimum 6 characters (recommended to increase in production)
- **Storage**: Passwords never stored in plain text
- **Comparison**: Secure bcrypt comparison method used

```javascript
// Password hashing on user creation
const hashedPassword = await bcrypt.hash(password, 10);

// Password verification
const isMatch = await bcrypt.compare(password, user.password);
```

### JWT Token Security
- **Secret Key**: Stored in environment variables
- **Token Expiration**: 7 days (configurable)
- **Signing**: HS256 algorithm
- **Storage**: Client-side in localStorage (consider httpOnly cookies for production)
- **Transmission**: Included in Authorization header as Bearer token

```javascript
// Token generation
const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXPIRE || '7d',
});
```

### Protected Routes
- All admin endpoints require valid JWT token
- Middleware validates token before processing request
- Invalid/expired tokens return 401 Unauthorized
- User must re-authenticate after token expiration

---

## 🔐 API Security

### CORS Configuration
```javascript
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200,
};
```
- Restricts API access to specified frontend origin
- Allows credentials (cookies, authorization headers)
- Prevents cross-origin attacks

### Rate Limiting
```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
```
- Applied to public order submission endpoint
- Prevents brute force attacks
- Configurable per endpoint

### Security Headers (Helmet)
```javascript
app.use(helmet());
```
Automatically sets security headers:
- `X-DNS-Prefetch-Control`
- `X-Frame-Options`
- `Strict-Transport-Security`
- `X-Download-Options`
- `X-Content-Type-Options`
- `X-XSS-Protection`

---

## 📝 Input Validation & Sanitization

### Backend Validation
Using `express-validator`:
```javascript
[
  body('email').isEmail().normalizeEmail(),
  body('message').trim().notEmpty(),
  validate,
]
```

### Mongoose Schema Validation
```javascript
email: {
  type: String,
  required: [true, 'Email is required'],
  unique: true,
  lowercase: true,
  trim: true,
  match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
}
```

### Protection Against:
- **SQL Injection**: Not applicable (using MongoDB with Mongoose)
- **NoSQL Injection**: Mongoose sanitizes queries by default
- **XSS**: Input sanitization and output encoding
- **CSRF**: Token-based authentication (stateless)

---

## 📁 File Upload Security

### Multer Configuration
```javascript
const storage = multer.memoryStorage(); // Buffer uploads, not disk
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|svg/;
  // Validate file type and MIME type
};
```

### Security Measures
1. **File Type Validation**: Only specific image/video types allowed
2. **File Size Limits**: 
   - Images: 5MB max
   - Videos: 50MB max
3. **Memory Storage**: Files kept in buffer, not written to disk
4. **Cloudinary Upload**: 
   - Additional validation on upload
   - Automatic virus scanning
   - CDN delivery
5. **No Direct File Access**: Files not accessible via direct URLs

### Cloudinary Security
```javascript
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
```
- API credentials in environment variables
- Secure transmission (HTTPS)
- Access control on resources

---

## 🔑 Environment Variables

### Required Variables
```env
# Server
PORT=5001
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://...

# JWT
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRE=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Admin
ADMIN_EMAIL=portfolioadmin@rawaha.me
ADMIN_PASSWORD=rawahamr11
ADMIN_NAME=M.Rawaha

# Frontend
FRONTEND_URL=http://localhost:5173
```

### Security Best Practices
✅ Never commit `.env` file to version control
✅ Use different secrets for development/production
✅ Rotate JWT secret periodically
✅ Use strong, random secrets (min 32 characters)
✅ Restrict file permissions on production server

---

## 🗄️ Database Security

### MongoDB Connection
```javascript
mongoose.connect(process.env.MONGODB_URI, {
  // useNewUrlParser: true, // No longer needed
  // useUnifiedTopology: true, // No longer needed
});
```

### Security Measures
1. **Connection String**: Stored in environment variable
2. **Authentication**: Username/password in connection string
3. **Network Security**: IP whitelist on MongoDB Atlas
4. **Encryption**: Data encrypted in transit (TLS/SSL)
5. **Database Access**: Restricted to backend server only

### Schema-Level Security
- Field validation at schema level
- Unique constraints on critical fields
- Indexes for performance (reduce DoS risk)
- No sensitive data exposed in API responses

```javascript
// Password excluded from queries
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};
```

---

## 🌐 Frontend Security

### React Security Practices
1. **No Eval**: Never using `eval()` or `Function()` constructor
2. **Sanitized Output**: React automatically escapes values
3. **Secure Dependencies**: Regular npm audit
4. **Environment Variables**: Public URL only in frontend env

### Local Storage
⚠️ **Current**: JWT token stored in localStorage
🔒 **Production Recommendation**: Use httpOnly cookies

```javascript
// Current implementation
localStorage.setItem('token', token);

// Recommended for production
// Use httpOnly cookies set by backend
```

### API Key Protection
✅ No API keys in frontend code
✅ All sensitive operations through backend
✅ Cloudinary URLs are public CDN (safe to expose)

---

## 🚨 Error Handling

### Security-Focused Error Messages
```javascript
// ❌ Bad - Exposes system details
throw new Error('MongoDB connection failed at 192.168.1.1:27017');

// ✅ Good - Generic error message
return errorResponse(res, 500, 'Database connection error');
```

### Error Handler Middleware
```javascript
export const errorHandler = (err, req, res, next) => {
  // Log full error for debugging
  console.error(err);
  
  // Send generic error to client
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    // No stack traces in production
  });
};
```

---

## 🔍 Security Audit Checklist

### Pre-Deployment Security Review

#### Authentication & Authorization
- [ ] Change default admin credentials
- [ ] Use strong JWT secret (32+ random characters)
- [ ] Implement password strength requirements
- [ ] Add account lockout after failed login attempts
- [ ] Consider 2FA for admin accounts

#### API Security
- [ ] Review and tighten CORS settings for production
- [ ] Implement rate limiting on all public endpoints
- [ ] Add request logging and monitoring
- [ ] Set up API usage alerts
- [ ] Review all error messages (no sensitive info)

#### Data Protection
- [ ] Enable MongoDB encryption at rest
- [ ] Set up regular database backups
- [ ] Implement data retention policies
- [ ] Add audit logging for sensitive operations
- [ ] Review data access permissions

#### Infrastructure
- [ ] Use HTTPS in production (SSL/TLS certificates)
- [ ] Configure firewall rules
- [ ] Keep dependencies updated
- [ ] Set up security monitoring
- [ ] Implement DDoS protection

#### File Uploads
- [ ] Review file size limits
- [ ] Verify Cloudinary security settings
- [ ] Implement virus scanning if needed
- [ ] Set up upload abuse monitoring

---

## 🛠️ Security Tools & Commands

### Dependency Security Audit
```bash
# Check for vulnerabilities
cd backend
npm audit

# Fix vulnerabilities
npm audit fix

# Frontend audit
cd ..
npm audit
```

### Update Dependencies
```bash
# Backend
cd backend
npm update
npm outdated

# Frontend
cd ..
npm update
npm outdated
```

### Environment Variable Validation
```bash
# Run validation script
node backend/config/env.js
```

---

## 📊 Security Monitoring

### Recommended Monitoring Tools
1. **Application Monitoring**: New Relic, Datadog
2. **Error Tracking**: Sentry
3. **Log Management**: Loggly, Papertrail
4. **Security Scanning**: Snyk, Dependabot
5. **Uptime Monitoring**: Pingdom, UptimeRobot

### Key Metrics to Monitor
- Failed login attempts
- API error rates
- Upload volumes and types
- Database query performance
- Server resource usage
- Unusual traffic patterns

---

## 🚀 Production Security Checklist

Before deploying to production:

- [ ] Change all default credentials
- [ ] Use production MongoDB cluster
- [ ] Set `NODE_ENV=production`
- [ ] Use strong, unique JWT secret
- [ ] Configure HTTPS/SSL
- [ ] Set up firewall rules
- [ ] Enable MongoDB IP whitelist
- [ ] Review CORS settings
- [ ] Implement rate limiting on all public endpoints
- [ ] Set up error logging (Sentry, etc.)
- [ ] Configure backup strategy
- [ ] Set up monitoring and alerts
- [ ] Review and minimize exposed error messages
- [ ] Implement httpOnly cookies for tokens
- [ ] Set secure cookie flags
- [ ] Add CSP (Content Security Policy) headers
- [ ] Regular security audits
- [ ] Keep all dependencies updated

---

## 📞 Security Contact

For security concerns or to report vulnerabilities:

- **Email**: rawahamr11@gmail.com
- **WhatsApp**: +92 302 80 53159

Please do not disclose security issues publicly until they have been addressed.

---

## 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [MongoDB Security Checklist](https://docs.mongodb.com/manual/administration/security-checklist/)
- [React Security Best Practices](https://react.dev/learn/security)

---

**Last Updated**: 2026-10-10
**Version**: 1.0.0
**Security Level**: Production-Ready with Recommendations
