const ApiResponse = require("../../utils/ApiResponse.js");
const ApiError = require("../../utils/ApiError.js");
const TryCatch = require("../../utils/TryCatch.js");

const formModel = require("../../model/form.model.js"); //

const createForm = TryCatch(async (req, res, next) => {
  const { title, folderId } = req.body;
  const { _id: userID } = req.user;

  const folderIdToUse = folderId || null;

  // Validate input
  if (!title) {
    return next(new ApiError(400, "Title is required"));
  }

  // Create new folder
  const form = await formModel.create({
    title,
    userID,
    folderId: folderIdToUse,
    content: [],
  });

  // Create response object
  const apiResponse = new ApiResponse(
    200,
    "Form created successfully",
    true,
    form
  );

  // Send response
  return res.status(apiResponse.status).json(apiResponse);
});

module.exports = createForm;
