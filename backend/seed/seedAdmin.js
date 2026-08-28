// Creates your ONE admin login from the ADMIN_* values in .env.
// Run once with: npm run seed:admin
// Safe to run again later if you want to reset your password —
// it updates the existing admin instead of creating a duplicate.

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for admin seeding...');

    const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
    if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
      throw new Error('Set ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD in your .env first');
    }

    let admin = await Admin.findOne({ email: ADMIN_EMAIL });
    if (admin) {
      admin.name = ADMIN_NAME;
      admin.password = ADMIN_PASSWORD; // pre-save hook re-hashes this
      await admin.save();
      console.log(`Admin ${ADMIN_EMAIL} updated.`);
    } else {
      await Admin.create({ name: ADMIN_NAME, email: ADMIN_EMAIL, password: ADMIN_PASSWORD });
      console.log(`Admin ${ADMIN_EMAIL} created.`);
    }

    process.exit();
  } catch (error) {
    console.error(`Seeding error: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
