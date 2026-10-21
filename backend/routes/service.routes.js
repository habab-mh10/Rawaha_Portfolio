import express from 'express';
import {
  getPublishedServices,
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  updateServiceOrder,
} from '../controllers/service.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { uploadMultiple } from '../middleware/upload.middleware.js';

const router = express.Router();

// Public routes
router.get('/public', getPublishedServices);

// Admin routes - All protected
router.use('/admin', protect);

router
  .route('/admin')
  .get(getAllServices)
  .post(
    uploadMultiple([
      { name: 'icon', maxCount: 1 },
      { name: 'image', maxCount: 1 },
    ]),
    createService
  );

router
  .route('/admin/:id')
  .get(getServiceById)
  .put(
    uploadMultiple([
      { name: 'icon', maxCount: 1 },
      { name: 'image', maxCount: 1 },
    ]),
    updateService
  )
  .delete(deleteService);

router.patch('/admin/:id/order', updateServiceOrder);

export default router;
