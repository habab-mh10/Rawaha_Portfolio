import mongoose from 'mongoose';

const visionGoalsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      default: 'Our Goals and Vision'
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
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

const VisionGoals = mongoose.model('VisionGoals', visionGoalsSchema);

export default VisionGoals;