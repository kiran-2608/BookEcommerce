// backend/middleware/adminMiddleware.js
const adminMiddleware = (req, res, next) => {
  // This assumes 'authMiddleware' has already run and attached the user to 'req.user'
  if (req.user && req.user.role === 'admin') {
    next(); // User is an admin, proceed
  } else {
    // User is logged in but not an admin, or not logged in at all
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};

module.exports = adminMiddleware;