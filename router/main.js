import express from "express";

import { publicRoute } from "./publicRoute.js";
import { authRoute } from "./user/authRouters.js";
import { protecdRoute } from "./protecdRoute.js";

import { _404Page } from "../controller/others/_404Page.js";

import { authorizedUser } from "../permissions/authorizedUser.js";
import { authorizedUserStatus } from "../permissions/authorizedUserStatus.js";

export const mainRouter = express.Router();

mainRouter.use("/api", authRoute);
mainRouter.use("/api", publicRoute);
mainRouter.use("/api", authorizedUser, authorizedUserStatus, protecdRoute);
mainRouter.all("*", _404Page);
