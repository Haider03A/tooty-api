import express from "express";

import { pagesValidator } from "../validator/pagesVaildator.js";
import { pagesController } from "../controller/pagesController.js";

import { generateTampPageId } from "../controller/generatrTampPageId.js";

const router = express.Router();

router.post(
  "/group",
  pagesValidator.addGroupValidator,
  pagesController.addGroup
);
router.patch(
  "/group",
  pagesValidator.updateGroupValidator,
  pagesController.updateGroup
);
router.delete(
  "/group",
  pagesValidator.deleteGroupValidator,
  pagesController.deleteGroup
);

router.get("/generate/tampPageId", generateTampPageId);

export const pageRoute = router;
