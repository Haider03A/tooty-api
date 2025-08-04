import jwt from "jsonwebtoken";
import { userQuerie } from "../../db/models/queries/user/userQuerie.js";
import { config } from "../../config.js";
import { generateAccessToken } from "../../tools/generateAccessToken.js";

export const registerController = async (req, res) => {
  const { email, password, name } = req.user;

  try {
    const user = await userQuerie.registerUser({ email, password, name });

    if (user.status == 401) {
      res.status(user.status).json({
        message: user.message,
      });

      return;
    }

    if (user.status == 201) {
      res.cookie("refreshToken", user.user.refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(user.status).json({
        message: user.message,
        accessToken: generateAccessToken({
          id: user.user._id,
          role: user.user.role,
          status: user.user.status,
        }),
        user: { email: user.user.email, name: user.user.name, status: user.user.status, role: user.user.role, createdAt: user.user.createdAt },
      });

      return;
    }
  } catch (error) {
    console.log("Error on register user", error.error);
    res.status(error.status).json({ message: error.message });
  }
};
