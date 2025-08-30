import Joi from "joi";

import { customJoi } from "./others/customJoi.js";

const objectIdPattern = /^[a-fA-F0-9]{24}$/;
const tempFileIdPattern = /^[a-zA-Z0-9]{9}-\d{13}$/;

// <-- Single -->

const getOneValidator = (req, res, next) => {
  const getOneSchema = Joi.object({
    fileId: Joi.string()
      .trim()
      .required()
      .pattern(objectIdPattern)
      .message("fileId must be string, required field, and match pattern"),
  });
  const { fileId } = req.params;
  const { error, value: fileInfo } = getOneSchema.validate({
    fileId,
  });

  if (!error) {
    req.fileInfo = fileInfo;
    next();
    return;
  }

  res
    .status(400)
    .json({ message: error.details[0].message.toString().replace(/"/g, "") });
};

const addOneValidator = (req, res, next) => {
  const addOneSchema = Joi.object({
    tempFileId: Joi.string()
      .trim()
      .required()
      .pattern(tempFileIdPattern)
      .message("tempFileId must be string, required field, and match pattern"),
    fileName: Joi.string()
      .trim()
      .required()
      .min(5)
      .max(50)
      .message(
        "fileName must be string, required field, minimum 5 characters and maximum 50 characters"
      ),
  });

  const { tempFileId, fileName } = req.body;
  const { error, value: fileInfo } = addOneSchema.validate({
    tempFileId,
    fileName,
  });

  if (!error) {
    req.fileInfo = fileInfo;
    next();
    return;
  }

  res
    .status(400)
    .json({ message: error.details[0].message.toString().replace(/"/g, "") });
};

const updateOneValidator = (req, res, next) => {
  const updateOneSchema = Joi.object({
    fileId: Joi.string()
      .required()
      .pattern(objectIdPattern)
      .message("fileId must be string, required field, and match pattern"),
    newFileName: Joi.string()
      .trim()
      .required()
      .min(5)
      .max(50)
      .message(
        "fileName must be string, required field, minimum 5 characters and maximum 50 characters"
      ),
  });

  const { fileId, newFileName } = req.body;
  const { error, value: fileInfo } = updateOneSchema.validate({
    fileId,
    newFileName,
  });

  if (!error) {
    req.fileInfo = fileInfo;
    next();
    return;
  }

  res
    .status(400)
    .json({ message: error.details[0].message.toString().replace(/"/g, "") });
};

const deleteOneValidator = (req, res, next) => {
  const daleteOneSchema = Joi.object({
    fileId: Joi.string()
      .trim()
      .required()
      .pattern(objectIdPattern)
      .message("fileId must be string, required field, and match pattern"),
  });

  const { fileId } = req.body;
  const { error, value: fileInfo } = daleteOneSchema.validate({
    fileId,
  });

  if (!error) {
    req.fileInfo = fileInfo;
    next();
    return;
  }

  res
    .status(400)
    .json({ message: error.details[0].message.toString().replace(/"/g, "") });
};

// <-- Group -->

const addGroupValidator = (req, res, next) => {
  const addGroupSchema = Joi.object({
    files: Joi.array()
      .items(
        Joi.object({
          tempFileId: customJoi.tempFileId().required(),
          fileName: Joi.string().trim().required().min(5).max(50).messages({
            "any.required": "{#label} is required",
            "string.base": "{#label} must be string",
            "string.min": "{#label} minimum {#limit} characters",
            "string.max": "{#label} maximum {#limit} characters",
          }),
        }).messages({
          "object.base": "{#label} must be an object",
        })
      )
      .required()
      .min(1)
      .messages({
        "array.required": "{#label} is required",
        "array.base": "{#label} must be an array",
        "array.min": "{#label} should have a minimum length of {#limit}",
      })
      .custom((value, helpers) => {
        const tempFilesIds = value.map((file) => file.tempFileId);
        const uniqueTempFilesIds = new Set(tempFilesIds).size;

        if (tempFilesIds.length !== uniqueTempFilesIds) {
          return helpers.message("tempFileId must be unique");
        }

        return value;
      }),
  })
    .required()
    .messages({
      "object.required": "{#label} is required",
      "object.base": "{#label} must be an object",
    });

  const { files } = req.body;

  const { error, value } = addGroupSchema.validate({ files });

  if (!error) {
    req.files = value.files;
    next();
    return;
  }

  res
    .status(400)
    .json({ message: error.details[0].message.toString().replace(/"/g, "") });
};

const updateGroupValidator = (req, res, next) => {
  const updateGroupSchema = Joi.object({
    files: Joi.array()
      .items(
        Joi.object({
          fileId: customJoi.objectId().required(),
          newFileName: Joi.string().trim().required().min(5).max(50).messages({
            "any.required": "{#label} is required",
            "string.base": "{#label} must be string",
            "string.min": "{#label} minimum {#limit} characters",
            "string.max": "{#label} maximum {#limit} characters",
          }),
        }).messages({
          "object.base": "{#label} must be an object",
        })
      )
      .required()
      .min(1)
      .messages({
        "array.required": "{#label} is required",
        "array.base": "{#label} must be an array",
        "array.min": "{#label} should have a minimum length of {#limit}",
      })
      .custom((value, helpers) => {
        const filesIds = value.map((file) => file.fileId);
        const uniqueFilesIds = new Set(filesIds).size;

        if (filesIds.length !== uniqueFilesIds) {
          return helpers.message("fileId must be unique");
        }

        return value;
      }),
  })
    .required()
    .messages({
      "object.required": "{#label} is required",
      "object.base": "{#label} must be an object",
    });

  const { files } = req.body;

  const { error, value } = updateGroupSchema.validate({ files });

  if (!error) {
    req.files = value.files;
    next();
    return;
  }

  res
    .status(400)
    .json({ message: error.details[0].message.toString().replace(/"/g, "") });
};

const deleteGroupValidator = (req, res, next) => {
  const addGroupSchema = Joi.object({
    files: Joi.array()
      .items(
        Joi.object({
          fileId: customJoi.objectId().required(),
        }).messages({
          "object.base": "{#label} must be an object",
        })
      )
      .required()
      .min(1)
      .messages({
        "array.required": "{#label} is required",
        "array.base": "{#label} must be an array",
        "array.min": "{#label} should have a minimum length of {#limit}",
      })
      .custom((value, helpers) => {
        const filesIds = value.map((file) => file.fileId);
        const uniqueFilesIds = new Set(filesIds).size;

        if (filesIds.length !== uniqueFilesIds) {
          return helpers.message("fileId must be unique");
        }

        return value;
      }),
  })
    .required()
    .messages({
      "object.required": "{#label} is required",
      "object.base": "{#label} must be an object",
    });

  const { files } = req.body;

  const { error, value } = addGroupSchema.validate({ files });

  if (!error) {
    req.files = value.files;
    next();
    return;
  }

  res
    .status(400)
    .json({ message: error.details[0].message.toString().replace(/"/g, "") });
};

export const filesValidator = {
  getOneValidator,
  addOneValidator,
  updateOneValidator,
  deleteOneValidator,
  addGroupValidator,
  updateGroupValidator,
  deleteGroupValidator,
};
