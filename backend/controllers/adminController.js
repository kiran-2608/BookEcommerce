// backend/controllers/adminController.js
const User = require('../models/User');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Don't send passwords
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update user role
exports.updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(id, { role }, { new: true });
    res.status(200).json({ message: "User updated", user });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};