import express from 'express';
import {
  getPublishedTechnologies,
  getAllTechnologies,
  getTechnologyById,
  createTechnology,
  updateTechnology,
  deleteTechnology,
  updateTechnologyOrder,
} from '../controllers/technology.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { uploadSingle } from '../middleware/upload.middleware.js';

const router = express.Router();

// Public routes
router.get('/public', getPublishedTechnologies);

// Admin routes - All protected
router.use('/admin', protect);

router
  .route('/admin')
  .get(getAllTechnologies)
  .post(uploadSingle('logo'), createTechnology);

router
  .route('/admin/:id')
  .get(getTechnologyById)
  .put(uploadSingle('logo'), updateTechnology)
  .delete(deleteTechnology);

router.patch('/admin/:id/order', updateTechnologyOrder);

export default router;
