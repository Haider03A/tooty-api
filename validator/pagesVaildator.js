import Joi from 'joi'

const getMultiByFileIdSchema = Joi.object({
    fileId: Joi.number()
        .required()

})

const getOneByFileIdAndPageIdSchema = Joi.object({
    fileId: Joi.number()
        .required(),
    pageId: Joi.number()
        .required(),

})

const addOneSchema = Joi.object({
    fileId: Joi.number()
        .required(),
    pageName: Joi.string()
        .trim()
        .required()
        .min(5)
        .max(13),
    pageTitle: Joi.string()
        .trim()
        .required()
        .min(5)
        .max(36)
})

const updateOneSchema = Joi.object({
    pageId: Joi.number()
        .required(),
    newPageName: Joi.string()
        .trim()
        .required()
        .min(5)
        .max(13),
    newPageTitle: Joi.string()
        .trim()
        .required()
        .min(5)
        .max(36)
})

const daleteOneSchema = Joi.object({
    fileId: Joi.number()
        .required(),
    pageId: Joi.number()
        .required(),
})

export const pagesValidator = { getMultiByFileIdSchema, getOneByFileIdAndPageIdSchema, addOneSchema, updateOneSchema, daleteOneSchema }