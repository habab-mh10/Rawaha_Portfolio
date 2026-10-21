import express from 'express';
import {
  getPublishedTestimonials,
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  updateTestimonialOrder,
} from '../controllers/testimonial.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { uploadSingle } from '../middleware/upload.middleware.js';

const router = express.Router();

// Public routes
router.get('/public', getPublishedTestimonials);

// Admin routes - All protected
router.use('/admin', protect);

router
  .route('/admin')
  .get(getAllTestimonials)
  .post(uploadSingle('clientPhoto'), createTestimonial);

router
  .route('/admin/:id')
  .get(getTestimonialById)
  .put(uploadSingle('clientPhoto'), updateTestimonial)
  .delete(deleteTestimonial);

router.patch('/admin/:id/order', updateTestimonialOrder);

export default router;
