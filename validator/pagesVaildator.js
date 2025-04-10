import Joi from "joi";

const objectIdPattern = /^[a-fA-F0-9]{24}$/;
const tempPageIdPattern = /^[a-z0-9]{5}-\d{13}$/;

// <-- Group -->

const addGroupValidator = (req, res, next) => {
  const addGroupSchema = Joi.array()
    .items(
      Joi.object({
        fileId: Joi.string()
          .trim()
          .required()
          .pattern(objectIdPattern)
          .messages({
            "any.required": "{#label} is required",
            "string.base": "{#label} must be string",
            "string.pattern.base": "{#label} must be valid objectId",
          }),
        tempPageId: Joi.string()
          .trim()
          .required()
          .pattern(tempPageIdPattern)
          .messages({
            "any.required": "{#label} is required",
            "string.base": "{#label} must be string",
            "string.pattern.base": "{#label} must be match pattern",
          }),
        pageName: Joi.string().trim().required().min(5).max(30).messages({
          "any.required": "{#label} is required",
          "string.base": "{#label} must be string",
          "string.min": "{#label} minimum {#limit} characters",
          "string.max": "{#label} maximum {#limit} characters",
        }),

        pageTitle: Joi.string().trim().required().min(5).max(20).messages({
          "any.required": "{#label} is required",
          "string.base": "{#label} must be string",
          "string.min": "{#label} minimum {#limit} characters",
          "string.max": "{#label} maximum {#limit} characters",
        }),
      }).messages({
        "object.base": "pages must be an array of object",
      })
    )
    .required()
    .min(1)
    .messages({
      "any.required": "pages is required",
      "array.base": "pages must be an array",
      "array.min": "pages should have a minimum length of {#limit}",
    })
    .custom((value, helpers) => {
      const tempPagesIds = value.map((page) => page.tempPageId);
      const uniqueTempPagesIds = new Set(tempPagesIds).size;

      if (tempPagesIds.length !== uniqueTempPagesIds) {
        return helpers.message("tempPageId must be unique");
      }

      return value;
    });

  const { pages } = req.body;

  const { error, value: pagesInfo } = addGroupSchema.validate(pages);

  if (!error) {
    req.pages = pagesInfo;
    next();
    return;
  }

  res
    .status(400)
    .json({ message: error.details[0].message.toString().replace(/"/g, "") });
};

const updateGroupValidator = (req, res, next) => {
  const updateGroupSchema = Joi.array()
    .items(
      Joi.object({
        pageId: Joi.string()
          .trim()
          .required()
          .pattern(objectIdPattern)
          .messages({
            "any.required": "{#label} is required",
            "string.base": "{#label} must be string",
            "string.pattern.base": "{#label} must be valid objectId",
          }),
        newPageName: Joi.string().trim().required().min(5).max(30).messages({
          "any.required": "{#label} is required",
          "string.base": "{#label} must be string",
          "string.min": "{#label} minimum {#limit} characters",
          "string.max": "{#label} maximum {#limit} characters",
        }),

        newPageTitle: Joi.string().trim().required().min(5).max(20).messages({
          "any.required": "{#label} is required",
          "string.base": "{#label} must be string",
          "string.min": "{#label} minimum {#limit} characters",
          "string.max": "{#label} maximum {#limit} characters",
        }),
      }).messages({
        "object.base": "pages must be an array of object",
      })
    )
    .required()
    .min(1)
    .messages({
      "any.required": "pages is required",
      "array.base": "pages must be an array",
      "array.min": "pages should have a minimum length of {#limit}",
    })
    .custom((value, helpers) => {
      const pagesIds = value.map((page) => page.pageId);
      const uniquePagesIds = new Set(pagesIds).size;

      if (pagesIds.length !== uniquePagesIds) {
        return helpers.message("pageId must be unique");
      }

      return value;
    });

  const { pages } = req.body;

  const { error, value: pagesInfo } = updateGroupSchema.validate(pages);

  if (!error) {
    req.pages = pagesInfo;
    next();
    return;
  }

  res
    .status(400)
    .json({ message: error.details[0].message.toString().replace(/"/g, "") });
};

const deleteGroupValidator = (req, res, next) => {
  const addGroupSchema = Joi.array()
    .items(
      Joi.object({
        pageId: Joi.string()
          .trim()
          .required()
          .pattern(objectIdPattern)
          .messages({
            "any.required": "{#label} is required",
            "string.base": "{#label} must be string",
            "string.pattern.base": "{#label} must be valid objectId",
          }),
      }).messages({
        "object.base": "pages must be an array of object",
      })
    )
    .required()
    .min(1)
    .messages({
      "any.required": "pages is required",
      "array.base": "pages must be an array",
      "array.min": "pages should have a minimum length of {#limit}",
    })
    .custom((value, helpers) => {
      const pagesIds = value.map((page) => page.pageId);
      const uniquepagesIds = new Set(pagesIds).size;

      if (pagesIds.length !== uniquepagesIds) {
        return helpers.message("pageId must be unique");
      }

      return value;
    });

  const { pages } = req.body;

  const { error, value: pagesInfo } = addGroupSchema.validate(pages);

  if (!error) {
    req.pages = pagesInfo;
    next();
    return;
  }

  res
    .status(400)
    .json({ message: error.details[0].message.toString().replace(/"/g, "") });
};

export const pagesValidator = {
  addGroupValidator,
  updateGroupValidator,
  deleteGroupValidator,
};
