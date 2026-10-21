import express from 'express';
import {
  getPublishedTeamMembers,
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  updateTeamMemberOrder,
} from '../controllers/team.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { uploadSingle } from '../middleware/upload.middleware.js';

const router = express.Router();

// Public routes
router.get('/public', getPublishedTeamMembers);

// Admin routes - All protected
router.use('/admin', protect);

router
  .route('/admin')
  .get(getAllTeamMembers)
  .post(uploadSingle('profilePicture'), createTeamMember);

router
  .route('/admin/:id')
  .get(getTeamMemberById)
  .put(uploadSingle('profilePicture'), updateTeamMember)
  .delete(deleteTeamMember);

router.patch('/admin/:id/order', updateTeamMemberOrder);

export default router;
