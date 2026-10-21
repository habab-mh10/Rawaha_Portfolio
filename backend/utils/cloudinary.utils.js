import { cloudinary } from '../config/cloudinary.js';
import streamifier from 'streamifier';

/**
 * Upload image to Cloudinary from buffer
 * @param {Buffer} buffer - File buffer
 * @param {Object} options - Upload options
 * @returns {Promise<Object>} Upload result
 */
export const uploadImage = async (buffer, options = {}) => {
  try {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: options.folder || 'portfolio',
          resource_type: 'image',
          transformation: options.transformation || [
            { quality: 'auto', fetch_format: 'auto' },
          ],
          ...options,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            thumbnail: result.eager?.[0]?.secure_url || result.secure_url,
          });
        }
      );

      streamifier.createReadStream(buffer).pipe(uploadStream);
    });
  } catch (error) {
    throw new Error(`Image upload failed: ${error.message}`);
  }
};

/**
 * Upload video to Cloudinary from buffer
 * @param {Buffer} buffer - File buffer
 * @param {Object} options - Upload options
 * @returns {Promise<Object>} Upload result
 */
export const uploadVideo = async (buffer, options = {}) => {
  try {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: options.folder || 'portfolio/videos',
          resource_type: 'video',
          eager: [{ format: 'jpg', transformation: [{ quality: 'auto' }] }],
          eager_async: true,
          ...options,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            thumbnail: result.eager?.[0]?.secure_url || null,
            resourceType: 'video',
          });
        }
      );

      streamifier.createReadStream(buffer).pipe(uploadStream);
    });
  } catch (error) {
    throw new Error(`Video upload failed: ${error.message}`);
  }
};

/**
 * Delete file from Cloudinary
 * @param {String} publicId - Public ID of the file
 * @param {String} resourceType - Resource type (image, video, raw)
 * @returns {Promise<Boolean>} Success status
 */
export const deleteFile = async (publicId, resourceType = 'image') => {
  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    return true;
  } catch (error) {
    console.error(`Cloudinary delete error: ${error.message}`);
    return false;
  }
};

// Alias for deleteFile - for backward compatibility
export const deleteImage = deleteFile;

/**
 * Upload a raw file (PDF, etc.) to Cloudinary from buffer
 * @param {Buffer} buffer - File buffer
 * @param {Object} options - Upload options
 * @returns {Promise<Object>} Upload result
 */
export const uploadRaw = async (buffer, options = {}) => {
  try {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: options.folder || 'portfolio',
          resource_type: 'raw',
          ...options,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
        }
      );
      streamifier.createReadStream(buffer).pipe(uploadStream);
    });
  } catch (error) {
    throw new Error(`Raw file upload failed: ${error.message}`);
  }
};

/**
 * Delete multiple files from Cloudinary
 * @param {Array<String>} publicIds - Array of public IDs
 * @param {String} resourceType - Resource type (image, video, raw)
 * @returns {Promise<Boolean>} Success status
 */
export const deleteMultipleFiles = async (publicIds, resourceType = 'image') => {
  try {
    const deletePromises = publicIds.map((publicId) =>
      cloudinary.uploader.destroy(publicId, { resource_type: resourceType })
    );
    await Promise.all(deletePromises);
    return true;
  } catch (error) {
    console.error(`Cloudinary bulk delete error: ${error.message}`);
    return false;
  }
};
