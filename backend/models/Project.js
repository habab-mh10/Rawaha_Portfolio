import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
    },
    shortDescription: {
      type: String,
      maxlength: 200,
    },
    category: {
      type: String,
      required: [true, 'Project category is required'],
      enum: ['Web Application', 'E-Commerce', 'Landing Page', 'Dashboard', 'Mobile App', 'API', 'Other'],
    },
    technologies: [
      {
        type: String,
        trim: true,
      },
    ],
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        publicId: {
          type: String,
          required: true,
        },
        thumbnail: String,
      },
    ],
    video: {
      url: String,
      publicId: String,
      thumbnail: String,
      resourceType: {
        type: String,
        enum: ['video', 'raw'],
        default: 'video',
      },
    },
    liveUrl: {
      type: String,
      trim: true,
    },
    githubUrl: {
      type: String,
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    published: {
      type: Boolean,
      default: false,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Generate slug from title before saving
projectSchema.pre('save', function (next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Index for better query performance
projectSchema.index({ published: 1, featured: 1, displayOrder: 1 });
// slug already has unique index from schema definition
projectSchema.index({ category: 1 });

const Project = mongoose.model('Project', projectSchema);

export default Project;
