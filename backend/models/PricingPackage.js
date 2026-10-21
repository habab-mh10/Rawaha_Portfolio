import mongoose from 'mongoose';

const pricingPackageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Package name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Package description is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    duration: {
      type: String,
      required: [true, 'Duration is required'],
      trim: true,
      // e.g., 'month', 'project', 'week', 'year'
    },
    features: [
      {
        type: String,
        trim: true,
      },
    ],
    isPopular: {
      type: Boolean,
      default: false,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
pricingPackageSchema.index({ published: 1, displayOrder: 1 });
pricingPackageSchema.index({ isPopular: 1 });

const PricingPackage = mongoose.model('PricingPackage', pricingPackageSchema);

export default PricingPackage;
