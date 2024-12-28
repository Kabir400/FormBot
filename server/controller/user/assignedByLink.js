const ApiResponse = require("../../utils/ApiResponse.js");
const ApiError = require("../../utils/ApiError.js");
const TryCatch = require("../../utils/TryCatch.js");

const userModel = require("../../model/user.model.js");

const assignedUser = TryCatch(async (req, res, next) => {
  const { token } = req.params;

  if (!token) {
    return next(new ApiError(400, "Token is required"));
  }

  const { _id, isEditable } = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

  const user = await userModel.findById(_id);
  if (!user) {
    return next(new ApiError(401, "invalid token"));
  }

  // Check if the user is already assigned
  const alreadyAssigned = user.assignedUsers.some(
    (assigned) => assigned.assignedUser.toString() === req.user._id.toString()
  );

  if (alreadyAssigned) {
    return next(new ApiError(400, "User is already assigned"));
  }

  // Add user to assignedUsers array
  user.assignedUsers.push({
    assignedUser: req.user._id,
    isEditable,
  });

  // Save the updated logged-in user document
  await user.save();

  // Create response
  const apiresponse = new ApiResponse(200, "User assigned successfully", true, {
    assignedUser: userToAssign.email,
    isEditable,
  });

  // Send response
  return res.status(apiresponse.status).json(apiresponse);
});

module.exports = assignedUser;
