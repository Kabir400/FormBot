const ApiResponse = require("../../utils/ApiResponse.js");
const ApiError = require("../../utils/ApiError.js");
const TryCatch = require("../../utils/TryCatch.js");
const formModel = require("../../model/form.model.js");

const fetchForm = TryCatch(async (req, res, next) => {
  const { formId } = req.body;

  // Validate input
  if (!formId) {
    return next(new ApiError(400, "Form ID is required"));
  }

  // Fetch the form by ID
  const form = await formModel.findById(formId);

  // Check if the form exists
  if (!form) {
    return next(new ApiError(404, "Form not found"));
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
