import PricingPackage from '../models/PricingPackage.js';
import { successResponse, errorResponse } from '../utils/response.utils.js';

// @desc    Get all pricing packages (Public)
// @route   GET /api/pricing
// @access  Public
export const getAllPackages = async (req, res, next) => {
  try {
    const packages = await PricingPackage.find({ published: true })
      .sort({ displayOrder: 1, createdAt: -1 })
      .select('-__v');

    successResponse(res, 200, 'Pricing packages fetched successfully', packages);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all pricing packages (Admin - all packages)
// @route   GET /api/pricing/admin/all
// @access  Private/Admin
export const getAdminPackages = async (req, res, next) => {
  try {
    const packages = await PricingPackage.find()
      .sort({ displayOrder: 1, createdAt: -1 })
      .select('-__v');

    successResponse(res, 200, 'Pricing packages fetched successfully', packages);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single pricing package by ID
// @route   GET /api/pricing/:id
// @access  Public
export const getPackageById = async (req, res, next) => {
  try {
    const pkg = await PricingPackage.findById(req.params.id).select('-__v');

    if (!pkg) {
      return errorResponse(res, 404, 'Pricing package not found');
    }

    successResponse(res, 200, 'Pricing package fetched successfully', pkg);
  } catch (error) {
    next(error);
  }
};

// @desc    Create new pricing package
// @route   POST /api/pricing/admin/create
// @access  Private/Admin
export const createPackage = async (req, res, next) => {
  try {
    const { name, description, price, duration, features, isPopular, displayOrder } = req.body;

    // Validate required fields
    if (!name || !description || price === undefined || !duration) {
      return errorResponse(res, 400, 'Please provide name, description, price, and duration');
    }

    // If marking as popular, remove popular flag from others
    if (isPopular) {
      await PricingPackage.updateMany({ isPopular: true }, { isPopular: false });
    }

    // Create package
    const newPkg = await PricingPackage.create({
      name,
      description,
      price,
      duration,
      features: features || [],
      isPopular: isPopular || false,
      displayOrder: displayOrder || 0,
    });

    successResponse(res, 201, 'Pricing package created successfully', newPkg);
  } catch (error) {
    next(error);
  }
};

// @desc    Update pricing package
// @route   PUT /api/pricing/admin/:id
// @access  Private/Admin
export const updatePackage = async (req, res, next) => {
  try {
    const pkg = await PricingPackage.findById(req.params.id);

    if (!pkg) {
      return errorResponse(res, 404, 'Pricing package not found');
    }

    const { name, description, price, duration, features, isPopular, displayOrder, published } = req.body;

    // If marking as popular, remove popular flag from others
    if (isPopular && !pkg.isPopular) {
      await PricingPackage.updateMany({ isPopular: true }, { isPopular: false });
    }

    // Update fields
    if (name) pkg.name = name;
    if (description) pkg.description = description;
    if (price !== undefined) pkg.price = price;
    if (duration) pkg.duration = duration;
    if (features) pkg.features = features;
    if (isPopular !== undefined) pkg.isPopular = isPopular;
    if (displayOrder !== undefined) pkg.displayOrder = displayOrder;
    if (published !== undefined) pkg.published = published;

    await pkg.save();

    successResponse(res, 200, 'Pricing package updated successfully', pkg);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete pricing package
// @route   DELETE /api/pricing/admin/:id
// @access  Private/Admin
export const deletePackage = async (req, res, next) => {
  try {
    const pkg = await PricingPackage.findById(req.params.id);

    if (!pkg) {
      return errorResponse(res, 404, 'Pricing package not found');
    }

    await pkg.deleteOne();

    successResponse(res, 200, 'Pricing package deleted successfully', null);
  } catch (error) {
    next(error);
  }
};
