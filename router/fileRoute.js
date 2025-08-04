import express from "express";

import { filesController } from "../controller/filesController.js";
import { filesValidator } from "../validator/filesVaildator.js";
import { generateTampFileId } from "../controller/generateTampFileId.js";

const router = express.Router();

// <-- Single -->

// router.get("/:fileId", filesValidator.getOneValidator, filesController.getOne);
router.post("/", filesValidator.addOneValidator, filesController.addOne);
router.patch("/", filesValidator.updateOneValidator, filesController.updateOne);
router.delete(
  "/",
  filesValidator.deleteOneValidator,
  filesController.deleteOne
);

// <-- Group -->
router.get(
  "/group",
  filesController.getAll
);
router.post(
  "/group",
  filesValidator.addGroupValidator,
  filesController.addGroup
);
router.patch(
  "/group",
  filesValidator.updateGroupValidator,
  filesController.updateGroup
);
router.delete(
  "/group",
  filesValidator.deleteGroupValidator,
  filesController.deleteGroup
);

// <-- Tools -->

router.get("/generate/tampFileId", generateTampFileId);

export const fileRoute = router;
