import { FilesQuery } from "../db/models/queries/filesQuerie.js";

// <-- Single -->

const getOne = async (req, res) => {
  const { fileId } = req.fileInfo;
  try {
    const { statusCode, file, message } = await FilesQuery.getOne({
      _id: fileId,
    });
    if (statusCode !== 200) {
      res.status(statusCode).json({ message });
      return;
    }
    res.status(statusCode).json({
      fileId: file._id,
      fileName: file.fileName,
      message,
    });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).json({ message: error.message });
    return;
  }
};

const addOne = async (req, res) => {
  const { fileName, tempFileId } = req.fileInfo;
  try {
    const { statusCode, newFile, message } = await FilesQuery.addOne({
      fileName,
    });
    res.status(statusCode).json({
      fileId: newFile._id,
      tempFileId,
      fileName: newFile.fileName,
      message,
    });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).json({ message: error.message });
    return;
  }
};

const updateOne = async (req, res) => {
  const { fileId, newFileName } = req.fileInfo;
  try {
    const { statusCode, updatedFile, message } = await FilesQuery.updateOne({
      fileId,
      newFileName,
    });
    if (statusCode !== 200) {
      res.status(statusCode).json({ message });
      return;
    }
    res.status(statusCode).json({
      fileId: updatedFile._id,
      fileName: updatedFile.fileName,
      message,
    });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).json({ message: error.message });
    return;
  }
};

const deleteOne = async (req, res) => {
  const { fileId } = req.fileInfo;
  try {
    const { statusCode, deletedFileInfo, message } = await FilesQuery.deleteOne(
      { fileId }
    );
    if (statusCode !== 200) {
      res.status(statusCode).json({ message });
      return;
    }
    res.status(statusCode).json({
      fileId: deletedFileInfo._id,
      fileName: deletedFileInfo.fileName,
      message,
    });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).json({ message: error.message });
    return;
  }
};

// <-- Group -->

const addGroup = async (req, res) => {
  const files = req.files;
  const { id: userId } = req.user;

  const filesInfo = req.files.map((file) => {
    return {
      fileName: file.fileName,
      userId,
    };
  });

  try {
    const { statusCode, filesCreated, message } = await FilesQuery.addGroup(
      filesInfo
    );
    res.status(statusCode).json({
      filesCreated: filesCreated?.map((file, i) => {
        return {
          fileId: file._id,
          userId: file.userId,
          tempFileId: files[i].tempFileId,
          fileName: file.fileName,
        };
      }),
      statusCreatedFiles: {
        filesCreatedCount: filesCreated?.length,
        filesSendedFromClientCount: files?.length,
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
  const files = req.files;

  try {
    const {
      statusCode,
      filesToUpdate,
      filesNotUpdated,
      statusUpdatesFiles,
      message,
    } = await FilesQuery.updateGroup(files);

    res.status(statusCode).json({
      filesUpdated: filesToUpdate?.map((file) => ({
        fileId: file.fileId,
        newFileName: file.newFileName,
      })),
      filesNotUpdated,
      statusUpdateFiles: {
        filesUpdatedCount: statusUpdatesFiles?.modifiedCount,
        filesNotUpdatedCount: filesNotUpdated?.length,
        filesSendedFromClientCount: files?.length,
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
  const files = req.files;

  try {
    const {
      statusCode,
      filesToDelete,
      filesIdsNotDeleted,
      statusDeletedFiles,
      message,
    } = await FilesQuery.deleteGroup(files);
    res.status(statusCode).json({
      filesDeleted: filesToDelete?.map((file) => {
        return {
          fileId: file._id,
          fileName: file.fileName,
        };
      }),
      filesNotDeleted: filesIdsNotDeleted.map((fileId) => {
        return {
          fileId: fileId,
        };
      }),
      statusDeleteFiles: {
        filesDeletedCount: statusDeletedFiles?.deletedCount,
        filesNotDeletedIds: filesIdsNotDeleted?.length,
        filesSendedFromClientCount: files?.length,
      },
      message,
    });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).json({ message: error.message });
    return;
  }
};

export const filesController = {
  getOne,
  addOne,
  updateOne,
  deleteOne,
  addGroup,
  updateGroup,
  deleteGroup,
};
