const ApiResponse = require("../../utils/ApiResponse.js");
const ApiError = require("../../utils/ApiError.js");
const TryCatch = require("../../utils/TryCatch.js");

const folderModel = require("../../model/folder.model.js"); //

const createFolder = TryCatch(async (req, res, next) => {
  const { title } = req.body;
  const { _id: userID } = req.user;

  // Validate input
  if (!title) {
    return next(new ApiError(400, "Title is required"));
  }

  // Create new folder
  const folder = await folderModel.create({
    title,
    userID,
  });

  // Create response object
  const apiResponse = new ApiResponse(
    200,
    "Folder created successfully",
    true,
    folder
  );

  // Send response
  return res.status(apiResponse.status).json(apiResponse);
});

module.exports = createFolder;
