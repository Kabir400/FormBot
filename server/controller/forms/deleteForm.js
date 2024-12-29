const ApiResponse = require("../../utils/ApiResponse.js");
const ApiError = require("../../utils/ApiError.js");
const TryCatch = require("../../utils/TryCatch.js");

const formModel = require("../../model/form.model.js");
const userModel = require("../../model/user.model.js");

const deleteForm = TryCatch(async (req, res, next) => {
  const { formId } = req.body;
  const userId = req.user._id;

  // Validate input
  if (!formId) {
    return next(new ApiError(400, "FormId is required"));
  }

  // Fetch the form
  const form = await formModel.findById(formId);
  if (!form) {
    return next(new ApiError(404, "Form not found"));
  }

  // Check if the user is the form owner
  if (form.userID.toString() === userId.toString()) {
    await form.deleteOne();

    const apiResponse = new ApiResponse(
      200,
      "form deleted successfully",
      true,
      form
    );
    return res.status(apiResponse.status).json(apiResponse);
  }

  // Check if the user has permission to delete the form
  const user = await userModel.findById(form.userID);
  const isEditable = user.assignedUsers.some(
    (assignedUser) =>
      assignedUser.assignedUser.toString() === userId.toString() &&
      assignedUser.isEditable
  );

  if (!isEditable) {
    return next(
      new ApiError(403, "You do not have permission to delete this form")
    );
  }

  // Allow deletion for users with edit permissions
  await form.deleteOne();

  const apiResponse = new ApiResponse(
    200,
    "Form deleted successfully",
    true,
    form
  );
  return res.status(apiResponse.status).json(apiResponse);
});

module.exports = deleteForm;
