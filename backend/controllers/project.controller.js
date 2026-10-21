import Project from '../models/Project.js';
import { successResponse, errorResponse, paginate, paginationMeta } from '../utils/response.utils.js';
import { uploadImage, uploadVideo, deleteFile, deleteMultipleFiles } from '../utils/cloudinary.utils.js';
import fs from 'fs';

// @desc    Get all projects (Public - published only)
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, category, search, featured } = req.query;

    const { skip, limit: limitNum, page: pageNum } = paginate(page, limit);

    // Build query for published projects only
    const query = { published: true };

    if (category) {
      query.category = category;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
      ];
    }

    // Get projects with pagination
    const projects = await Project.find(query)
      .sort({ featured: -1, displayOrder: 1, createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .select('-__v');

    const total = await Project.countDocuments(query);

    res.status(200).json({
      success: true,
      data: projects,
      pagination: paginationMeta(total, pageNum, limitNum),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single project by slug (Public - published only)
// @route   GET /api/projects/:slug
// @access  Public
export const getProjectBySlug = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      slug: req.params.slug,
      published: true,
    }).select('-__v');

    if (!project) {
      return errorResponse(res, 404, 'Project not found');
    }

    successResponse(res, 200, 'Project fetched successfully', project);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all projects (Admin - all projects)
// @route   GET /api/admin/projects
// @access  Private/Admin
export const getAdminProjects = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, category, search, published, featured } = req.query;

    const { skip, limit: limitNum, page: pageNum } = paginate(page, limit);

    // Build query
    const query = {};

    if (category) {
      query.category = category;
    }

    if (published !== undefined) {
      query.published = published === 'true';
    }

    if (featured !== undefined) {
      query.featured = featured === 'true';
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Get projects with pagination
    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .select('-__v');

    const total = await Project.countDocuments(query);

    res.status(200).json({
      success: true,
      data: projects,
      pagination: paginationMeta(total, pageNum, limitNum),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single project by ID (Admin)
// @route   GET /api/admin/projects/:id
// @access  Private/Admin
export const getAdminProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).select('-__v');

    if (!project) {
      return errorResponse(res, 404, 'Project not found');
    }

    successResponse(res, 200, 'Project fetched successfully', project);
  } catch (error) {
    next(error);
  }
};

// @desc    Create new project
// @route   POST /api/projects/admin/create
// @access  Private/Admin
export const createProject = async (req, res, next) => {
  try {
    const {
      title,
      description,
      category,
      liveUrl,
    } = req.body;

    // Validate required fields
    if (!title || !description || !category || !liveUrl) {
      return errorResponse(res, 400, 'Please provide title, description, category, and live URL');
    }

    // Handle technologies array from FormData
    let technologies = [];
    if (req.body['technologies[]']) {
      technologies = Array.isArray(req.body['technologies[]']) 
        ? req.body['technologies[]'] 
        : [req.body['technologies[]']];
    }

    // Create project data
    const projectData = {
      title,
      description,
      shortDescription: description.substring(0, 200),
      category,
      technologies,
      liveUrl,
      published: true,
      featured: false,
      displayOrder: 0,
    };

    // Handle image upload
    if (req.files && req.files.images) {
      const imageFiles = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
      const uploadedImages = [];

      for (const file of imageFiles) {
        const result = await uploadImage(file.buffer, { folder: 'portfolio/projects' });
        uploadedImages.push({
          url: result.url,
          publicId: result.publicId,
          thumbnail: result.thumbnail || result.url,
        });
      }

      projectData.images = uploadedImages;
    }

    // Handle video upload
    if (req.files && req.files.video) {
      const videoFile = Array.isArray(req.files.video) ? req.files.video[0] : req.files.video;
      const result = await uploadVideo(videoFile.buffer, { folder: 'portfolio/projects' });

      projectData.video = {
        url: result.url,
        publicId: result.publicId,
        thumbnail: result.thumbnail,
        resourceType: 'video',
      };
    }

    // Check if at least one media is uploaded
    if (!projectData.images && !projectData.video) {
      return errorResponse(res, 400, 'Please upload at least one image or video');
    }

    // Create project
    const project = await Project.create(projectData);

    successResponse(res, 201, 'Project created successfully', project);
  } catch (error) {
    next(error);
  }
};

// @desc    Update project
// @route   PUT /api/admin/projects/:id
// @access  Private/Admin
export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return errorResponse(res, 404, 'Project not found');
    }

    const {
      title,
      description,
      shortDescription,
      category,
      technologies,
      liveUrl,
      githubUrl,
      featured,
      published,
      displayOrder,
      completedAt,
    } = req.body;

    // Update fields
    if (title) project.title = title;
    if (description) project.description = description;
    if (shortDescription !== undefined) project.shortDescription = shortDescription;
    if (category) project.category = category;
    if (technologies) project.technologies = JSON.parse(technologies);
    if (liveUrl !== undefined) project.liveUrl = liveUrl;
    if (githubUrl !== undefined) project.githubUrl = githubUrl;
    if (featured !== undefined) project.featured = featured === 'true';
    if (published !== undefined) project.published = published === 'true';
    if (displayOrder !== undefined) project.displayOrder = displayOrder;
    if (completedAt !== undefined) project.completedAt = completedAt;

    await project.save();

    successResponse(res, 200, 'Project updated successfully', project);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete project
