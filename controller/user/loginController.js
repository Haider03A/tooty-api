import { userQuerie } from "../../db/models/queries/user/userQuerie.js";
import { generateAccessToken } from "../../tools/generateAccessToken.js";
import { config } from "../../config.js";

export const loginController = async (req, res) => {
  const { email, password } = req.user;

  try {
    const user = await userQuerie.loginUser({ email, password });

    if (user.status == 401) {
      res.status(user.status).json({
        message: user.message,
      });

      return;
    }

    if (user.status == 200) {
      res.cookie("refreshToken", user.user.refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: config.cookieExpiration,
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
    console.log("Error on login user", error);
    res.status(error.status).json({ message: error.message });
  }
};
