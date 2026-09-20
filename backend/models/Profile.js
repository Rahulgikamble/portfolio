import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, default: 'Your Name' },
    role: { type: String, default: 'Full-Stack Developer' },
    tagline: { type: String, default: 'I build things for the web.' },
    bio: { type: String, default: 'Write a short bio about yourself here.' },
    location: { type: String, default: '' },
    email: { type: String, default: '' },
    avatarUrl: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    instagram: { type: String, default: '' },
    whatsapp: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Profile', profileSchema);
