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
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(user.status).json({
        message: user.message,
        accessToken: generateAccessToken({
          id: user.user._id,
          role: user.user.role,
          status: user.user.status,
        }),
        user: { id: user.user._id, email: user.user.email },
      });

      return;
    }
  } catch (error) {
    console.log("Error on login user", error);
    res.status(error.status).json({ message: error.message });
  }
};
