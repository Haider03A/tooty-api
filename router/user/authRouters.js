import { Router } from "express";

import { registerController } from "../../controller/user/registerController.js";
import { registerVaildator } from "../../validator/user/registerVaildator.js";

import { loginController } from "../../controller/user/loginController.js";
import { loginVaildator } from "../../validator/user/loginVaildator.js";

import { authorizedRefreshToken } from "../../permissions/authorizedRefreshToken.js";
import { renewRefreshToken } from "../../controller/user/renewRefreshToken.js";

const router = Router();

router.post("/register", registerVaildator, registerController);
router.post("/login", loginVaildator, loginController);
router.post("/refreshToken", authorizedRefreshToken, renewRefreshToken);

export const userRouter = Router();

userRouter.use("/api/user", router);
