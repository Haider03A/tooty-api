import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
    },
    role: {
      type: String,
      lowercase: true,
      enum: ["admin", "user", "moderator"],
      default: "user",
    },
    status: {
      type: String,
      lowercase: true,
      enum: ["active", "inactive", "banned"],
      default: "active",
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {

  if (!this.name && this.email) {
    this.name = this.email.split("@")[0];
  }

  if (!this.isModified("password")) return next();
  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

const modelName = "User";

// create model
export const UserModel = mongoose.model(modelName, userSchema);
