import express from 'express';
import {
  getPublicAboutProfile,
  getAboutProfile,
  createOrUpdateAboutProfile,
  updateAboutProfile,
  deleteProfilePicture,
  deleteLogo,
  deleteCV,
} from '../controllers/about.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { uploadBrandAssets } from '../middleware/upload.middleware.js';

const router = express.Router();

// Public routes
router.get('/public', getPublicAboutProfile);

// Admin routes — all protected
router.use('/admin', protect);

router
  .route('/admin')
  .get(getAboutProfile)
  .post(uploadBrandAssets, createOrUpdateAboutProfile);

router
  .route('/admin/:id')
  .put(uploadBrandAssets, updateAboutProfile);

router.delete('/admin/:id/picture', deleteProfilePicture);
router.delete('/admin/:id/logo',    deleteLogo);
router.delete('/admin/:id/cv',      deleteCV);

export default router;
