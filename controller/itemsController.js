import { itemQuery } from "../db/models/queries/itemsQuerie.js";

// Group

const addGroup = async (req, res) => {
  const items = req.items;
  const itemsInfo = items.map((item) => {
    return {
      pageId: item.pageId,
      tempItemId: item.tempItemId,
      itemName: item.itemName,
      itemCount: item.itemCount,
      note: item.note,
    };
  });

  try {
    const { statusCode, newItems, itemsNotCreated, itemsToCreated, message } =
      await itemQuery.addGroup(itemsInfo);
    res.status(statusCode).json({
      message,
      itemsCreated: newItems?.map((item, i) => {
        return {
          itemId: item._id,
          pageId: item.pageId,
          tempItemId: itemsToCreated[i].tempItemId,
          itemName: item.itemName,
          itemCount: item.itemCount,
          note: item.note,
        };
      }),
      itemsNotCreated: itemsNotCreated?.map((item) => {
        return {
          pageId: item.pageId,
          tempItemId: item.tempItemId,
          itemName: item.itemName,
          itemCount: item.itemCount,
          note: item.note,
        };
      }),
      statusCreatedItems: {
        itemsCreatedCount: itemsToCreated?.length,
        itemsNotCreatedCount: itemsNotCreated?.length,
        itemsSendedFromClientCount: items?.length,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).json({ message: error.message });
    return;
  }
};

const updateGroup = async (req, res) => {
  const items = req.items;

  try {
    const {
      statusCode,
      itemsToUpdate,
      itemsNotUpdated,
      statusUpdatesItems,
      message,
    } = await itemQuery.updateGroup(items);

    res.status(statusCode).json({
      itemsUpdated: itemsToUpdate?.map((item) => ({
        itemId: item.itemId,
        pageId: item.pageId,
        newItemName: item.newItemName,
        newItemCount: item.newItemCount,
        newNote: item.newNote,
      })),
      itemsNotUpdated,
      statusUpdatesItems: {
        itemsUpdatedCount: statusUpdatesItems?.modifiedCount,
        itemsNotUpdatedCount: itemsNotUpdated?.length,
        itemsSendedFromClientCount: items?.length,
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
  const items = req.items;

  try {
    const {
      statusCode,
      itemsDeleted,
      itemsIdsNotDeleted,
      statusDeletedItems,
      message,
    } = await itemQuery.deleteGroup(items);
    res.status(statusCode).json({
      itemsDeleted: itemsDeleted?.map((item) => {
        return {
          itemId: item.itemId,
          pageId: item.pageId,
          itemName: item.itemName,
          itemCount: item.itemCount,
          note: item.note,
        };
      }),
      pagesNotDeleted: itemsIdsNotDeleted.map((item) => {
        return {
          itemId: item.itemId,
        };
      }),
      statusDeleteItems: {
        itemsDeletedCount: statusDeletedItems?.deletedCount,
        itemsNotDeletedIds: itemsIdsNotDeleted?.length,
        itemsSendedFromClientCount: items?.length,
      },
      message,
    });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).json({ message: error.message });
    return;
  }
};

export const itemsController = {
  addGroup,
  updateGroup,
  deleteGroup,
};
