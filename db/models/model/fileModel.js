import mongoose, { Schema } from "mongoose";
import { PageModel } from "./pageModel.js";

const FileSchema = new Schema(
  {
    fileName: {
      type: String,
      required: true,
      length: 50,
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

FileSchema.pre("deleteMany", async function () {
  const filesIdsToDelete = this.getFilter()._id.$in;
  await PageModel.deleteMany({
    fileId: { $in: filesIdsToDelete },
  });
});

const nodelName = "File";

// create model
export const FileModel = mongoose.model(nodelName, FileSchema);
