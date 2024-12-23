const mongoose = require("mongoose");
const ApiResponse = require("../../utils/ApiResponse.js");
const ApiError = require("../../utils/ApiError.js");
const TryCatch = require("../../utils/TryCatch.js");

const folderModel = require("../../model/folder.model.js");
const formModel = require("../../model/form.model.js");
const userModel = require("../../model/user.model.js");

const deleteFolder = TryCatch(async (req, res, next) => {
  const { folderId } = req.body;
  const userId = req.user._id;

  // Validate input
  if (!folderId) {
    return next(new ApiError(400, "FolderId is required"));
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Fetch the folder
    const folder = await folderModel.findById(folderId).session(session);
    if (!folder) {
      return next(new ApiError(404, "Invalid folderId"));
    }

    // Check if the user is the owner
    if (folder.userID.toString() !== userId.toString()) {
      const user = await userModel.findById(userId).session(session);
      const isEditable = user.assignedUsers.some(
        (assignedUser) =>
          assignedUser.assignedUser.toString() === folder.userID.toString() &&
          assignedUser.isEditable
      );

      if (!isEditable) {
        return next(
          new ApiError(403, "You do not have permission to delete this folder")
        );
      }
    }

    // Delete all forms associated with the folder
    await formModel.deleteMany({ folderId }).session(session);

    // Delete the folder
    await folder.deleteOne({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    const apiResponse = new ApiResponse(
      200,
      "Folder deleted successfully",
      true,
      { folderId }
    );
    return res.status(apiResponse.status).json(apiResponse);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return next(
      new ApiError(500, "An error occurred while deleting the folder")
    );
  }
});

module.exports = deleteFolder;
