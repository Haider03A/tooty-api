import { FileModel } from '../model/fileModel.js'


const getAll = async () => {
    try {
        const files = await FileModel.fidnd({})

        return files
    } catch (err) {
        throw err
    }

}

const getOne = async (filter) => {
    try {
        const oneFile = await FileModel.findOne(filter)

        return oneFile
    } catch (err) {
        throw err
    }

}

const addOne = async (fileInfo) => {
    try {
        const newFile = new FileModel(fileInfo);
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
        const updatedFileInfo = await FileModel.findOneAndUpdate(filter, update, { new: true })

        return updatedFileInfo
    } catch (err) {
        throw err

    }
}

const deleteOne = async (deleteFileInfo) => {
    const { fileId } = deleteFileInfo
    try {
        const filter = { fileId };
        const updatedFileInfo = await FileModel.findOneAndDelete(filter, { new: true })

        return updatedFileInfo
    } catch (err) {
        throw err
    }
}

const addMany = async (filesInfo) => {

    try {
        const newFile = await FileModel.insertMany(filesInfo)

        return newFile
    } catch (err) {
        throw err
    }

}


export const FilesQuery = {
    getAll,
    getOne,
    addOne,
    updateOne,
    deleteOne,
    addMany
}