import AboutProfile from '../models/AboutProfile.js';
import { uploadImage, uploadRaw, deleteImage, deleteFile } from '../utils/cloudinary.utils.js';
import { successResponse, errorResponse } from '../utils/response.utils.js';

/**
 * @desc    Get about profile (Public)
 * @route   GET /api/about/public
 * @access  Public
 */
export const getPublicAboutProfile = async (req, res) => {
  try {
    const aboutProfile = await AboutProfile.findOne().select('-__v');
    if (!aboutProfile) return errorResponse(res, 404, 'About profile not found');
    return successResponse(res, 200, 'About profile fetched successfully', aboutProfile);
  } catch (error) {
    console.error('Get public about profile error:', error);
    return errorResponse(res, 500, 'Failed to fetch about profile');
  }
};

/**
 * @desc    Get about profile (Admin)
 * @route   GET /api/about/admin
 * @access  Private/Admin
 */
export const getAboutProfile = async (req, res) => {
  try {
    const aboutProfile = await AboutProfile.findOne().select('-__v');
    if (!aboutProfile) return errorResponse(res, 404, 'About profile not found. Please create one.');
    return successResponse(res, 200, 'About profile fetched successfully', aboutProfile);
  } catch (error) {
    console.error('Get about profile error:', error);
    return errorResponse(res, 500, 'Failed to fetch about profile');
  }
};

/* ─── internal helper to process all three file fields ─── */
const processFiles = async (files = {}, existing = {}) => {
  const updates = {};

  // ── profile picture (image) ──
  if (files.profilePicture?.[0]) {
    if (existing.profilePicture?.publicId) {
      await deleteImage(existing.profilePicture.publicId);
    }
    const result = await uploadImage(files.profilePicture[0].buffer, {
      folder: 'portfolio/about',
      transformation: { width: 800, height: 800, crop: 'limit' },
    });
    updates.profilePicture = { url: result.url, publicId: result.publicId };
  }

  // ── logo (image) ──
  if (files.logo?.[0]) {
    if (existing.logo?.publicId) {
      await deleteImage(existing.logo.publicId);
    }
    const result = await uploadImage(files.logo[0].buffer, {
      folder: 'portfolio/brand',
      transformation: { quality: 'auto', fetch_format: 'auto' },
    });
    updates.logo = { url: result.url, publicId: result.publicId };
  }

  // ── CV (raw PDF) ──
  if (files.cv?.[0]) {
    if (existing.cv?.publicId) {
      await deleteFile(existing.cv.publicId, 'raw');
    }
    const result = await uploadRaw(files.cv[0].buffer, {
      folder: 'portfolio/documents',
    });
    updates.cv = { url: result.url, publicId: result.publicId };
  }

  return updates;
};

/**
 * @desc    Create or Update about profile (Admin) — handles profilePicture + logo + cv
 * @route   POST /api/about/admin
 * @access  Private/Admin
 */
export const createOrUpdateAboutProfile = async (req, res) => {
  try {
    let aboutProfile = await AboutProfile.findOne();

    const profileData = { ...req.body };

    // Parse JSON-stringified arrays / objects
    ['goals', 'achievements', 'skills', 'socialLinks'].forEach((key) => {
      if (typeof profileData[key] === 'string') {
        try { profileData[key] = JSON.parse(profileData[key]); } catch {}
      }
    });

    // Process uploaded files
    const fileUpdates = await processFiles(req.files || {}, aboutProfile || {});
    Object.assign(profileData, fileUpdates);

    if (aboutProfile) {
      aboutProfile = await AboutProfile.findByIdAndUpdate(
        aboutProfile._id,
        profileData,
        { new: true, runValidators: true }
      ).select('-__v');
      return successResponse(res, 200, 'About profile updated successfully', aboutProfile);
    } else {
      aboutProfile = await AboutProfile.create(profileData);
      return successResponse(res, 201, 'About profile created successfully', aboutProfile);
    }
  } catch (error) {
    console.error('Create/Update about profile error:', error);
    return errorResponse(res, 500, error.message || 'Failed to save about profile');
  }
};

/**
 * @desc    Update about profile by ID (Admin)
 * @route   PUT /api/about/admin/:id
 * @access  Private/Admin
 */
export const updateAboutProfile = async (req, res) => {
  try {
    const aboutProfile = await AboutProfile.findById(req.params.id);
    if (!aboutProfile) return errorResponse(res, 404, 'About profile not found');

    const updateData = { ...req.body };

    ['goals', 'achievements', 'skills', 'socialLinks'].forEach((key) => {
      if (typeof updateData[key] === 'string') {
        try { updateData[key] = JSON.parse(updateData[key]); } catch {}
      }
    });

    const fileUpdates = await processFiles(req.files || {}, aboutProfile);
    Object.assign(updateData, fileUpdates);

    const updated = await AboutProfile.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-__v');

    return successResponse(res, 200, 'About profile updated successfully', updated);
  } catch (error) {
    console.error('Update about profile error:', error);
    return errorResponse(res, 500, error.message || 'Failed to update about profile');
  }
};

/**
 * @desc    Delete profile picture
 * @route   DELETE /api/about/admin/:id/picture
 * @access  Private/Admin
 */
export const deleteProfilePicture = async (req, res) => {
  try {
    const aboutProfile = await AboutProfile.findById(req.params.id);
    if (!aboutProfile) return errorResponse(res, 404, 'About profile not found');

    if (aboutProfile.profilePicture?.publicId) {
      await deleteImage(aboutProfile.profilePicture.publicId);
      aboutProfile.profilePicture = undefined;
      await aboutProfile.save();
    }

    return successResponse(res, 200, 'Profile picture deleted successfully', aboutProfile);
  } catch (error) {
    console.error('Delete profile picture error:', error);
    return errorResponse(res, 500, 'Failed to delete profile picture');
  }
};

/**
 * @desc    Delete logo
 * @route   DELETE /api/about/admin/:id/logo
 * @access  Private/Admin
 */
export const deleteLogo = async (req, res) => {
  try {
    const aboutProfile = await AboutProfile.findById(req.params.id);
    if (!aboutProfile) return errorResponse(res, 404, 'About profile not found');

    if (aboutProfile.logo?.publicId) {
      await deleteImage(aboutProfile.logo.publicId);
      aboutProfile.logo = undefined;
      await aboutProfile.save();
    }

    return successResponse(res, 200, 'Logo deleted successfully', aboutProfile);
  } catch (error) {
    console.error('Delete logo error:', error);
    return errorResponse(res, 500, 'Failed to delete logo');
  }
};

/**
 * @desc    Delete CV
 * @route   DELETE /api/about/admin/:id/cv
 * @access  Private/Admin
 */
export const deleteCV = async (req, res) => {
  try {
    const aboutProfile = await AboutProfile.findById(req.params.id);
    if (!aboutProfile) return errorResponse(res, 404, 'About profile not found');

    if (aboutProfile.cv?.publicId) {
      await deleteFile(aboutProfile.cv.publicId, 'raw');
      aboutProfile.cv = undefined;
      await aboutProfile.save();
    }

    return successResponse(res, 200, 'CV deleted successfully', aboutProfile);
  } catch (error) {
    console.error('Delete CV error:', error);
    return errorResponse(res, 500, 'Failed to delete CV');
  }
};
