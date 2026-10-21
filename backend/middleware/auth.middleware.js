import { verifyToken } from '../utils/jwt.utils.js';
import AdminUser from '../models/AdminUser.js';
import { errorResponse } from '../utils/response.utils.js';

// Protect routes - verify JWT token
export const protect = async (req, res, next) => {
  let token;

  // Check for token in cookies or Authorization header
  if (req.cookies.token) {
    token = req.cookies.token;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if token exists
  if (!token) {
    return errorResponse(res, 401, 'Not authorized to access this route');
  }

  try {
    // Verify token
    const decoded = verifyToken(token);

    if (!decoded) {
      return errorResponse(res, 401, 'Invalid or expired token');
    }

    // Get user from database
    const user = await AdminUser.findById(decoded.id).select('-password');

    if (!user) {
      return errorResponse(res, 404, 'User not found');
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    return errorResponse(res, 401, 'Not authorized to access this route');
  }
};

// Check if user is superadmin
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return errorResponse(
        res,
        403,
        `User role ${req.user.role} is not authorized to access this route`
      );
    }
    next();
  };
};
