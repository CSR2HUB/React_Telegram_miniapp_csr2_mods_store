// Simple placeholder authentication middleware
module.exports.protect = (req, res, next) => {
  // In a real app, verify token and fetch user
  req.user = req.user || { _id: 'placeholderUserId' };
  next();
};
