// Seeds starter Profile + Skills + Projects so the site isn't empty on first load.
// Everything here is fully editable afterward from the Admin Dashboard.
// Run once with: npm run seed:data

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Profile from '../models/Profile.js';
import Skill from '../models/Skill.js';
import Project from '../models/Project.js';

dotenv.config();

const skills = [
  { name: 'HTML5', category: 'Frontend', order: 1 },
  { name: 'CSS3', category: 'Frontend', order: 2 },
  { name: 'JavaScript', category: 'Frontend', order: 3 },
  { name: 'React', category: 'Frontend', order: 4 },
  { name: 'Bootstrap', category: 'Frontend', order: 5 },
  { name: 'Node.js', category: 'Backend', order: 1 },
  { name: 'Express.js', category: 'Backend', order: 2 },
  { name: 'MongoDB', category: 'Database', order: 1 },
  { name: 'Git', category: 'Tools', order: 1 },
  { name: 'GitHub', category: 'Tools', order: 2 },
  { name: 'VS Code', category: 'Tools', order: 3 },
  { name: 'Postman', category: 'Tools', order: 4 },
];

const projects = [
  {
    title: 'MERN E-Commerce App',
    description:
      'A full-stack shopping app with JWT auth, product search/filter/sort, a MongoDB-persisted cart, and order checkout. Built end to end with React, Express, and MongoDB Atlas.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    liveUrl: '',
    githubUrl: '',
    featured: true,
    order: 1,
  },
  {
    title: 'Weather App',
    description:
      'A JavaScript weather app that fetches live conditions and forecasts from a public weather API and presents them in a clean, responsive UI.',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'REST API'],
    liveUrl: '',
    githubUrl: '',
    featured: true,
    order: 2,
  },
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for data seeding...');

    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({
        name: 'Rahul Kamble',
        role: 'Full-Stack Developer (MERN)',
        tagline: 'I design and build full-stack web applications.',
        bio: 'B.E. in Electronics Engineering, and a completed MERN Stack Development course covering the full flow from React front ends to Express/MongoDB back ends. I like turning ideas into working, deployed products.',
      });
      console.log('Profile created with starter content.');
    } else {
      console.log('Profile already exists, leaving it untouched.');
    }

    await Skill.deleteMany();
    await Skill.insertMany(skills);
    console.log(`${skills.length} skills seeded.`);

    await Project.deleteMany();
    await Project.insertMany(projects);
    console.log(`${projects.length} projects seeded.`);

    process.exit();
  } catch (error) {
    console.error(`Seeding error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
