import mongoose from 'mongoose';

const technologySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Technology name is required'],
      trim: true,
    },
    logo: {
      url: {
        type: String,
        required: [true, 'Logo URL is required'],
      },
      publicId: {
        type: String,
        required: [true, 'Logo public ID is required'],
      },
    },
    altText: {
      type: String,
      required: [true, 'Alt text is required for accessibility'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['Frontend', 'Backend', 'Database', 'DevOps', 'Design', 'Other'],
      default: 'Other',
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
technologySchema.index({ published: 1, displayOrder: 1 });
technologySchema.index({ category: 1 });

const Technology = mongoose.model('Technology', technologySchema);

export default Technology;
