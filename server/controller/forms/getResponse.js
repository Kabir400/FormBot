const ApiResponse = require("../../utils/ApiResponse.js");
const ApiError = require("../../utils/ApiError.js");
const TryCatch = require("../../utils/TryCatch.js");

const responseModel = require("../../model/response.model.js");
const formModel = require("../../model/form.model.js");
const userModel = require("../../model/user.model.js");

const getResponse = TryCatch(async (req, res, next) => {
  const { formId } = req.params;
  const { _id } = req.user;

  const form = await formModel.findById(formId);
  if (!form) {
    return next(new ApiError(404, "Invalid Form Id"));
  }

  const responses = await responseModel.find({ formId });

  const apiResponse = new ApiResponse(
    200,
    "Response is fetched successfully",
    true,
    {
      form: form,
      responses: responses,
    }
  );

  if (form.userID.toString() === _id.toString()) {
    return res.status(apiResponse.status).json(apiResponse);
  }

  const user = await userModel.findById(form.userID);

  if (!user) {
    return next(new ApiError(404, "User not found"));
  }

  const hasAccess = user.assignedUsers.some(
    (assignedUser) => assignedUser.assignedUser.toString() === _id.toString()
  );

  if (hasAccess) {
    return res.status(apiResponse.status).json(apiResponse);
  }

  return next(
    new ApiError(403, "You are not authorized to access this form response")
  );
});

module.exports = getResponse;
