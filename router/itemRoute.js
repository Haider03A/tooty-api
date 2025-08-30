import express from "express";

import { itemsController } from "../controller/itemsController.js";
import { itemsValidator } from "../validator/itemsVaildator.js";
import { generateTampItemId } from "../controller/generatrTampItemId.js";

const router = express.Router();

router.post(
  "/group",
  itemsValidator.addGroupValidator,
  itemsController.addGroup
);
router.patch(
  "/group",
  itemsValidator.updateGroupValidator,
  itemsController.updateGroup
);
router.delete(
  "/group",
  itemsValidator.deleteGroupValidator,
  itemsController.deleteGroup
);

router.get("/generate/tampItemId", generateTampItemId);

export const itemRoute = router;
