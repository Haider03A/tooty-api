import express from "express";

import { authRoute } from "./user/authRouters.js";
import { fileRoute } from "./fileRoute.js";
import { pageRoute } from "./pageRoute.js";
import { itemRoute } from "./itemRoute.js";

import { _404Page } from "../controller/others/_404Page.js";

import { authorizedUser } from "../permissions/authorizedUser.js";
import { authorizedUserStatus } from "../permissions/authorizedUserStatus.js";

const router = express.Router();

router.use("/file", fileRoute);
router.use("/page", pageRoute);
router.use("/item", itemRoute);

export const mainRouter = express.Router();

mainRouter.use(authRoute);
mainRouter.use("/api", authorizedUser, authorizedUserStatus, router);
mainRouter.all("*", _404Page);
