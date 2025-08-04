import jwt, { decode } from "jsonwebtoken";
import { config } from "../config.js";

export const authorizedRefreshToken = async (req, res, next) => {
  const { refreshToken } = req.cookies;
  try {
    const decodeRefreshToken = jwt.verify(refreshToken, config.refreshSecret);
    req.user = decodeRefreshToken;
    req.user.refreshToken = refreshToken;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .clearCookie("refreshToken")
        .status(401)
        .json({ message: "Expired refresh token!", tokenRefreshExpired: true });
    }

    return res.clearCookie("refreshToken").status(401).json({ message: "Invalid refresh token!" });
  }
};
