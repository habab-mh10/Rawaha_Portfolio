import mongoose from 'mongoose';

const aboutProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    headline: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    profilePicture: {
      url: String,
      publicId: String,
    },
    logo: {
      url: String,
      publicId: String,
    },
    cv: {
      url: String,
      publicId: String,
    },
    biography: {
      type: String,
    },
    vision: {
      type: String,
    },
    mission: {
      type: String,
    },
    goals: [
      {
        type: String,
        trim: true,
      },
    ],
    achievements: [
      {
        type: String,
        trim: true,
      },
    ],
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    socialLinks: {
      github: String,
      linkedin: String,
      twitter: String,
      instagram: String,
      whatsapp: String,
      facebook: String,
    },
  },
  {
    timestamps: true,
  }
);

const AboutProfile = mongoose.model('AboutProfile', aboutProfileSchema);

export default AboutProfile;
