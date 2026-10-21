import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true,
    },
    speciality: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
    },
    profilePicture: {
      url: String,
      publicId: String,
    },
    socialLinks: {
      linkedin: String,
      github: String,
      twitter: String,
      portfolio: String,
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
teamMemberSchema.index({ published: 1, displayOrder: 1 });

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);

export default TeamMember;