// @route   DELETE /api/admin/projects/:id
// @access  Private/Admin
export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return errorResponse(res, 404, 'Project not found');
    }

    // Delete images from Cloudinary
    if (project.images && project.images.length > 0) {
      const publicIds = project.images.map((img) => img.publicId);
      await deleteMultipleFiles(publicIds, 'image');
    }

    // Delete video from Cloudinary
    if (project.video && project.video.publicId) {
      await deleteFile(project.video.publicId, 'video');
    }

    await project.deleteOne();

    successResponse(res, 200, 'Project deleted successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Upload project images
// @route   POST /api/admin/projects/:id/images
// @access  Private/Admin
export const uploadProjectImages = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return errorResponse(res, 404, 'Project not found');
    }

    if (!req.files || req.files.length === 0) {
      return errorResponse(res, 400, 'Please upload at least one image');
    }

    // Upload images to Cloudinary
    const uploadPromises = req.files.map((file) =>
      uploadImage(file.buffer, { folder: 'portfolio/projects' })
    );

    const uploadedImages = await Promise.all(uploadPromises);

    // Map to correct shape and add to project
    project.images.push(...uploadedImages.map(r => ({
      url: r.url,
      publicId: r.publicId,
      thumbnail: r.thumbnail || r.url,
    })));
    await project.save();

    successResponse(res, 200, 'Images uploaded successfully', project);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete project image
// @route   DELETE /api/admin/projects/:id/images/:imageId
// @access  Private/Admin
export const deleteProjectImage = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return errorResponse(res, 404, 'Project not found');
    }

    const imageIndex = project.images.findIndex(
      (img) => img._id.toString() === req.params.imageId
    );

    if (imageIndex === -1) {
      return errorResponse(res, 404, 'Image not found');
    }

    const image = project.images[imageIndex];

    // Delete from Cloudinary
    await deleteFile(image.publicId, 'image');

    // Remove from project
    project.images.splice(imageIndex, 1);
    await project.save();

    successResponse(res, 200, 'Image deleted successfully', project);
  } catch (error) {
    next(error);
  }
};

// @desc    Upload project video
// @route   POST /api/admin/projects/:id/video
// @access  Private/Admin
export const uploadProjectVideo = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return errorResponse(res, 404, 'Project not found');
    }

    if (!req.file) {
      return errorResponse(res, 400, 'Please upload a video file');
    }

    // Delete existing video if present
    if (project.video && project.video.publicId) {
      await deleteFile(project.video.publicId, 'video');
    }

    // Upload video to Cloudinary
    const result = await uploadVideo(req.file.buffer, { folder: 'portfolio/projects/videos' });

    project.video = {
      url: result.url,
      publicId: result.publicId,
      thumbnail: result.thumbnail,
      resourceType: 'video',
    };
    await project.save();

    successResponse(res, 200, 'Video uploaded successfully', project);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete project video
// @route   DELETE /api/admin/projects/:id/video
// @access  Private/Admin
export const deleteProjectVideo = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return errorResponse(res, 404, 'Project not found');
    }

    if (!project.video || !project.video.publicId) {
      return errorResponse(res, 404, 'Video not found');
    }

    // Delete from Cloudinary
    await deleteFile(project.video.publicId, 'video');

    // Remove from project
    project.video = undefined;
    await project.save();

    successResponse(res, 200, 'Video deleted successfully', project);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get project statistics (Admin)
 * @route   GET /api/projects/admin/stats
 * @access  Private/Admin
 */
export const getProjectStats = async (req, res) => {
  try {
    const [total, published, draft, featured] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ published: true }),
      Project.countDocuments({ published: false }),
      Project.countDocuments({ featured: true }),
    ]);

    return successResponse(
      res,
      200,
      'Project statistics fetched successfully',
      {
        total,
        published,
        draft,
        featured,
      }
    );
  } catch (error) {
    console.error('Get project stats error:', error);
    return errorResponse(res, 500, 'Failed to fetch project statistics');
  }
};
