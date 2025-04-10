import { PagesQuery } from "../db/models/queries/pagesQuerie.js";

const addGroup = async (req, res) => {
  const pages = req.pages;
  const pagesInfo = pages.map((page) => {
    return {
      fileId: page.fileId,
      tempPageId: page.tempPageId,
      pageName: page.pageName,
      pageTitle: page.pageTitle,
    };
  });

  try {
    const { statusCode, newPages, pagesNotCreated, pagesToCreated, message } = await PagesQuery.addGroup(
      pagesInfo
    );
    res.status(statusCode).json({
      pagesCreated: newPages?.map((page, i) => {
        return {
          pageId: page._id,
          fileId: page.fileId,
          tempPageId: pagesToCreated[i].tempPageId,
          pageName: page.pageName,
          pageTitle: page.pageTitle,
        };
      }),
      pagesNotCreated: pagesNotCreated?.map((page) => {
        return {
          fileId: page.fileId,
          tempPageId: page.tempPageId,
          pageName: page.pageName,
          pageTitle: page.pageTitle,
        };
      }),
      statusCreatedPages: {
        pagesCreatedCount: pagesToCreated?.length,
        pagesNotCreatedCount: pagesNotCreated?.length,
        pagesSendedFromClientCount: pages?.length,
    },
      message,
    });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).json({ message: error.message });
    return;
  }
};

const updateGroup = async (req, res) => {
  const pages = req.pages;

  try {
    const {
      statusCode,
      pagesToUpdate,
      pagesNotUpdated,
      statusUpdatesPages,
      message,
    } = await PagesQuery.updateGroup(pages);

    res.status(statusCode).json({
      pagesUpdated: pagesToUpdate?.map((page) => ({
        pageId: page.pageId,
        newPageName: page.newPageName,
        newPageTitle: page.newPageTitle,
      })),
      pagesNotUpdated,
      statusUpdatesPages: {
        pagesUpdatedCount: statusUpdatesPages?.modifiedCount,
        pagesNotUpdatedCount: pagesNotUpdated?.length,
        pagesSendedFromClientCount: pages?.length,
        
      },
      message,
    });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).json({ message: error.message });
    return;
  }
};

const deleteGroup = async (req, res) => {
  const pages = req.pages;

  try {
    const {
      statusCode,
      pagesDeleted,
      pagesIdsNotDeleted,
      statusDeletedPages,
      message,
    } = await PagesQuery.deleteGroup(pages);
    res.status(statusCode).json({
      pagesDeleted: pagesDeleted?.map((page) => {
        return {
          fileId: page.fileId,
          pageId: page._id,
          pageName: page.pageName,
          pageTitle: page.pageTitle,
        };
      }),
      pagesNotDeleted: pagesIdsNotDeleted.map((page) => {
        return {
          pageId: page.pageId,
        };
      }),
      statusDeletePages: {
        pagesDeletedCount: statusDeletedPages?.deletedCount,
        pagesNotDeletedIds: pagesIdsNotDeleted?.length,
        pagesSendedFromClientCount: pages?.length,
      },
      message,
    });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).json({ message: error.message });
    return;
  }
}

export const pagesController = {
  addGroup,
  updateGroup,
  deleteGroup
};
