const ApiResponse = require("../../utils/ApiResponse.js");
const ApiError = require("../../utils/ApiError.js");
const TryCatch = require("../../utils/TryCatch.js");

const responseModel = require("../../model/response.model.js");
const formModel = require("../../model/form.model.js");

const createResponse = TryCatch(async (req, res, next) => {
  const { email, formId } = req.body;

  // Validate input
  if (!email || !formId) {
    return next(new ApiError(400, "Email and Form ID are required"));
  }

  // Check if the form exists
  const form = await formModel.findById(formId);
  if (!form) {
    return next(new ApiError(404, "Form not found"));
  }

  //check user is already responded
  const userResponnse = await responseModel.findOne({ email, formId });
  if (userResponnse) {
    if (userResponnse.submited) {
      return next(new ApiError(400, "You have already responded to this form"));
    } else {
      userResponnse.content = [];
      await userResponnse.save();

      const apiResponse = new ApiResponse(
        202,
        "You responded to this form but not submitted",
        true,
        userResponnse
      );
      return res.status(apiResponse.status).json(apiResponse);
    }
  }

  // Create new response
  const response = await responseModel.create({
    email,
    formId,
    content: [], // Initialize with empty content array
  });

  // Increment starts count in the form model
  form.starts += 1;
  await form.save();

  // Create response object
  const apiResponse = new ApiResponse(
    201,
    "Response created successfully",
    true,
    response
  );

  // Send response
  return res.status(apiResponse.status).json(apiResponse);
});

module.exports = createResponse;
