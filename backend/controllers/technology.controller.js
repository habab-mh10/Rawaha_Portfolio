import Technology from '../models/Technology.js';
import { uploadImage, deleteImage } from '../utils/cloudinary.utils.js';
import { successResponse, errorResponse } from '../utils/response.utils.js';

/**
 * @desc    Get all published technologies (Public)
 * @route   GET /api/technologies/public
 * @access  Public
 */
export const getPublishedTechnologies = async (req, res) => {
  try {
    const { category } = req.query;

    const query = { published: true };
    if (category) {
      query.category = category;
    }

    const technologies = await Technology.find(query)
      .sort({ displayOrder: 1, createdAt: -1 })
      .select('-__v');

    return successResponse(res, 200, 'Technologies fetched successfully', technologies);
  } catch (error) {
    console.error('Get published technologies error:', error);
    return errorResponse(res, 500, 'Failed to fetch technologies');
  }
};

/**
 * @desc    Get all technologies (Admin)
 * @route   GET /api/admin/technologies
 * @access  Private/Admin
 */
export const getAllTechnologies = async (req, res) => {
  try {
    const { category, published, search, page = 1, limit = 20 } = req.query;

    // Build query
    const query = {};

    if (category) {
      query.category = category;
    }

    if (published !== undefined) {
      query.published = published === 'true';
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { altText: { $regex: search, $options: 'i' } },
      ];
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [technologies, total] = await Promise.all([
      Technology.find(query)
        .sort({ displayOrder: 1, createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .select('-__v'),
      Technology.countDocuments(query),
    ]);

    return successResponse(
      res,
      200,
      'Technologies fetched successfully',
      {
        technologies,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalTechnologies: total,
          perPage: parseInt(limit),
        },
      }
    );
  } catch (error) {
    console.error('Get all technologies error:', error);
    return errorResponse(res, 500, 'Failed to fetch technologies');
  }
};

/**
 * @desc    Get technology by ID (Admin)
 * @route   GET /api/admin/technologies/:id
 * @access  Private/Admin
 */
export const getTechnologyById = async (req, res) => {
  try {
    const technology = await Technology.findById(req.params.id).select('-__v');

    if (!technology) {
      return errorResponse(res, 404, 'Technology not found');
    }

    return successResponse(res, 200, 'Technology fetched successfully', technology);
  } catch (error) {
    console.error('Get technology by ID error:', error);
    return errorResponse(res, 500, 'Failed to fetch technology');
  }
};

/**
 * @desc    Create new technology (Admin)
 * @route   POST /api/admin/technologies
 * @access  Private/Admin
 */
export const createTechnology = async (req, res) => {
  try {
    // Logo is required
    if (!req.file) {
      return errorResponse(res, 400, 'Technology logo is required');
    }

    const technologyData = { ...req.body };

    // Upload logo
    const logoResult = await uploadImage(req.file.buffer, {
      folder: 'portfolio/technologies',
      transformation: { width: 150, height: 150, crop: 'limit' },
    });

    technologyData.logo = {
      url: logoResult.url,
      publicId: logoResult.publicId,
    };

    const technology = await Technology.create(technologyData);

    return successResponse(res, 201, 'Technology created successfully', technology);
  } catch (error) {
    console.error('Create technology error:', error);
    return errorResponse(res, 500, error.message || 'Failed to create technology');
  }
};

/**
 * @desc    Update technology (Admin)
 * @route   PUT /api/admin/technologies/:id
 * @access  Private/Admin
 */
export const updateTechnology = async (req, res) => {
  try {
    const technology = await Technology.findById(req.params.id);

    if (!technology) {
      return errorResponse(res, 404, 'Technology not found');
    }

    const updateData = { ...req.body };

    // Handle logo upload and deletion
    if (req.file) {
      // Delete old logo
      if (technology.logo?.publicId) {
        await deleteImage(technology.logo.publicId);
      }

      const logoResult = await uploadImage(req.file.buffer, {
        folder: 'portfolio/technologies',
        transformation: { width: 150, height: 150, crop: 'limit' },
      });
      updateData.logo = {
        url: logoResult.url,
        publicId: logoResult.publicId,
      };
    }

    const updatedTechnology = await Technology.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-__v');

    return successResponse(res, 200, 'Technology updated successfully', updatedTechnology);
  } catch (error) {
    console.error('Update technology error:', error);
    return errorResponse(res, 500, error.message || 'Failed to update technology');
  }
};

/**
 * @desc    Delete technology (Admin)
 * @route   DELETE /api/admin/technologies/:id
 * @access  Private/Admin
 */
export const deleteTechnology = async (req, res) => {
  try {
    const technology = await Technology.findById(req.params.id);

    if (!technology) {
      return errorResponse(res, 404, 'Technology not found');
    }

    // Delete logo from Cloudinary
    if (technology.logo?.publicId) {
      await deleteImage(technology.logo.publicId);
    }

    await technology.deleteOne();

    return successResponse(res, 200, 'Technology deleted successfully', null);
  } catch (error) {
    console.error('Delete technology error:', error);
    return errorResponse(res, 500, 'Failed to delete technology');
  }
};

/**
 * @desc    Update technology display order (Admin)
 * @route   PATCH /api/admin/technologies/:id/order
 * @access  Private/Admin
 */
export const updateTechnologyOrder = async (req, res) => {
  try {
    const { displayOrder } = req.body;

    const technology = await Technology.findByIdAndUpdate(
      req.params.id,
      { displayOrder },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!technology) {
      return errorResponse(res, 404, 'Technology not found');
    }

    return successResponse(res, 200, 'Technology order updated successfully', technology);
  } catch (error) {
    console.error('Update technology order error:', error);
    return errorResponse(res, 500, 'Failed to update technology order');
  }
};


