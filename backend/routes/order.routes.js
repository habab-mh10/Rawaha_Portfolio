import express from 'express';
import { body } from 'express-validator';
import {
  submitOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  updateOrder,
  deleteOrder,
  getOrderStats,
} from '../controllers/order.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validation.middleware.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Rate limiting for order submission
const orderLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 orders per hour
  message: 'Too many orders submitted, please try again later',
});

// Order validation
const orderValidation = [
  body('clientName').trim().notEmpty().withMessage('Client name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('projectDescription')
    .trim()
    .notEmpty()
    .withMessage('Project description is required')
    .isLength({ min: 20 })
    .withMessage('Project description must be at least 20 characters'),
];

// ========== Public Routes ==========

// Submit new order
router.post('/', orderLimiter, orderValidation, validate, submitOrder);

// ========== Admin Routes (Protected) ==========

// Get order statistics
router.get('/admin/stats', protect, getOrderStats);

// Get all orders
router.get('/admin/all', protect, getOrders);

// Get single order
router.get('/admin/:id', protect, getOrder);

// Update order status
router.put('/admin/:id/status', protect, updateOrderStatus);

// Update order details
router.put('/admin/:id', protect, updateOrder);

// Delete order
router.delete('/admin/:id', protect, deleteOrder);

export default router;
