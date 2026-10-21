import Service from '../models/Service.js';
import { uploadImage, deleteImage } from '../utils/cloudinary.utils.js';
import { successResponse, errorResponse } from '../utils/response.utils.js';

/**
 * @desc    Get all published services (Public)
 * @route   GET /api/services/public
 * @access  Public
 */
export const getPublishedServices = async (req, res) => {
  try {
    const services = await Service.find({ published: true })
      .sort({ displayOrder: 1, createdAt: -1 })
      .select('-__v');

    return successResponse(res, 200, 'Services fetched successfully', services);
  } catch (error) {
    console.error('Get published services error:', error);
    return errorResponse(res, 500, 'Failed to fetch services');
  }
};

/**
 * @desc    Get all services (Admin)
 * @route   GET /api/admin/services
 * @access  Private/Admin
 */
export const getAllServices = async (req, res) => {
  try {
    const { category, published, search, page = 1, limit = 10 } = req.query;

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
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [services, total] = await Promise.all([
      Service.find(query)
        .sort({ displayOrder: 1, createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .select('-__v'),
      Service.countDocuments(query),
    ]);

    return successResponse(
      res,
      200,
      'Services fetched successfully',
      {
        services,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalServices: total,
          perPage: parseInt(limit),
        },
      }
    );
  } catch (error) {
    console.error('Get all services error:', error);
    return errorResponse(res, 500, 'Failed to fetch services');
  }
};

/**
 * @desc    Get service by ID (Admin)
 * @route   GET /api/admin/services/:id
 * @access  Private/Admin
 */
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).select('-__v');

    if (!service) {
      return errorResponse(res, 404, 'Service not found');
    }

    return successResponse(res, 200, 'Service fetched successfully', service);
  } catch (error) {
    console.error('Get service by ID error:', error);
    return errorResponse(res, 500, 'Failed to fetch service');
  }
};

/**
 * @desc    Create new service (Admin)
 * @route   POST /api/admin/services
 * @access  Private/Admin
 */
export const createService = async (req, res) => {
  try {
    const serviceData = { ...req.body };

    // Handle icon upload
    if (req.files?.icon?.[0]) {
      const iconResult = await uploadImage(req.files.icon[0].buffer, {
        folder: 'portfolio/services/icons',
        transformation: { width: 200, height: 200, crop: 'limit' },
      });
      serviceData.icon = {
        url: iconResult.url,
        publicId: iconResult.publicId,
      };
    }

    // Handle image upload
    if (req.files?.image?.[0]) {
      const imageResult = await uploadImage(req.files.image[0].buffer, {
        folder: 'portfolio/services/images',
      });
      serviceData.image = {
        url: imageResult.url,
        publicId: imageResult.publicId,
      };
    }

    const service = await Service.create(serviceData);

    return successResponse(res, 201, 'Service created successfully', service);
  } catch (error) {
    console.error('Create service error:', error);
    return errorResponse(res, 500, error.message || 'Failed to create service');
  }
};

/**
 * @desc    Update service (Admin)
 * @route   PUT /api/admin/services/:id
 * @access  Private/Admin
 */
export const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return errorResponse(res, 404, 'Service not found');
    }

    const updateData = { ...req.body };

    // Handle icon upload and deletion
    if (req.files?.icon?.[0]) {
      // Delete old icon if exists
      if (service.icon?.publicId) {
        await deleteImage(service.icon.publicId);
      }

      const iconResult = await uploadImage(req.files.icon[0].buffer, {
        folder: 'portfolio/services/icons',
        transformation: { width: 200, height: 200, crop: 'limit' },
      });
      updateData.icon = {
        url: iconResult.url,
        publicId: iconResult.publicId,
      };
    }

    // Handle image upload and deletion
    if (req.files?.image?.[0]) {
      if (service.image?.publicId) {
        await deleteImage(service.image.publicId);
      }
      const imageResult = await uploadImage(req.files.image[0].buffer, {
        folder: 'portfolio/services/images',
      });
      updateData.image = {
        url: imageResult.url,
        publicId: imageResult.publicId,
      };
    }

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-__v');

    return successResponse(res, 200, 'Service updated successfully', updatedService);
  } catch (error) {
    console.error('Update service error:', error);
    return errorResponse(res, 500, error.message || 'Failed to update service');
  }
};

/**
 * @desc    Delete service (Admin)
 * @route   DELETE /api/admin/services/:id
 * @access  Private/Admin
 */
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return errorResponse(res, 404, 'Service not found');
    }

    // Delete icon from Cloudinary if exists
    if (service.icon?.publicId) {
      await deleteImage(service.icon.publicId);
    }

    // Delete image from Cloudinary if exists
    if (service.image?.publicId) {
      await deleteImage(service.image.publicId);
    }

    await service.deleteOne();

    return successResponse(res, 200, 'Service deleted successfully', null);
  } catch (error) {
    console.error('Delete service error:', error);
    return errorResponse(res, 500, 'Failed to delete service');
  }
};

/**
 * @desc    Update service display order (Admin)
 * @route   PATCH /api/admin/services/:id/order
 * @access  Private/Admin
 */
export const updateServiceOrder = async (req, res) => {
  try {
    const { displayOrder } = req.body;

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { displayOrder },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!service) {
      return errorResponse(res, 404, 'Service not found');
    }

    return successResponse(res, 200, 'Service order updated successfully', service);
  } catch (error) {
    console.error('Update service order error:', error);
    return errorResponse(res, 500, 'Failed to update service order');
  }
};


