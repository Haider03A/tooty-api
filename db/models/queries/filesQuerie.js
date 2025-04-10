import _ from "mongoose-sequence";
import { FileModel } from "../model/fileModel.js";

// <-- Single -->

const getAll = async () => {
  try {
    const files = await FileModel.find({});

    return files;
  } catch (err) {
    console.log(err);
    throw { statusCode: 500, message: "Error from server" };
  }
};

const getOne = async (filter) => {
  try {
    const file = await FileModel.findOne(filter);
    if (!file) {
      return { statusCode: 404, message: "File is undefined" };
    }
    return { statusCode: 200, message: "Ok", file };
  } catch (error) {
    throw { statusCode: 500, message: "Error from server", error };
  }
};

const addOne = async (fileInfo) => {
  try {
    const newFile = new FileModel(fileInfo);
    await newFile.save();

    return { statusCode: 200, message: "Ok", newFile };
  } catch (error) {
    throw { statusCode: 500, message: "Error from server", error };
  }
};

const updateOne = async (fileInfo) => {
  const { fileId, newFileName } = fileInfo;
  try {
    const filter = { _id: fileId };
    const update = { fileName: newFileName };
    const updatedFile = await FileModel.findOneAndUpdate(filter, update, {
      new: true,
    });

    if (!updatedFile) {
      return { statusCode: 404, message: "File is undefined to update" };
    }

    return { statusCode: 200, message: "Ok", updatedFile };
  } catch (error) {
    throw { statusCode: 500, message: "Error from server", error };
  }
};

const deleteOne = async (fileInfo) => {
  const { fileId } = fileInfo;
  try {
    const filter = { _id: fileId };
    const deletedFileInfo = await FileModel.findOneAndDelete(filter, {
      new: true,
    });

    if (!deletedFileInfo) {
      return { statusCode: 404, message: "File is undefined to delete" };
    }

    return { statusCode: 200, message: "Ok", deletedFileInfo };
  } catch (error) {
    throw { statusCode: 500, message: "Error from server", error };
  }
};

// <-- Group -->

const addGroup = async (filesInfo) => {
  try {
    const filesCreated = await FileModel.insertMany(filesInfo);

    return { statusCode: 200, message: "Ok", filesCreated };
  } catch (error) {
    throw { statusCode: 500, message: "Error from server", error };
  }
};

const updateGroup = async (filesInfo) => {
  try {
    const clindFilesIds = filesInfo.map((file) => file.fileId);

    const dbFilesIsFound = await FileModel.find({
      _id: { $in: clindFilesIds },
    });

    if (dbFilesIsFound.length === 0) {
      const filesNotUpdated = filesInfo;
      return {
        statusCode: 404,
        filesNotUpdated,
        message: "All filesIds are not found to update",
      };
    }
    const dbFilesIds = dbFilesIsFound.map((file) => file._id.toString());

    const filesNotUpdated = filesInfo.filter(
      (file) => !dbFilesIds.includes(file.fileId)
    );

    const filesToUpdate = filesInfo.filter((file) =>
      dbFilesIds.includes(file.fileId)
    );

    const bulkOps = filesToUpdate.map((file) => ({
      updateOne: {
        filter: { _id: file.fileId },
        update: { $set: { fileName: file.newFileName } },
      },
    }));

    const statusUpdatesFiles = await FileModel.bulkWrite(bulkOps);

    if (filesNotUpdated.length > 0) {
      return {
        statusCode: 207,
        filesToUpdate,
        filesNotUpdated,
        statusUpdatesFiles,
        message: "Ok, but some files are not updated",
      };
    }

    return {
      statusCode: 200,
      filesToUpdate,
      filesNotUpdated,
      statusUpdatesFiles,
      message: "Ok",
    };
  } catch (error) {
    throw { statusCode: 500, message: "Error from server", error };
  }
};

const deleteGroup = async (filesInfo) => {
  try {
    const clindFilesIds = filesInfo.map((files) => files.fileId);

    const dbFilesIsFound = await FileModel.find({
      _id: { $in: clindFilesIds },
    });

    if (dbFilesIsFound.length === 0) {
      const filesIdsNotDeleted = filesInfo;
      return {
        statusCode: 404,
        filesIdsNotDeleted,
        message: "All filesIds are not found to delete",
      };
    }

    const dbFilesIds = dbFilesIsFound.map((file) => file._id.toString());

    const filesIdsNotDeleted = clindFilesIds.filter(
      (file) => !dbFilesIds?.includes(file)
    );

    const filesToDelete = dbFilesIsFound.filter((file) =>
      dbFilesIds?.includes(file._id.toString())
    );
    const filesIdsTtoDelete = filesToDelete.map((file) => file._id.toString());

    const statusDeletedFiles = await FileModel.deleteMany({
      _id: { $in: filesIdsTtoDelete },
    });

    if (filesIdsNotDeleted.length > 0) {
      return {
        statusCode: 207,
        filesIdsNotDeleted,
        filesToDelete,
        statusDeletedFiles,
        message: "Ok, but some files are not deleted",
      };
    }

    return {
      statusCode: 200,
      filesIdsNotDeleted,
      filesToDelete,
      statusDeletedFiles,
      message: "Ok",
    };
  } catch (error) {
    throw { statusCode: 500, message: "Error from server", error };
  }
};

export const FilesQuery = {
  getAll,
  getOne,
  addOne,
  updateOne,
  deleteOne,
  addGroup,
  updateGroup,
  deleteGroup,
};
