# Security Guidelines

## Implemented Security Measures

### 1. **Helmet.js**
- Adds secure HTTP headers
- Protects against common web vulnerabilities
- Configured Content Security Policy (CSP)
- Cross-Origin Resource Policy enabled

### 2. **Rate Limiting**
- **General API Routes**: 100 requests per 15 minutes per IP
- **Auth Routes**: 5 login attempts per 15 minutes per IP
- Prevents brute force attacks and DDoS

### 3. **CORS (Cross-Origin Resource Sharing)**
- Whitelist-based origin validation
- Credentials support enabled
- Restricted HTTP methods
- Controlled allowed headers

### 4. **MongoDB Injection Protection**
- `express-mongo-sanitize` middleware
- Removes prohibited characters from user input
- Prevents NoSQL injection attacks

### 5. **Input Validation**
- `express-validator` for request validation
- Custom validation middleware
- Sanitization of user inputs

### 6. **JWT Authentication**
- Secure token generation and verification
- HTTP-only cookies for token storage
- Token expiration management
- Protected routes middleware

### 7. **Environment Variables**
- Sensitive data stored in .env files
- Environment validation on startup
- .env files excluded from version control

## Security Checklist for Production

### Before Deployment

- [ ] Change `JWT_SECRET` to a strong random string (32+ characters)
- [ ] Set `NODE_ENV=production`
- [ ] Update `FRONTEND_URL` to your production domain
- [ ] Add production domain to CORS whitelist
- [ ] Review and update rate limit values if needed
- [ ] Enable HTTPS/SSL on your server
- [ ] Set secure cookie options in production
- [ ] Review and restrict MongoDB user permissions
- [ ] Enable MongoDB IP whitelist
- [ ] Set up proper logging and monitoring
- [ ] Regular security audits with `npm audit`
- [ ] Keep all dependencies up to date

### Database Security

```javascript
// Recommended MongoDB connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true,
  w: 'majority',
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};
```

### Password Security

- Passwords are hashed using bcrypt (10 rounds)
- Never log passwords
- Enforce strong password policies
- Consider implementing password reset flow
- Consider adding 2FA for admin accounts

### File Upload Security

- File type validation
- File size limits (10MB default)
- Cloudinary integration for secure storage
- Malware scanning recommended for production

### API Security Best Practices

1. **Always use HTTPS in production**
2. **Validate all user inputs**
3. **Sanitize data before database operations**
4. **Use parameterized queries**
5. **Implement proper error handling** (don't expose stack traces)
6. **Log security events**
7. **Regular dependency updates**
8. **Implement audit logging for admin actions**

### Regular Maintenance

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities (test thoroughly after)
npm audit fix

# Update dependencies
npm update

# Check outdated packages
npm outdated
```

## Security Headers Explained

### Helmet Configuration

```javascript
helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:", "http:"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
})
```

## Incident Response

If a security breach is suspected:

1. **Immediately** rotate JWT_SECRET
2. Invalidate all active sessions
3. Review access logs
4. Check for unauthorized database changes
5. Update all credentials
6. Notify affected users if personal data was compromised
7. Patch the vulnerability
8. Document the incident

## Contact

For security concerns or to report vulnerabilities, contact:
- Email: rawahamr11@gmail.com

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
