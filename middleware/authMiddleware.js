// Placeholder authentication middleware

const protect = (req, res, next) => {
  // In a real app, verify user authentication here
  req.user = { id: 'user1', isAdmin: false };
  next();
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as admin' });
  }
};

module.exports = { protect, admin };
