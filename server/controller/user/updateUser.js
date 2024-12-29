const ApiResponse = require("../../utils/ApiResponse.js");
const ApiError = require("../../utils/ApiError.js");
const TryCatch = require("../../utils/TryCatch.js");

const userModel = require("../../model/user.model.js");

const updateUser = TryCatch(async (req, res, next) => {
  const { email, name, oldPassword, newPassword } = req.body;
  const _id = req.user._id;

  if (!email && !name && !oldPassword && !newPassword) {
    return next(new ApiError(400, "At least one field is required"));
  }

  const user = await userModel.findById(_id);
  if (!user) {
    return next(new ApiError(404, "User not found"));
  }

  if (email) user.email = email;
  if (name) user.name = name;

  if ((oldPassword && !newPassword) || (!oldPassword && newPassword)) {
    return next(
      new ApiError(400, "Both oldPassword and newPassword are required")
    );
  }

  if (oldPassword && newPassword) {
    if (!(await user.comparePassword(oldPassword))) {
      return next(new ApiError(400, "Invalid old password"));
    }
    user.password = newPassword;
  }

  await user.save();

  const apiResponse = new ApiResponse(
    200,
    "User updated successfully",
    true,
    user
  );
  res.status(apiResponse.status).json(apiResponse);
});

module.exports = updateUser;
