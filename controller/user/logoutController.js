import { userQuerie } from "../../db/models/queries/user/userQuerie.js";

export const logoutController = async (req, res) => {
    const { refreshToken } = req.user;

    try {
        const user = await userQuerie.logoutUser(refreshToken);

        if (user.status == 401) {
            res.clearCookie("refreshToken");
            res.status(user.status).json({ message: user.message });

            return;
        }

        if (user.status == 200) {
            res.clearCookie("refreshToken");
            res.status(user.status).json({
                message: user.message,
            });

            return;
        }
    } catch (error) {
        console.log("Error on logout user", error);
        res.status(error.status).json({ message: error.message });
    }
};