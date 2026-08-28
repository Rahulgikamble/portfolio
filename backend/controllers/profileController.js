import Profile from '../models/Profile.js';

// @route GET /api/profile  (public)
export const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) profile = await Profile.create({}); // create with defaults if none exists yet
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route PUT /api/profile  (admin only)
export const updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) profile = new Profile();
    Object.assign(profile, req.body);
    await profile.save();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
