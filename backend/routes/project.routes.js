import express from 'express';
import { body } from 'express-validator';
import {
  getProjects,
  getProjectBySlug,
  getAdminProjects,
  getAdminProject,
  createProject,
  updateProject,
  deleteProject,
  uploadProjectImages,
  deleteProjectImage,
  uploadProjectVideo,
  deleteProjectVideo,
  getProjectStats,
} from '../controllers/project.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { uploadImages, uploadVideo, uploadMedia, handleUploadError } from '../middleware/upload.middleware.js';
import { validate } from '../middleware/validation.middleware.js';

const router = express.Router();

// ========== Public Routes ==========

// Get all published projects
router.get('/', getProjects);

// Get single published project by slug
router.get('/:slug', getProjectBySlug);

// ========== Admin Routes (Protected) ==========

// Project statistics
router.get('/admin/stats', protect, getProjectStats);

// Get all projects (admin)
router.get('/admin/all', protect, getAdminProjects);

// Get single project by ID (admin)
router.get('/admin/:id', protect, getAdminProject);

// Create new project
router.post('/admin/create', protect, uploadMedia, handleUploadError, createProject);

// Update project
router.put('/admin/:id', protect, uploadMedia, handleUploadError, updateProject);

// Delete project
router.delete('/admin/:id', protect, deleteProject);

// Upload project images
router.post(
  '/admin/:id/images',
  protect,
  uploadImages,
  handleUploadError,
  uploadProjectImages
);

// Delete project image
router.delete('/admin/:id/images/:imageId', protect, deleteProjectImage);

// Upload project video
router.post(
  '/admin/:id/video',
  protect,
  uploadVideo,
  handleUploadError,
  uploadProjectVideo
);

// Delete project video
router.delete('/admin/:id/video', protect, deleteProjectVideo);

export default router;
