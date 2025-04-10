import { ItemModel } from "../model/itemModel.js";
import { PageModel } from "../model/pageModel.js";

// Group

const addGroup = async (itemsInfo) => {
  try {
    const pagesId = itemsInfo.map((item) => item.pageId);
    const pagesIdsFound = await PageModel.find({ _id: { $in: pagesId } });
    if (pagesIdsFound.length === 0) {
      const itemsNotCreated = itemsInfo;
      return {
        statusCode: 404,
        itemsNotCreated,
        message: "All pageId not found to create items",
      };
    }
    const pageIds = pagesIdsFound.map((page) => page._id.toString());
    const itemsNotCreated = itemsInfo.filter(
      (item) => !pageIds.includes(item.pageId)
    );
    const itemsToCreated = itemsInfo.filter((item) =>
      pageIds.includes(item.pageId)
    );

    const newItems = await ItemModel.insertMany(itemsToCreated);

    if (itemsNotCreated.length > 0) {
      return {
        statusCode: 207,
        newItems,
        itemsNotCreated,
        itemsToCreated,
        message: "Ok, but some items are not created",
      };
    }

    return {
      statusCode: 200,
      message: "Ok",
      newItems,
      itemsNotCreated,
      itemsToCreated,
    };
  } catch (error) {
    throw { statusCode: 500, message: "Error from server", error };
  }
};

const updateGroup = async (itemsInfo) => {
  try {
    const clindItemsIds = itemsInfo.map((item) => item.itemId);

    const dbItemsIsFound = await ItemModel.find({
      _id: { $in: clindItemsIds },
    });

    if (dbItemsIsFound.length === 0) {
      const itemsNotUpdated = itemsInfo;
      return {
        statusCode: 404,
        itemsNotUpdated,
        message: "All itemsIds are not found to update",
      };
    }
    const dbItemsIds = dbItemsIsFound.map((item) => item._id.toString());

    const itemsNotUpdated = itemsInfo.filter(
      (item) => !dbItemsIds.includes(item.itemId)
    );

    const itemsToUpdate = itemsInfo.filter((item) =>
      dbItemsIds.includes(item.itemId)
    );

    const bulkOps = itemsToUpdate.map((item) => ({
      updateOne: {
        filter: { _id: item.itemId },
        update: {
          $set: {
            itemName: item.itemName,
            itemCount: item.itemCount,
            note: item.note,
          },
        },
      },
    }));

    const statusUpdatesItems = await ItemModel.bulkWrite(bulkOps);

    if (itemsNotUpdated.length > 0) {
      return {
        statusCode: 207,
        itemsToUpdate,
        itemsNotUpdated,
        statusUpdatesItems,
        message: "Ok, but some items are not updated",
      };
    }

    return {
      statusCode: 200,
      itemsToUpdate,
      itemsNotUpdated,
      statusUpdatesItems,
      message: "Ok",
    };
  } catch (error) {
    throw { statusCode: 500, message: "Error from server", error };
  }
};

const deleteGroup = async (itemsInfo) => {
  try {
    const clindItemsIds = itemsInfo.map((item) => item.itemId);

    const dbItemsIsFound = await ItemModel.find({
      _id: { $in: clindItemsIds },
    });

    if (dbItemsIsFound.length === 0) {
      const itemsIdsNotDeleted = itemsInfo;
      return {
        statusCode: 404,
        itemsIdsNotDeleted,
        message: "All itemsId are not found to delete",
      };
    }

    const dbItemsIds = dbItemsIsFound.map((item) => item._id.toString());

    const itemsIdsNotDeleted = clindItemsIds.filter(
      (item) => !dbItemsIds?.includes(item)
    );

    const itemsDeleted = dbItemsIsFound.filter((item) =>
      dbItemsIds?.includes(item._id.toString())
    );
    const itemsIdsToDelete = itemsDeleted.map((item) => item._id.toString());

    const statusDeletedItems = await ItemModel.deleteMany({
      _id: { $in: itemsIdsToDelete },
    });

    if (itemsIdsNotDeleted.length > 0) {
      return {
        statusCode: 207,
        itemsIdsNotDeleted,
        itemsDeleted,
        statusDeletedItems,
        message: "Ok, but some Items are not deleted",
      };
    }

    return {
      statusCode: 200,
      itemsIdsNotDeleted,
      itemsDeleted,
      statusDeletedItems,
      message: "Ok",
    };
  } catch (error) {
    throw { statusCode: 500, message: "Error from server", error };
  }
};

export const itemQuery = {
  addGroup,
  updateGroup,
  deleteGroup,
};
