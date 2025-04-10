import mongoose, { Schema } from "mongoose";

const schema = new Schema(
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
    // userId: {
    //   type: String,
    //   default: "3612",
    // },
  },
  { timestamps: true, versionKey: false }
);

// schema.pre(/^find/, function (next) {
//   this.where({ userId: "3612" });
//   next();
// });
const nodelName = "Page";
// create model
export const PageModel = mongoose.model(nodelName, schema);
