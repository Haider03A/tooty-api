import { Router } from "express";

import { checkConnecting } from "../controller/others/checkConnecting.js";

export const publicRoute = Router();
publicRoute.get("/checkConnecting", checkConnecting);
