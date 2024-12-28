const ApiResponse = require("../../utils/ApiResponse.js");
const ApiError = require("../../utils/ApiError.js");
const TryCatch = require("../../utils/TryCatch.js");

const userModel = require("../../model/user.model.js");

const assignedUser = TryCatch(async (req, res, next) => {
  const { email, isEditable } = req.body;

  // Validate input
  if (!email || typeof isEditable !== "boolean") {
    return next(new ApiError(400, "Email and isEditable are required"));
  }

  // Find the user to assign based on email
  const userToAssign = await userModel.findOne({ email });
  if (!userToAssign) {
    return next(new ApiError(404, "User to assign not found"));
  }

  // Get the logged-in user's info from req.user
  const loggedInUser = await userModel.findById(req.user._id);
  if (!loggedInUser) {
    return next(new ApiError(401, "Unauthorized: Logged-in user not found"));
  }

  // Check if the user is already assigned
  const alreadyAssigned = loggedInUser.assignedUsers.some(
    (assigned) =>
      assigned.assignedUser.toString() === userToAssign._id.toString()
  );

  if (alreadyAssigned) {
    return next(new ApiError(400, "User is already assigned"));
  }

  // Add user to assignedUsers array
  loggedInUser.assignedUsers.push({
    assignedUser: userToAssign._id,
    isEditable,
  });

  // Save the updated logged-in user document
  await loggedInUser.save();

  // Create response
  const apiresponse = new ApiResponse(200, "User assigned successfully", true, {
    assignedUser: userToAssign.email,
    isEditable,
  });

  // Send response
  return res.status(apiresponse.status).json(apiresponse);
});

module.exports = assignedUser;
