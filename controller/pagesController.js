import { PagesQuery } from '../db/models/queries/pagesQuerie.js'
import { FilesQuery } from '../db/models/queries/filesQuerie.js'

import { pagesValidator } from '../validator/pagesVaildator.js'


const getAll = async (req, res) => {
    try {
        const pages = await PagesQuery.getAll()
        res.status(200).json(pages);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Error from server' })
    }
}

const getMultiByFileId = async (req, res) => {
    const { fileId } = req.params
    const { error, value: pageInfo } = pagesValidator.getMultiByFileIdSchema.validate({ fileId })
    if (!error) {
        try {
            const pages = await PagesQuery.getFilter(pageInfo)
            if (pages.length > 0) {
                res.status(200).json(pages);

                return
            }
            res.status(400).json({ message: 'File Id is not defined' });
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'Error from server' })
        }
        return
    }
    res.status(400).json({ message: error.details[0].message })
}

const getOneByFileIdAndPageId = async (req, res) => {
    const { fileId, pageId } = req.params
    const { error, value: pageInfo } = pagesValidator.getOneByFileIdAndPageIdSchema.validate({ fileId, pageId })
    if (!error) {
        try {
            const onePage = await PagesQuery.getOne(pageInfo)
            if (onePage) {
                res.status(200).json(onePage);

                return
            }
            res.status(400).json({ message: 'File Id or Page Id is not defined' });
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'Error from server' })
        }
        return
    }
    res.status(400).json({ message: error.details[0].message })
}

const addOne = async (req, res) => {
    const { fileId } = req.params
    const { pageName, pageTitle } = req.body

    const { error, value: pageInformation } = pagesValidator.addOneSchema.validate({ fileId, pageName, pageTitle })

    if (!error) {
        try {
            const fileInfo = await FilesQuery.getOne({ fileId: pageInformation.fileId })
            if (fileInfo) {
                try {
                    const pageInfo = await PagesQuery.addOne(pageInformation)
                    res.status(200).json(pageInfo)
                } catch (err) {
                    res.status(500).json({ message: 'Error from server' })
                }

                return
            }
            res.status(400).json({ message: 'File Id is not defined' })
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Error from server' })
        }

        return
    }
    res.status(400).json({ message: error.details[0].message })
}

const deleteOneByFileIdAndPageId = async (req, res) => {
    const { fileId, pageId } = req.params
    const { error, value: deletePageInfo } = pagesValidator.daleteOneSchema.validate({ fileId, pageId })

    if (!error) {
        try {
            const deletedPageInfo = await PagesQuery.deleteOne(deletePageInfo)
            deletedPageInfo ? res.status(200).json(deletedPageInfo) : res.status(400).json({ message: 'File Id or Page Id is not defined' })
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'Error from server' })
        }

        return
    }
    res.status(400).json({ message: error.details[0].message })
}


export const pagesController = {
    getAll,
    getMultiByFileId,
    getOneByFileIdAndPageId,
    addOne,
    deleteOneByFileIdAndPageId

} 