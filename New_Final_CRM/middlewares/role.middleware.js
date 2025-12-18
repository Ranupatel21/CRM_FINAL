console.log("ROLE MIDDLEWARE LOADED");

 export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "User missing" });
  }

  if (req.user.role !== "Admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  next();
};
