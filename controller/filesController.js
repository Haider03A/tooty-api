import { FilesQuery } from '../db/models/queries/filesQuerie.js'
import { PagesQuery } from '../db/models/queries/pagesQuerie.js'

import { filesValidator } from '../validator/filesVaildator.js'

const getAll = async (req, res) => {
    try {
        const allFiles = await FilesQuery.getAll()
        res.status(200).json(allFiles);
    } catch (err) {
        res.status(500).json({ message: 'Error from server' })
    }

}

const getOne = async (req, res) => {
    const { fileId } = req.params
    const { error, value: fileInfo } = filesValidator.getOneSchema.validate({ fileId })

    if (!error) {
        try {
            const oneFile = await FilesQuery.getOne(fileInfo)
            if (oneFile) {
                res.status(200).json(oneFile);

                return
            }
            res.status(400).json({ message: 'File Id is not defined' });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Error from server' })
        }
        
        return
    }
    res.status(400).json({ message: error.details[0].message })
}

const addOne = async (req, res) => {
    const { fileName } = req.body
    const { error, value: fileInforaiton } = filesValidator.addOneSchema.validate({ fileName })

    if (!error) {
        try {
            const fileInfo = await FilesQuery.addOne(fileInforaiton)
            res.status(200).json(fileInfo)
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'Error from server' })
        }

        return
    }
    res.status(400).json({ message: error.details[0].message })

}

const updateOne = async (req, res) => {
    const { fileId } = req.params
    const { newFileName } = req.query
    const { error, value: newFileInfo } = filesValidator.updateOneSchema.validate({ fileId, newFileName })

    if (!error) {
        try {
            const updatedFileInfo = await FilesQuery.updateOne(newFileInfo)
            if (updatedFileInfo) {
                res.status(200).json(updatedFileInfo)

                return
            }
            res.status(400).json({ message: 'File Id is not defined' })
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'Error from server' })
        }
        
        return
    }
    res.status(400).json({ message: error.details[0].message })

}

const deleteOne = async (req, res) => {
    const { fileId } = req.params
    const { error, value: deleteFileInfo } = filesValidator.daleteOneSchema.validate({ fileId })

    if (!error) {
        try {
            const deletedFileInfo = await FilesQuery.deleteOne(deleteFileInfo)
            if (deletedFileInfo) {
                res.status(200).json(deletedFileInfo)
                try {
                    await PagesQuery.deleteMulti(deleteFileInfo)
                } catch (err) {
                    console.log(err);
                }
                return
            }
            res.status(400).json({ message: 'File Id is not defined' })
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'Error from server' })
        }

        return
    }
    res.status(400).json({ message: error.details[0].message })
}



export const filesController = {
    getAll,
    getOne,
    addOne,
    updateOne,
    deleteOne

} 