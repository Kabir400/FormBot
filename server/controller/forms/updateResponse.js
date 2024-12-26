const ApiResponse = require("../../utils/ApiResponse.js");
const ApiError = require("../../utils/ApiError.js");
const TryCatch = require("../../utils/TryCatch.js");

const responseModel = require("../../model/response.model.js");
const formModel = require("../../model/form.model.js");

const updateResponse = TryCatch(async (req, res, next) => {
  const { email, formId, name, content } = req.body;

  // Validate required fields
  if (!email || !formId) {
    return next(new ApiError(400, "Email and Form ID are required"));
  }

  // Fetch the response document
  const response = await responseModel.findOne({ email, formId });
  if (!response) {
    return next(new ApiError(404, "Response not found"));
  } else if (response.submited) {
    return next(new ApiError(400, "You have already responded to this form"));
  }

  // Update name if provided
  if (name) {
    response.name = name;
  }

  // Update content if provided
  if (content) {
    const { field, value } = content;

    // Validate content structure
    if (!field || !value) {
      return next(
        new ApiError(400, "Content must include both 'field' and 'value'")
      );
    }

    // Check if field is valid based on schema enum
    const validFields = [
      "text",
      "number",
      "email",
      "phone",
      "rating",
      "date",
      "button",
    ];
    if (!validFields.includes(field)) {
      return next(new ApiError(400, `Invalid field type: ${field}`));
    }

    // Handle special case when field is "button"
    if (field === "button") {
      response.submited = new Date(); // Update the submitted field to the current time

      // Increment the completed count in the form model
      const form = await formModel.findById(formId);
      if (!form) {
        return next(new ApiError(404, "Form not found"));
      }
      form.completed += 1;
      await form.save();
    }

    // Add the content object to the content array
    response.content.push({ field, value });
  }

  // Save the updated response
  await response.save();

  // Create API response object
  const apiResponse = new ApiResponse(
    200,
    "Response updated successfully",
    true,
    response
  );

  // Send the response
  return res.status(apiResponse.status).json(apiResponse);
});

module.exports = updateResponse;
