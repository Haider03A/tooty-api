import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../../../../config.js";

import { UserModel } from "../../model/user/userModel.js";
import { generateRefreshToken } from "../../../../tools/generateRefreshToken.js";
import { generateAccessToken } from "../../../../tools/generateAccessToken.js";

const getAll = async () => {
  try {
    const files = await FileModel.fidnd({});

    return files;
  } catch (err) {
    console.log(err);
    throw { status: 500, message: "Error from server" };
  }
};

const loginUser = async (user) => {
  const { email, password } = user;
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return { message: "Email or password is incorrect", status: 401 };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return { message: "Email or password is incorrect", status: 401 };
    }

    user.refreshToken = generateRefreshToken({ id: user._id });
    await user.save();
    return { message: "User login successfully", status: 200, user: user };
  } catch (error) {
    throw { message: "Error from server", status: 500, error };
  }
};

const registerUser = async (user) => {
  try {
    const findToUser = await UserModel.findOne({ email: user.email });
    if (findToUser) {
      return { message: "Email already exists", status: 401 };
    }

    const newUser = new UserModel(user);
    newUser.refreshToken = generateRefreshToken({ id: newUser._id });
    await newUser.save();

    return { message: "User Created successfully", status: 201, user: newUser };
  } catch (error) {
    throw { message: "Error from server", status: 500 };
  }
};

const renewRefreshToken = async (refreshToken) => {
  try {
    const user = await UserModel.findOne({ refreshToken });

    if (!user) {
      return { message: "Invalid refresh token!", status: 401 };
    }

    user.refreshToken = generateRefreshToken({ id: user._id });
    user.accessToken = generateAccessToken({
      id: user._id,
      role: user.role,
      status: user.status,
    });
    await user.save();
    return { message: "Renew refresh token successfully", status: 200, user };
  } catch (error) {
    throw { message: "Error from server", status: 500, error };
  }
};

const updateOne = async (newUserInfo) => {
  const { userId, password } = newUserInfo;
  try {
    const filter = { _id: userId };
    const update = { password };
    const updatedUser = await UserModel.findOneAndUpdate(filter, update, {
      new: true,
    });

    return updatedUser;
  } catch (err) {
    throw err;
  }
};

const deleteOne = async (deleteFileInfo) => {
  const { fileId } = deleteFileInfo;
  try {
    const filter = { fileId };
    const updatedFileInfo = await FileModel.findOneAndDelete(filter, {
      new: true,
    });

    return updatedFileInfo;
  } catch (err) {
    throw err;
  }
};

export const userQuerie = { loginUser, registerUser, renewRefreshToken };
