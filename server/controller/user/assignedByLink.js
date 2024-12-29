const ApiResponse = require("../../utils/ApiResponse.js");
const ApiError = require("../../utils/ApiError.js");
const TryCatch = require("../../utils/TryCatch.js");

const userModel = require("../../model/user.model.js");
const jwt = require("jsonwebtoken");

const assignedUser = TryCatch(async (req, res, next) => {
  const { token } = req.params;

  if (!token) {
    return next(new ApiError(400, "Token is required"));
  }
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
  } catch (err) {
    return next(new ApiError(400, "Invalid link"));
  }
  const { _id, isEditable } = decoded;

  if (_id.toString() === req.user._id.toString()) {
    return next(new ApiError(400, "You cannot assign yourself"));
  }

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
    assignedUser: req.user._id,
    isEditable,
  });

  // Send response
  return res.status(apiresponse.status).json(apiresponse);
});

module.exports = assignedUser;
