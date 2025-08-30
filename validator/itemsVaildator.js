import Joi from "joi";

import { customJoi } from "./others/customJoi.js";

// <-- Group -->

const addGroupValidator = (req, res, next) => {
  const addGroupSchema = Joi.object({
    items: Joi.array()
      .items(
        Joi.object({
          pageId: customJoi.objectId().required(),
          tempItemId: customJoi.tempItemId().required(),
          itemName: Joi.string().trim().required().min(5).max(30).messages({
            "string.required": "{#label} is required",
            "string.base": "{#label} must be string",
            "string.min": "{#label} minimum {#limit} characters",
            "string.max": "{#label} maximum {#limit} characters",
          }),
          itemCount: Joi.number()
            .required()
            .default(0)
            .min(0)
            .max(1000)
            .messages({
              "number.required": "{#label} is required",
              "number.base": "{#label} must be number",
              "number.min": "{#label} minimum {#limit} numbers",
              "number.max": "{#label} maximum {#limit} numbers",
            }),
          note: Joi.string().trim().allow("").max(50).messages({
            "string.base": "{#label} must be string",
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
        const tempItemssIds = value.map((item) => item.tempItemId);
        const uniqueTempItemssIds = new Set(tempItemssIds).size;

        if (tempItemssIds.length !== uniqueTempItemssIds) {
          return helpers.message("tempItemsId must be unique");
        }

        return value;
      }),
  })
    .required()
    .messages({
      "object.required": "{#label} is required",
      "object.base": "{#label} must be an object",
    });

  const { items } = req.body;

  const { error, value } = addGroupSchema.validate({ items });

  if (!error) {
    req.items = value.items;
    next();
    return;
  }

  res
    .status(400)
    .json({ message: error.details[0].message.toString().replace(/"/g, "") });
};

const updateGroupValidator = (req, res, next) => {
  const updateGroupSchema = Joi.object({
    items: Joi.array()
      .items(
        Joi.object({
          itemId: customJoi.objectId().required(),
          newItemName: Joi.string().trim().required().min(5).max(30).messages({
            "string.required": "{#label} is required",
            "string.base": "{#label} must be string",
            "string.min": "{#label} minimum {#limit} characters",
            "string.max": "{#label} maximum {#limit} characters",
          }),
          newItemCount: Joi.number().required().min(0).max(1000).messages({
            "number.required": "{#label} is required",
            "number.base": "{#label} must be number",
            "number.min": "{#label} minimum {#limit} numbers",
            "number.max": "{#label} maximum {#limit} numbers",
          }),
          newNote: Joi.string().trim().allow("").max(50).messages({
            "string.base": "{#label} must be string",
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
        const itemsIds = value.map((item) => item.itemId);
        const uniqueitemsIds = new Set(itemsIds).size;

        if (itemsIds.length !== uniqueitemsIds) {
          return helpers.message("itemId must be unique");
        }

        return value;
      }),
  })
    .required()
    .messages({
      "object.required": "{#label} is required",
      "object.base": "{#label} must be an object",
    });

  const { items } = req.body;

  const { error, value } = updateGroupSchema.validate({ items });

  if (!error) {
    req.items = value.items;
    next();
    return;
  }

  res
    .status(400)
    .json({ message: error.details[0].message.toString().replace(/"/g, "") });
};

const deleteGroupValidator = (req, res, next) => {
  const addGroupSchema = Joi.object({
    items: Joi.array()
      .items(
        Joi.object({
          itemId: customJoi.objectId().required(),
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
        const itemsId = value.map((item) => item.itemId);
        const uniqueitemsId = new Set(itemsId).size;

        if (itemsId.length !== uniqueitemsId) {
          return helpers.message("itemId must be unique");
        }

        return value;
      }),
  })
    .required()
    .messages({
      "object.required": "{#label} is required",
      "object.base": "{#label} must be an object",
    });

  const { items } = req.body;

  const { error, value } = addGroupSchema.validate({ items });

  if (!error) {
    req.items = value.items;
    next();
    return;
  }

  res
    .status(400)
    .json({ message: error.details[0].message.toString().replace(/"/g, "") });
};

export const itemsValidator = {
  addGroupValidator,
  updateGroupValidator,
  deleteGroupValidator,
};
