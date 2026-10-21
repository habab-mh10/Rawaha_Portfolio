import express from 'express';
import { body } from 'express-validator';
import {
  getPublicVisionGoals,
  getAdminVisionGoals,
  updateVisionGoals,
} from '../controllers/visiongoals.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validation.middleware.js';

const router = express.Router();

// Public routes
router.get('/public', getPublicVisionGoals);

// Admin routes - All protected
router.use('/admin', protect);

router
  .route('/admin')
  .get(getAdminVisionGoals)
  .put(
    [
      body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
      body('content').notEmpty().withMessage('Content is required'),
      body('published').optional().isBoolean().withMessage('Published must be a boolean'),
    ],
    validate,
    updateVisionGoals
  );

export default router;