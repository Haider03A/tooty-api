export const authorizedUserStatus = async (req, res, next) => {
  const { status } = req.user;
  if (status !== "active") {
    return res.status(401).json({ message: "User status is not active" });
  }
  next();
};
