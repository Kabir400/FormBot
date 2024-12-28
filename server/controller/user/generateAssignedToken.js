const ApiResponse = require("../../utils/ApiResponse.js");
const TryCatch = require("../../utils/TryCatch.js");
const jwt = require("jsonwebtoken");

const generateAssignedToken = TryCatch(async (req, res, next) => {
  const { _id } = req.user;
  const { isEditable } = req.body;

  const token = jwt.sign({ _id, isEditable }, process.env.TOKEN_SECRET_KEY);

  const apiResponse = new ApiResponse(
    200,
    "Token generated successfully",
    true,
    token
  );

  return res.status(apiResponse.status).json(apiResponse);
});

module.exports = generateAssignedToken;
