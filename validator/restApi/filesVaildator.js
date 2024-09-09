import Joi from 'joi'

const getOneSchema = Joi.object({
    fileId: Joi.string()
        .required()
        .pattern(/^[a-zA-Z0-9]{9}-\d{13}$/),
})

const addOneSchema = Joi.object({
    fileId: Joi.string()
        .required()
        .pattern(/^[a-zA-Z0-9]{9}-\d{13}$/),
    fileName: Joi.string()
        .trim()
        .required()
        .min(5)
        .max(50)
})

const updateOneSchema = Joi.object({
    fileId: Joi.string()
        .required()
        .pattern(/^[a-zA-Z0-9]{9}-\d{13}$/),
    newFileName: Joi.string()
        .trim()
        .required()
        .min(5)
        .max(50)
})

const daleteOneSchema = Joi.object({
    fileId: Joi.string()
        .required()
        .pattern(/^[a-zA-Z0-9]{9}-\d{13}$/),
})

const addMany = Joi.array().items(Joi.object({
    fileId: Joi.string()
        .required()
        .pattern(/^[a-zA-Z0-9]{9}-\d{13}$/),
    fileName: Joi.string()
        .trim()
        .required()
        .min(5)
        .max(50)
}))

export const filesValidator = { getOneSchema, addOneSchema, updateOneSchema, daleteOneSchema, addMany }