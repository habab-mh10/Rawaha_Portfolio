import TeamMember from '../models/TeamMember.js';
import { uploadImage, deleteImage } from '../utils/cloudinary.utils.js';
import { successResponse, errorResponse } from '../utils/response.utils.js';

/**
 * @desc    Get all published team members (Public)
 * @route   GET /api/team/public
 * @access  Public
 */
export const getPublishedTeamMembers = async (req, res) => {
  try {
    const teamMembers = await TeamMember.find({ published: true })
      .sort({ displayOrder: 1, createdAt: -1 })
      .select('-__v');

    return successResponse(res, 200, 'Team members fetched successfully', teamMembers);
  } catch (error) {
    console.error('Get published team members error:', error);
    return errorResponse(res, 500, 'Failed to fetch team members');
  }
};

/**
 * @desc    Get all team members (Admin)
 * @route   GET /api/admin/team
 * @access  Private/Admin
 */
export const getAllTeamMembers = async (req, res) => {
  try {
    const { published, search, page = 1, limit = 10 } = req.query;

    // Build query
    const query = {};

    if (published !== undefined) {
      query.published = published === 'true';
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { role: { $regex: search, $options: 'i' } },
        { speciality: { $regex: search, $options: 'i' } },
      ];
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [teamMembers, total] = await Promise.all([
      TeamMember.find(query)
        .sort({ displayOrder: 1, createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .select('-__v'),
      TeamMember.countDocuments(query),
    ]);

    return successResponse(
      res,
      200,
      'Team members fetched successfully',
      {
        teamMembers,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalTeamMembers: total,
          perPage: parseInt(limit),
        },
      }
    );
  } catch (error) {
    console.error('Get all team members error:', error);
    return errorResponse(res, 500, 'Failed to fetch team members');
  }
};

/**
 * @desc    Get team member by ID (Admin)
 * @route   GET /api/admin/team/:id
 * @access  Private/Admin
 */
export const getTeamMemberById = async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id).select('-__v');

    if (!teamMember) {
      return errorResponse(res, 404, 'Team member not found');
    }

    return successResponse(res, 200, 'Team member fetched successfully', teamMember);
  } catch (error) {
    console.error('Get team member by ID error:', error);
    return errorResponse(res, 500, 'Failed to fetch team member');
  }
};

/**
 * @desc    Create new team member (Admin)
 * @route   POST /api/admin/team
 * @access  Private/Admin
 */
export const createTeamMember = async (req, res) => {
  try {
    const teamMemberData = { ...req.body };

    // Parse socialLinks if it's a string
    if (typeof teamMemberData.socialLinks === 'string') {
      teamMemberData.socialLinks = JSON.parse(teamMemberData.socialLinks);
    }

    // Handle profile picture upload
    if (req.file) {
      const photoResult = await uploadImage(req.file.buffer, {
        folder: 'portfolio/team',
        transformation: { width: 400, height: 400, crop: 'fill', gravity: 'face' },
      });
      teamMemberData.profilePicture = {
        url: photoResult.url,
        publicId: photoResult.publicId,
      };
    }

    const teamMember = await TeamMember.create(teamMemberData);

    return successResponse(res, 201, 'Team member created successfully', teamMember);
  } catch (error) {
    console.error('Create team member error:', error);
    return errorResponse(res, 500, error.message || 'Failed to create team member');
  }
};

/**
 * @desc    Update team member (Admin)
 * @route   PUT /api/admin/team/:id
 * @access  Private/Admin
 */
export const updateTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);

    if (!teamMember) {
      return errorResponse(res, 404, 'Team member not found');
    }

    const updateData = { ...req.body };

    // Parse socialLinks if it's a string
    if (typeof updateData.socialLinks === 'string') {
      updateData.socialLinks = JSON.parse(updateData.socialLinks);
    }

    // Handle profile picture upload and deletion
    if (req.file) {
      // Delete old photo if exists
      if (teamMember.profilePicture?.publicId) {
        await deleteImage(teamMember.profilePicture.publicId);
      }

      const photoResult = await uploadImage(req.file.buffer, {
        folder: 'portfolio/team',
        transformation: { width: 400, height: 400, crop: 'fill', gravity: 'face' },
      });
      updateData.profilePicture = {
        url: photoResult.url,
        publicId: photoResult.publicId,
      };
    }

    const updatedTeamMember = await TeamMember.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-__v');

    return successResponse(res, 200, 'Team member updated successfully', updatedTeamMember);
  } catch (error) {
    console.error('Update team member error:', error);
    return errorResponse(res, 500, error.message || 'Failed to update team member');
  }
};

/**
 * @desc    Delete team member (Admin)
 * @route   DELETE /api/admin/team/:id
 * @access  Private/Admin
 */
export const deleteTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);

    if (!teamMember) {
      return errorResponse(res, 404, 'Team member not found');
    }

    // Delete profile picture from Cloudinary if exists
    if (teamMember.profilePicture?.publicId) {
      await deleteImage(teamMember.profilePicture.publicId);
    }

    await teamMember.deleteOne();

    return successResponse(res, 200, 'Team member deleted successfully', null);
  } catch (error) {
    console.error('Delete team member error:', error);
    return errorResponse(res, 500, 'Failed to delete team member');
  }
};

/**
 * @desc    Update team member display order (Admin)
 * @route   PATCH /api/admin/team/:id/order
 * @access  Private/Admin
 */
export const updateTeamMemberOrder = async (req, res) => {
  try {
    const { displayOrder } = req.body;

    const teamMember = await TeamMember.findByIdAndUpdate(
      req.params.id,
      { displayOrder },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!teamMember) {
      return errorResponse(res, 404, 'Team member not found');
    }

    return successResponse(res, 200, 'Team member order updated successfully', teamMember);
  } catch (error) {
    console.error('Update team member order error:', error);
    return errorResponse(res, 500, 'Failed to update team member order');
  }
};


