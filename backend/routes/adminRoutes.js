// backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { getAllUsers, updateUserRole } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Use both middlewares to ensure only logged-in Admins can access
router.get('/users', authMiddleware, adminMiddleware, getAllUsers);
router.put('/update-role/:id', authMiddleware, adminMiddleware, updateUserRole);

module.exports = router;