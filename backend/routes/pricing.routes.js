import express from 'express';
import {
  getAllPackages,
  getAdminPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage,
} from '../controllers/pricing.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// ========== Public Routes ==========

// Get all published packages
router.get('/', getAllPackages);

// Get single package by ID
router.get('/:id', getPackageById);

// ========== Admin Routes (Protected) ==========

// Get all packages (admin)
router.get('/admin/all', protect, getAdminPackages);

// Create new package
router.post('/admin/create', protect, createPackage);

// Update package
router.put('/admin/:id', protect, updatePackage);

// Delete package
router.delete('/admin/:id', protect, deletePackage);

export default router;
