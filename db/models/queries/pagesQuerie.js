import { PageModel } from "../model/pageModel.js";
import { FileModel } from "../model/fileModel.js";

// Group

const addGroup = async (pagesInfo, user) => {
  try {
    const userId = user.id;

    const filesId = pagesInfo.map((page) => page.fileId);
    const fileIsFound = await FileModel.find({
      _id: { $in: filesId },
      userId,
    });
    if (fileIsFound.length === 0) {
      const pagesNotCreated = pagesInfo;
      return {
        statusCode: 404,
        pagesNotCreated,
        message: "All fileId not found to create pages",
      };
    }
    const fileIds = fileIsFound.map((file) => file._id.toString());
    const pagesNotCreated = pagesInfo.filter(
      (page) => !fileIds.includes(page.fileId)
    );
    const pagesToCreated = pagesInfo.filter((page) =>
      fileIds.includes(page.fileId)
    );

    const newPages = await PageModel.insertMany(pagesToCreated);

    if (pagesNotCreated.length > 0) {
      return {
        statusCode: 207,
        newPages,
        pagesNotCreated,
        pagesToCreated,
        message: "Ok, but some pages are not created",
      };
    }

    return {
      statusCode: 200,
      message: "Ok",
      newPages,
      pagesNotCreated,
      pagesToCreated,
    };
  } catch (error) {
    throw { statusCode: 500, message: "Error from server", error };
  }
};

const updateGroup = async (pagesInfo, user) => {
  try {
    const userId = user.id;
    const clindPagesIds = pagesInfo.map((page) => page.pageId);

    const dbPagesIsFound = await PageModel.find({
      _id: { $in: clindPagesIds },
      userId,
    });

    if (dbPagesIsFound.length === 0) {
      const pagesNotUpdated = pagesInfo;
      return {
        statusCode: 404,
        pagesNotUpdated,
        message: "All pagesIds are not found to update",
      };
    }
    const dbPagesIds = dbPagesIsFound.map((page) => page._id.toString());

    const pagesNotUpdated = pagesInfo.filter(
      (page) => !dbPagesIds.includes(page.pageId)
    );

    const pagesToUpdate = pagesInfo.filter((page) =>
      dbPagesIds.includes(page.pageId)
    );

    const bulkOps = pagesToUpdate.map((page) => ({
      updateOne: {
        filter: { _id: page.pageId },
        update: {
          $set: { pageName: page.newPageName, pageTitle: page.newPageTitle },
        },
      },
    }));

    const statusUpdatesPages = await PageModel.bulkWrite(bulkOps);

    if (pagesNotUpdated.length > 0) {
      return {
        statusCode: 207,
        pagesToUpdate,
        pagesNotUpdated,
        statusUpdatesPages,
        message: "Ok, but some pages are not updated",
      };
    }

    return {
      statusCode: 200,
      pagesToUpdate,
      pagesNotUpdated,
      statusUpdatesPages,
      message: "Ok",
    };
  } catch (error) {
    throw { statusCode: 500, message: "Error from server", error };
  }
};

const deleteGroup = async (pagesInfo, user) => {
  try {
    const userId = user.id;
    const clindPagesIds = pagesInfo.map((page) => page.pageId);

    const dbPagesIsFound = await PageModel.find({
      _id: { $in: clindPagesIds },
      userId,
    });

    if (dbPagesIsFound.length === 0) {
      const pagesIdsNotDeleted = pagesInfo.map((page) => page.pageId);
      return {
        statusCode: 404,
        pagesIdsNotDeleted,
        message: "All pagesIds are not found to delete",
      };
    }

    const dbPagesIds = dbPagesIsFound.map((page) => page._id.toString());

    const pagesIdsNotDeleted = clindPagesIds.filter(
      (page) => !dbPagesIds?.includes(page)
    );

    const pagesDeleted = dbPagesIsFound.filter((page) =>
      dbPagesIds?.includes(page._id.toString())
    );
    const pagesIdsToDelete = pagesDeleted.map((page) => page._id.toString());

    const statusDeletedPages = await PageModel.deleteMany({
      _id: { $in: pagesIdsToDelete },
    });

    if (pagesIdsNotDeleted.length > 0) {
      return {
        statusCode: 207,
        pagesIdsNotDeleted,
        pagesDeleted,
        statusDeletedPages,
        message: "Ok, but some Pages are not deleted",
      };
    }

    return {
      statusCode: 200,
      pagesIdsNotDeleted,
      pagesDeleted,
      statusDeletedPages,
      message: "Ok",
    };
  } catch (error) {
    throw { statusCode: 500, message: "Error from server", error };
  }
};

export const PagesQuery = {
  addGroup,
  updateGroup,
  deleteGroup,
};
