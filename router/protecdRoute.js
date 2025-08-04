import express from "express";

import { fileRoute } from "./fileRoute.js";
import { pageRoute } from "./pageRoute.js";
import { itemRoute } from "./itemRoute.js";

export const protecdRoute = express.Router();

protecdRoute.use("/file", fileRoute);
protecdRoute.use("/page", pageRoute);
protecdRoute.use("/item", itemRoute);
