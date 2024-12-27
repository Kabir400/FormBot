const ApiResponse = require("../../utils/ApiResponse.js");
const ApiError = require("../../utils/ApiError.js");
const TryCatch = require("../../utils/TryCatch.js");
const formModel = require("../../model/form.model.js");
const userModel = require("../../model/user.model.js");

const updateForm = TryCatch(async (req, res, next) => {
  const { formId, content, title, theme } = req.body;
  const userId = req.user._id;

  // Validate input
  if (!formId || !content) {
    return next(new ApiError(400, "FormId and content are required"));
  }

  // Fetch the form
  const form = await formModel.findById(formId);
  if (!form) {
    return next(new ApiError(404, "Form not found"));
  }

  // Check if the user is the owner of the form
  if (form.userID.toString() === userId.toString()) {
    return updateFormContent(form, content, title, res, next, theme);
  }

  // Check if the user has edit access to the form
  const user = await userModel.findById(userId);
  const hasEditAccess = user.assignedUsers.some(
    (assignedUser) =>
      assignedUser.assignedUser.toString() === form.userID.toString() &&
      assignedUser.isEditable
  );

  if (!hasEditAccess) {
    return next(
      new ApiError(403, "You do not have permission to update this form")
    );
  }

  // Allow update for users with edit permissions
  return updateFormContent(form, content, res, next, theme);
});

// Helper function to update form content
async function updateFormContent(form, content, title, res, next, theme) {
  // Validate the content
  const lastElement = content[content.length - 1];
  if (
    !lastElement ||
    lastElement.type !== "input" ||
    lastElement.value !== "button"
  ) {
    return next(new ApiError(400, "The last element must be a button"));
  }

  const hasContentAfterButton = content.some(
    (item, index) => index > content.length - 1
  );
  if (hasContentAfterButton) {
    return next(new ApiError(400, "No content is allowed after the button"));
  }

  // Update the form content
  const updatedForm = await formModel.findByIdAndUpdate(
    form._id,
    { content, title, theme: theme || "light" },
    { new: true, runValidators: true }
  );

  if (!updatedForm) {
    return next(new ApiError(404, "Form not found"));
  }

  const apiResponse = new ApiResponse(
    200,
    "Form updated successfully",
    true,
    updatedForm
  );
  return res.status(apiResponse.status).json(apiResponse);
}

module.exports = updateForm;
