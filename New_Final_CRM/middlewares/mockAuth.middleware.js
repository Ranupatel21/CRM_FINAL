export const mockAuth = (req, res, next) => {
  const role = req.headers.role;

  if (!role) {
    return res.status(401).json({ error: "Role header missing" });
  }

  req.user = { role };
  next();
};
