const express = require("express");
const router = express.Router();

//middleware
const checkLogin = require("../middleware/checkLogin.js");
const userValidator = require("../middleware/userValidator.js");
const validate = require("../middleware/validate.js");

//controller
const createUser = require("../controller/user/createUser.js");
const loginUser = require("../controller/user/loginUser.js");
const fetchData = require("../controller/user/fetchData.js");
const fetchDashboard = require("../controller/user/fetchDashboard.js");
const fetchOthersData = require("../controller/user/fetchOthersData.js");

//routes
router.post("/signup", userValidator, validate, createUser);
router.post("/login", loginUser);
router.get("/data", checkLogin, fetchData);
router.get("/dashboards", checkLogin, fetchDashboard);
router.get("/others/:id", checkLogin, fetchOthersData);

module.exports = router;
