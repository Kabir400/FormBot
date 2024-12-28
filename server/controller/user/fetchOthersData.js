const ApiResponse = require("../../utils/ApiResponse.js");
const TryCatch = require("../../utils/TryCatch.js");

const folderModel = require("../../model/folder.model.js");
const formModel = require("../../model/form.model.js");

const fetchOthersData = TryCatch(async (req, res, next) => {
  const { _id: userID } = req.user;
  const { id } = req.params;

  const user = await userModel.findById(id);

  if (!user) {
    return next(new ApiError(404, "User not found"));
  }

  if (
    !user.assignedUsers.some(
      (assignedUser) =>
        assignedUser.assignedUser.toString() === userID.toString()
    ) &&
    userId.toString() != id.toString()
  ) {
    return next(
      new ApiError(403, "You do not have permission to view this user")
    );
  }
  const folders = (await folderModel.find({ id })) || [];

  const forms = (await formModel.find({ id })) || [];

  const apiResponse = new ApiResponse(
    200,
    "Folders and forms fetched successfully",
    true,
    { folders, forms }
  );

  return res.status(apiResponse.status).json(apiResponse);
});

module.exports = fetchOthersData;
