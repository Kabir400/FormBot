const ApiResponse = require("../../utils/ApiResponse.js");
const TryCatch = require("../../utils/TryCatch.js");

const folderModel = require("../../model/folder.model.js");
const formModel = require("../../model/form.model.js");

const fetchData = TryCatch(async (req, res, next) => {
  const { _id: userID } = req.user;

  const folders = (await folderModel.find({ userID })) || [];

  const forms = (await formModel.find({ userID })) || [];

  const apiResponse = new ApiResponse(
    200,
    "Folders and forms fetched successfully",
    true,
    { folders, forms }
  );

  return res.status(apiResponse.status).json(apiResponse);
});

module.exports = fetchData;
