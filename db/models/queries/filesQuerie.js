import { FileSchema } from '../schema/fileSchema.js'


const getAll = async () => {
    try {
        const files = await FileSchema.find({})

        return files
    } catch (err) {
        throw err
    }

}

const getOne = async (filter) => {
    try {
        const oneFile = await FileSchema.findOne(filter)

        return oneFile
    } catch (err) {
        throw err
    }

}

const addOne = async (fileInfo) => {
    try {
        const newFile = new FileSchema(fileInfo);
        await newFile.save()

        return newFile
    } catch (err) {
        throw err
    }

}

const updateOne = async (newFileInfo) => {
    const { fileId, newFileName } = newFileInfo
    try {
        const filter = { fileId };
        const update = { fileName: newFileName };
        const updatedFileInfo = await FileSchema.findOneAndUpdate(filter, update, { new: true })

        return updatedFileInfo
    } catch (err) {
        throw err

    }
}

const deleteOne = async (deleteFileInfo) => {
    const { fileId } = deleteFileInfo
    try {
        const filter = { fileId };
        const updatedFileInfo = await FileSchema.findOneAndDelete(filter, { new: true })
        
        return updatedFileInfo
    } catch (err) {
        throw err
    }
}



export const FilesQuery = {
    getAll,
    getOne,
    addOne,
    updateOne,
    deleteOne
}