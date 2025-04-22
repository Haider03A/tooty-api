import jwt from "jsonwebtoken";
import { config } from "../config.js";

export const authorizedUser = async (req, res, next) => {
  const accessToken = req.headers.authorization;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken || !accessToken.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token not found or invalid!" });
  }

  const token = accessToken.split(" ")[1];

  try {
    const decodedAccessToken = jwt.verify(token, config.jwtSecret);
    try {
      const decodedRefreshToken = jwt.verify(
        refreshToken,
        config.refreshSecret
      );
      if (decodedAccessToken.id !== decodedRefreshToken.id) {
        return res.status(401).json({ message: "Invalid refresh token!" });
      }
      req.user = decodedAccessToken;
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Expired refresh token!", tokenRefreshExpired: true });
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Expired access token!", tokenAccessExpired: true });
    }
    return res.status(401).json({ message: "Invalid access token!" });
  }
};
