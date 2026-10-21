import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
    },
    clientPhoto: {
      url: String,
      publicId: String,
    },
    company: {
      type: String,
      trim: true,
    },
    designation: {
      type: String,
      trim: true,
    },
    testimonial: {
      type: String,
      required: [true, 'Testimonial text is required'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    featured: {
      type: Boolean,
      default: false,
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
testimonialSchema.index({ published: 1, featured: 1, displayOrder: 1 });

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;
