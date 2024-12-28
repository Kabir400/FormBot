const ApiResponse = require("../../utils/ApiResponse.js");
const TryCatch = require("../../utils/TryCatch.js");
const userModel = require("../../model/user.model.js");

const fetchDashboard = TryCatch(async (req, res, next) => {
  const { _id: userID, name: myName } = req.user;

  // Fetch the users who have assigned the logged-in user
  const usersWhoAssignedMe = await userModel
    .find({
      "assignedUsers.assignedUser": userID,
    })
    .select("name assignedUsers");

  // Format the users who assigned the logged-in user
  const formattedUsersWhoAssignedMe = usersWhoAssignedMe.map((assigner) => {
    const relevantAssignment = assigner.assignedUsers.find(
      (assigned) => assigned.assignedUser.toString() === userID.toString()
    );

    return {
      id: assigner._id,
      name: assigner.name,
      isEditable: relevantAssignment.isEditable,
      isOwner: false,
    };
  });

  const apiResponse = new ApiResponse(
    200,
    "Assigned user details fetched successfully",
    true,
    [
      { id: userID, name: myName, isEditable: true, isOwner: true },
      ...formattedUsersWhoAssignedMe,
    ]
  );

  return res.status(apiResponse.status).json(apiResponse);
});

module.exports = fetchDashboard;
