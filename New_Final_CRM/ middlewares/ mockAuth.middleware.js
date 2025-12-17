
export const mockAuth = (req, res, next) => {
  // temporary testing
  req.user = {
    role: req.headers.role || "Admin"
  };
  next();
};
