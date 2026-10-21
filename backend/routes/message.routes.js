import express from 'express';
import { body } from 'express-validator';
import {
  submitMessage,
  getAllMessages,
  getMessageById,
  toggleReadStatus,
  markAsReplied,
  deleteMessage,
  bulkDeleteMessages,
  getMessageStats,
} from '../controllers/message.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validation.middleware.js';

const router = express.Router();

// Public routes - Submit message
router.post(
  '/public',
  [
    body('message').trim().notEmpty().withMessage('Message is required'),
    body('email').optional().isEmail().withMessage('Valid email is required'),
    validate,
  ],
  submitMessage
);

// Admin routes - All protected
router.use('/admin', protect);

// Statistics
router.get('/admin/stats', getMessageStats);

// Bulk operations
router.post('/admin/bulk-delete', bulkDeleteMessages);

// CRUD operations
router.route('/admin').get(getAllMessages);

router
  .route('/admin/:id')
  .get(getMessageById)
  .delete(deleteMessage);

// Update operations
router.patch('/admin/:id/read', toggleReadStatus);
router.patch('/admin/:id/reply', markAsReplied);

export default router;
