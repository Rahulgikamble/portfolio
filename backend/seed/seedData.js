import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Profile from '../models/Profile.js';
import Skill from '../models/Skill.js';
import Project from '../models/Project.js';

dotenv.config();

// NOTE: You already have real data in your database from the dashboard.
// This script is kept for reference only — running it again would
// OVERWRITE your Skills and Projects with placeholder starter content.
// Do not run this unless you specifically want to reset those to defaults.

const skills = [
  { name: 'HTML5', category: 'Frontend', order: 1 },
  { name: 'CSS3', category: 'Frontend', order: 2 },
  { name: 'JavaScript', category: 'Frontend', order: 3 },
  { name: 'React', category: 'Frontend', order: 4 },
  { name: 'Node.js', category: 'Backend', order: 1 },
  { name: 'Express.js', category: 'Backend', order: 2 },
  { name: 'MongoDB', category: 'Database', order: 1 },
  { name: 'Git', category: 'Tools', order: 1 },
  { name: 'GitHub', category: 'Tools', order: 2 },
];

const projects = [];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for data seeding...');

    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({});
      console.log('Profile created with defaults.');
    } else {
      console.log('Profile already exists, leaving it untouched.');
    }

    console.log('Skipping Skills/Projects reset — you already have real data. Edit seed/seedData.js if you actually want to reset them.');

    process.exit();
  } catch (error) {
    console.error(`Seeding error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
