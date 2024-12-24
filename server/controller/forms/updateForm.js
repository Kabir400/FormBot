const ApiResponse = require("../../utils/ApiResponse.js");
const ApiError = require("../../utils/ApiError.js");
const TryCatch = require("../../utils/TryCatch.js");
const formModel = require("../../model/form.model.js");

const updateForm = TryCatch(async (req, res, next) => {
  const { formId, content } = req.body;

  // Check if the last element is button
  const lastElement = content[content.length - 1];
  if (
    !lastElement ||
    lastElement.type !== "bubble" ||
    lastElement.value !== "button"
  ) {
    return next(new ApiError(400, "The last element must be a button"));
  }

  // Check if there is any content after the button
  const hasContentAfterButton = content.some(
    (item, index) => index > content.length - 1
  );
  if (hasContentAfterButton) {
    return next(new ApiError(400, "No content is allowed after the button"));
  }

  // Update the form content
  const updatedForm = await formModel.findByIdAndUpdate(
    formId,
    { content },
    { new: true, runValidators: true }
  );

  // Handle case where form is not found
  if (!updatedForm) {
    return next(new ApiError(404, "Form not found"));
  }

  // Create response object
  const apiResponse = new ApiResponse(
    200,
    "Form updated successfully",
    true,
    updatedForm
  );

  // Send response
  return res.status(apiResponse.status).json(apiResponse);
});

module.exports = updateForm;
