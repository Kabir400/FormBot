const ApiResponse = require("../../utils/ApiResponse.js");
const ApiError = require("../../utils/ApiError.js");
const TryCatch = require("../../utils/TryCatch.js");
const formModel = require("../../model/form.model.js");
const userModel = require("../../model/user.model.js");
const mongoose = require("mongoose");

const fetchForm = TryCatch(async (req, res, next) => {
  const { formId } = req.params;
  const userId = req.user._id;

  // Validate input
  if (!formId) {
    return next(new ApiError(400, "Form ID is required"));
  }

  // Validate formId as a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(formId)) {
    return next(new ApiError(400, "Invalid Form ID"));
  }

  // Fetch the form by ID
  const form = await formModel.findById(formId);

  // Check if the form exists
  if (!form) {
    return next(new ApiError(404, "Form not found"));
  }

  // Check if the user is the owner of the form
  if (form.userID.toString() === userId.toString()) {
    const apiResponse = new ApiResponse(
      200,
      "Form fetched successfully",
      true,
      form
    );
    return res.status(apiResponse.status).json(apiResponse);
  }

  // Check if the user has access to the form
  const user = await userModel.findById(form.userID);
  const hasAccess = user.assignedUsers.some(
    (assignedUser) => assignedUser.assignedUser.toString() === userId.toString()
  );

  if (!hasAccess) {
    return next(new ApiError(403, "You do not have access to this form"));
  }

  // Create response object
  const apiResponse = new ApiResponse(
    200,
    "Form fetched successfully",
    true,
    form
  );

  // Send response
  return res.status(apiResponse.status).json(apiResponse);
});

module.exports = fetchForm;
