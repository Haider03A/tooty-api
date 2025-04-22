import { userQuerie } from "../../db/models/queries/user/userQuerie.js";

export const renewRefreshToken = async (req, res) => {
  const { refreshToken } = req.user;

  try {
    const user = await userQuerie.renewRefreshToken(refreshToken);

    if (user.status == 401) {
      res.status(user.status).json({ message: user.message });

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
        accessToken: user.user.accessToken,
        user: { id: user.user._id, email: user.user.email },
      });

      return;
    }
  } catch (error) {
    console.log("Error on renew refresh token", error);
    res.status(error.status).json({ message: error.message });
  }
};
