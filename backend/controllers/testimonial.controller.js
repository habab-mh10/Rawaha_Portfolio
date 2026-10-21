import Testimonial from '../models/Testimonial.js';
import { uploadImage, deleteImage } from '../utils/cloudinary.utils.js';
import { successResponse, errorResponse } from '../utils/response.utils.js';

/**
 * @desc    Get all published testimonials (Public)
 * @route   GET /api/testimonials/public
 * @access  Public
 */
export const getPublishedTestimonials = async (req, res) => {
  try {
    const { featured } = req.query;

    const query = { published: true };
    if (featured === 'true') {
      query.featured = true;
    }

    const testimonials = await Testimonial.find(query)
      .sort({ displayOrder: 1, createdAt: -1 })
      .select('-__v');

    return successResponse(res, 200, 'Testimonials fetched successfully', testimonials);
  } catch (error) {
    console.error('Get published testimonials error:', error);
    return errorResponse(res, 500, 'Failed to fetch testimonials');
  }
};

/**
 * @desc    Get all testimonials (Admin)
 * @route   GET /api/admin/testimonials
 * @access  Private/Admin
 */
export const getAllTestimonials = async (req, res) => {
  try {
    const { featured, published, search, page = 1, limit = 10 } = req.query;

    // Build query
    const query = {};

    if (featured !== undefined) {
      query.featured = featured === 'true';
    }

    if (published !== undefined) {
      query.published = published === 'true';
    }

    if (search) {
      query.$or = [
        { clientName: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { testimonial: { $regex: search, $options: 'i' } },
      ];
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [testimonials, total] = await Promise.all([
      Testimonial.find(query)
        .sort({ displayOrder: 1, createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .select('-__v'),
      Testimonial.countDocuments(query),
    ]);

    return successResponse(
      res,
      200,
      'Testimonials fetched successfully',
      {
        testimonials,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalTestimonials: total,
          perPage: parseInt(limit),
        },
      }
    );
  } catch (error) {
    console.error('Get all testimonials error:', error);
    return errorResponse(res, 500, 'Failed to fetch testimonials');
  }
};

/**
 * @desc    Get testimonial by ID (Admin)
 * @route   GET /api/admin/testimonials/:id
 * @access  Private/Admin
 */
export const getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id).select('-__v');

    if (!testimonial) {
      return errorResponse(res, 404, 'Testimonial not found');
    }

    return successResponse(res, 200, 'Testimonial fetched successfully', testimonial);
  } catch (error) {
    console.error('Get testimonial by ID error:', error);
    return errorResponse(res, 500, 'Failed to fetch testimonial');
  }
};

/**
 * @desc    Create new testimonial (Admin) — max 5 allowed
 * @route   POST /api/testimonials/admin
 * @access  Private/Admin
 */
export const createTestimonial = async (req, res) => {
  try {
    // Enforce max 5 testimonials
    const count = await Testimonial.countDocuments();
    if (count >= 5) {
      return errorResponse(res, 400, 'Maximum 5 testimonials allowed. Please delete one first.');
    }

    const { clientName, testimonial, designation } = req.body;

    if (!clientName || !testimonial) {
      return errorResponse(res, 400, 'Client name and feedback are required');
    }

    const testimonialData = {
      clientName,
      testimonial,
      designation: designation || '',
      published: true,
    };

    // Handle client photo upload to Cloudinary
    if (req.file) {
      const photoResult = await uploadImage(req.file.buffer, {
        folder: 'portfolio/testimonials',
        transformation: { width: 200, height: 200, crop: 'fill', gravity: 'face' },
      });
      testimonialData.clientPhoto = {
        url: photoResult.url,
        publicId: photoResult.publicId,
      };
    }

    const newTestimonial = await Testimonial.create(testimonialData);

    return successResponse(res, 201, 'Testimonial created successfully', newTestimonial);
  } catch (error) {
    console.error('Create testimonial error:', error);
    return errorResponse(res, 500, error.message || 'Failed to create testimonial');
  }
};

/**
 * @desc    Update testimonial (Admin)
 * @route   PUT /api/admin/testimonials/:id
 * @access  Private/Admin
 */
export const updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return errorResponse(res, 404, 'Testimonial not found');
    }

    const updateData = { ...req.body };

    // Handle client photo upload and deletion
    if (req.file) {
      // Delete old photo if exists
      if (testimonial.clientPhoto?.publicId) {
        await deleteImage(testimonial.clientPhoto.publicId);
      }

      const photoResult = await uploadImage(req.file.buffer, {
        folder: 'portfolio/testimonials',
        transformation: { width: 200, height: 200, crop: 'fill', gravity: 'face' },
      });
      updateData.clientPhoto = {
        url: photoResult.url,
        publicId: photoResult.publicId,
      };
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-__v');

    return successResponse(res, 200, 'Testimonial updated successfully', updatedTestimonial);
  } catch (error) {
    console.error('Update testimonial error:', error);
    return errorResponse(res, 500, error.message || 'Failed to update testimonial');
  }
};

/**
 * @desc    Delete testimonial (Admin)
 * @route   DELETE /api/admin/testimonials/:id
 * @access  Private/Admin
 */
export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return errorResponse(res, 404, 'Testimonial not found');
    }

    // Delete client photo from Cloudinary if exists
    if (testimonial.clientPhoto?.publicId) {
      await deleteImage(testimonial.clientPhoto.publicId);
    }

    await testimonial.deleteOne();

    return successResponse(res, 200, 'Testimonial deleted successfully', null);
  } catch (error) {
    console.error('Delete testimonial error:', error);
    return errorResponse(res, 500, 'Failed to delete testimonial');
  }
};

/**
 * @desc    Update testimonial display order (Admin)
 * @route   PATCH /api/admin/testimonials/:id/order
 * @access  Private/Admin
 */
export const updateTestimonialOrder = async (req, res) => {
  try {
    const { displayOrder } = req.body;

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { displayOrder },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!testimonial) {
      return errorResponse(res, 404, 'Testimonial not found');
    }

    return successResponse(res, 200, 'Testimonial order updated successfully', testimonial);
  } catch (error) {
    console.error('Update testimonial order error:', error);
    return errorResponse(res, 500, 'Failed to update testimonial order');
  }
};


