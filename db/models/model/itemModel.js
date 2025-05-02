import mongoose, { Schema } from "mongoose";

const ItemSchema = new Schema(
  {
    pageId: {
      type: Schema.Types.ObjectId,
      ref: "Page",
      required: true,
    },
    itemName: {
      type: String,
      required: true,
      length: 30,
    },
    itemCount: {
      type: Number,
      required: true,
      min: 0,
      max: 1000,
      default: 0,
    },
    note: {
      type: String,
      length: 50,
      trim: true,
      default: "",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const nodelName = "Item";

// create model
export const ItemModel = mongoose.model(nodelName, ItemSchema);
