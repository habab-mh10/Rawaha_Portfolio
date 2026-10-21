import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Service description is required'],
    },
    icon: {
      url: String,
      publicId: String,
    },
    image: {
      url: String,
      publicId: String,
    },
    price: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    ctaLabel: {
      type: String,
      default: 'Get Started',
      trim: true,
    },
    ctaDestination: {
      type: String,
      trim: true,
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
serviceSchema.index({ published: 1, displayOrder: 1 });
serviceSchema.index({ category: 1 });

const Service = mongoose.model('Service', serviceSchema);

export default Service;
