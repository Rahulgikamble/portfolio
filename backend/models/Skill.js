import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ['Frontend', 'Backend', 'Database', 'Tools', 'Other'],
      default: 'Other',
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Skill', skillSchema);
