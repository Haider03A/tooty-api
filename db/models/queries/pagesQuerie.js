import { PageModel } from '../model/pageModel'

const getAll = async () => {
    try {
        const pages = await PageModel.find({})

        return pages
    } catch (err) {
        throw err
    }

}

const getFilter = async (filter) => {
    try {
        const pages = await PageModel.find(filter)

        return pages
    } catch (err) {
        throw err
    }

}

const getOne = async (filter) => {
    try {
        const onePage = await PageModel.findOne(filter)

        return onePage
    } catch (err) {
        throw err
    }

}

const addOne = async (pageInfo) => {
    try {
        const newPages = new PageModel(pageInfo);
        await newPages.save()

        return newPages
    } catch (err) {
        throw err
    }

}

const updateOne = async (newPageInfo) => {
    const { pageId, newPageName, newPageTitle } = newPageInfo
    try {
        const filter = { pageId };
        const update = { pageName: newPageName, pageTitle: newPageTitle };
        const updatedPageInfo = await PageModel.findOneAndUpdate(filter, update, { new: true })

        return updatedPageInfo
    } catch (err) {
        throw err

    }
}

const deleteOne = async (deletePageInfo) => {
    const { pageId } = deletePageInfo
    try {
        const filter = { pageId };
        const deletedPageInfo = await PageModel.findOneAndDelete(filter, { new: true })

        return deletedPageInfo
    } catch (err) {
        throw err
    }
}

const deleteMulti = async (deletePagesInfo) => {
    const { fileId } = deletePagesInfo
    try {
        const filter = { fileId };
        const deletedPagesInfo = await PageModel.deleteMany(filter)

        return deletedPagesInfo
    } catch (err) {
        throw err
    }
}

export const PagesQuery = {
    getAll,
    getFilter,
    getOne,
    addOne,
    updateOne,
    deleteMulti,
    deleteOne
}