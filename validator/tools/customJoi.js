import Joi from "joi";
import mongoose from "mongoose";

const tempFileIdPattern = /^[a-zA-Z0-9]{9}-\d{13}$/;
const tempPageIdPattern = /^[a-zA-Z0-9]{9}-\d{13}$/;
const tempItemIdPattern = /^[a-zA-Z0-9]{9}-\d{13}$/;

const objectIdExtend = (joi) => ({
  type: "objectId",
  base: joi.string().trim(),
  messages: {
    "objectId.required": "{#label} is required",
    "objectId.base": "{#label} must be a valid objectId",
    "string.base": "{#label} must be a string",
  },
  validate(value, helpers) {
    if (!mongoose.isValidObjectId(value)) {
      return { value, errors: helpers.error("objectId.base") };
    }
    return { value };
  },
});

const tempFileIdExtend = (joi) => ({
  type: "tempFileId",
  base: joi.string().trim(),
  messages: {
    "tempFileId.required": "{#label} is required",
    "tempFileId.base": "{#label} must be a valid tempFileId",
    "string.base": "{#label} must be a string",
  },
  validate(value, helpers) {
    if (!tempFileIdPattern.test(value)) {
      return { value, errors: helpers.error("tempFileId.base") };
    }
    return { value };
  },
});

const tempPageIdExtend = (joi) => ({
  type: "tempPageId",
  base: joi.string().trim(),
  messages: {
    "tempPageId.required": "{#label} is required",
    "tempPageId.base": "{#label} must be a valid tempPageId",
    "string.base": "{#label} must be a string",
  },
  validate(value, helpers) {
    if (!tempPageIdPattern.test(value)) {
      return { value, errors: helpers.error("tempPageId.base") };
    }
    return { value };
  },
});

const tempItemIdExtend = (joi) => ({
  type: "tempItemId",
  base: joi.string().trim(),
  messages: {
    "tempItemId.required": "{#label} is required",
    "tempItemId.base": "{#label} must be a valid tempItemId",
    "string.base": "{#label} must be a string",
  },
  validate(value, helpers) {
    if (!tempItemIdPattern.test(value)) {
      return { value, errors: helpers.error("tempItemId.base") };
    }
    return { value };
  },
});

export const customJoi = Joi.extend(
  objectIdExtend,
  tempFileIdExtend,
  tempPageIdExtend,
  tempItemIdExtend
);
