import Admin from '../models/Admin.js';
import { generateToken } from '../utils.js';

// @route POST /api/auth/login
// Note: there is deliberately no register endpoint. The single admin
// account is created once via `npm run seed:admin`.
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/auth/me
export const getMe = async (req, res) => {
  res.json(req.admin);
};
