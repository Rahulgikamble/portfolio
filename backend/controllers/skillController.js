import Skill from '../models/Skill.js';

// @route GET /api/skills  (public)
export const getSkills = async (req, res) => {
  const skills = await Skill.find().sort({ category: 1, order: 1, createdAt: 1 });
  res.json(skills);
};

// @route POST /api/skills  (admin only)
export const createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route PUT /api/skills/:id  (admin only)
export const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    res.json(skill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route DELETE /api/skills/:id  (admin only)
export const deleteSkill = async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: 'Skill removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
