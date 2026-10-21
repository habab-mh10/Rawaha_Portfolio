import multer from 'multer';
import path from 'path';
import { errorResponse } from '../utils/response.utils.js';

// Configure multer storage - use memory storage for buffer uploads to Cloudinary
const storage = multer.memoryStorage();

// File filter for images
const imageFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|svg/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp, svg)'));
  }
};

// File filter for videos
const videoFilter = (req, file, cb) => {
  const allowedTypes = /mp4|mov|avi|wmv|flv|webm/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = file.mimetype.startsWith('video/');

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only video files are allowed (mp4, mov, avi, wmv, flv, webm)'));
  }
};

// File filter for images and videos
const mediaFilter = (req, file, cb) => {
  const allowedImageTypes = /jpeg|jpg|png|gif|webp|svg/;
  const allowedVideoTypes = /mp4|mov|avi|wmv|flv|webm/;
  const extname = path.extname(file.originalname).toLowerCase();

  const isImage =
    allowedImageTypes.test(extname) &&
    (file.mimetype.startsWith('image/') || file.mimetype === 'image/svg+xml');
  const isVideo = allowedVideoTypes.test(extname) && file.mimetype.startsWith('video/');

  if (isImage || isVideo) {
    return cb(null, true);
  } else {
    cb(
      new Error(
        'Only image and video files are allowed (jpeg, jpg, png, gif, webp, svg, mp4, mov, avi, wmv, flv, webm)'
      )
    );
  }
};

// File filter that accepts images AND PDFs (for brand assets: logo + cv)
const brandAssetsFilter = (req, file, cb) => {
  const imageTypes = /jpeg|jpg|png|gif|webp|svg/;
  const ext = path.extname(file.originalname).toLowerCase();

  const isImage = imageTypes.test(ext) && file.mimetype.startsWith('image/');
  const isPdf   = ext === '.pdf' && file.mimetype === 'application/pdf';

  if (isImage || isPdf) {
    return cb(null, true);
  }
  cb(new Error('Only image files and PDFs are allowed'));
};

// Upload middleware for logo (image) + cv (PDF) + profilePicture (image) in one request
export const uploadBrandAssets = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB per file
  fileFilter: brandAssetsFilter,
}).fields([
  { name: 'profilePicture', maxCount: 1 },
  { name: 'logo',           maxCount: 1 },
  { name: 'cv',             maxCount: 1 },
]);

// Upload middleware for single file (any field name)
export const uploadSingle = (fieldName) =>
  multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter: imageFilter,
  }).single(fieldName);

// Upload middleware for multiple fields
export const uploadMultiple = (fields) =>
  multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB per file
    fileFilter: imageFilter,
  }).fields(fields);

// Upload middleware for single image
export const uploadImage = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: imageFilter,
}).single('image');

// Upload middleware for single video
export const uploadVideo = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter: videoFilter,
}).single('video');

// Upload middleware for multiple images
export const uploadImages = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per file
  fileFilter: imageFilter,
}).array('images', 10); // Max 10 images

// Upload middleware for mixed media (images and videos)
export const uploadMedia = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter: mediaFilter,
}).fields([
  { name: 'images', maxCount: 10 },
  { name: 'video', maxCount: 1 },
]);

// Error handling middleware for multer
export const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return errorResponse(res, 400, 'File size is too large');
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return errorResponse(res, 400, 'Too many files uploaded');
    }
    return errorResponse(res, 400, `Upload error: ${err.message}`);
  } else if (err) {
    return errorResponse(res, 400, err.message);
  }
  next();
};
