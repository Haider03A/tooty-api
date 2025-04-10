import mongoose, { Schema } from "mongoose";

const FileSchema = new Schema(
  {
    fileName: {
      type: String,
      required: true,
      length: 50,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const nodelName = "File";

// create model
export const FileModel = mongoose.model(nodelName, FileSchema);
