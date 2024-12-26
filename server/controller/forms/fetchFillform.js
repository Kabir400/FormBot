const ApiResponse = require("../../utils/ApiResponse.js");
const ApiError = require("../../utils/ApiError.js");
const TryCatch = require("../../utils/TryCatch.js");
const formModel = require("../../model/form.model.js");
const mongoose = require("mongoose");

const fetchFillform = TryCatch(async (req, res, next) => {
  const { formId } = req.params;

  // Validate input
  if (!formId) {
    return next(new ApiError(400, "Form ID is required"));
  }

  // Validate formId as a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(formId)) {
    return next(new ApiError(400, "Invalid Form ID"));
  }

  const form = await formModel.findByIdAndUpdate(
    formId,
    { $inc: { views: 1 } },
    { new: true }
  );

  // Check if the form exists
  if (!form) {
    return next(new ApiError(404, "Form not found"));
  }

  // Create response object
  const apiResponse = new ApiResponse(
    200,
    "Form fetched successfully and view count updated",
    true,
    form
  );

  // Send response
  return res.status(apiResponse.status).json(apiResponse);
});

module.exports = fetchFillform;
