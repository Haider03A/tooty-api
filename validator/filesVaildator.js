import Joi from 'joi'

const getOneSchema = Joi.object({
    fileId: Joi.number()
    .required(),
})

const addOneSchema = Joi.object({
    fileName: Joi.string()
    .trim()
    .required()
    .min(5)
    .max(50)
})

const updateOneSchema = Joi.object({
    fileId: Joi.number()
    .required(),
    newFileName: Joi.string()
    .trim()
    .required()
    .min(5)
    .max(50)
})

const daleteOneSchema = Joi.object({
    fileId: Joi.number()
    .required()
})

export const filesValidator = {getOneSchema, addOneSchema, updateOneSchema, daleteOneSchema}