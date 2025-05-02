import mongoose, { Schema } from "mongoose";
import { ItemModel } from "./itemModel.js";

const PageSchema = new Schema(
  {
    fileId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "File",
    },
    pageName: {
      type: String,
      required: true,
    },
    pageTitle: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

PageSchema.pre("deleteMany", async function () {
  const pagesDeleted = await this.model.find(this.getFilter());
  const pagesIdsDeleted = pagesDeleted.map((page) => page._id.toString());
  await ItemModel.deleteMany({
    pageId: { $in: pagesIdsDeleted },
  });
});

const nodelName = "Page";
// create model
export const PageModel = mongoose.model(nodelName, PageSchema);
