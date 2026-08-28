import mongoose from 'mongoose';

// Single-document collection: only one Profile ever exists.
// Powers the Home page hero/about content.
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
    whatsapp: { type: String, default: '' }, // full phone number with country code, digits only
  },
  { timestamps: true }
);

export default mongoose.model('Profile', profileSchema);
