export const mockAuth = (req, res, next) => {
  try {
    // header ho ya na ho, admin maan lo
    req.user = {
      id: "mock-user",
      role: "Admin"
    };
    next();
  } catch (err) {
    console.error("Mock auth error:", err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

